import { Database } from '@/shared/types/database';

export type User = Database['public']['Tables']['user']['Row'];
export type InsertUser = Database['public']['Tables']['user']['Insert'];
export type UpdateUser = Database['public']['Tables']['user']['Update'];
