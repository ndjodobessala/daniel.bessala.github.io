/* =========================================================
   SITE ACADÉMIQUE — DANIEL NDJODO BESSALA
   JavaScript principal
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =======================================================
     ÉLÉMENTS PRINCIPAUX
  ======================================================= */

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const langToggle = document.querySelector('.lang-toggle');
  const progress = document.querySelector('.scroll-progress span');
  const backToTop = document.querySelector('.back-to-top');

  const navAnchors = [
    ...document.querySelectorAll('.nav-links > a')
  ];

  const yearElement = document.getElementById('year');


  /* =======================================================
     ENSEIGNEMENT
     ÉLÉMENTS VOIR PLUS / VOIR MOINS
  ======================================================= */

  const coursesButton =
    document.getElementById('coursesTextBtn');

  const coursesExtra =
    document.getElementById('coursesExtra');

  const coursesLabel =
    coursesButton?.querySelector('.see-more-label');


  /* =======================================================
     TRADUCTIONS
  ======================================================= */

  const translations = {

    /*
    fr: {
      'nav.about': 'À propos',
      'nav.publications': 'Publications',
      'nav.research': 'Recherche',
      'nav.teaching': 'Enseignement',
      'nav.service': 'Service',
      'nav.contact': 'Contact'
    },

    en: {
      'nav.about': 'About',
      'nav.publications': 'Publications',
      'nav.research': 'Research',
      'nav.teaching': 'Teaching',
      'nav.service': 'Service',
      'nav.contact': 'Contact'
    }
    */

  };


  /* =======================================================
     VOIR PLUS / VOIR MOINS
  ======================================================= */

  function updateCoursesButtonLabel() {

    if (!coursesButton || !coursesLabel) {
      return;
    }

    const isOpen =
      coursesButton.getAttribute('aria-expanded') === 'true';

    const lang =
      document.documentElement.lang === 'en'
        ? 'en'
        : 'fr';

    coursesLabel.textContent =
      lang === 'en'
        ? (isOpen ? 'Show less' : 'Show more')
        : (isOpen ? 'Voir moins' : 'Voir plus');
  }


  function setCoursesState(open) {

    if (!coursesButton || !coursesExtra) {
      return;
    }

    coursesExtra.classList.toggle(
      'is-open',
      open
    );

    coursesButton.setAttribute(
      'aria-expanded',
      String(open)
    );

    coursesExtra.setAttribute(
      'aria-hidden',
      String(!open)
    );

    updateCoursesButtonLabel();
  }


  if (coursesButton && coursesExtra) {

    setCoursesState(false);

    coursesButton.addEventListener(
      'click',
      () => {

        const currentlyOpen =
          coursesButton.getAttribute('aria-expanded') === 'true';

        setCoursesState(!currentlyOpen);
      }
    );
  }


  /* =======================================================
     LANGUE
  ======================================================= */

  function setLanguage(lang) {

    const selectedLang =
      lang === 'en'
        ? 'en'
        : 'fr';

    const dict =
      translations[selectedLang] || {};

    document.documentElement.lang =
      selectedLang;

    document.documentElement.dataset.lang =
      selectedLang;


    /* Titre de la page */

    document.title =
      selectedLang === 'fr'
        ? 'Daniel Ndjodo Bessala — Enseignant-chercheur'
        : 'Daniel Ndjodo Bessala — Assistant Lecturer & Researcher';


    /* Meta description */

    const metaDescription =
      document.querySelector('meta[name="description"]');

    if (metaDescription) {

      metaDescription.setAttribute(
        'content',
        selectedLang === 'fr'
          ? "Site académique bilingue de Daniel Ndjodo Bessala, enseignant-chercheur à l'ESSTIC, Université de Yaoundé II."
          : "Bilingual academic website of Daniel Ndjodo Bessala, Assistant Lecturer and Researcher at ESSTIC, University of Yaoundé II."
      );
    }


    /* Textes */

    document
      .querySelectorAll('[data-i18n]')
      .forEach((element) => {

        const key =
          element.dataset.i18n;

        const value =
          dict[key];

        if (value !== undefined) {
          element.innerHTML = value;
        }
      });


    /* ALT */

    document
      .querySelectorAll('[data-i18n-alt]')
      .forEach((element) => {

        const key =
          element.dataset.i18nAlt;

        const value =
          dict[key];

        if (value !== undefined) {
          element.setAttribute(
            'alt',
            value
          );
        }
      });


    /* ARIA */

    document
      .querySelectorAll('[data-i18n-aria]')
      .forEach((element) => {

        const key =
          element.dataset.i18nAria;

        const value =
          dict[key];

        if (value !== undefined) {
          element.setAttribute(
            'aria-label',
            value
          );
        }
      });


    /* FR / EN */

    document
      .querySelector('.lang-fr')
      ?.classList.toggle(
        'active',
        selectedLang === 'fr'
      );

    document
      .querySelector('.lang-en')
      ?.classList.toggle(
        'active',
        selectedLang === 'en'
      );


    langToggle?.setAttribute(
      'aria-label',
      selectedLang === 'fr'
        ? 'Switch to English'
        : 'Passer en français'
    );

    langToggle?.setAttribute(
      'title',
      selectedLang === 'fr'
        ? 'English'
        : 'Français'
    );


    menuToggle?.setAttribute(
      'aria-label',
      selectedLang === 'fr'
        ? 'Ouvrir le menu'
        : 'Open menu'
    );


    themeToggle?.setAttribute(
      'aria-label',
      selectedLang === 'fr'
        ? 'Changer de thème'
        : 'Change theme'
    );

    themeToggle?.setAttribute(
      'title',
      selectedLang === 'fr'
        ? 'Changer de thème'
        : 'Change theme'
    );


    backToTop?.setAttribute(
      'aria-label',
      selectedLang === 'fr'
        ? 'Retour en haut'
        : 'Back to top'
    );


    updateCoursesButtonLabel();


    try {

      localStorage.setItem(
        'daniel-lang',
        selectedLang
      );

    } catch (error) {

      /* Non bloquant */

    }
  }


  /* =======================================================
     MENU MOBILE
  ======================================================= */

  menuToggle?.addEventListener(
    'click',
    () => {

      if (!navLinks) {
        return;
      }

      const open =
        navLinks.classList.toggle('open');

      menuToggle.setAttribute(
        'aria-expanded',
        String(open)
      );
    }
  );


  navAnchors.forEach((link) => {

    link.addEventListener(
      'click',
      () => {

        navLinks?.classList.remove('open');

        menuToggle?.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    );
  });


  /* =======================================================
     THÈME CLAIR / SOMBRE
  ======================================================= */

  let savedTheme = null;

  try {

    savedTheme =
      localStorage.getItem('daniel-theme');

  } catch (error) {

    savedTheme = null;

  }


  if (
    savedTheme === 'dark' ||
    savedTheme === 'light'
  ) {

    document.documentElement.dataset.theme =
      savedTheme;
  }


  themeToggle?.addEventListener(
    'click',
    () => {

      const currentTheme =
        document.documentElement.dataset.theme;

      const nextTheme =
        currentTheme === 'dark'
          ? 'light'
          : 'dark';

      document.documentElement.dataset.theme =
        nextTheme;

      try {

        localStorage.setItem(
          'daniel-theme',
          nextTheme
        );

      } catch (error) {

        /* Non bloquant */

      }
    }
  );


  /* =======================================================
     INITIALISATION DE LA LANGUE
  ======================================================= */

  let savedLang = null;

  try {

    savedLang =
      localStorage.getItem('daniel-lang');

  } catch (error) {

    savedLang = null;

  }


  const browserLang =
    navigator.language
      ?.toLowerCase()
      .startsWith('fr')
        ? 'fr'
        : 'en';


  const initialLang =
    savedLang === 'fr' ||
    savedLang === 'en'
      ? savedLang
      : browserLang;


  setLanguage(initialLang);


  langToggle?.addEventListener(
    'click',
    () => {

      const newLang =
        document.documentElement.lang === 'fr'
          ? 'en'
          : 'fr';

      setLanguage(newLang);
    }
  );


  /* =======================================================
     BARRE DE PROGRESSION
     +
     NAVIGATION ACTIVE
  ======================================================= */

  function onScroll() {

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const ratio =
      scrollable > 0
        ? Math.min(
            100,
            Math.max(
              0,
              (window.scrollY / scrollable) * 100
            )
          )
        : 0;

    if (progress) {
      progress.style.width =
        `${ratio}%`;
    }


    backToTop?.classList.toggle(
      'visible',
      window.scrollY > 450
    );


    const sections = [
      ...document.querySelectorAll('.section-anchor')
    ];

    let current = 'about';

    sections.forEach(
      (section) => {

        if (
          window.scrollY >=
          section.offsetTop - 130
        ) {

          current =
            section.id;
        }
      }
    );


    navAnchors.forEach(
      (link) => {

        const href =
          link.getAttribute('href');

        if (
          !href ||
          !href.startsWith('#')
        ) {
          return;
        }

        const target =
          href.slice(1);

        const active =
          target === current ||
          (
            target === 'publications' &&
            current === 'news'
          );

        link.classList.toggle(
          'active',
          active
        );
      }
    );
  }


  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );

  onScroll();


  /* =======================================================
     ANNÉE AUTOMATIQUE
  ======================================================= */

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     RETOUR EN HAUT
  ======================================================= */

  backToTop?.addEventListener(
    'click',
    (event) => {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      if (history.replaceState) {

        history.replaceState(
          null,
          '',
          window.location.pathname +
          window.location.search
        );
      }
    }
  );


  /* =======================================================
     GALERIE PHOTOS
     DÉFILEMENT AUTOMATIQUE TOUTES LES 20 SECONDES
  ======================================================= */

  const photoSlides = [
    ...document.querySelectorAll('.photo-slide')
  ];

  const photoPrev =
    document.querySelector('.photo-prev');

  const photoNext =
    document.querySelector('.photo-next');

  const photoDotsContainer =
    document.querySelector('.photo-dots');


  let currentPhoto = 0;
  let photoTimer = null;


  /* -------------------------------------------------------
     Afficher une photo
  ------------------------------------------------------- */

  function showPhoto(index) {

    if (!photoSlides.length) {
      return;
    }

    if (index >= photoSlides.length) {
      index = 0;
    }

    if (index < 0) {
      index = photoSlides.length - 1;
    }

    currentPhoto = index;


    photoSlides.forEach(
      (slide, slideIndex) => {

        slide.classList.toggle(
          'active',
          slideIndex === currentPhoto
        );
      }
    );


    const dots = [
      ...document.querySelectorAll('.photo-dot')
    ];

    dots.forEach(
      (dot, dotIndex) => {

        dot.classList.toggle(
          'active',
          dotIndex === currentPhoto
        );

        dot.setAttribute(
          'aria-current',
          dotIndex === currentPhoto
            ? 'true'
            : 'false'
        );
      }
    );
  }


  /* -------------------------------------------------------
     Photo suivante
  ------------------------------------------------------- */

  function nextPhoto() {

    showPhoto(
      currentPhoto + 1
    );
  }


  /* -------------------------------------------------------
     Photo précédente
  ------------------------------------------------------- */

  function previousPhoto() {

    showPhoto(
      currentPhoto - 1
    );
  }


  /* -------------------------------------------------------
     Démarrer le défilement automatique
  ------------------------------------------------------- */

  function startPhotoTimer() {

    if (photoSlides.length <= 1) {
      return;
    }

    clearInterval(photoTimer);

    photoTimer =
      setInterval(
        nextPhoto,
        20000
      );
  }


  /* -------------------------------------------------------
     Redémarrer le compteur
  ------------------------------------------------------- */

  function restartPhotoTimer() {

    clearInterval(photoTimer);

    startPhotoTimer();
  }


  /* -------------------------------------------------------
     Création automatique des points de navigation
  ------------------------------------------------------- */

  if (
    photoSlides.length > 0 &&
    photoDotsContainer
  ) {

    photoDotsContainer.innerHTML = '';

    photoSlides.forEach(
      (_, index) => {

        const dot =
          document.createElement('button');

        dot.type = 'button';

        dot.className =
          index === 0
            ? 'photo-dot active'
            : 'photo-dot';

        dot.setAttribute(
          'aria-label',
          `Afficher la photo ${index + 1}`
        );

        dot.setAttribute(
          'aria-current',
          index === 0
            ? 'true'
            : 'false'
        );

        dot.addEventListener(
          'click',
          () => {

            showPhoto(index);

            restartPhotoTimer();
          }
        );

        photoDotsContainer.appendChild(dot);
      }
    );
  }


  /* -------------------------------------------------------
     Bouton suivant
  ------------------------------------------------------- */

  photoNext?.addEventListener(
    'click',
    () => {

      nextPhoto();

      restartPhotoTimer();
    }
  );


  /* -------------------------------------------------------
     Bouton précédent
  ------------------------------------------------------- */

  photoPrev?.addEventListener(
    'click',
    () => {

      previousPhoto();

      restartPhotoTimer();
    }
  );


  /* -------------------------------------------------------
     Pause quand l'onglet n'est pas visible
  ------------------------------------------------------- */

  document.addEventListener(
    'visibilitychange',
    () => {

      if (document.hidden) {

        clearInterval(photoTimer);

      } else {

        restartPhotoTimer();

      }
    }
  );


  /* -------------------------------------------------------
     Initialisation de la galerie
  ------------------------------------------------------- */

  if (photoSlides.length > 0) {

    showPhoto(0);

    startPhotoTimer();
  }

});