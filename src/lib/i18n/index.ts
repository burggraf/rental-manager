import { derived, writable } from 'svelte/store';

// Define your translations
const translations = {
  en: {
    language: {
      change: 'Change Language',
      choose: 'Choose Language',
      names: {
        en: 'English',
        es: 'Spanish',
      },
    },
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
      noContacts: "No contacts found.",
      createNew: "Create New Contact",
      cancel: "Cancel",
      firstName: "First Name",
      lastName: "Last Name",
      notes: "Notes",
      save: "Save"
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
      settings: "Settings",
      account: "Account",
      language: "Language",
      currentPlan: "Current Plan",
      upgrade: "Upgrade",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy"
    },
    account: {
      title: "Account Settings",
      personalInfo: "Update your personal information",
      email: "Email",
      firstName: "First Name",
      lastName: "Last Name",
      updateProfile: "Update Profile",
      updating: "Updating..."
    },
    terms: {
      pageTitle: "Terms of Service - Acme Inc",
      metaDescription: "Read our Terms of Service to understand the rules and regulations governing the use of our services.",
      title: "Terms of Service",
      sections: {
        acceptance: {
          title: "Acceptance of Terms",
          content: "By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement."
        },
        useOfService: {
          title: "Use of Service",
          content: "You agree to use this service only for purposes permitted by these Terms of Service and any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions."
        },
        privacy: {
          title: "Privacy Policy",
          content: "Your use of the service is also governed by our Privacy Policy, which is incorporated into these terms by reference."
        },
        termination: {
          title: "Termination",
          content: "We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
        },
        changes: {
          title: "Changes to Terms",
          content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes."
        }
      },
      lastUpdated: "Last updated: [Insert Date]"
    },
    privacy: {
      pageTitle: "Privacy Policy - Acme Inc",
      metaDescription: "Read our Privacy Policy to understand how we collect, use, and protect your personal information.",
      title: "Privacy Policy",
      sections: {
        introduction: {
          title: "Introduction",
          content: "This Privacy Policy describes how Acme Inc collects, uses, and shares your personal information when you use our services."
        },
        informationCollection: {
          title: "Information We Collect",
          content: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support."
        },
        useOfInformation: {
          title: "How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations."
        },
        dataProtection: {
          title: "Data Protection",
          content: "We implement appropriate technical and organizational measures to protect the security of your personal information."
        },
        cookies: {
          title: "Cookies and Similar Technologies",
          content: "We use cookies and similar tracking technologies to collect and store information about how you use our services."
        },
        thirdPartyLinks: {
          title: "Third-Party Links",
          content: "Our services may contain links to third-party websites. We are not responsible for the privacy practices of these external sites."
        },
        changes: {
          title: "Changes to This Privacy Policy",
          content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
        }
      },
      lastUpdated: "Last updated: [Insert Date]"
    },
    contactDetail: {
      editContact: "Edit Contact",
      contactDetails: "Contact Details",
      deleteConfirmation: "Are you sure you want to delete this contact?",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      notes: "Notes",
      name: "Name",
      noNotes: "No notes available",
      backToContacts: "Back to Contacts"
    },
    common: {
      backButton: "Back",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete"
    }
  },
  es: {
    language: {
      change: 'Cambiar Idioma',
      choose: 'Elegir Idioma',
      names: {
        en: 'Inglés',
        es: 'Español',
      },
    },
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
      noContacts: "No se encontraron contactos.",
      createNew: "Crear Nuevo Contacto",
      cancel: "Cancelar",
      firstName: "Nombre",
      lastName: "Apellido",
      notes: "Notas",
      save: "Guardar"
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
      settings: "Configuración",
      account: "Cuenta",
      language: "Idioma",
      currentPlan: "Plan Actual",
      upgrade: "Mejorar",
      termsOfService: "Términos de Servicio",
      privacyPolicy: "Política de Privacidad"
    },
    account: {
      title: "Configuración de la Cuenta",
      personalInfo: "Actualiza tu información personal",
      email: "Correo Electrónico",
      firstName: "Nombre",
      lastName: "Apellido",
      updateProfile: "Actualizar Perfil",
      updating: "Actualizando..."
    },
    terms: {
      pageTitle: "Términos de Servicio - Acme Inc",
      metaDescription: "Lea nuestros Términos de Servicio para comprender las reglas y regulaciones que rigen el uso de nuestros servicios.",
      title: "Términos de Servicio",
      sections: {
        acceptance: {
          title: "Aceptación de Términos",
          content: "Al acceder y utilizar este servicio, usted acepta y está de acuerdo en regirse por los términos y disposiciones de este acuerdo."
        },
        useOfService: {
          title: "Uso del Servicio",
          content: "Usted se compromete a utilizar este servicio solo para los fines permitidos por estos Términos de Servicio y cualquier ley, regulación o práctica o directriz generalmente aceptada en las jurisdicciones relevantes."
        },
        privacy: {
          title: "Política de Privacidad",
          content: "El uso del servicio también se rige por nuestra Política de Privacidad, que se incorpora a estos términos por referencia."
        },
        termination: {
          title: "Terminación",
          content: "Podemos terminar o suspender su acceso al servicio inmediatamente, sin previo aviso o responsabilidad, por cualquier motivo, incluyendo, sin limitación, si usted incumple los Términos."
        },
        changes: {
          title: "Cambios en los Términos",
          content: "Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Es su responsabilidad revisar estos Términos periódicamente para ver si hay cambios."
        }
      },
      lastUpdated: "Última actualización: [Insertar Fecha]"
    },
    privacy: {
      pageTitle: "Política de Privacidad - Acme Inc",
      metaDescription: "Lea nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos su información personal.",
      title: "Política de Privacidad",
      sections: {
        introduction: {
          title: "Introducción",
          content: "Esta Política de Privacidad describe cómo Acme Inc recopila, utiliza y comparte su información personal cuando utiliza nuestros servicios."
        },
        informationCollection: {
          title: "Información que Recopilamos",
          content: "Recopilamos la información que nos proporciona directamente, como cuando crea una cuenta, utiliza nuestros servicios o se pone en contacto con nosotros para obtener asistencia."
        },
        useOfInformation: {
          title: "Cómo Utilizamos su Información",
          content: "Utilizamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, para comunicarnos con usted y para cumplir con las obligaciones legales."
        },
        dataProtection: {
          title: "Protección de Datos",
          content: "Implementamos medidas técnicas y organizativas apropiadas para proteger la seguridad de su información personal."
        },
        cookies: {
          title: "Cookies y Tecnologías Similares",
          content: "Utilizamos cookies y tecnologías de seguimiento similares para recopilar y almacenar información sobre cómo utiliza nuestros servicios."
        },
        thirdPartyLinks: {
          title: "Enlaces de Terceros",
          content: "Nuestros servicios pueden contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de estos sitios externos."
        },
        changes: {
          title: "Cambios en esta Política de Privacidad",
          content: "Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página."
        }
      },
      lastUpdated: "Última actualización: [Insertar Fecha]"
    },
    contactDetail: {
      editContact: "Editar Contacto",
      contactDetails: "Detalles del Contacto",
      deleteConfirmation: "¿Está seguro de que desea eliminar este contacto?",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      notes: "Notas",
      name: "Nombre",
      noNotes: "No hay notas disponibles",
      backToContacts: "Volver a Contactos"
    },
    common: {
      backButton: "Volver",
      save: "Guardar",
      cancel: "Cancelar",
      edit: "Editar",
      delete: "Eliminar"
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