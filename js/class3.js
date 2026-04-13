// ═══════════════════════════════════════════
//  KLASA 3 — Matematyka szkoły podstawowej
// ═══════════════════════════════════════════
// Korzysta z globalnych: randInt, drawFractionFigure, drawNumberLine
//
// TODO: Uzupełnij generatory pytań dla klasy 3
//   Łatwy smaczek: dodawanie/odejmowanie do 100, tabliczka mnożenia, dzielenie
//   Średni smaczek: zegarek/czas, jednostki miary, figury geometryczne, ułamki z obrazka, pieniądze
//   Mocny smaczek: zadania z treścią, +/- pisemne do 1000, kolejność działań, ciągi liczbowe

(function() {

// ─── GENERATORY PYTAŃ KLASY 3 ───
const MathGen3 = {

  // Dodawanie i odejmowanie do 100
  addSub100() {
    const isAdd = Math.random() < 0.5;
    if (isAdd) {
      const a = randInt(10, 90);
      const b = randInt(5, 99 - a);
      return { text: `${a} + ${b} = ?`, answer: String(a + b), type: 'number' };
    } else {
      const a = randInt(20, 99);
      const b = randInt(5, a - 1);
      return { text: `${a} − ${b} = ?`, answer: String(a - b), type: 'number' };
    }
  },

  // Tabliczka mnożenia (2-10)
  multiplication() {
    const a = randInt(2, 10);
    const b = randInt(2, 10);
    return { text: `${a} · ${b} = ?`, answer: String(a * b), type: 'number' };
  },

  // Dzielenie w zakresie tabliczki mnożenia
  division() {
    const b = randInt(2, 10);
    const a = b * randInt(2, 10);
    return { text: `${a} : ${b} = ?`, answer: String(a / b), type: 'number' };
  },

  // Brakująca liczba (proste)
  missingNumber() {
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const pos = Math.random() < 0.5 ? 'left' : 'right';

    if (op === '+') {
      const a = randInt(5, 50);
      const b = randInt(5, 49);
      const result = a + b;
      if (pos === 'left') {
        return { text: `☐ + ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        return { text: `${a} + ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    } else {
      const a = randInt(20, 99);
      const b = randInt(5, a - 5);
      const result = a - b;
      if (pos === 'left') {
        return { text: `☐ − ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        return { text: `${a} − ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    }
  },

  // Porównywanie liczb
  comparison() {
    const a = randInt(10, 999);
    let b;
    do { b = randInt(10, 999); } while (b === a);
    const correct = a > b ? '>' : a < b ? '<' : '=';
    return {
      text: `Który znak pasuje?\n\n${a}  ☐  ${b}`,
      type: 'quiz',
      answers: ['<', '>', '='],
      correctIndex: correct === '<' ? 0 : correct === '>' ? 1 : 2,
      hint: `Porównaj: ${a} i ${b}`,
      answer: correct === '<' ? 'A' : correct === '>' ? 'B' : 'C',
      cssClass: 'word-problem'
    };
  },

  // Ułamki z figury (proste: 1/2, 1/3, 1/4, 2/4, 3/4)
  fractionFigure() {
    const denOptions = [2, 3, 4];
    const den = denOptions[Math.floor(Math.random() * denOptions.length)];
    const num = randInt(1, den - 1);
    const shapes = ['circle', 'rect', 'bar'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
      text: '',
      type: 'fractionFigure',
      figShape: shape,
      figNum: num,
      figDen: den,
      answer: `${num}/${den}`,
      correctNum: num,
      correctDen: den
    };
  },

  // Dodawanie/odejmowanie pisemne do 1000
  writtenCalc() {
    const isAdd = Math.random() < 0.5;
    if (isAdd) {
      const a = randInt(100, 999);
      const b = randInt(10, 999);
      const result = a + b;
      const aStr = String(a);
      const bStr = String(b);
      const maxLen = Math.max(aStr.length, bStr.length);
      const line = '─'.repeat(maxLen + 2);
      return { text: `  ${aStr.padStart(maxLen)}\n+ ${bStr.padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
    } else {
      const a = randInt(200, 999);
      const b = randInt(10, a - 1);
      const result = a - b;
      const aStr = String(a);
      const bStr = String(b);
      const maxLen = Math.max(aStr.length, bStr.length);
      const line = '─'.repeat(maxLen + 2);
      return { text: `  ${aStr.padStart(maxLen)}\n− ${bStr.padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
    }
  },

  // Kolejność działań (proste, bez nawiasów lub z jednym nawiasem)
  orderOfOps() {
    const templates = [
      () => { const a = randInt(2, 15); const b = randInt(2, 8); const c = randInt(2, 8); return { text: `${a} + ${b} · ${c} = ?`, answer: String(a + b * c) }; },
      () => { const a = randInt(2, 8); const b = randInt(2, 8); const c = randInt(2, 15); return { text: `${a} · ${b} + ${c} = ?`, answer: String(a * b + c) }; },
      () => { const b = randInt(2, 6); const c = randInt(2, 6); const a = b * c + randInt(3, 20); return { text: `${a} − ${b} · ${c} = ?`, answer: String(a - b * c) }; },
      () => { const a = randInt(2, 10); const b = randInt(2, 10); const c = randInt(2, 6); return { text: `(${a} + ${b}) · ${c} = ?`, answer: String((a + b) * c) }; },
      () => { const c = randInt(2, 8); const b = c + randInt(2, 10); const a = randInt(2, 6); return { text: `${a} · (${b} − ${c}) = ?`, answer: String(a * (b - c)) }; },
    ];
    const gen = templates[Math.floor(Math.random() * templates.length)];
    const q = gen();
    return { text: q.text, answer: q.answer, type: 'number' };
  },

  // Ciągi liczbowe
  numberSequence() {
    const patterns = [
      () => { const start = randInt(2, 20); const step = randInt(2, 8); const seq = []; for (let i = 0; i < 6; i++) seq.push(start + i * step); const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?'; return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans) }; },
      () => { const start = randInt(50, 100); const step = randInt(3, 10); const seq = []; for (let i = 0; i < 6; i++) seq.push(start - i * step); const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?'; return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans) }; },
      () => { const start = randInt(1, 5); const mult = randInt(2, 3); const seq = []; let val = start; for (let i = 0; i < 6; i++) { seq.push(val); val *= mult; } const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?'; return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans) }; },
    ];
    const gen = patterns[Math.floor(Math.random() * patterns.length)];
    const q = gen();
    return { text: q.text, answer: q.answer, type: 'number' };
  },

  // Zadania z treścią (proste, klasa 3)
  wordProblem() {
    const problems = [
      () => { const a = randInt(10, 40); const b = randInt(5, 30); return { text: `Zosia ma ${a} naklejek.\nDostała od koleżanki jeszcze ${b}.\nIle naklejek ma teraz?`, answer: String(a + b) }; },
      () => { const a = randInt(30, 80); const b = randInt(10, a - 5); return { text: `W pudełku było ${a} kredek.\nDzieci zabrały ${b} kredek.\nIle zostało w pudełku?`, answer: String(a - b) }; },
      () => { const n = randInt(3, 8); const each = randInt(3, 10); return { text: `Na stole jest ${n} talerzy.\nNa każdym leży ${each} ciasteczek.\nIle jest ciasteczek łącznie?`, answer: String(n * each) }; },
      () => { const total = randInt(12, 36); const groups = [2, 3, 4, 6][Math.floor(Math.random() * 4)]; const each = Math.floor(total / groups) * groups === total ? total / groups : null; if (!each) return this.wordProblem(); return { text: `${total} jabłek rozdzielono równo\nmiędzy ${groups} dzieci.\nIle jabłek dostało każde dziecko?`, answer: String(each) }; },
      () => { const price = randInt(3, 12); const count = randInt(2, 5); const paid = Math.ceil(price * count / 10) * 10; return { text: `Mama kupiła ${count} bułek po ${price} zł.\nZapłaciła ${paid} zł.\nIle dostała reszty?`, answer: String(paid - price * count) }; },
      () => { const a = randInt(10, 50); const b = randInt(10, 50); const c = randInt(10, 50); return { text: `Janek zebrał ${a} kasztanów,\nOla ${b}, a Kasia ${c}.\nIle kasztanów zebrali razem?`, answer: String(a + b + c) }; },
      () => { const total = randInt(40, 90); const boys = randInt(15, total - 15); return { text: `W szkole jest ${total} uczniów.\nChłopców jest ${boys}.\nIle jest dziewcząt?`, answer: String(total - boys) }; },
      () => { const rows = randInt(3, 6); const perRow = randInt(4, 8); return { text: `W ogrodzie posadzono kwiaty\nw ${rows} rzędach po ${perRow} kwiatów.\nIle kwiatów posadzono?`, answer: String(rows * perRow) }; },
    ];
    const gen = problems[Math.floor(Math.random() * problems.length)];
    const p = gen();
    return { text: p.text, answer: p.answer, type: 'number', cssClass: 'word-problem' };
  },
};

// ─── P4: CZĘŚCI MOWY ───
const PARTS_OF_SPEECH = {
  tier1: [
    { word: "dom",       answer: "rzeczownik",  hint: "dom — co? → rzeczownik" },
    { word: "kot",       answer: "rzeczownik",  hint: "kot — kto? → rzeczownik" },
    { word: "mama",      answer: "rzeczownik",  hint: "mama — kto? → rzeczownik" },
    { word: "drzewo",    answer: "rzeczownik",  hint: "drzewo — co? → rzeczownik" },
    { word: "szkoła",    answer: "rzeczownik",  hint: "szkoła — co? → rzeczownik" },
    { word: "biegać",    answer: "czasownik",   hint: "biegać — co robić? → czasownik" },
    { word: "jeść",      answer: "czasownik",   hint: "jeść — co robić? → czasownik" },
    { word: "skakać",    answer: "czasownik",   hint: "skakać — co robić? → czasownik" },
    { word: "pisać",     answer: "czasownik",   hint: "pisać — co robić? → czasownik" },
    { word: "spać",      answer: "czasownik",   hint: "spać — co robić? → czasownik" },
    { word: "piękny",    answer: "przymiotnik",  hint: "piękny — jaki? → przymiotnik" },
    { word: "mały",      answer: "przymiotnik",  hint: "mały — jaki? → przymiotnik" },
    { word: "zielony",   answer: "przymiotnik",  hint: "zielony — jaki? → przymiotnik" },
    { word: "wysoki",    answer: "przymiotnik",  hint: "wysoki — jaki? → przymiotnik" },
    { word: "smaczny",   answer: "przymiotnik",  hint: "smaczny — jaki? → przymiotnik" },
  ],
  tier2: [
    { word: "radość",    answer: "rzeczownik",  hint: "radość — co? → rzeczownik" },
    { word: "pogoda",    answer: "rzeczownik",  hint: "pogoda — co? → rzeczownik" },
    { word: "wycieczka", answer: "rzeczownik",  hint: "wycieczka — co? → rzeczownik" },
    { word: "zwierzę",   answer: "rzeczownik",  hint: "zwierzę — kto? → rzeczownik" },
    { word: "podróż",    answer: "rzeczownik",  hint: "podróż — co? → rzeczownik" },
    { word: "śpiewał",   answer: "czasownik",   hint: "śpiewał — co robił? → czasownik" },
    { word: "latała",    answer: "czasownik",   hint: "latała — co robiła? → czasownik" },
    { word: "marzyć",    answer: "czasownik",   hint: "marzyć — co robić? → czasownik" },
    { word: "rysowali",  answer: "czasownik",   hint: "rysowali — co robili? → czasownik" },
    { word: "odpoczywać",answer: "czasownik",   hint: "odpoczywać — co robić? → czasownik" },
    { word: "drewniany", answer: "przymiotnik",  hint: "drewniany — jaki? → przymiotnik" },
    { word: "gorący",    answer: "przymiotnik",  hint: "gorący — jaki? → przymiotnik" },
    { word: "kolorowy",  answer: "przymiotnik",  hint: "kolorowy — jaki? → przymiotnik" },
    { word: "wspaniały", answer: "przymiotnik",  hint: "wspaniały — jaki? → przymiotnik" },
    { word: "drogi",     answer: "przymiotnik",  hint: "drogi — jaki? → przymiotnik" },
  ],
  tier3: [
    { word: "bieg",      answer: "rzeczownik",  hint: "bieg — co? → rzeczownik (nie: co robić?)" },
    { word: "spacer",    answer: "rzeczownik",  hint: "spacer — co? → rzeczownik (nie: co robić?)" },
    { word: "cisza",     answer: "rzeczownik",  hint: "cisza — co? → rzeczownik" },
    { word: "myślenie",  answer: "rzeczownik",  hint: "myślenie — co? → rzeczownik (choć pochodzi od 'myśleć')" },
    { word: "pomoc",     answer: "rzeczownik",  hint: "pomoc — co? → rzeczownik" },
    { word: "budować",   answer: "czasownik",   hint: "budować — co robić? → czasownik" },
    { word: "padało",    answer: "czasownik",   hint: "padało — co się działo? → czasownik" },
    { word: "świeci",    answer: "czasownik",   hint: "świeci — co robi? → czasownik" },
    { word: "rosło",     answer: "czasownik",   hint: "rosło — co się działo? → czasownik" },
    { word: "pachnieć",  answer: "czasownik",   hint: "pachnieć — co robić? → czasownik" },
    { word: "zmęczony",  answer: "przymiotnik",  hint: "zmęczony — jaki? → przymiotnik (nie: co zrobił?)" },
    { word: "leniwy",    answer: "przymiotnik",  hint: "leniwy — jaki? → przymiotnik" },
    { word: "uśmiechnięty",answer:"przymiotnik", hint: "uśmiechnięty — jaki? → przymiotnik" },
    { word: "głodny",    answer: "przymiotnik",  hint: "głodny — jaki? → przymiotnik" },
    { word: "złoty",     answer: "przymiotnik",  hint: "złoty — jaki? → przymiotnik" },
  ],
};

const PolishGen3 = {
  // P4: Części mowy — picks from tier based on floor (1=easy, 2=medium, 3=hard)
  partsOfSpeech(floor) {
    const tier = floor === 1 ? PARTS_OF_SPEECH.tier1
               : floor === 2 ? PARTS_OF_SPEECH.tier2
               : PARTS_OF_SPEECH.tier3;
    const item = tier[Math.floor(Math.random() * tier.length)];
    const answers = ['Rzeczownik', 'Czasownik', 'Przymiotnik'];
    const correctIndex = item.answer === 'rzeczownik' ? 0 : item.answer === 'czasownik' ? 1 : 2;
    const labels = ['A', 'B', 'C'];
    return {
      text: `📖 Jaka to część mowy?\n\n„${item.word}"`,
      type: 'quiz',
      answers,
      correctIndex,
      hint: item.hint,
      answer: labels[correctIndex],
      cssClass: 'word-problem'
    };
  },
};

// ─── MONTHS DATA ───
const MONTHS = [
  { name: "styczeń",    num: 1,  days: 31, quarter: "I" },
  { name: "luty",       num: 2,  days: 28, quarter: "I" },
  { name: "marzec",     num: 3,  days: 31, quarter: "I" },
  { name: "kwiecień",   num: 4,  days: 30, quarter: "II" },
  { name: "maj",        num: 5,  days: 31, quarter: "II" },
  { name: "czerwiec",   num: 6,  days: 30, quarter: "II" },
  { name: "lipiec",     num: 7,  days: 31, quarter: "III" },
  { name: "sierpień",   num: 8,  days: 31, quarter: "III" },
  { name: "wrzesień",   num: 9,  days: 30, quarter: "III" },
  { name: "październik",num: 10, days: 31, quarter: "IV" },
  { name: "listopad",   num: 11, days: 30, quarter: "IV" },
  { name: "grudzień",   num: 12, days: 31, quarter: "IV" },
];

// ─── SVG CLOCK HELPER ───
function clockSVG(hours, minutes) {
  const s = 180, cx = s/2, cy = s/2, r = 75;
  const hAngle = ((hours % 12) + minutes / 60) * 30 - 90;
  const mAngle = minutes * 6 - 90;
  const hRad = hAngle * Math.PI / 180;
  const mRad = mAngle * Math.PI / 180;
  const hx = cx + 45 * Math.cos(hRad), hy = cy + 45 * Math.sin(hRad);
  const mx = cx + 60 * Math.cos(mRad), my = cy + 60 * Math.sin(mRad);
  let svg = `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="display:block;margin:0 auto;">`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8f0d0" stroke="#5a7a3a" stroke-width="3"/>`;
  for (let i = 1; i <= 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const nx = cx + (r - 18) * Math.cos(a), ny = cy + (r - 18) * Math.sin(a);
    const tx = cx + (r - 4) * Math.cos(a), ty = cy + (r - 4) * Math.sin(a);
    const tx2 = cx + r * Math.cos(a), ty2 = cy + r * Math.sin(a);
    svg += `<line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${tx2.toFixed(1)}" y2="${ty2.toFixed(1)}" stroke="#5a7a3a" stroke-width="2"/>`;
    svg += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="sans-serif" fill="#2a5a1a" font-weight="bold">${i}</text>`;
  }
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const a = (i * 6 - 90) * Math.PI / 180;
    const dx = cx + (r - 2) * Math.cos(a), dy = cy + (r - 2) * Math.sin(a);
    svg += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="1" fill="#a0b880"/>`;
  }
  svg += `<line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#2a5a1a" stroke-width="5" stroke-linecap="round"/>`;
  svg += `<line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#5a7a3a" stroke-width="3" stroke-linecap="round"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="5" fill="#2a5a1a"/>`;
  svg += `</svg>`;
  return svg;
}

// ─── M11: ZEGAR I KALENDARZ ───
const ClockCalGen = {
  clockAndCalendar(floor) {
    if (floor === 1) {
      return this._clockQuestion([0, 30]);
    } else if (floor === 2) {
      return Math.random() < 0.5
        ? this._clockQuestion([0, 15, 30, 45])
        : this._monthQuestion();
    } else {
      const r = Math.random();
      if (r < 0.33) return this._clockQuestion5min();
      if (r < 0.66) return this._durationQuestion();
      return this._quarterQuestion();
    }
  },

  _clockQuestion(minuteOptions) {
    const h = randInt(1, 12);
    const m = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
    const ans = `${h}:${String(m).padStart(2, '0')}`;
    return {
      text: '',
      html: `<div style="text-align:center;"><div style="font-size:14px;color:#aaa;margin-bottom:8px;">🕐 Która jest godzina?</div>${clockSVG(h, m)}</div>`,
      type: 'text',
      answer: ans,
      hint: `Krótka wskazówka = godziny, długa = minuty`
    };
  },

  _clockQuestion5min() {
    const h = randInt(1, 12);
    const m = randInt(0, 11) * 5;
    const ans = `${h}:${String(m).padStart(2, '0')}`;
    return {
      text: '',
      html: `<div style="text-align:center;"><div style="font-size:14px;color:#aaa;margin-bottom:8px;">🕐 Która jest godzina?</div>${clockSVG(h, m)}</div>`,
      type: 'text',
      answer: ans,
      hint: `Krótka wskazówka = godziny, długa = minuty`
    };
  },

  _monthQuestion() {
    const types = ['days', 'which'];
    const t = types[Math.floor(Math.random() * types.length)];
    const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    if (t === 'days') {
      return {
        text: `📅 Ile dni ma ${month.name}?`,
        type: 'number',
        answer: String(month.days),
        hint: `Pomyśl o wierszyczku: "30 dni ma wrzesień…"`
      };
    } else {
      return {
        text: `📅 Który miesiąc jest ${month.num}. w roku?`,
        type: 'text',
        answer: month.name,
        hint: `Policz miesiące od stycznia`
      };
    }
  },

  _durationQuestion() {
    const startH = randInt(8, 17);
    const startM = [0, 15, 30][Math.floor(Math.random() * 3)];
    const durMin = [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)];
    const endTotal = startH * 60 + startM + durMin;
    const endH = Math.floor(endTotal / 60);
    const endM = endTotal % 60;
    const fmtStart = `${startH}:${String(startM).padStart(2, '0')}`;
    const fmtEnd = `${endH}:${String(endM).padStart(2, '0')}`;
    const durH = Math.floor(durMin / 60);
    const durR = durMin % 60;
    const correct = durH > 0 && durR > 0 ? `${durH}h ${durR}min`
                  : durH > 0 ? `${durH}h`
                  : `${durR}min`;
    // Build 4 wrong choices + correct
    const options = new Set([correct]);
    while (options.size < 4) {
      const fakeMin = durMin + (randInt(-3, 3) * 15);
      if (fakeMin <= 0 || fakeMin === durMin) continue;
      const fH = Math.floor(fakeMin / 60);
      const fR = fakeMin % 60;
      const label = fH > 0 && fR > 0 ? `${fH}h ${fR}min` : fH > 0 ? `${fH}h` : `${fR}min`;
      options.add(label);
    }
    const answers = [...options].sort(() => Math.random() - 0.5);
    const correctIndex = answers.indexOf(correct);
    const labels = ['A', 'B', 'C', 'D'];
    return {
      text: `⏱️ Lekcja zaczyna się o ${fmtStart}\ni kończy o ${fmtEnd}.\nIle trwa?`,
      type: 'quiz',
      answers,
      correctIndex,
      answer: labels[correctIndex],
      hint: `Policz ile minut od ${fmtStart} do ${fmtEnd}`,
      cssClass: 'word-problem'
    };
  },

  _quarterQuestion() {
    const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    return {
      text: `📅 W którym kwartale roku jest ${month.name}?\nZapisz cyfrą rzymską.`,
      type: 'text',
      answer: month.quarter,
      hint: `I kw. = sty–mar, II = kwi–cze, III = lip–wrz, IV = paź–gru`
    };
  },
};

// ─── M12: CYFRY I LICZBY ───
const DigitsGen = {
  digitsAndNumbers(floor) {
    if (floor === 1) return this._digitCount();
    if (floor === 2) return this._digitSum();
    const r = Math.random();
    if (r < 0.4) return this._uniqueDigits();
    if (r < 0.7) return this._arrangeLargest();
    return this._arrangeSmallest();
  },

  _digitCount() {
    const pools = [[1,9], [10,99], [100,999]];
    const pool = pools[Math.floor(Math.random() * pools.length)];
    const n = randInt(pool[0], pool[1]);
    return {
      text: `Ile cyfr ma liczba ${n}?`,
      type: 'number',
      answer: String(String(n).length),
      hint: `Policz cyfry w liczbie ${n}`
    };
  },

  _digitSum() {
    const n = randInt(10, 999);
    const sum = String(n).split('').reduce((s, d) => s + Number(d), 0);
    return {
      text: `Oblicz sumę cyfr liczby ${n}`,
      type: 'number',
      answer: String(sum),
      hint: `Dodaj do siebie każdą cyfrę: ${String(n).split('').join(' + ')}`
    };
  },

  _uniqueDigits() {
    const nums = [112, 223, 355, 100, 333, 121, 455, 909, 232, 414, 505, 787, 999, 111, 252, 673, 489, 531];
    const n = nums[Math.floor(Math.random() * nums.length)];
    const unique = new Set(String(n).split('')).size;
    return {
      text: `Ile RÓŻNYCH cyfr użyto\nw liczbie ${n}?`,
      type: 'number',
      answer: String(unique),
      hint: `Wypisz cyfry bez powtórzeń i policz`,
      cssClass: 'word-problem'
    };
  },

  _arrangeLargest() {
    const digits = [];
    while (digits.length < 3) {
      const d = randInt(1, 9);
      if (!digits.includes(d)) digits.push(d);
    }
    const sorted = [...digits].sort((a, b) => b - a);
    return {
      text: `Z cyfr ${digits.join(', ')} ułóż\nnajwiększą liczbę trzycyfrową`,
      type: 'number',
      answer: sorted.join(''),
      hint: `Zacznij od największej cyfry`,
      cssClass: 'word-problem'
    };
  },

  _arrangeSmallest() {
    const digits = [];
    while (digits.length < 3) {
      const d = randInt(1, 9);
      if (!digits.includes(d)) digits.push(d);
    }
    const sorted = [...digits].sort((a, b) => a - b);
    // Smallest 2-digit number from any 2 of the 3 digits
    const pairs = [[0,1],[0,2],[1,2]];
    let minVal = 99;
    for (const [i,j] of pairs) {
      const a = Math.min(digits[i], digits[j]), b = Math.max(digits[i], digits[j]);
      const val = a * 10 + b;
      if (val < minVal) minVal = val;
    }
    return {
      text: `Z cyfr ${digits.join(', ')} ułóż\nnajmniejszą liczbę dwucyfrową`,
      type: 'number',
      answer: String(minVal),
      hint: `Zacznij od najmniejszej cyfry`,
      cssClass: 'word-problem'
    };
  },
};

// ─── REGISTER CLASS 3 ───
Subjects.register('class3', {
  name: 'Klasa 3',
  icon: '🧮',
  description: 'Matematyka — klasa 3 szkoły podstawowej',
  mathGen: MathGen3,

  categories: [
    { id: 'addSub100', icon: '➕', name: 'Dodawanie i odejmowanie do 100', desc: 'Proste rachunki do 100', gen: (f) => MathGen3.addSub100() },
    { id: 'multiplication', icon: '✖️', name: 'Tabliczka mnożenia', desc: 'Mnożenie w zakresie 2-10', gen: (f) => MathGen3.multiplication() },
    { id: 'division', icon: '➗', name: 'Dzielenie', desc: 'Dzielenie w zakresie tabliczki mnożenia', gen: (f) => MathGen3.division() },
    { id: 'missingNumber3', icon: '❓', name: 'Brakująca liczba', desc: 'Znajdź brakujący składnik', gen: (f) => MathGen3.missingNumber() },
    { id: 'comparison', icon: '⚖️', name: 'Porównywanie liczb', desc: 'Który znak: < > =', gen: (f) => MathGen3.comparison() },
    { id: 'fractionFigure3', icon: '🟦', name: 'Ułamki z obrazka', desc: 'Jaka część figury jest zakolorowana?', gen: (f) => MathGen3.fractionFigure() },
    { id: 'writtenCalc3', icon: '📝', name: 'Pisemne +/− do 1000', desc: 'Dodawanie i odejmowanie w słupku', gen: (f) => MathGen3.writtenCalc() },
    { id: 'orderOfOps3', icon: '🔢', name: 'Kolejność działań', desc: 'Mnożenie przed dodawaniem', gen: (f) => MathGen3.orderOfOps() },
    { id: 'sequence', icon: '🔗', name: 'Ciągi liczbowe', desc: 'Uzupełnij brakującą liczbę w ciągu', gen: (f) => MathGen3.numberSequence() },
    { id: 'wordProblem3', icon: '📖', name: 'Zadania z treścią', desc: 'Proste zadania tekstowe', gen: (f) => MathGen3.wordProblem() },
    { id: 'clockCalendar', icon: '🕐', name: 'Zegar i kalendarz', desc: 'Odczytaj godzinę, miesiące, kwartały', gen: (f) => ClockCalGen.clockAndCalendar(f) },
    { id: 'digits', icon: '🔢', name: 'Cyfry i liczby', desc: 'Ile cyfr, suma cyfr, układanie liczb', gen: (f) => DigitsGen.digitsAndNumbers(f) },
    // POLSKI
    { id: 'partsOfSpeech', icon: '📗', name: 'Części mowy', desc: 'Rzeczownik, czasownik czy przymiotnik?', gen: (f) => PolishGen3.partsOfSpeech(f) },
  ],

  easyPool: [
    { id: 'addSub100', gen: () => MathGen3.addSub100() },
    { id: 'addSub100', gen: () => MathGen3.addSub100() },
    { id: 'addSub100', gen: () => MathGen3.addSub100() },
    { id: 'addSub100', gen: () => MathGen3.addSub100() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'division', gen: () => MathGen3.division() },
    { id: 'division', gen: () => MathGen3.division() },
    { id: 'division', gen: () => MathGen3.division() },
    { id: 'missingNumber3', gen: () => MathGen3.missingNumber() },
    { id: 'missingNumber3', gen: () => MathGen3.missingNumber() },
    { id: 'missingNumber3', gen: () => MathGen3.missingNumber() },
    { id: 'comparison', gen: () => MathGen3.comparison() },
    { id: 'comparison', gen: () => MathGen3.comparison() },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(1) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(1) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(1) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(1) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(1) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(1) },
  ],

  mediumPool: [
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure() },
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure() },
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure() },
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'comparison', gen: () => MathGen3.comparison() },
    { id: 'comparison', gen: () => MathGen3.comparison() },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(2) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(2) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(2) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(2) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(2) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(2) },
  ],

  hardPool: [
    { id: 'wordProblem3', gen: () => MathGen3.wordProblem() },
    { id: 'wordProblem3', gen: () => MathGen3.wordProblem() },
    { id: 'wordProblem3', gen: () => MathGen3.wordProblem() },
    { id: 'wordProblem3', gen: () => MathGen3.wordProblem() },
    { id: 'wordProblem3', gen: () => MathGen3.wordProblem() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'sequence', gen: () => MathGen3.numberSequence() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'multiplication', gen: () => MathGen3.multiplication() },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(3) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(3) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(3) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(3) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(3) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(3) },
  ],
});

})();
