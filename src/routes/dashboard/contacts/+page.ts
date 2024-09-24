import { supabase } from '$lib/supabase';
import type { Contact } from '$lib/types/contact';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*');

  return {
    contacts: data as Contact[] || [],
    error: error?.message || null
  };
};
