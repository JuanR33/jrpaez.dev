/* ═══════════════════════════════════════════════════════════
   PORTFOLIO · versión olivar · script.js

   1. Genera el mosaico SVG (estrella de 8 puntas de azulejo).
   2. Renderiza el contenido desde data.js.
   3. Coreografía de scroll con GSAP + ScrollTrigger + Lenis:
      el mosaico se dibuja y rota, y cada sección enciende
      una punta — la web se va pintando conforme la recorres.
   ═══════════════════════════════════════════════════════════ */

const $ = (sel) => document.querySelector(sel);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

const PALETTE = ['var(--terracotta)', 'var(--azulejo)', 'var(--olive)', 'var(--mustard)'];

const SECTIONS = [
  { id: 'portada',  label: 'Portada' },
  { id: 'raices',   label: 'Raíces' },
  { id: 'camino',   label: 'Camino' },
  { id: 'oficio',   label: 'Oficio' },
  { id: 'obra',     label: 'Obra' },
  { id: 'tajo',     label: 'En el tajo' },
  { id: 'contacto', label: 'Contacto' },
];

const ICONS = {
  github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  external: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
  copy: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
};

/* ════════ 1 · EL MOSAICO ════════ */

const CX = 300, CY = 300;
const pt = (angleDeg, radius) => {
  const a = (angleDeg - 90) * Math.PI / 180;
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)];
};
const poly = (pts) => pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ');

function buildMosaico() {
  const svg = $('#mosaicoSvg');
  const NS = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(NS, 'g');
  g.id = 'starGroup';

  const make = (tag, attrs, cls) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (cls) el.setAttribute('class', cls);
    g.appendChild(el);
    return el;
  };

  /* Las 8 puntas de la estrella (cada sección enciende una) */
  for (let i = 0; i < 8; i++) {
    const ang = i * 45;
    const tri = make('polygon', {
      points: poly([pt(ang, 269), pt(ang - 22.6, 206), pt(ang + 22.6, 206)]),
    }, `punta punta-${i}`);
    tri.style.setProperty('--punta-color', PALETTE[i % 4]);
  }

  /* Trazos que se dibujan con el scroll (de fuera hacia dentro) */
  const strokes = [];
  const addStroke = (tag, attrs, cls = 'trazo') => {
    const el = make(tag, attrs, cls);
    el.setAttribute('pathLength', '1');
    strokes.push(el);
    return el;
  };

  addStroke('circle', { cx: CX, cy: CY, r: 284 }, 'trazo trazo--fuerte');
  addStroke('polygon', { points: poly([pt(45, 269), pt(135, 269), pt(225, 269), pt(315, 269)]) });
  addStroke('polygon', { points: poly([pt(0, 269), pt(90, 269), pt(180, 269), pt(270, 269)]) });
  addStroke('circle', { cx: CX, cy: CY, r: 150 });
  addStroke('polygon', { points: poly([pt(0, 150), pt(90, 150), pt(180, 150), pt(270, 150)]) });
  addStroke('circle', { cx: CX, cy: CY, r: 62 }, 'trazo trazo--fuerte');

  svg.appendChild(g);
  return { strokes };
}

/* ════════ 2 · RENDER DEL CONTENIDO ════════ */

const clean = (t) => t.replace(/\s+/g, ' ').trim();

function renderAll() {
  const p = DATA.personal;

  /* Portada */
  $('#heroKicker').textContent = DATA.hero.kicker;
  $('#heroName').innerHTML = `${p.firstName}<br><span class="apellido">${p.lastName}</span>`;
  $('#heroIntro').textContent = clean(DATA.hero.intro);
  $('#heroAvailableText').textContent = DATA.hero.available;

  /* Raíces */
  $('#aboutText').innerHTML = DATA.about.map((t) => `<p class="reveal">${clean(t)}</p>`).join('');
  $('#facts').innerHTML = DATA.facts.map((f) => `
    <div class="fact">
      <span class="fact__number">${f.number}</span>
      <span class="fact__label">${f.label}</span>
    </div>`).join('');

  /* Camino */
  $('#timeline').innerHTML = DATA.timeline.map((t) => `
    <li class="timeline__item reveal ${t.current ? 'timeline__item--current' : ''}">
      <span class="timeline__year">${t.year}</span>
      <h3 class="timeline__title">${t.title}</h3>
      <p class="timeline__desc">${clean(t.desc)}</p>
    </li>`).join('');

  /* Oficio */
  $('#skills').innerHTML = DATA.skills.map((gr) => `
    <div class="skill-group reveal">
      <h3 class="skill-group__title">${gr.group}</h3>
      <ul>${gr.items.map((i) => `<li class="skill-chip">${i}</li>`).join('')}</ul>
    </div>`).join('');

  /* Obra */
  $('#projects').innerHTML = DATA.projects.map(projectCard).join('');
  buildFilters();

  /* Certificados (solo con enlace verificable) */
  const visibleCerts = DATA.certificates.filter((c) => c.link);
  if (visibleCerts.length) {
    const certs = $('#certs');
    certs.hidden = false;
    certs.innerHTML = visibleCerts.map((c) => {
      const caps = c.issuer.match(/[A-ZÁÉÍÓÚÑ]/g) || [];
      const initials = (caps.length >= 2 ? caps.slice(0, 2).join('') : c.issuer.slice(0, 2)).toUpperCase();
      return `
        <a class="cert reveal" href="${c.link}" target="_blank" rel="noopener">
          <span class="cert__seal" aria-hidden="true">${initials}</span>
          <span>
            <span class="cert__title">${c.title}</span><br>
            <span class="cert__meta">${c.issuer} · ${c.date}</span>
          </span>
        </a>`;
    }).join('');
  }

  /* En el tajo */
  $('#learningList').innerHTML = DATA.learning.map((l) => `
    <div class="learning reveal">
      <div class="learning__head">
        <span class="learning__name">${l.name}</span>
        <span class="learning__status">${l.status}</span>
      </div>
      <p class="learning__desc">${clean(l.desc)}</p>
      <div class="learning__bar" role="progressbar" aria-valuenow="${l.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso en ${l.name}">
        <span data-progress="${l.progress}"></span>
      </div>
      ${l.link ? `<a class="learning__link" href="${l.link}" target="_blank" rel="noopener">${l.linkLabel} ${ICONS.external}</a>` : ''}
    </div>`).join('');

  /* Contacto + pie */
  $('#contactHeading').textContent = DATA.contact.heading;
  $('#contactText').textContent = clean(DATA.contact.text);
  const mail = $('#contactMail');
  mail.innerHTML =
    `<span class="contact__mail-default">${p.email}${ICONS.copy}</span>` +
    `<span class="contact__mail-done" aria-hidden="true">${ICONS.check} ¡Copiado!</span>`;
  mail.addEventListener('click', () => copyEmail(mail, p.email));
  $('#contactLinks').innerHTML = `
    <a class="contact__btn" href="${p.github}" target="_blank" rel="noopener">${ICONS.github} GitHub</a>
    <a class="contact__btn" href="${p.linkedin}" target="_blank" rel="noopener">${ICONS.linkedin} LinkedIn</a>
    <a class="contact__btn" href="mailto:${p.email}">${ICONS.mail} Email</a>`;
  $('#footerLine').textContent = DATA.footer;
  $('#footerYear').textContent = `© ${new Date().getFullYear()} ${p.firstName} ${p.lastName} · ${p.role}`;
}

/* Copia el correo al portapapeles y muestra el estado "¡Copiado!" */
let copyTimer;
function copyEmail(el, email) {
  const done = () => {
    el.classList.add('is-copied');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => el.classList.remove('is-copied'), 2000);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(done).catch(() => legacyCopy(email, done));
  } else {
    legacyCopy(email, done);
  }
}

function legacyCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:absolute;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (_) { /* sin portapapeles */ }
  document.body.removeChild(ta);
}

/* Texto que se muestra al activar `privateCode: true` en un proyecto */
const PRIVATE_CODE_NOTE = 'Código privado de empresa — te lo cuento en una entrevista.';

/* Una tarjeta de proyecto (rejilla) */
function projectCard(pr) {
  const note = pr.privateCode ? PRIVATE_CODE_NOTE : pr.note;
  const links = [
    pr.github ? `<a class="project__link" href="${pr.github}" target="_blank" rel="noopener">${ICONS.github} Ver código</a>` : '',
    pr.demo ? `<a class="project__link" href="${pr.demo}" target="_blank" rel="noopener">${ICONS.external} Ver demo</a>` : '',
    note ? `<span class="project__note">${note}</span>` : '',
  ].filter(Boolean).join('');
  return `
    <article class="project reveal ${pr.featured ? 'project--featured' : ''}" data-category="${pr.category || ''}">
      <div class="project__head">
        ${pr.featured ? '<span class="project__badge">Destacado</span>' : ''}
        ${pr.category ? `<span class="project__cat">${pr.category}</span>` : ''}
      </div>
      <h3 class="project__title">${pr.title}</h3>
      <p class="project__context">${pr.context}</p>
      <p class="project__desc">${clean(pr.desc)}</p>
      <div class="project__tags">${pr.tags.map((t) => `<span class="project__tag">${t}</span>`).join('')}</div>
      ${links ? `<div class="project__links">${links}</div>` : ''}
    </article>`;
}

/* Filtros de categoría — se generan solos a partir de los datos */
function buildFilters() {
  const cats = [...new Set(DATA.projects.map((p) => p.category).filter(Boolean))];
  const wrap = $('#projectFilters');
  if (cats.length < 2) { wrap.remove(); return; }   // con una sola categoría no hace falta filtrar

  const all = ['Todos', ...cats];
  wrap.innerHTML = all.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" type="button" data-cat="${c}" aria-pressed="${i === 0}">${c}</button>`
  ).join('');

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    wrap.querySelectorAll('.filter-btn').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    filterProjects(btn.dataset.cat);
  });
}

function filterProjects(cat) {
  document.querySelectorAll('.project').forEach((card) => {
    const show = cat === 'Todos' || card.dataset.category === cat;
    if (hasGsap && !reducedMotion) {
      if (show) {
        card.style.display = '';
        gsap.fromTo(card, { opacity: 0, y: 16, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .4, ease: 'power2.out' });
      } else {
        gsap.to(card, { opacity: 0, y: 10, scale: .96, duration: .25, onComplete: () => { card.style.display = 'none'; } });
      }
    } else {
      card.style.display = show ? '' : 'none';
    }
  });
  if (hasGsap) ScrollTrigger.refresh();
}

/* Raíl de teselas */
function buildRail() {
  const rail = $('#rail');
  rail.innerHTML = SECTIONS.map((s) =>
    `<a href="#${s.id}" data-target="${s.id}" aria-label="Ir a ${s.label}" title="${s.label}"></a>`
  ).join('');
}

/* ════════ 3 · COREOGRAFÍA DE SCROLL ════════ */

function setupScrollStory({ strokes }) {
  /* Sin GSAP (CDN caído) o con movimiento reducido:
     mosaico completo y contenido visible desde el principio */
  if (!hasGsap || reducedMotion) {
    document.body.classList.add('no-motion');
    strokes.forEach((s) => { s.style.strokeDasharray = 'none'; });
    document.querySelectorAll('.punta').forEach((p) => p.classList.add('lit'));
    document.querySelectorAll('[data-progress]').forEach((b) => { b.style.width = `${b.dataset.progress}%`; });
    setupRailFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Scroll suave con Lenis */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new Lenis({ lerp: 0.11 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* Ahorro de CPU/batería: el bucle de animación (Lenis + ticker de GSAP) solo
     debe correr mientras hay scroll o interacción. Si la página queda quieta o la
     pestaña pasa a segundo plano, dormimos el ticker; cualquier input lo despierta.
     Antes corría a cada frame de forma indefinida (ventilador en portátil, batería
     en móvil) aunque no estuvieras haciendo nada. */
  let idleTimer;
  const sleepTicker = () => gsap.ticker.sleep();
  const wakeTicker = () => {
    gsap.ticker.wake();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(sleepTicker, 1500);
  };
  if (lenis) lenis.on('scroll', wakeTicker);
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((ev) =>
    window.addEventListener(ev, wakeTicker, { passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) sleepTicker(); else wakeTicker();
  });
  idleTimer = setTimeout(sleepTicker, 1500);

  /* Anclas (raíl + nav + botones) pasan por Lenis */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      wakeTicker();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* El mosaico se dibuja y rota a lo largo de toda la página */
  /* El guión solapa un pelín (1.02) para que los extremos cierren la costura */
  strokes.forEach((s) => {
    s.style.strokeDasharray = '1.02 1';
    s.style.strokeDashoffset = '1.02';
  });

  const master = gsap.timeline({
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
    },
  });
  master
    .to('#starGroup', { rotation: 270, svgOrigin: '300 300', ease: 'none' }, 0)
    .to(strokes, { strokeDashoffset: 0, stagger: 0.07, ease: 'none', duration: .5 }, 0);

  /* Cada sección enciende su punta (y se queda encendida) */
  const railLinks = [...document.querySelectorAll('.rail a')];
  document.querySelectorAll('.panel').forEach((panel) => {
    const i = Number(panel.dataset.index);
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => {
        document.querySelector(`.punta-${i}`)?.classList.add('lit');
        railLinks.forEach((l, j) => l.classList.toggle('active', j === i));
      },
      onEnterBack: () => railLinks.forEach((l, j) => l.classList.toggle('active', j === i)),
      onLeaveBack: () => document.querySelector(`.punta-${i}`)?.classList.remove('lit'),
    });
  });
  /* La octava punta se enciende al llegar al contacto, antes de la floración,
     para que las ocho teselas estén ya coloreadas cuando el mandala se abre */
  ScrollTrigger.create({
    trigger: '#contacto',
    start: 'top 50%',
    onEnter: () => document.querySelector('.punta-7')?.classList.add('lit'),
    onLeaveBack: () => document.querySelector('.punta-7')?.classList.remove('lit'),
  });

  /* Las tarjetas entran desde un lado alterno y se asientan en el centro,
     fundiéndose sobre el mosaico (da ritmo sin dejar el contenido en los lados) */
  document.querySelectorAll('.panel').forEach((panel) => {
    const card = panel.querySelector('.card');
    if (!card || panel.id === 'portada') return;
    const dir = Number(panel.dataset.index) % 2 === 0 ? -46 : 46;
    gsap.fromTo(card,
      { x: dir, opacity: .35 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: panel, start: 'top 78%' },
      });
  });

  /* Entradas de contenido */
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: .8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
  });

  /* Barras de progreso de "En el tajo" */
  document.querySelectorAll('[data-progress]').forEach((bar) => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      once: true,
      onEnter: () => { bar.style.width = `${bar.dataset.progress}%`; },
    });
  });

  /* El propio mosaico se desplaza de un lado a otro mientras recorres la
     página: pasa por detrás del contenido tocando un lateral y luego el otro */
  gsap.timeline({
    scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.4 },
  })
    .fromTo('.mosaic-core', { xPercent: -16 }, { xPercent: 18, ease: 'sine.inOut', duration: 1 })
    .to('.mosaic-core', { xPercent: -12, ease: 'sine.inOut', duration: 1 })
    .to('.mosaic-core', { xPercent: 0, ease: 'sine.inOut', duration: 1 });

  /* ── FINALE · EL MANDALA SE ACERCA Y GIRA ─────────────────
     Al llegar al contacto el mandala ENTERO se acerca (zoom) y gira como una
     sola pieza. Escala y giro únicos para todo -> la geometría no se desalinea,
     las líneas siguen encajando. Con el acercamiento, su círculo queda del
     tamaño del claro circular con blur y lo bordea; el contacto respira dentro.
     Animación temporizada (se reproduce al entrar) para que siempre complete. */
  const contactCard = document.querySelector('.card--contact');
  const clearing = document.querySelector('.finale-clearing');

  /* El finale es un efecto solo para pantallas grandes: el claro redondo escala
     con vmin y el contacto es más alto que ancho, así que en pantallas estrechas
     o bajas un ojo de buey circular no puede rodearlo (se desbordaría). Por eso
     se activa únicamente cuando hay sitio de sobra (ancho >=1024 y alto >=820);
     en móvil/tablet el contacto se queda como tarjeta normal sobre el mosaico.
     gsap.matchMedia activa y limpia esto solo al redimensionar. */
  gsap.matchMedia().add('(min-width: 1024px) and (min-height: 820px)', () => {
    const bloom = gsap.timeline({ paused: true });
    bloom
      /* UN factor de escala + UN giro suave para todo el mosaico. Acercamiento
         tranquilo con un giro leve que solo asienta (sin rebote). El 1.35 deja el
         círculo del mandala claramente alrededor del claro, con un anillo libre
         entre el blur y el círculo (el blur queda metido dentro). */
      .to('.mosaic-core', {
        scale: 1.35, rotation: 16, transformOrigin: '50% 50%',
        ease: 'power2.out', duration: 1.6,
      }, 0)
      /* El circulito central caería dentro del claro: se funde (quitar una línea
         no desplaza el resto del mandala) */
      .to(strokes[5], { opacity: 0, ease: 'power1.out', duration: .6 }, 0);

    ScrollTrigger.create({
      trigger: '#contacto',
      start: 'top 40%',
      onEnter: () => { bloom.play(); contactCard?.classList.add('is-bloomed'); clearing?.classList.add('is-open'); },
      onLeaveBack: () => { bloom.reverse(); contactCard?.classList.remove('is-bloomed'); clearing?.classList.remove('is-open'); },
    });

    /* Al salir de la franja "grande" (p. ej. rotar a móvil) se revierte todo */
    return () => {
      contactCard?.classList.remove('is-bloomed');
      clearing?.classList.remove('is-open');
      gsap.set('.mosaic-core', { scale: 1, rotation: 0 });
      gsap.set(strokes[5], { opacity: .85 });
    };
  });

  /* Hojas de olivo con parallax */
  document.querySelectorAll('.leaf').forEach((leaf, i) => {
    gsap.to(leaf, {
      yPercent: gsap.utils.random(-260, -120),
      rotation: gsap.utils.random(-70, 70),
      ease: 'none',
      scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.5 + i * .2 },
    });
  });
}

function buildLeaves() {
  const wrap = document.querySelector('.leaves');
  const LEAF = '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2 q 7 6 0 20 q -7 -14 0 -20z"/></svg>';
  for (let i = 0; i < 9; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.innerHTML = LEAF;
    leaf.style.left = `${(i * 11.5 + 4) % 96}%`;
    leaf.style.top = `${58 + (i % 4) * 12}%`;
    leaf.style.transform = `rotate(${(i * 47) % 360}deg) scale(${.7 + (i % 3) * .3})`;
    wrap.appendChild(leaf);
  }
}

/* Raíl sin GSAP: IntersectionObserver simple */
function setupRailFallback() {
  const railLinks = [...document.querySelectorAll('.rail a')];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = Number(e.target.dataset.index);
      railLinks.forEach((l, j) => l.classList.toggle('active', j === i));
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.panel').forEach((p) => obs.observe(p));
}

/* ════════ 4 · UI ════════ */

function startRotatingWords() {
  const el = $('#rotatingWord');
  const words = DATA.hero.rotatingWords;
  if (reducedMotion) { el.textContent = words[0]; return; }
  let wordIdx = 0, charIdx = 0, deleting = false;
  (function tick() {
    const word = words[wordIdx];
    charIdx += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIdx);
    let delay = deleting ? 35 : 65;
    if (!deleting && charIdx === word.length) { deleting = true; delay = 2200; }
    else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  })();
}

function setupTheme() {
  /* El tema inicial ya lo fija el script en línea del <head> (sin parpadeo):
     elección guardada o, en su defecto, modo claro ('dia'). Por ahora no
     seguimos al sistema operativo: la web se abre siempre en claro. */
  const root = document.documentElement;

  $('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'noche' ? 'dia' : 'noche';
    root.dataset.theme = next;
    localStorage.setItem('tema', next);
  });
}

/* ════════ INIT ════════ */
const mosaico = buildMosaico();
buildLeaves();
renderAll();
buildRail();
setupTheme();
startRotatingWords();
setupScrollStory(mosaico);
