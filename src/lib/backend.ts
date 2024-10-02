import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { writable } from 'svelte/store';
import type { Contact } from '$lib/types/contact';

export const pb = new PocketBase('http://127.0.0.1:8090');
export const user = writable<RecordModel | null>(null);

export const signInWithPassword = async (email: string, password: string) => {
    try {
        await pb.collection('users').authWithPassword(email, password);
        return '';
    } catch (error) {
        return error;
    }
}

export const signUp = async (email: string, password: string) => {
    try {
        const result = await pb.collection('users').create({
            email,
            password,
            passwordConfirm: password,
        });
        console.log('signUp result', result)
        return '';
    } catch (error) {
        return String(error);
    }
}

export const signInWithOAuth = async (provider: string) => {
    try {
        const authData = await pb.collection('users').authWithOAuth2({ provider });
        console.log('signInWithOAuth authData', authData)
        return null;
    } catch (error) {
        console.error('signInWithOAuth error', error)
        return error;
    }
}

export const resetPasswordForEmail = async (email: string) => {
    try {
        await pb.collection('users').requestPasswordReset(email);
        return null;
    } catch (error) {
        return error;
    }
}

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
            // If the contact has an ID, update the existing record
            data = await pb.collection('contacts').update(contact.id, contact);
        } else {
            // If the contact doesn't have an ID, create a new record
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

export const getSession = async () => {
    const authData = pb.authStore.model;
    return {
        data: { session: authData ? { user: authData } : null },
        error: null
    };
}

export const updateUser = async (obj: any) => {
    try {
        const data = await pb.collection('users').update(pb.authStore.model?.id, obj);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

export const signOut = async () => {
    pb.authStore.clear();
    return { error: null };
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