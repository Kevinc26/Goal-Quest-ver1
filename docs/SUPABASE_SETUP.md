# GoalQuest + Supabase setup

GoalQuest is prepared to use Supabase for email/password authentication and cross-device cloud saves while keeping game definitions (classes, regions and gear catalogs) in the frontend.

## 1. Create the Supabase project

Create a project named `GoalQuest` in the Supabase dashboard.

## 2. Apply the database migration

Open **SQL Editor** and run the contents of:

`supabase/migrations/2026081601_goalquest_foundation.sql`

The migration creates:

- `public.profiles`
- `public.player_saves`
- `public.quest_events`
- RLS policies so authenticated users can only access their own data
- a trigger that automatically creates the profile and cloud-save row after signup

## 3. Configure Auth URLs

In **Authentication → URL Configuration** set the production Site URL to the final GoalQuest URL.

Add the local development URL and deployment preview URLs that should be allowed as redirects. At minimum during local development, add:

`http://localhost:4321`

When GoalQuest moves to Vercel, add the Vercel production URL before testing email confirmation or password recovery.

## 4. Get browser-safe project values

From the Supabase project settings copy:

- Project URL
- Publishable key (`sb_publishable_...`)

Do **not** use or expose the `service_role` key in the browser.

Create `.env` locally using `.env.example`:

```env
PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REPLACE_ME
```

For Vercel, create the same two environment variables in the project settings.

## 5. Auth behavior

When both public variables exist, GoalQuest automatically enables the account gate with:

- Sign in with email/password
- Create account
- Email confirmation support
- Forgot password flow
- Password reset flow
- Session persistence and token refresh
- Sign out from Settings

If the variables are absent, GoalQuest stays in local-only mode. This keeps the current GitHub Pages beta functional until Supabase/Vercel are configured.

## 6. Cloud-save behavior

After authentication GoalQuest:

1. loads `player_saves` for the authenticated user;
2. hydrates the Zustand game state and equipment from the cloud;
3. migrates existing local progress once when the cloud save is empty;
4. syncs durable progression changes back to Supabase with a short debounce;
5. does not continuously sync timer ticks or active combat frames, reducing database writes and egress.

A local device-owner marker prevents a second account on the same browser from accidentally inheriting another player's old local progress.

## 7. Recommended validation

After applying the migration, create a test account through GoalQuest. Then confirm in Supabase that:

- `profiles` contains one row for the Auth user;
- `player_saves` contains one row for the same `user_id`;
- selecting a class changes `selected_character_id`;
- completing a quest updates the save revision and JSON state;
- a second browser can sign in and recover the same hero/progress.
