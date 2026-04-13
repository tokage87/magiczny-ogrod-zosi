// ═══════════════════════════════════════════
//  SUBJECTS REGISTRY — centralny rejestr klas i przedmiotów
// ═══════════════════════════════════════════
//
// Każdy plik klasy (class3.js, class4.js, ...) rejestruje się tu przez:
//   Subjects.register('class4', { ... })
//
// Silnik gry (index.html) odpytuje rejestr o:
//   - listę klas do wyboru
//   - kategorie do CatSelect i Practice
//   - generatory pytań easy/medium/hard do Battle

const Subjects = {
  _classes: {},

  // Rejestracja klasy/przedmiotu
  register(id, config) {
    // config = {
    //   name: 'Klasa 4',
    //   icon: '📐',
    //   description: 'Matematyka klasa 4',
    //   categories: [ { id, icon, name, desc, gen }, ... ],
    //   easyPool:   [ { id, gen }, ... ],
    //   mediumPool: [ { id, gen }, ... ],
    //   hardPool:   [ { id, gen }, ... ],
    //   quizBank:   [ { q, a, correct, hint }, ... ]  // optional
    // }
    this._classes[id] = config;
  },

  // Pobierz listę zarejestrowanych klas
  list() {
    return Object.entries(this._classes).map(([id, cfg]) => ({
      id,
      name: cfg.name,
      icon: cfg.icon,
      description: cfg.description
    }));
  },

  // Pobierz config wybranej klasy
  get(id) {
    return this._classes[id] || null;
  },

  // Pobierz kategorie dla wybranej klasy (do CatSelect i Practice)
  getCategories(id) {
    const cls = this._classes[id];
    return cls ? cls.categories : [];
  },

  // Pobierz pool pytań dla Battle
  getEasyPool(id) {
    const cls = this._classes[id];
    return cls ? cls.easyPool : [];
  },

  getMediumPool(id) {
    const cls = this._classes[id];
    return cls ? cls.mediumPool : [];
  },

  getHardPool(id) {
    const cls = this._classes[id];
    return cls ? cls.hardPool : [];
  },

  // Pobierz quiz bank (opcjonalny)
  getQuizBank(id) {
    const cls = this._classes[id];
    return cls && cls.quizBank ? cls.quizBank : [];
  }
};
