import { pb } from './backend';
import type { Contact } from '$lib/types/contact';

export const getContactById = async (id: string) => {
    try {
        const data = await pb.collection('contacts').getOne(id);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

export const deleteContact = async (id: string) => {
    try {
        await pb.collection('contacts').delete(id);
        return { error: null };
    } catch (error) {
        return { error };
    }
}

export const saveContact = async (contact: Contact) => {
    try {
        let data;
        if (contact.id) {
            data = await pb.collection('contacts').update(contact.id, contact);
        } else {
            if (!contact.userid) {
                contact.userid = pb.authStore.model?.id;
            }
            data = await pb.collection('contacts').create(contact);
        }
        return { data, error: null };
    } catch (error) {
        console.error('saveContact error', error);
        return { data: null, error };
    }
}

export const getAllContacts = async () => {
    return fetchContacts('lastname', 'asc');
}

export async function fetchContacts(column: string, direction: 'asc' | 'desc') {
    try {
        const data = await pb.collection('contacts').getList(1, 50, {
            sort: direction === 'asc' ? column : `-${column}`,
        });
        return { data: data.items, error: null };
    } catch (error) {
        return { data: null, error };
    }
}
