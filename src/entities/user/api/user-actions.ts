'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabaseServer';

import { InsertUser, UpdateUser, User } from './types';

export const getUserActions = async ({ searchInput = '' }): Promise<User[]> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .like('name', `%${searchInput}%`)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};

export async function createUser(user: InsertUser) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from('user').insert({
    ...user,
    created_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateUser(user: UpdateUser) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('user')
    .update({
      ...user,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) throw new Error(error.message);

  return data;
}
