/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly PUBLIC_ENABLE_BOSS_LAB?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
