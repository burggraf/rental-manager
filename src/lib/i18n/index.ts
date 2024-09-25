import { writable, derived } from 'svelte/store';

// Define your translations
const translations = {
  en: {
    dashboard: {
      title: "Welcome to Your Dashboard",
      description: "This is your main dashboard overview. Select an option from the sidebar to view specific sections.",
      content: "Here you can add overview statistics, recent activity, or quick access links.",
      button: "Get Started"
    }
  },
  es: {
    dashboard: {
      title: "Bienvenido a tu Panel de Control",
      description: "Este es tu resumen principal del panel de control. Selecciona una opción de la barra lateral para ver secciones específicas.",
      content: "Aquí puedes agregar estadísticas generales, actividad reciente o enlaces de acceso rápido.",
      button: "Comenzar"
    }
  }
};

// Create a writable store for the active locale
export const locale = writable('en');

// Create a derived store for the active translation
export const t = derived(
  locale,
  ($locale) => (key: string) => {
    const keys = key.split('.');
    let value = translations[$locale];
    for (const k of keys) {
      value = value[k];
      if (!value) break;
    }
    return value || key;
  }
);

// Function to change the locale
export function setLocale(newLocale: string) {
  locale.set(newLocale);
}
