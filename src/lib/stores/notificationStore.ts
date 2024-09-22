import { writable } from 'svelte/store';

export type Notification = {
  message: string;
  type: 'default' | 'destructive';
};

function createNotificationStore() {
  const { subscribe, set } = writable<Notification | null>(null);

  return {
    subscribe,
    show: (message: string, type: 'default' | 'destructive' = 'default') => {
      set({ message, type });
      setTimeout(() => set(null), 3000); // Hide after 3 seconds
    },
    hide: () => set(null)
  };
}

export const notification = createNotificationStore();
