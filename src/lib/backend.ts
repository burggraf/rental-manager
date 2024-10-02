import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import type { Contact } from '$lib/types/contact';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
export const user = writable<User | null>(null);
import { createSortHandler, type SortState } from '$lib/utils/sorting';

export const signInWithPassword = async (email: string, password: string) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        return String(signInError);
      } else {
        return '';
      }
}

export const signInWithOAuth = 
    async (provider: string) => {

        const { error: signInError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`
            }
          });
          return signInError;
}

export const resetPasswordForEmail = async (email: string) => {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return resetError;
}

export const getAllContacts = async (sortState: SortState) => {
    const { data, error } = await supabase
    .from('contacts')
    .select('*');
  return {
    data,
    error
  };
}

export const getContactById = async (id: string) => {
    const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();  
    return {
        data,
        error
    };
}

export const deleteContact = async (id: string) => {   
    const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
    return {
        error
    };
}
export const saveContact = async (contact: Contact) => {
    const { data, error } = await supabase
    .from('contacts')
    .upsert(contact);
    return {
        data,
        error
    };
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return {
        data,
        error
    };
}

export const updateUser = async (obj: any) => {
    const { data, error } = await supabase.auth.updateUser(obj);
    return {
        data,
        error
    };
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return {
        error
    };
}

export async function fetchContacts(column: string, direction: 'asc' | 'desc'): Promise<Contact[]> {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order(column, { ascending: direction === 'asc' });
    
    if (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
    
    return data || [];
  }