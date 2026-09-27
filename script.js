/* =========================================================
   SITE ACADÉMIQUE — DANIEL NDJODO BESSALA
   JavaScript principal
========================================================= */

document.addEventListener('DOMContentLoaded', () => {


  /* =======================================================
     ÉLÉMENTS PRINCIPAUX
  ======================================================= */

  const menuToggle =
    document.querySelector('.menu-toggle');

  const navLinks =
    document.querySelector('.nav-links');

  const themeToggle =
    document.querySelector('.theme-toggle');

  const langToggle =
    document.querySelector('.lang-toggle');

  const progress =
    document.querySelector('.scroll-progress span');

  const backToTop =
    document.querySelector('.back-to-top');


  const navAnchors = [
    ...document.querySelectorAll('.nav-links > a')
  ];


  const yearElement =
    document.getElementById('year');



  /* =======================================================
     ACTIVITÉS ACADÉMIQUES
     VOIR PLUS / VOIR MOINS
  ======================================================= */

  const academicButtons = [
    ...document.querySelectorAll('.academic-toggle')
  ];



  /* =======================================================
     TRADUCTIONS
  ======================================================= */

  const translations = {

    /*
    fr: {

      'nav.about': 'À propos',
      'nav.publications': 'Publications',
      'nav.research': 'Recherche',
      'nav.academic': 'Activités académiques',
      'nav.service': 'Service',
      'nav.contact': 'Contact'

    },


    en: {

      'nav.about': 'About',
      'nav.publications': 'Publications',
      'nav.research': 'Research',
      'nav.academic': 'Academic activities',
      'nav.service': 'Service',
      'nav.contact': 'Contact'

    }
    */

  };



  /* =======================================================
     VOIR PLUS / VOIR MOINS
  ======================================================= */

  function updateAcademicButtonLabel(button) {


    const label =
      button?.querySelector('.see-more-label');


    if (!button || !label) {
      return;
    }


    const isOpen =
      button.getAttribute('aria-expanded') === 'true';


    const lang =
      document.documentElement.lang === 'en'
        ? 'en'
        : 'fr';


    label.textContent =

      lang === 'en'

        ? (
            isOpen
              ? 'Show less'
              : 'Show more'
          )

        : (
            isOpen
              ? 'Voir moins'
              : 'Voir plus'
          );


  }



  function updateAcademicButtonLabels() {


    academicButtons.forEach(
      (button) => {

        updateAcademicButtonLabel(
          button
        );

      }
    );


  }



  function setAcademicState(
    button,
    open
  ) {


    if (!button) {
      return;
    }


    const targetId =
      button.dataset.target;


    const content =
      document.getElementById(
        targetId
      );


    if (!content) {
      return;
    }


    content.classList.toggle(
      'is-open',
      open
    );


    content.setAttribute(
      'aria-hidden',
      String(!open)
    );


    button.setAttribute(
      'aria-expanded',
      String(open)
    );


    button
      .closest('.academic-block')
      ?.classList.toggle(
        'is-expanded',
        open
      );


    updateAcademicButtonLabel(
      button
    );


  }



  academicButtons.forEach(
    (button) => {


      setAcademicState(
        button,
        false
      );


      button.addEventListener(
        'click',
        () => {


          const isOpen =
            button.getAttribute(
              'aria-expanded'
            ) === 'true';


          setAcademicState(
            button,
            !isOpen
          );


        }
      );


    }
  );



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



    /* -----------------------------------------------------
       TITRE
    ----------------------------------------------------- */

    document.title =

      selectedLang === 'fr'

        ? 'Daniel Ndjodo Bessala — Enseignant-chercheur'

        : 'Daniel Ndjodo Bessala — Assistant Lecturer & Researcher';



    /* -----------------------------------------------------
       META DESCRIPTION
    ----------------------------------------------------- */

    const metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );


    if (metaDescription) {


      metaDescription.setAttribute(

        'content',

        selectedLang === 'fr'

          ? "Site académique bilingue de Daniel Ndjodo Bessala, enseignant-chercheur à l'ESSTIC, Université de Yaoundé II."

          : "Bilingual academic website of Daniel Ndjodo Bessala, Assistant Lecturer and Researcher at ESSTIC, University of Yaoundé II."

      );


    }



    /* -----------------------------------------------------
       TEXTES
    ----------------------------------------------------- */

    document
      .querySelectorAll('[data-i18n]')
      .forEach(
        (element) => {


          const key =
            element.dataset.i18n;


          const value =
            dict[key];


          if (
            value !== undefined
          ) {

            element.innerHTML =
              value;

          }


        }
      );



    /* -----------------------------------------------------
       ALT
    ----------------------------------------------------- */

    document
      .querySelectorAll('[data-i18n-alt]')
      .forEach(
        (element) => {


          const key =
            element.dataset.i18nAlt;


          const value =
            dict[key];


          if (
            value !== undefined
          ) {

            element.setAttribute(
              'alt',
              value
            );

          }


        }
      );



    /* -----------------------------------------------------
       ARIA
    ----------------------------------------------------- */

    document
      .querySelectorAll('[data-i18n-aria]')
      .forEach(
        (element) => {


          const key =
            element.dataset.i18nAria;


          const value =
            dict[key];


          if (
            value !== undefined
          ) {

            element.setAttribute(
              'aria-label',
              value
            );

          }


        }
      );



    /* -----------------------------------------------------
       INDICATEUR FR / EN
    ----------------------------------------------------- */

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



    /* -----------------------------------------------------
       LANGUE
    ----------------------------------------------------- */

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



    /* -----------------------------------------------------
       MENU MOBILE
    ----------------------------------------------------- */

    menuToggle?.setAttribute(

      'aria-label',

      selectedLang === 'fr'
        ? 'Ouvrir le menu'
        : 'Open menu'

    );



    /* -----------------------------------------------------
       THÈME
    ----------------------------------------------------- */

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



    /* -----------------------------------------------------
       RETOUR EN HAUT
    ----------------------------------------------------- */

    backToTop?.setAttribute(

      'aria-label',

      selectedLang === 'fr'
        ? 'Retour en haut'
        : 'Back to top'

    );



    updateAcademicButtonLabels();



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
        navLinks.classList.toggle(
          'open'
        );


      menuToggle.setAttribute(
        'aria-expanded',
        String(open)
      );


    }
  );



  navAnchors.forEach(
    (link) => {


      link.addEventListener(
        'click',
        () => {


          navLinks?.classList.remove(
            'open'
          );


          menuToggle?.setAttribute(
            'aria-expanded',
            'false'
          );


        }
      );


    }
  );



  /* =======================================================
     THÈME CLAIR / SOMBRE
  ======================================================= */

  let savedTheme = null;


  try {


    savedTheme =
      localStorage.getItem(
        'daniel-theme'
      );


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
     INITIALISATION LANGUE
  ======================================================= */

  let savedLang = null;


  try {


    savedLang =
      localStorage.getItem(
        'daniel-lang'
      );


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



  setLanguage(
    initialLang
  );



  langToggle?.addEventListener(
    'click',
    () => {


      const newLang =

        document.documentElement.lang === 'fr'

          ? 'en'

          : 'fr';


      setLanguage(
        newLang
      );


    }
  );



  /* =======================================================
     SCROLL
     PROGRESSION
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
              (
                window.scrollY /
                scrollable
              ) * 100
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
      ...document.querySelectorAll(
        '.section-anchor'
      )
    ];


    let current =
      'about';



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
          link.getAttribute(
            'href'
          );


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
    {
      passive: true
    }
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


    }
  );



  /* =======================================================
     GALERIE PHOTOS
     20 SECONDES
  ======================================================= */

  const photoSlides = [
    ...document.querySelectorAll(
      '.photo-slide'
    )
  ];


  const photoPrev =
    document.querySelector(
      '.photo-prev'
    );


  const photoNext =
    document.querySelector(
      '.photo-next'
    );


  const photoDotsContainer =
    document.querySelector(
      '.photo-dots'
    );


  let currentPhoto =
    0;


  let photoTimer =
    null;



  /* -------------------------------------------------------
     AFFICHER UNE PHOTO
  ------------------------------------------------------- */

  function showPhoto(index) {


    if (!photoSlides.length) {
      return;
    }


    if (
      index >=
      photoSlides.length
    ) {

      index = 0;

    }


    if (index < 0) {

      index =
        photoSlides.length - 1;

    }


    currentPhoto =
      index;



    photoSlides.forEach(
      (slide, slideIndex) => {


        slide.classList.toggle(
          'active',
          slideIndex === currentPhoto
        );


      }
    );



    const dots = [
      ...document.querySelectorAll(
        '.photo-dot'
      )
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



  function nextPhoto() {


    showPhoto(
      currentPhoto + 1
    );


  }



  function previousPhoto() {


    showPhoto(
      currentPhoto - 1
    );


  }



  function startPhotoTimer() {


    if (
      photoSlides.length <= 1
    ) {

      return;

    }


    clearInterval(
      photoTimer
    );


    photoTimer =
      setInterval(
        nextPhoto,
        20000
      );


  }



  function restartPhotoTimer() {


    clearInterval(
      photoTimer
    );


    startPhotoTimer();


  }



  /* -------------------------------------------------------
     POINTS
  ------------------------------------------------------- */

  if (
    photoSlides.length > 0 &&
    photoDotsContainer
  ) {


    photoDotsContainer.innerHTML =
      '';


    photoSlides.forEach(
      (_, index) => {


        const dot =
          document.createElement(
            'button'
          );


        dot.type =
          'button';


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


            showPhoto(
              index
            );


            restartPhotoTimer();


          }
        );


        photoDotsContainer.appendChild(
          dot
        );


      }
    );


  }



  /* -------------------------------------------------------
     FLÈCHES
  ------------------------------------------------------- */

  photoNext?.addEventListener(
    'click',
    () => {


      nextPhoto();


      restartPhotoTimer();


    }
  );


  photoPrev?.addEventListener(
    'click',
    () => {


      previousPhoto();


      restartPhotoTimer();


    }
  );



  /* -------------------------------------------------------
     PAUSE ONGLET MASQUÉ
  ------------------------------------------------------- */

  document.addEventListener(
    'visibilitychange',
    () => {


      if (document.hidden) {


        clearInterval(
          photoTimer
        );


      } else {


        restartPhotoTimer();


      }


    }
  );



  /* -------------------------------------------------------
     INITIALISATION
  ------------------------------------------------------- */

  if (
    photoSlides.length > 0
  ) {


    showPhoto(0);


    startPhotoTimer();


  }


});