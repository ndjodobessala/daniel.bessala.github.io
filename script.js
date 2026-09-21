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
    =========================================================
    FRANÇAIS
    =========================================================

    fr: {

      'nav.about': 'À propos',
      'nav.publications': 'Publications',
      'nav.research': 'Recherche',
      'nav.teaching': 'Enseignement',
      'nav.service': 'Service',
      'nav.contact': 'Contact',

      'hero.interests':
        'Inégalités numériques <span>·</span> Participation politique <span>·</span> Communication scientifique',

      'profile.photoAlt':
        "Daniel Ndjodo Bessala en situation d'enseignement",

      'profile.role':
        'Enseignant-chercheur · Assistant',

      'profile.affiliation':
        'ESSTIC · Université de Yaoundé II',

      'profile.location':
        'Yaoundé, Cameroun',

      'teaching.title':
        'Enseignement',

      'teaching.coursesTitle':
        'Unités d’enseignement',

      'teaching.supervisionTitle':
        'Encadrement',

      'teaching.resourcesTitle':
        'Ressources pédagogiques',

      'career.title':
        'Parcours académique & service',

      'contact.title':
        'Contact',

      'backTop':
        'Retour en haut'
    },


    =========================================================
    ENGLISH
    =========================================================

    en: {

      'nav.about': 'About',
      'nav.publications': 'Publications',
      'nav.research': 'Research',
      'nav.teaching': 'Teaching',
      'nav.service': 'Service',
      'nav.contact': 'Contact',

      'hero.interests':
        'Digital inequalities <span>·</span> Political participation <span>·</span> Science communication',

      'profile.photoAlt':
        'Daniel Ndjodo Bessala teaching',

      'profile.role':
        'Assistant Lecturer & Researcher',

      'profile.affiliation':
        'ESSTIC · University of Yaoundé II',

      'profile.location':
        'Yaoundé, Cameroon',

      'teaching.title':
        'Teaching',

      'teaching.coursesTitle':
        'Courses',

      'teaching.supervisionTitle':
        'Supervision',

      'teaching.resourcesTitle':
        'Teaching resources',

      'career.title':
        'Academic background & service',

      'contact.title':
        'Contact',

      'backTop':
        'Back to top'
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


    if (lang === 'en') {

      coursesLabel.textContent =
        isOpen
          ? 'Show less'
          : 'Show more';

    } else {

      coursesLabel.textContent =
        isOpen
          ? 'Voir moins'
          : 'Voir plus';

    }

  }


  function setCoursesState(open) {

    if (!coursesButton || !coursesExtra) {
      return;
    }


    /*
      Ajoute ou retire la classe CSS .is-open
    */

    coursesExtra.classList.toggle(
      'is-open',
      open
    );


    /*
      Accessibilité du bouton
    */

    coursesButton.setAttribute(
      'aria-expanded',
      String(open)
    );


    /*
      Accessibilité du contenu
    */

    coursesExtra.setAttribute(
      'aria-hidden',
      String(!open)
    );


    /*
      Met à jour Voir plus / Voir moins
    */

    updateCoursesButtonLabel();

  }


  /*
    Initialisation du bouton
  */

  if (coursesButton && coursesExtra) {

    setCoursesState(false);


    coursesButton.addEventListener(
      'click',
      () => {

        const currentlyOpen =
          coursesButton.getAttribute(
            'aria-expanded'
          ) === 'true';


        setCoursesState(
          !currentlyOpen
        );

      }
    );

  }


  /* =======================================================
     LANGUE
  ======================================================= */

  function setLanguage(lang) {

    /*
      On sécurise la valeur.
      Toute valeur autre que "en" devient "fr".
    */

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
       TITRE DE LA PAGE
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
       TEXTES data-i18n
    ----------------------------------------------------- */

    document
      .querySelectorAll('[data-i18n]')
      .forEach((element) => {

        const key =
          element.dataset.i18n;

        const value =
          dict[key];


        /*
          On ne remplace le contenu que si une traduction
          existe réellement.

          Cela évite d'effacer tes textes actuels lorsque
          l'objet translations est encore vide.
        */

        if (value !== undefined) {

          element.innerHTML =
            value;

        }

      });


    /* -----------------------------------------------------
       ALT DES IMAGES
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       ATTRIBUTS ARIA
    ----------------------------------------------------- */

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
       BOUTON DE LANGUE
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


    /* -----------------------------------------------------
       VOIR PLUS / VOIR MOINS
    ----------------------------------------------------- */

    updateCoursesButtonLabel();


    /* -----------------------------------------------------
       SAUVEGARDE
    ----------------------------------------------------- */

    try {

      localStorage.setItem(
        'daniel-lang',
        selectedLang
      );

    } catch (error) {

      /*
        Si localStorage n'est pas disponible,
        le site continue de fonctionner.
      */

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


  /*
    Fermer le menu lorsqu'on clique
    sur un lien de navigation.
  */

  navAnchors.forEach((link) => {

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

  });


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


  /*
    Applique le thème sauvegardé.
  */

  if (
    savedTheme === 'dark' ||
    savedTheme === 'light'
  ) {

    document.documentElement.dataset.theme =
      savedTheme;

  }


  /*
    Changement de thème.
  */

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

        /*
          Non bloquant.
        */

      }

    }
  );


  /* =======================================================
     INITIALISATION DE LA LANGUE
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


  /*
    Détection de la langue du navigateur.
  */

  const browserLang =
    navigator.language
      ?.toLowerCase()
      .startsWith('fr')

      ? 'fr'
      : 'en';


  /*
    Priorité :
    1. langue sauvegardée
    2. langue du navigateur
  */

  const initialLang =

    savedLang === 'fr' ||
    savedLang === 'en'

      ? savedLang
      : browserLang;


  /*
    IMPORTANT :

    setLanguage est appelé ici,
    APRÈS la déclaration de coursesButton,
    coursesExtra et coursesLabel.

    Cela supprime le conflit présent
    dans ton ancienne version.
  */

  setLanguage(
    initialLang
  );


  /*
    Changement FR / EN
  */

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
     BARRE DE PROGRESSION
     +
     NAVIGATION ACTIVE
  ======================================================= */

  function onScroll() {

    /* -----------------------------------------------------
       BARRE DE PROGRESSION
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       RETOUR EN HAUT
    ----------------------------------------------------- */

    backToTop?.classList.toggle(

      'visible',

      window.scrollY > 450

    );


    /* -----------------------------------------------------
       SECTION ACTIVE
    ----------------------------------------------------- */

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


    /*
      Active le bon lien dans la navigation.
    */

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


        /*
          La section "news" est rattachée
          au lien Publications.
        */

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


  /*
    Écoute du scroll.
  */

  window.addEventListener(

    'scroll',

    onScroll,

    {
      passive: true
    }

  );


  /*
    Exécution initiale.
  */

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


      /*
        Évite de laisser #top
        dans l'adresse du navigateur.
      */

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

});