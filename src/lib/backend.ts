import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');
export const user = writable<RecordModel | null>(null);

// **************************
// **** DATABASE ACTIONS ****
// **************************

export const getItemById = async (collection: string, id: string) => {
    try {
        const data = await pb.collection(collection).getOne(id);
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

export const deleteItem = async (collection: string, id: string) => {
    try {
        await pb.collection(collection).delete(id);
        return { error: null };
    } catch (error) {
        return { error };
    }
}

export const saveItem = async (collection: string, item: any) => {
    console.log('saveItem: collection', collection, 'item', item);
    try {
        let data;
        if (item.id) {
            data = await pb.collection(collection).update(item.id, item);
        } else {
            delete item.id;
            data = await pb.collection(collection).create(item);
        }
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

export const getList = async (collection: string, startingIndex: number, perPage: number, sortColumn: string, sortDirection: 'asc' | 'desc') => {
    try {
        const data = await pb.collection(collection).getList(startingIndex, perPage, {
            sort: sortDirection === 'asc' ? sortColumn : `-${sortColumn}`,
        });
        return { data: data.items, error: null };
    } catch (error) {
        return { data: null, error };
    }
}

// **** AUTHENTICATION ****
// ************************
export const signInWithPassword = async (email: string, password: string) => {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log('signInWithPassword authData', authData)
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

async function urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}

export const signInWithOAuth = async (provider: string) => {
    try {
        const authData = await pb.collection('users').authWithOAuth2({ provider });
        console.log('signInWithOAuth authData', authData);
        const avatarUrl = authData?.meta?.avatarUrl;
        console.log('signInWithOAuth avatarUrl', avatarUrl);
        
        if (avatarUrl && !authData.record.avatar) {
            console.log('Attempting to update avatar');
            const id = authData.record.id;
            console.log('User ID:', id);
            
            try {
                const avatarFile = await urlToFile(avatarUrl, 'avatar.jpg');
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                const record = await pb.collection('users').update(id, formData);
                console.log('Avatar updated successfully', record);
            } catch (e) {
                console.error('Failed to update avatar:', e);
                if (e instanceof Error) {
                    console.error('Error message:', e.message);
                }
                if ('data' in e) {
                    console.error('Error data:', e.data);
                }
            }
        }
        
        return null;
    } catch (error) {
        console.error('signInWithOAuth error', error);
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

export const getSession = async () => {
    const authData = pb.authStore.model;
    console.log('getSession: authData', authData)
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