import { getItemById, deleteItem, saveItem, getList } from './backend';
import type { Contact } from '$lib/types/contact';

export const getContactById = async (id: string) => {
    try {
        const data = await getItemById('contacts', id);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

export const deleteContact = async (id: string) => {
    try {
        await deleteItem('contacts', id);
        return { error: null };
    } catch (error) {
        return { error };
    }
}

export const saveContact = async (contact: Contact) => {
    console.log('saveContact: contact', contact);
    const { data, error } = await saveItem('contacts', contact);
    return { data, error };
}

export const getAllContacts = async () => {
    return fetchContacts('lastname', 'asc');
}

export async function fetchContacts(column: string, direction: 'asc' | 'desc') {
    const { data, error } = await getList('contacts', 1, 50, column, direction);
    return { data, error };
}
