import { Database } from 'database.types';

export type User = Database['public']['Tables']['user']['Row'];
export type InsertUser = Database['public']['Tables']['user']['Insert'];
export type UpdateUser = Database['public']['Tables']['user']['Update'];
