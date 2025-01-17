import { createClient } from '@supabase/supabase-js';

export function useSupabase(app) {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
  );

  app.provide('supabase', supabase);
}
