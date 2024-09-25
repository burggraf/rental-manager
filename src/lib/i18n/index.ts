import { writable, derived } from 'svelte/store';

// Define your translations
const translations = {
  en: {
    dashboard: {
      title: "Welcome to Your Dashboard",
      description: "This is your main dashboard overview. Select an option from the sidebar to view specific sections.",
      content: "Here you can add overview statistics, recent activity, or quick access links.",
      button: "Get Started"
    },
    loginModal: {
      loginTitle: "Login",
      registerTitle: "Register",
      loginDescription: "Enter your credentials to login",
      registerDescription: "Create an account",
      emailLabel: "Email",
      passwordLabel: "Password",
      loading: "Loading...",
      loginButton: "Login",
      registerButton: "Register",
      orContinueWith: "Or continue with",
      needAccount: "Need an account?",
      alreadyHaveAccount: "Already have an account?"
    }
  },
  es: {
    dashboard: {
      title: "Bienvenido a tu Panel de Control",
      description: "Este es tu resumen principal del panel de control. Selecciona una opción de la barra lateral para ver secciones específicas.",
      content: "Aquí puedes agregar estadísticas generales, actividad reciente o enlaces de acceso rápido.",
      button: "Comenzar"
    },
    loginModal: {
      loginTitle: "Iniciar sesión",
      registerTitle: "Registrarse",
      loginDescription: "Ingrese sus credenciales para iniciar sesión",
      registerDescription: "Crear una cuenta",
      emailLabel: "Correo electrónico",
      passwordLabel: "Contraseña",
      loading: "Cargando...",
      loginButton: "Iniciar sesión",
      registerButton: "Registrarse",
      orContinueWith: "O continuar con",
      needAccount: "¿Necesita una cuenta?",
      alreadyHaveAccount: "¿Ya tiene una cuenta?"
    }
  }
};

// Function to get the initial locale from localStorage or default to 'en'
function getInitialLocale(): string {
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'es')) {
      return storedLocale;
    }
  }
  return 'en';
}

// Create a writable store for the active locale
export const locale = writable(getInitialLocale());

// Subscribe to changes and update localStorage
locale.subscribe((value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', value);
  }
});

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
  if (newLocale === 'en' || newLocale === 'es') {
    locale.set(newLocale);
  } else {
    console.error('Invalid locale. Supported locales are "en" and "es".');
  }
}
