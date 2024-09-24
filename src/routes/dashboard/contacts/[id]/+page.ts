import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load: PageLoad = async ({ params }) => {
  const { data, error: err } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (err) {
    throw error(404, 'Contact not found');
  }

  return {
    contact: data
  };
};
