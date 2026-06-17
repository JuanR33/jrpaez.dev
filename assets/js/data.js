/**
 * ═══════════════════════════════════════════════════════════════
 *   PORTFOLIO DATA — versión olivar · data.js
 *
 *   Todos los datos de la web viven aquí. Edita este archivo
 *   y los cambios se reflejan en todas las secciones.
 * ═══════════════════════════════════════════════════════════════
 */

const DATA = {

  /* ── Datos personales ───────────────────────────────────── */
  personal: {
    firstName: 'Juan Ramón',
    lastName:  'Páez',
    initials:  'JR',
    role:      'Desarrollador backend junior',
    email:     'juanramon332@gmail.com',
    location:  'Sevilla',
    github:    'https://github.com/JuanR33',
    linkedin:  'https://www.linkedin.com/in/juanr-paez/',
    avatar:    'assets/img/avatar.png',
    cv:        'cv-juan-ramon-paez-quiros.pdf',
  },

  /* ── Portada ────────────────────────────────────────────── */
  hero: {
    kicker: 'Desarrollador backend · Sevilla',

    // Palabras que rotan tras "Hago que las cosas funcionen por dentro:"
    rotatingWords: ['APIs que responden', 'datos con sentido', 'IA aplicada de verdad', 'código que se entiende'],

    intro: `Vengo de un pueblo de la sierra de Sevilla, tierra de olivos, donde las
            cosas se hacen con paciencia y se hacen bien. Me dedico al backend: el
            motor que mantiene una aplicación en marcha. Titulado en DAM en 2025, con
            un año de prácticas desarrollando aplicaciones con IA integrada.`,

    // Versión compacta para móvil (el hero debe entrar de un vistazo): se omite la
    // frase del pueblo/olivos y se conserva lo profesional.
    introMobile: `Me dedico al backend: el motor que mantiene una aplicación en marcha.
            Titulado en DAM en 2025, con un año de prácticas desarrollando aplicaciones
            con IA integrada.`,

    available: 'Disponible para trabajar · incorporación inmediata',
  },

  /* ── Raíces (sobre mí) ──────────────────────────────────── */
  about: [
    `En el campo, lo que importa trabaja en silencio: la raíz, el agua, la tierra.
     No se ve nada de eso y, aun así, es lo único que sostiene la cosecha. A eso
     me dedico yo, pero por dentro del código.`,

    `Siempre me ha tirado la informática, pero fue durante el Grado Superior de
     Desarrollo de Aplicaciones Multiplataforma cuando descubrí lo que de verdad
     me engancha: la parte de atrás. Las bases de datos, las APIs, la lógica que
     hace que una aplicación funcione. Lo que más disfruto resolviendo.`,

    `En mis prácticas en ODEC Centro de Cálculo trabajé en investigación y
     desarrollo de aplicaciones con inteligencia artificial integrada: desde
     conectar modelos de IA a procesos reales hasta analizar los datos y
     resultados que salían de ellos. Me confirmó que esto es lo mío.`,

    `Busco un equipo donde aportar desde el primer día, aprender de gente con
     más experiencia y asumir retos. Soy de los que preguntan, apuntan y
     vuelven al día siguiente con la solución.`,
  ],

  facts: [
    { number: '2025',  label: 'Titulado en DAM' },
    { number: '1 año', label: 'de prácticas en ODEC' },
    { number: 'B',     label: 'carnet y coche propio' },
  ],

  /* ── Camino (trayectoria) ───────────────────────────────── */
  timeline: [
    {
      year: '2023',
      title: 'Empiezo DAM',
      desc: 'Comienzo el Grado Superior de Desarrollo de Aplicaciones Multiplataforma. Java, bases de datos, Android… y la confirmación de que esto me gusta.',
    },
    {
      year: '2024–25',
      title: 'Prácticas en ODEC',
      desc: 'De junio de 2024 a mayo de 2025: investigación y desarrollo de aplicaciones con IA integrada. Análisis de datos y resultados en proyectos reales.',
    },
    {
      year: '2025',
      title: 'Titulado en DAM',
      desc: 'Termino el ciclo con un proyecto final de agentes de IA para la plataforma Sappio.',
    },
    {
      year: 'Hoy',
      title: 'Buscando mi primer equipo',
      desc: 'Mientras tanto, no paro: Docker, certificación de GitHub Foundations y este portfolio.',
      current: true,
    },
  ],

  /* ── Ahora mismo (aprendiendo) ──────────────────────────── */
  learning: [
    {
      name: 'GitHub Foundations',
      status: 'Certificado en curso',
      progress: 90,
      desc: `Preparando el certificado oficial: control de versiones, colaboración
             y flujo de trabajo en repositorios.`,
      link: 'https://github.com/',
      linkLabel: 'github.com',
    },
    // ── Añade aquí lo próximo que estudies ──
  ],

  /* ── Oficio (habilidades) ───────────────────────────────── */
  skills: [
    {
      group: 'Backend',
      items: ['Java', 'Kotlin', 'C', 'Spring Boot', 'Quarkus', 'APIs REST', 'Hibernate / JPA', 'JWT', 'Swagger / OpenAPI', 'JUnit', 'Arquitectura hexagonal'],
    },
    {
      group: 'IA aplicada',
      items: ['Python', 'APIs de OpenAI', 'LangChain', 'Hugging Face', 'Langfuse', 'RAG', 'Prompt engineering', 'IA / ML aplicada'],
    },
    {
      group: 'Datos',
      items: ['SQL / MySQL', 'MongoDB', 'XML / JSON', 'pandas', 'NumPy', 'Análisis de datos'],
    },
    {
      group: 'Frontend y móvil',
      items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'Ionic'],
    },
    {
      group: 'Entorno y equipo',
      items: ['Git / GitHub / GitLab', 'Docker', 'Maven', 'Postman', 'XAMPP', 'IntelliJ IDEA', 'VS Code', 'Android Studio', 'Agile / Scrum', 'Jira'],
    },
    {
      group: 'Idiomas',
      items: ['Castellano · nativo', 'Inglés · nivel medio'],
    },
  ],

  /* ── Obra (proyectos) ───────────────────────────────────────
     `category`: agrupa el proyecto. Los botones de filtro se
       generan SOLOS a partir de las categorías que existan, así
       que esta sección aguanta igual 3 proyectos que 20.
     `featured: true`: lo marca como destacado (acento + etiqueta).
     ──────────────────────────────────────────────────────────── */
  projects: [
    {
      featured: true,
      category: 'IA & Datos',
      title: 'Aplicación con IA integrada',
      context: 'Prácticas · ODEC Centro de Cálculo',
      desc: `Análisis de textos con modelos de IA para automatizar su clasificación, y
             desarrollo de herramientas internas para el tratamiento automático de
             datos. Investigación y desarrollo orientados a resultados reales de negocio.`,
      tags: ['Python', 'IA / ML', 'NLP', 'APIs REST', 'Análisis de datos'],
      github: '',
      demo: '',
      privateCode: true,
    },
    {
      category: 'Apps',
      title: 'Sappio · agentes de IA para encuestas',
      context: 'Proyecto de fin de ciclo · DAM',
      desc: `Un workflow de agentes de IA que genera encuestas automáticamente dentro de
             la plataforma Sappio. A partir de una indicación —o de un documento Word u
             otro fichero que le pases— los agentes redactan la encuesta entera y la
             dejan lista en la plataforma. Mi proyecto final de DAM, de principio a fin.`,
      tags: ['Java', 'Quarkus', 'Langfuse', 'IA', 'Workflows'],
      github: '',
      demo: '',
      privateCode: true,
    },
    {
      category: 'Web',
      title: 'Este portfolio',
      context: 'Proyecto personal',
      desc: `Mi portfolio, hecho desde cero sin frameworks con HTML, CSS y JavaScript.
             Un mosaico en SVG se va montando con el scroll gracias a GSAP, con modo
             claro/oscuro y diseño adaptado a móvil.`,
      tags: ['JavaScript', 'GSAP', 'SVG', 'CSS'],
      github: 'https://github.com/JuanR33',
      demo: '',
      note: '',
    },
    // ── Añade más proyectos aquí. Si pones una categoría nueva,
    //    aparece su filtro automáticamente. Ejemplo:
    // {
    //   category: 'Backend',
    //   title: 'API REST en Spring Boot',
    //   context: 'Proyecto personal',
    //   desc: 'Una API...',
    //   tags: ['Java', 'Spring', 'Docker'],
    //   github: 'https://github.com/...', demo: '', note: '',
    // },
  ],

  /* ── Certificados ───────────────────────────────────────────
     La sección solo aparece cuando hay al menos un certificado
     con `link` (URL de verificación).
     ──────────────────────────────────────────────────────────── */
  certificates: [
    // { title: 'GitHub Foundations', issuer: 'GitHub', date: '2026', category: 'DevTools', link: 'https://www.credly.com/...' },
  ],

  /* ── Contacto ───────────────────────────────────────────── */
  contact: {
    heading: '¿Hablamos?',
    text: `Si buscas a alguien con ganas, base sólida y disponibilidad total,
           escríbeme. Respondo rápido y sin rodeos.`,
  },

  /* ── Pie ────────────────────────────────────────────────── */
  footer: 'Creciendo, idea a idea, desde la sierra de Sevilla.',
};
