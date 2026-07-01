import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = signal<Language>('es');

  // Expose the current language signal as readonly
  language = this.currentLanguage.asReadonly();

  // Translations dictionary
  private dictionary = {
    es: {
      navbar: {
        inicio: 'Inicio',
        sobreMi: 'Sobre Mí',
        experiencia: 'Experiencia',
        proyectos: 'Proyectos',
        skills: 'Skills',
        educacion: 'Educación',
        contacto: 'Contacto'
      },
      hero: {
        badge: 'Disponible para trabajar',
        greeting: 'Hola, soy',
        subtitle: 'Licenciado en Sistemas | Desarrollador Web',
        description: 'Desarrollador Full Stack especializado en la creación de aplicaciones web escalables con el ecosistema TypeScript. Construyo soluciones robustas orientadas a resolver problemas complejos de negocio.',
        btnProjects: 'Ver Proyectos',
        btnContact: 'Contactarme',
        btnResume: 'Ver CV',
        techStack: 'Tech Stack'
      },
      about: {
        title: 'Sobre Mí',
        p1_1: 'Desarrollador Full Stack y estudiante avanzado de la ',
        p1_bold: 'Licenciatura en Sistemas',
        p1_2: ' en la UADER, especializado en la creación de aplicaciones web escalables con el ecosistema TypeScript.',
        p2: 'Tengo experiencia comprobable en el diseño de bases de datos relacionales, implementación de sistemas de autenticación y desarrollo de arquitecturas robustas orientadas a resolver problemas complejos de negocio.',
        statProjects: 'Proyectos',
        statExp: 'Año de exp.',
        statTech: 'Tecnologías',
        card1Title: 'Arquitectura Escalable',
        card1Desc: 'Diseño de sistemas modulares y desacoplados con NestJS y Angular',
        card2Title: 'Seguridad',
        card2Desc: 'Implementación de autenticación OAuth2 y control de acceso con Keycloak',
        card3Title: 'Full Stack',
        card3Desc: 'Desarrollo end-to-end con TypeScript, desde el frontend hasta la base de datos'
      },
      experience: {
        title: 'Experiencia',
        subtitle: 'Mi trayectoria profesional como desarrollador de software.',
        currentBadge: 'Actual',
        jobs: [
          {
            company: 'Neops AI',
            role: 'Desarrollador de Software',
            period: 'Oct 2025 — Presente',
            current: true,
            highlights: [
              'Estructuré y desarrollé una plataforma educativa orientada al aprendizaje cognitivo adaptativo dentro de un monorepo Nx.',
              'Construí la lógica de negocio del backend con NestJS y TypeScript, asegurando un tipado estricto para el procesamiento de datos educativos.',
              'Implementé la infraestructura de identidad y control de acceso mediante Keycloak con autenticación centralizada.',
              'Integré Google Generative AI para procesar feedback de juegos y generar perfiles cognitivos dinámicos.'
            ]
          },
          {
            company: 'UADER FCyT — Cómputos Métricos',
            role: 'Desarrollador de Software',
            period: 'May 2026 — Presente',
            current: true,
            highlights: [
              'Diseñé y coordiné una plataforma para automatización de cómputos métricos y presupuestos residenciales con React, TypeScript y FastAPI.',
              'Construí el motor de cálculo para procesamiento geométrico de componentes de obra basado en índices CAPSF e INDEC.',
              'Desarrollé la arquitectura del backend con Python y PostgreSQL, incluyendo un sistema de congelamiento de precios (snapshots).',
              'Planificando integración de LLMs para un asistente conversacional y módulo predictivo con Scikit-learn.'
            ]
          },
          {
            company: 'UADER FCyT — E-Commerce',
            role: 'Desarrollador de Software',
            period: 'Ene 2026 — Mar 2026',
            current: false,
            highlights: [
              'Desarrollé una plataforma e-commerce de venta de libros con Angular 19 y Tailwind CSS.',
              'Construí base de datos relacional con PostgreSQL y backend en NestJS con Prisma ORM para órdenes y control de inventario.',
              'Implementé seguridad enterprise con Keycloak como proveedor de identidad (OAuth2) y control de acceso basado en roles.',
              'Diseñé un panel de administración para monitoreo de stock, gestión del catálogo y tarjetas de regalo.'
            ]
          },
          {
            company: 'Olimpia Fútbol 5',
            role: 'Desarrollador de Software',
            period: 'Dic 2025 — Feb 2026',
            current: false,
            highlights: [
              'Desarrollé una plataforma integral para gestión de reservas deportivas con Angular y TypeScript.',
              'Construí un backend con PostgreSQL y Express, optimizando los tiempos de respuesta del servidor.',
              'Diseñé un panel de control que agilizó el monitoreo de disponibilidad y mejoró la eficiencia operativa.'
            ]
          }
        ]
      },
      projects: {
        title: 'Proyectos',
        subtitle: 'Una selección de los proyectos en los que he trabajado.',
        badgeDev: 'En desarrollo',
        badgeCompleted: 'Completado',
        list: [
          {
            title: 'Olimpia Fútbol 5',
            description: 'Plataforma integral para la gestión de reservas deportivas con panel de control para monitoreo de disponibilidad y administración eficiente.',
            tech: ['Angular', 'TypeScript', 'Express', 'PostgreSQL'],
            status: 'completed'
          },
          {
            title: 'MarketBook — E-Commerce',
            description: 'Plataforma e-commerce escalable para venta de libros con autenticación OAuth2 via Keycloak, control de inventario en tiempo real y gestión de catálogo.',
            tech: ['Angular 19', 'NestJS', 'Prisma', 'PostgreSQL', 'Keycloak', 'Tailwind'],
            status: 'completed'
          },
          {
            title: 'Neops AI — Plataforma Educativa',
            description: 'Plataforma de aprendizaje cognitivo adaptativo con IA generativa para perfiles cognitivos dinámicos, autenticación centralizada y monorepo Nx.',
            tech: ['Angular', 'NestJS', 'TypeScript', 'Nx', 'Keycloak', 'Google AI'],
            status: 'in-development'
          },
          {
            title: 'Cómputos Métricos',
            description: 'Automatización de cómputos métricos y presupuestos residenciales con motor de cálculo geométrico, snapshots de precios y planificación de asistente IA.',
            tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Scikit-learn'],
            status: 'in-development'
          }
        ]
      },
      skills: {
        title: 'Skills',
        subtitle: 'Tecnologías y herramientas con las que trabajo día a día.',
        categories: [
          { title: 'Lenguajes', icon: '💻', items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'] },
          { title: 'Frontend', icon: '🎨', items: ['Angular', 'React', 'Tailwind CSS', 'RxJS'] },
          { title: 'Backend', icon: '⚙️', items: ['NestJS', 'Express', 'FastAPI', 'Prisma ORM'] },
          { title: 'Base de Datos & DevOps', icon: '🗄️', items: ['PostgreSQL', 'Docker', 'Nx Monorepo', 'Git & GitHub'] },
          { title: 'Seguridad & Auth', icon: '🔐', items: ['Keycloak', 'OAuth2', 'JWT', 'RBAC'] },
          { title: 'Idiomas', icon: '🌐', items: ['Español (nativo)', 'Inglés (hábil)'] }
        ]
      },
      education: {
        title: 'Educación',
        subtitle: 'Mi formación académica.',
        badgeCurrent: 'En curso',
        list: [
          {
            institution: 'UADER — Facultad de Ciencia y Tecnología',
            location: 'Concepción del Uruguay, Argentina',
            degree: 'Licenciatura en Sistemas',
            period: '2022 — 2026',
            current: true,
            icon: '🎓'
          },
          {
            institution: 'Instituto Sagrado Corazón',
            location: 'Concepción del Uruguay, Argentina',
            degree: 'Bachiller en Humanidades y Ciencias Sociales',
            period: '2015 — 2020',
            current: false,
            icon: '📚'
          }
        ]
      },
      footer: {
        title: '¿Trabajamos juntos?',
        description: 'Estoy disponible para proyectos freelance, posiciones full-time o colaboraciones interesantes. ¡No dudes en contactarme!',
        rights: 'Todos los derechos reservados.'
      }
    },
    en: {
      navbar: {
        inicio: 'Home',
        sobreMi: 'About',
        experiencia: 'Experience',
        proyectos: 'Projects',
        skills: 'Skills',
        educacion: 'Education',
        contacto: 'Contact'
      },
      hero: {
        badge: 'Available for work',
        greeting: 'Hi, I am',
        subtitle: 'Software Engineer | Web Developer',
        description: 'Full Stack Developer specialized in building scalable web applications with the TypeScript ecosystem. I build robust solutions aimed at solving complex business problems.',
        btnProjects: 'View Projects',
        btnContact: 'Contact Me',
        btnResume: 'View Resume',
        techStack: 'Tech Stack'
      },
      about: {
        title: 'About Me',
        p1_1: 'Full Stack Developer and advanced student of the ',
        p1_bold: 'Information Systems Degree',
        p1_2: ' at UADER, specialized in building scalable web applications with the TypeScript ecosystem.',
        p2: 'I have proven experience in designing relational databases, implementing authentication systems, and developing robust architectures aimed at solving complex business problems.',
        statProjects: 'Projects',
        statExp: 'Year exp.',
        statTech: 'Technologies',
        card1Title: 'Scalable Architecture',
        card1Desc: 'Design of modular and decoupled systems with NestJS and Angular',
        card2Title: 'Security',
        card2Desc: 'Implementation of OAuth2 authentication and access control with Keycloak',
        card3Title: 'Full Stack',
        card3Desc: 'End-to-end development with TypeScript, from the frontend to the database'
      },
      experience: {
        title: 'Experience',
        subtitle: 'My professional journey as a software developer.',
        currentBadge: 'Current',
        jobs: [
          {
            company: 'Neops AI',
            role: 'Software Developer',
            period: 'Oct 2025 — Present',
            current: true,
            highlights: [
              'Structured and developed an educational platform oriented towards adaptive cognitive learning within an Nx monorepo.',
              'Built the backend business logic with NestJS and TypeScript, ensuring strict typing for processing educational data.',
              'Implemented the identity and access control infrastructure using Keycloak with centralized authentication.',
              'Integrated Google Generative AI to process game feedback and generate dynamic cognitive profiles.'
            ]
          },
          {
            company: 'UADER FCyT — Metric Computations',
            role: 'Software Developer',
            period: 'May 2026 — Present',
            current: true,
            highlights: [
              'Designed and coordinated a platform for automating metric computations and residential budgets using React, TypeScript, and FastAPI.',
              'Built the calculation engine for geometric processing of construction components based on CAPSF and INDEC indexes.',
              'Developed the backend architecture with Python and PostgreSQL, including a price freezing system (snapshots).',
              'Planning the integration of LLMs for a conversational assistant and a predictive module with Scikit-learn.'
            ]
          },
          {
            company: 'UADER FCyT — E-Commerce',
            role: 'Software Developer',
            period: 'Jan 2026 — Mar 2026',
            current: false,
            highlights: [
              'Developed an e-commerce platform for selling books with Angular 19 and Tailwind CSS.',
              'Built a relational database with PostgreSQL and a NestJS backend with Prisma ORM for orders and real-time inventory control.',
              'Implemented enterprise security with Keycloak as an identity provider (OAuth2) and role-based access control.',
              'Designed an administration dashboard for stock monitoring, catalog management, and gift cards.'
            ]
          },
          {
            company: 'Olimpia Fútbol 5',
            role: 'Software Developer',
            period: 'Dec 2025 — Feb 2026',
            current: false,
            highlights: [
              'Developed a comprehensive platform for sports reservations management with Angular and TypeScript.',
              'Built a backend with PostgreSQL and Express, optimizing server response times.',
              'Designed a control panel that streamlined availability monitoring and improved operational efficiency.'
            ]
          }
        ]
      },
      projects: {
        title: 'Projects',
        subtitle: 'A selection of the projects I have worked on.',
        badgeDev: 'In development',
        badgeCompleted: 'Completed',
        list: [
          {
            title: 'Olimpia Fútbol 5',
            description: 'Comprehensive platform for sports reservations management with a control panel for availability monitoring and efficient administration.',
            tech: ['Angular', 'TypeScript', 'Express', 'PostgreSQL'],
            status: 'completed'
          },
          {
            title: 'MarketBook — E-Commerce',
            description: 'Scalable e-commerce platform for selling books with Keycloak OAuth2 authentication, real-time inventory control, and catalog management.',
            tech: ['Angular 19', 'NestJS', 'Prisma', 'PostgreSQL', 'Keycloak', 'Tailwind'],
            status: 'completed'
          },
          {
            title: 'Neops AI — Educational Platform',
            description: 'Adaptive cognitive learning platform with generative AI for dynamic cognitive profiles, centralized authentication, and Nx monorepo.',
            tech: ['Angular', 'NestJS', 'TypeScript', 'Nx', 'Keycloak', 'Google AI'],
            status: 'in-development'
          },
          {
            title: 'Metric Computations',
            description: 'Automation of metric computations and residential budgets with a geometric calculation engine, price snapshots, and AI assistant planning.',
            tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Scikit-learn'],
            status: 'in-development'
          }
        ]
      },
      skills: {
        title: 'Skills',
        subtitle: 'Technologies and tools I work with every day.',
        categories: [
          { title: 'Languages', icon: '💻', items: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'] },
          { title: 'Frontend', icon: '🎨', items: ['Angular', 'React', 'Tailwind CSS', 'RxJS'] },
          { title: 'Backend', icon: '⚙️', items: ['NestJS', 'Express', 'FastAPI', 'Prisma ORM'] },
          { title: 'Database & DevOps', icon: '🗄️', items: ['PostgreSQL', 'Docker', 'Nx Monorepo', 'Git & GitHub'] },
          { title: 'Security & Auth', icon: '🔐', items: ['Keycloak', 'OAuth2', 'JWT', 'RBAC'] },
          { title: 'Languages', icon: '🌐', items: ['Spanish (native)', 'English (proficient)'] }
        ]
      },
      education: {
        title: 'Education',
        subtitle: 'My academic background.',
        badgeCurrent: 'Current',
        list: [
          {
            institution: 'UADER — Faculty of Science and Technology',
            location: 'Concepción del Uruguay, Argentina',
            degree: 'Information Systems Degree',
            period: '2022 — 2026',
            current: true,
            icon: '🎓'
          },
          {
            institution: 'Instituto Sagrado Corazón',
            location: 'Concepción del Uruguay, Argentina',
            degree: 'High School Diploma in Humanities and Social Sciences',
            period: '2015 — 2020',
            current: false,
            icon: '📚'
          }
        ]
      },
      footer: {
        title: 'Let\'s work together?',
        description: 'I am available for freelance projects, full-time positions, or interesting collaborations. Feel free to reach out!',
        rights: 'All rights reserved.'
      }
    }
  };

  // Computed signal that returns the dictionary of the current language
  t = computed(() => this.dictionary[this.currentLanguage()]);

  toggleLanguage() {
    this.currentLanguage.update(lang => lang === 'es' ? 'en' : 'es');
  }
}
