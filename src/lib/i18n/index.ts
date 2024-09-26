import { derived, writable } from 'svelte/store';

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
    },
    contacts: {
      title: "Contacts",
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      noContacts: "No contacts found."
    },
    sidebar: {
      companyName: "Acme Inc",
      dashboard: "Dashboard",
      logOut: "Log out",
      logIn: "Log in",
      people: "People",
      contacts: "Contacts",
      myAccount: "My Account",
      overview: "Overview",
      analytics: "Analytics",
      orders: "Orders",
      recentOrders: "Recent Orders",
      returns: "Returns",
      products: "Products",
      inventory: "Inventory",
      categories: "Categories",
      customers: "Customers",
      list: "List",
      segments: "Segments",
      settings: "Settings",
      account: "Account",
      language: "Language",
      currentPlan: "Current Plan",
      upgrade: "Upgrade",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy"
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
    },
    contacts: {
      title: "Contactos",
      firstname: "Nombre",
      lastname: "Apellido",
      email: "Correo Electrónico",
      noContacts: "No se encontraron contactos."
    },
    sidebar: {
      companyName: "Acme Inc",
      dashboard: "Panel de Control",
      logOut: "Cerrar sesión",
      logIn: "Iniciar sesión",
      people: "Personas",
      contacts: "Contactos",
      myAccount: "Mi Cuenta",
      overview: "Resumen",
      analytics: "Análisis",
      orders: "Pedidos",
      recentOrders: "Pedidos Recientes",
      returns: "Devoluciones",
      products: "Productos",
      inventory: "Inventario",
      categories: "Categorías",
      customers: "Clientes",
      list: "Lista",
      segments: "Segmentos",
      settings: "Configuración",
      account: "Cuenta",
      language: "Idioma",
      currentPlan: "Plan Actual",
      upgrade: "Mejorar",
      termsOfService: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad"
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
