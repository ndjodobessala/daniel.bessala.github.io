const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const langToggle = document.querySelector('.lang-toggle');
const progress = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');
const navAnchors = [...document.querySelectorAll('.nav-links > a')];

const translations = {
  fr: {
    'nav.about': 'À propos', 'nav.publications': 'Publications', 'nav.research': 'Recherche', 'nav.teaching': 'Enseignement', 'nav.service': 'Service', 'nav.contact': 'Contact',
    'hero.interests': 'Sciences du numérique <span>·</span> Usages et inégalités numériques <span>·</span> Systèmes numériques <span>·</span> Numérique & société',
    'profile.photoAlt': "Daniel Ndjodo Bessala en situation d'enseignement", 'profile.role': 'Enseignant-chercheur · Assistant', 'profile.affiliation': 'ESTIC · Université de Yaoundé II', 'profile.location': 'Yaoundé, Cameroun',
    'bio.lead': 'Je suis <strong>enseignant-chercheur (assistant)</strong> à l’ESTIC, une école de l’Université de Yaoundé II au Cameroun.',
    'bio.p1': 'Mon parcours scientifique s’inscrit entre le Cameroun et la France. Après un doctorat à l’Université de Yaoundé, j’ai poursuivi mes activités de recherche au Laboratoire d’Informatique de Grenoble au sein de l’équipe <strong>KrakOS</strong>. J’ai également été chercheur invité à INRIA / IRISA, Université de Rennes, et effectué des séjours académiques à l’École Normale Supérieure de Lyon.',
    'bio.p2': 'Mes travaux s’intéressent aux transformations numériques, aux usages des technologies et aux problématiques sociales qui leur sont associées. Ce site présente mes activités de recherche, d’enseignement, mes productions scientifiques, mes collaborations et mon parcours académique.',
    'bio.interests': '<strong>Intérêts de recherche :</strong> sciences du numérique · usages et inégalités numériques · systèmes numériques · numérique et société.', 'bio.moreLabel': 'Plus d’informations :', 'bio.cvLink': 'consulter mon CV académique',
    'news.title': 'Dernières nouvelles', 'news.n1': 'Recrutement comme <strong>enseignant-chercheur (assistant)</strong> à l’ESTIC, Université de Yaoundé II, Cameroun.', 'news.n2': 'Début d’un postdoctorat au <strong>Laboratoire d’Informatique de Grenoble</strong>, au sein de l’équipe KrakOS.', 'news.n3': 'Séjour scientifique comme <strong>chercheur invité</strong> à INRIA / IRISA, Université de Rennes, France.', 'news.n4': 'Séjour académique à l’École Normale Supérieure de Lyon, France.',
    'pub.title': 'Publications sélectionnées', 'pub.note': 'La liste bibliographique détaillée n’apparaît pas dans le CV transmis. Les emplacements ci-dessous sont prêts à être remplacés par vos publications réelles.', 'pub.p1title': 'Titre de votre publication principale', 'pub.p1authors': '<strong>Daniel Ndjodo Bessala</strong>, co-auteurs', 'pub.p1venue': '<em>Nom de la revue ou conférence</em>, année.', 'pub.p2title': 'Titre d’une communication ou d’un article de conférence', 'pub.p2authors': '<strong>Daniel Ndjodo Bessala</strong>, co-auteurs', 'pub.p2venue': '<em>Nom de la conférence</em>, année.', 'pub.moreTitle': 'Ajouter vos autres publications', 'pub.moreText': 'La structure reprend le format académique compact du site de référence.',
    'research.title': 'Axes de recherche', 'research.r1title': 'Usages & inégalités numériques', 'research.r1text': 'Étude des différences d’accès, d’usage et d’appropriation des technologies numériques, ainsi que de leurs effets sur les individus et les groupes sociaux.', 'research.r2title': 'Systèmes numériques', 'research.r2text': 'Analyse des environnements numériques, de leurs infrastructures et de leurs interactions avec les usages et les pratiques.', 'research.r3title': 'Numérique & société', 'research.r3text': 'Approche interdisciplinaire des transformations sociales, organisationnelles et institutionnelles produites ou accompagnées par le numérique.',
    'teaching.title': 'Enseignement', 'teaching.coursesTitle': 'Unités d’enseignement', 'teaching.coursesText': 'Cette rubrique accueillera les cours assurés à l’ESTIC : intitulé, niveau, semestre, volume horaire et objectifs pédagogiques.', 'teaching.supervisionTitle': 'Encadrement', 'teaching.supervisionText': 'Mémoires, stages, projets tutorés et travaux de recherche des étudiants pourront être présentés ici.', 'teaching.resourcesTitle': 'Ressources pédagogiques', 'teaching.resourcesText': 'Supports de cours, syllabus, exercices, bibliographies et ressources numériques pourront être mis à disposition.',
    'career.title': 'Parcours académique & service', 'career.experience': 'Expérience', 'career.e1role': 'Enseignant-chercheur (assistant)', 'career.e1place': 'ESTIC · Université de Yaoundé II, Cameroun', 'career.e2role': 'Postdoctorant', 'career.e2place': 'Laboratoire d’Informatique de Grenoble · équipe KrakOS', 'career.e3role': 'Chercheur invité', 'career.e3place': 'INRIA / IRISA · Université de Rennes, France', 'career.e4role': 'Séjours académiques', 'career.e4place': 'École Normale Supérieure de Lyon, France', 'career.education': 'Formation', 'career.d1': 'Doctorat', 'career.d1place': 'Université de Yaoundé, Cameroun', 'career.d2': 'Master', 'career.d2place': 'Université de Yaoundé, Cameroun', 'career.d3': 'Licence', 'career.d3place': 'Université de Yaoundé, Cameroun', 'career.d4': 'Baccalauréat',
    'contact.title': 'Contact', 'contact.text': 'Pour toute discussion scientifique, proposition de collaboration, encadrement ou activité académique, vous pouvez me contacter par email ou via LinkedIn.', 'contact.email': 'Écrire un email', 'contact.cv': 'Télécharger le CV', 'footer.affiliation': 'ESTIC · Université de Yaoundé II · Cameroun', 'backTop': 'Retour en haut'
  },
  en: {
    'nav.about': 'About', 'nav.publications': 'Publications', 'nav.research': 'Research', 'nav.teaching': 'Teaching', 'nav.service': 'Service', 'nav.contact': 'Contact',
    'hero.interests': 'Digital sciences <span>·</span> Digital uses & inequalities <span>·</span> Digital systems <span>·</span> Digital technology & society',
    'profile.photoAlt': 'Daniel Ndjodo Bessala teaching in a classroom', 'profile.role': 'Assistant Lecturer & Researcher', 'profile.affiliation': 'ESTIC · University of Yaoundé II', 'profile.location': 'Yaoundé, Cameroon',
    'bio.lead': 'I am an <strong>Assistant Lecturer and Researcher</strong> at ESTIC, a school of the University of Yaoundé II in Cameroon.',
    'bio.p1': 'My academic path spans Cameroon and France. After completing a PhD at the University of Yaoundé, I continued my research activities at the Grenoble Informatics Laboratory within the <strong>KrakOS</strong> team. I was also a visiting researcher at INRIA / IRISA, University of Rennes, and completed academic stays at École Normale Supérieure de Lyon.',
    'bio.p2': 'My research focuses on digital transformations, technology use, and the social issues associated with them. This website presents my research and teaching activities, scientific outputs, collaborations, and academic background.',
    'bio.interests': '<strong>Research interests:</strong> digital sciences · digital uses and inequalities · digital systems · digital technology and society.', 'bio.moreLabel': 'More information:', 'bio.cvLink': 'view my academic CV',
    'news.title': 'Latest news', 'news.n1': 'Joined ESTIC, University of Yaoundé II, Cameroon, as an <strong>Assistant Lecturer and Researcher</strong>.', 'news.n2': 'Started a postdoctoral position at the <strong>Grenoble Informatics Laboratory</strong> within the KrakOS team.', 'news.n3': 'Research stay as a <strong>visiting researcher</strong> at INRIA / IRISA, University of Rennes, France.', 'news.n4': 'Academic stay at École Normale Supérieure de Lyon, France.',
    'pub.title': 'Selected publications', 'pub.note': 'The CV provided does not include a detailed publication list. The entries below are placeholders ready to be replaced with your actual publications.', 'pub.p1title': 'Title of your main publication', 'pub.p1authors': '<strong>Daniel Ndjodo Bessala</strong>, co-authors', 'pub.p1venue': '<em>Journal or conference name</em>, year.', 'pub.p2title': 'Title of a conference paper or communication', 'pub.p2authors': '<strong>Daniel Ndjodo Bessala</strong>, co-authors', 'pub.p2venue': '<em>Conference name</em>, year.', 'pub.moreTitle': 'Add your other publications', 'pub.moreText': 'This section follows the compact academic format used by the reference website.',
    'research.title': 'Research areas', 'research.r1title': 'Digital uses & inequalities', 'research.r1text': 'Study of differences in access to, use of, and appropriation of digital technologies, as well as their effects on individuals and social groups.', 'research.r2title': 'Digital systems', 'research.r2text': 'Analysis of digital environments, their infrastructures, and their interactions with uses and practices.', 'research.r3title': 'Digital technology & society', 'research.r3text': 'An interdisciplinary approach to the social, organizational, and institutional transformations produced or supported by digital technologies.',
    'teaching.title': 'Teaching', 'teaching.coursesTitle': 'Courses', 'teaching.coursesText': 'This section will present the courses taught at ESTIC, including title, level, semester, teaching hours, and learning objectives.', 'teaching.supervisionTitle': 'Supervision', 'teaching.supervisionText': 'Student dissertations, internships, supervised projects, and research work can be listed here.', 'teaching.resourcesTitle': 'Teaching resources', 'teaching.resourcesText': 'Course materials, syllabi, exercises, bibliographies, and digital resources can be made available here.',
    'career.title': 'Academic background & service', 'career.experience': 'Experience', 'career.e1role': 'Assistant Lecturer & Researcher', 'career.e1place': 'ESTIC · University of Yaoundé II, Cameroon', 'career.e2role': 'Postdoctoral Researcher', 'career.e2place': 'Grenoble Informatics Laboratory · KrakOS team', 'career.e3role': 'Visiting Researcher', 'career.e3place': 'INRIA / IRISA · University of Rennes, France', 'career.e4role': 'Academic stays', 'career.e4place': 'École Normale Supérieure de Lyon, France', 'career.education': 'Education', 'career.d1': 'PhD', 'career.d1place': 'University of Yaoundé, Cameroon', 'career.d2': "Master's degree", 'career.d2place': 'University of Yaoundé, Cameroon', 'career.d3': "Bachelor's degree", 'career.d3place': 'University of Yaoundé, Cameroon', 'career.d4': 'Baccalaureate',
    'contact.title': 'Contact', 'contact.text': 'For research discussions, collaboration opportunities, supervision, or academic activities, feel free to contact me by email or through LinkedIn.', 'contact.email': 'Send an email', 'contact.cv': 'Download CV', 'footer.affiliation': 'ESTIC · University of Yaoundé II · Cameroon', 'backTop': 'Back to top'
  }
};

function setLanguage(lang) {
  const dict = translations[lang] || translations.fr;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.title = lang === 'fr' ? 'Daniel Ndjodo Bessala — Enseignant-chercheur' : 'Daniel Ndjodo Bessala — Assistant Lecturer & Researcher';
  document.querySelector('meta[name="description"]').setAttribute('content', lang === 'fr' ? "Site académique bilingue de Daniel Ndjodo Bessala, enseignant-chercheur à l'ESTIC, Université de Yaoundé II." : 'Bilingual academic website of Daniel Ndjodo Bessala, Assistant Lecturer and Researcher at ESTIC, University of Yaoundé II.');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const value = dict[el.dataset.i18nAlt];
    if (value !== undefined) el.setAttribute('alt', value);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const value = dict[el.dataset.i18nAria];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  document.querySelector('.lang-fr')?.classList.toggle('active', lang === 'fr');
  document.querySelector('.lang-en')?.classList.toggle('active', lang === 'en');
  langToggle?.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
  langToggle?.setAttribute('title', lang === 'fr' ? 'English' : 'Français');
  menuToggle?.setAttribute('aria-label', lang === 'fr' ? 'Ouvrir le menu' : 'Open menu');
  themeToggle?.setAttribute('aria-label', lang === 'fr' ? 'Changer de thème' : 'Change theme');
  themeToggle?.setAttribute('title', lang === 'fr' ? 'Changer de thème' : 'Change theme');
  localStorage.setItem('daniel-lang', lang);
}

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navAnchors.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const savedTheme = localStorage.getItem('daniel-theme');
if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('daniel-theme', next);
});

const savedLang = localStorage.getItem('daniel-lang');
const browserLang = navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
setLanguage(savedLang === 'fr' || savedLang === 'en' ? savedLang : browserLang);
langToggle?.addEventListener('click', () => setLanguage(document.documentElement.lang === 'fr' ? 'en' : 'fr'));

function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${ratio}%`;
  backToTop.classList.toggle('visible', window.scrollY > 450);
  const sections = [...document.querySelectorAll('.section-anchor')];
  let current = 'about';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 130) current = section.id; });
  navAnchors.forEach(link => {
    const target = link.getAttribute('href').slice(1);
    link.classList.toggle('active', target === current || (target === 'publications' && current === 'news'));
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
document.getElementById('year').textContent = new Date().getFullYear();
