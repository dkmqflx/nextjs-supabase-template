import { useMemo } from 'react';

import { Database } from '@/shared/types/database';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseClient = SupabaseClient<Database>;

let client: TypedSupabaseClient | undefined;

const getSupabaseBrowserClient = () => {
  if (client) {
    return client;
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  client = createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

  return client;
};

export const useSupabaseBrowserClient = () => {
  return useMemo(getSupabaseBrowserClient, []);
};
