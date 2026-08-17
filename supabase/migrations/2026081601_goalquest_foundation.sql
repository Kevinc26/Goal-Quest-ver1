-- GoalQuest Supabase foundation
-- Auth-linked profile + durable cloud save + progression event history.

begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.player_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  selected_character_id smallint check (selected_character_id is null or selected_character_id between 1 and 8),
  save_version integer not null default 1 check (save_version > 0),
  revision bigint not null default 0 check (revision >= 0),
  state jsonb not null default '{
    "screen":"start",
    "currentRegion":null,
    "stats":{
      "hp":100,"mp":100,"exp":0,"level":1,
      "maxHp":100,"maxMp":100,"nextLevelExp":100,
      "dailyExp":0,"dailyStreak":0,"dailyTasksCompleted":0,"dailyTasksGoal":5,
      "lastRegionMissionDate":null,"lastCompletedRegionDay":null,
      "totalTasksCompleted":0,"daysCompleted":0
    },
    "unlockedRegions":[1],
    "completedMissions":{},
    "defeatedBosses":[],
    "availableDailyMissions":[],
    "completedDailyMissionIds":[],
    "dailyMissionDate":null,
    "todayCompleted":false,
    "lastPlayedDate":null,
    "lastLoginDate":null,
    "corruptionLevel":0
  }'::jsonb,
  equipment jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint player_saves_state_is_object check (jsonb_typeof(state) = 'object'),
  constraint player_saves_equipment_is_object check (jsonb_typeof(equipment) = 'object')
);

create table if not exists public.quest_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  source text not null check (source in ('daily','region','boss','system')),
  mission_id text,
  region_id smallint check (region_id is null or region_id between 1 and 8),
  mission_index smallint check (mission_index is null or mission_index between 0 and 6),
  xp_awarded integer not null default 0 check (xp_awarded >= 0),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  completed_at timestamptz not null default now()
);

create index if not exists quest_events_user_date_idx on public.quest_events (user_id, completed_at desc);
create index if not exists quest_events_user_source_idx on public.quest_events (user_id, source);
create index if not exists player_saves_updated_at_idx on public.player_saves (updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.touch_player_save()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.revision = old.revision + 1;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists player_saves_touch on public.player_saves;
create trigger player_saves_touch
before update on public.player_saves
for each row execute function public.touch_player_save();

alter table public.profiles enable row level security;
alter table public.player_saves enable row level security;
alter table public.quest_events enable row level security;

revoke all on table public.profiles from anon;
revoke all on table public.player_saves from anon;
revoke all on table public.quest_events from anon;

revoke all on table public.profiles from authenticated;
revoke all on table public.player_saves from authenticated;
revoke all on table public.quest_events from authenticated;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update on table public.player_saves to authenticated;
grant select, insert on table public.quest_events to authenticated;
grant usage, select on sequence public.quest_events_id_seq to authenticated;

grant all on table public.profiles to service_role;
grant all on table public.player_saves to service_role;
grant all on table public.quest_events to service_role;
grant all on sequence public.quest_events_id_seq to service_role;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "player_saves_select_own" on public.player_saves;
drop policy if exists "player_saves_insert_own" on public.player_saves;
drop policy if exists "player_saves_update_own" on public.player_saves;
drop policy if exists "quest_events_select_own" on public.quest_events;
drop policy if exists "quest_events_insert_own" on public.quest_events;

create policy "profiles_select_own" on public.profiles
for select to authenticated
using ((select auth.uid()) = id);

create policy "profiles_insert_own" on public.profiles
for insert to authenticated
with check ((select auth.uid()) = id);

create policy "profiles_update_own" on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "player_saves_select_own" on public.player_saves
for select to authenticated
using ((select auth.uid()) = user_id);

create policy "player_saves_insert_own" on public.player_saves
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "player_saves_update_own" on public.player_saves
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "quest_events_select_own" on public.quest_events
for select to authenticated
using ((select auth.uid()) = user_id);

create policy "quest_events_insert_own" on public.quest_events
for insert to authenticated
with check ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_display_name text;
begin
  new_display_name := coalesce(
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(coalesce(new.email, ''), '@', 1)
  );

  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, nullif(new_display_name, ''), new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;

  insert into public.player_saves (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Safe backfill for users created before this migration.
insert into public.profiles (id, display_name, avatar_url)
select
  users.id,
  nullif(coalesce(
    users.raw_user_meta_data ->> 'display_name',
    users.raw_user_meta_data ->> 'full_name',
    users.raw_user_meta_data ->> 'name',
    split_part(coalesce(users.email, ''), '@', 1)
  ), ''),
  users.raw_user_meta_data ->> 'avatar_url'
from auth.users as users
on conflict (id) do nothing;

insert into public.player_saves (user_id)
select users.id
from auth.users as users
on conflict (user_id) do nothing;

commit;
