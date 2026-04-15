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

  // M1: Dodawanie i odejmowanie do 100
  addSub100(floor) {
    if (floor === 3) return this._addSubMissing();
    const isAdd = Math.random() < 0.5;
    if (floor === 1) {
      // Tier 1: bez przekroczenia progu dziesiątkowego
      if (isAdd) {
        let a, b;
        do { a = randInt(10, 50); b = randInt(1, 20); } while ((a % 10) + (b % 10) >= 10 || a + b > 99);
        return { text: `${a} + ${b} = ?`, answer: String(a + b), type: 'number' };
      } else {
        let a, b;
        do { a = randInt(20, 70); b = randInt(1, 20); } while ((a % 10) < (b % 10));
        return { text: `${a} − ${b} = ?`, answer: String(a - b), type: 'number' };
      }
    } else {
      // Tier 2: z przekroczeniem progu
      if (isAdd) {
        let a, b;
        do { a = randInt(20, 80); b = randInt(10, 50); } while ((a % 10) + (b % 10) < 10 || a + b > 99);
        return { text: `${a} + ${b} = ?`, answer: String(a + b), type: 'number' };
      } else {
        let a, b;
        do { a = randInt(30, 90); b = randInt(10, 50); } while ((a % 10) >= (b % 10) || a - b < 0);
        return { text: `${a} − ${b} = ?`, answer: String(a - b), type: 'number' };
      }
    }
  },

  _addSubMissing() {
    // Tier 3: brakująca liczba w równaniu +/−
    const isAdd = Math.random() < 0.5;
    const pos = randInt(0, 2); // 0=left, 1=right, 2=result
    if (isAdd) {
      const a = randInt(10, 60);
      const b = randInt(10, 40);
      const result = a + b;
      if (pos === 0) return { text: `☐ + ${b} = ${result}`, answer: String(a), type: 'number' };
      if (pos === 1) return { text: `${a} + ☐ = ${result}`, answer: String(b), type: 'number' };
      return { text: `${a} + ${b} = ☐`, answer: String(result), type: 'number' };
    } else {
      const a = randInt(30, 99);
      const b = randInt(10, a - 5);
      const result = a - b;
      if (pos === 0) return { text: `☐ − ${b} = ${result}`, answer: String(a), type: 'number' };
      if (pos === 1) return { text: `${a} − ☐ = ${result}`, answer: String(b), type: 'number' };
      return { text: `${a} − ${b} = ☐`, answer: String(result), type: 'number' };
    }
  },

  // M2: Tabliczka mnożenia i dzielenie
  multiplyDivide(floor) {
    if (floor === 1) {
      // Tier 1: mnożenie do 5 × 5
      const a = randInt(2, 5);
      const b = randInt(2, 5);
      return { text: `${a} · ${b} = ?`, answer: String(a * b), type: 'number' };
    } else if (floor === 2) {
      // Tier 2: mnożenie do 10×10 + dzielenie
      if (Math.random() < 0.5) {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        return { text: `${a} · ${b} = ?`, answer: String(a * b), type: 'number' };
      } else {
        const b = randInt(2, 10);
        const a = b * randInt(2, 10);
        return { text: `${a} : ${b} = ?`, answer: String(a / b), type: 'number' };
      }
    } else {
      // Tier 3: brakujący czynnik / dzielnik
      const variant = randInt(0, 2);
      if (variant === 0) {
        // ☐ × b = result
        const ans = randInt(2, 10);
        const b = randInt(2, 10);
        return { text: `☐ · ${b} = ${ans * b}`, answer: String(ans), type: 'number' };
      } else if (variant === 1) {
        // a : ☐ = result
        const ans = randInt(2, 10);
        const result = randInt(2, 10);
        return { text: `${ans * result} : ☐ = ${result}`, answer: String(ans), type: 'number' };
      } else {
        // ☐ : b = result
        const b = randInt(2, 10);
        const result = randInt(2, 10);
        return { text: `☐ : ${b} = ${result}`, answer: String(b * result), type: 'number' };
      }
    }
  },

  // Porównywanie liczb
  // Porównywanie liczb — 3 tiery
  comparison(floor) {
    if (floor === 1) {
      // Tier 1: dwucyfrowe
      const a = randInt(10, 99);
      let b; do { b = randInt(10, 99); } while (b === a);
      return this._compResult(a, b);
    } else if (floor === 2) {
      // Tier 2: trzycyfrowe
      const a = randInt(100, 999);
      let b; do { b = randInt(100, 999); } while (b === a);
      return this._compResult(a, b);
    } else {
      // Tier 3: porównywanie wyrażeń
      const templates = [
        () => { const a = randInt(2, 8); const b = randInt(2, 8); const c = randInt(10, 50); return { left: `${a} · ${b}`, lVal: a*b, right: String(c), rVal: c }; },
        () => { const a = randInt(10, 50); const b = randInt(10, 50); const c = randInt(10, 99); return { left: `${a} + ${b}`, lVal: a+b, right: String(c), rVal: c }; },
        () => { const a = randInt(2, 6); const b = randInt(2, 6); const c = randInt(2, 6); const d = randInt(2, 6); return { left: `${a} · ${b}`, lVal: a*b, right: `${c} · ${d}`, rVal: c*d }; },
      ];
      const t = templates[Math.floor(Math.random() * templates.length)]();
      const correct = t.lVal > t.rVal ? '>' : t.lVal < t.rVal ? '<' : '=';
      return {
        text: `Który znak pasuje?\n\n${t.left}  ☐  ${t.right}`,
        type: 'quiz', answers: ['<', '>', '='],
        correctIndex: correct === '<' ? 0 : correct === '>' ? 1 : 2,
        hint: `${t.left} = ${t.lVal}, ${t.right} = ${t.rVal}`,
        answer: correct === '<' ? 'A' : correct === '>' ? 'B' : 'C',
        cssClass: 'word-problem'
      };
    }
  },

  _compResult(a, b) {
    const correct = a > b ? '>' : a < b ? '<' : '=';
    return {
      text: `Który znak pasuje?\n\n${a}  ☐  ${b}`,
      type: 'quiz', answers: ['<', '>', '='],
      correctIndex: correct === '<' ? 0 : correct === '>' ? 1 : 2,
      hint: `Porównaj: ${a} i ${b}`,
      answer: correct === '<' ? 'A' : correct === '>' ? 'B' : 'C',
      cssClass: 'word-problem'
    };
  },

  // Ułamki z figury — 3 tiery
  fractionFigure(floor) {
    const shapes = ['circle', 'rect', 'bar'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    let den, num;
    if (floor === 1) {
      // Tier 1: połówki i ćwiartki
      den = [2, 4][Math.floor(Math.random() * 2)];
      num = den === 2 ? 1 : randInt(1, 3);
    } else if (floor === 2) {
      // Tier 2: trzecie, szóste
      den = [3, 6][Math.floor(Math.random() * 2)];
      num = randInt(1, den - 1);
    } else {
      // Tier 3: piąte, ósme
      den = [5, 8][Math.floor(Math.random() * 2)];
      num = randInt(1, den - 1);
    }
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

  // Dodawanie/odejmowanie pisemne (w słupku)
  writtenCalc(floor) {
    if (floor === 1) {
      // Tier 1: dwie liczby dwucyfrowe, dodawanie
      const a = randInt(20, 70);
      const b = randInt(20, 70);
      const result = a + b;
      const maxLen = 2;
      const line = '─'.repeat(maxLen + 2);
      return { text: `  ${String(a).padStart(maxLen)}\n+ ${String(b).padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
    } else if (floor === 2) {
      // Tier 2: liczba trzycyfrowa + dwucyfrowa
      const a = randInt(100, 400);
      const b = randInt(20, 99);
      const result = a + b;
      const maxLen = String(a).length;
      const line = '─'.repeat(maxLen + 2);
      return { text: `  ${String(a).padStart(maxLen)}\n+ ${String(b).padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
    } else {
      // Tier 3: trzy liczby lub odejmowanie pisemne
      if (Math.random() < 0.5) {
        // Trzy liczby
        const a = randInt(100, 400);
        const b = randInt(100, 400);
        const c = randInt(10, 99);
        const result = a + b + c;
        const maxLen = Math.max(String(a).length, String(b).length, String(c).length);
        const line = '─'.repeat(maxLen + 2);
        return { text: `  ${String(a).padStart(maxLen)}\n  ${String(b).padStart(maxLen)}\n+ ${String(c).padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
      } else {
        // Odejmowanie pisemne
        const a = randInt(200, 999);
        const b = randInt(20, a - 10);
        const result = a - b;
        const maxLen = String(a).length;
        const line = '─'.repeat(maxLen + 2);
        return { text: `  ${String(a).padStart(maxLen)}\n− ${String(b).padStart(maxLen)}\n${line}\n  ???`, answer: String(result), type: 'number', cssClass: 'written-calc' };
      }
    }
  },

  // Kolejność działań — 3 tiery
  orderOfOps(floor) {
    let templates;
    if (floor === 1) {
      // Tier 1: dwa działania, bez nawiasów, małe liczby
      templates = [
        () => { const a = randInt(2, 10); const b = randInt(2, 5); const c = randInt(2, 5); return { text: `${a} + ${b} · ${c} = ?`, answer: String(a + b * c) }; },
        () => { const a = randInt(2, 5); const b = randInt(2, 5); const c = randInt(2, 10); return { text: `${a} · ${b} + ${c} = ?`, answer: String(a * b + c) }; },
        () => { const b = randInt(2, 5); const c = randInt(2, 5); const a = b * c + randInt(3, 15); return { text: `${a} − ${b} · ${c} = ?`, answer: String(a - b * c) }; },
      ];
    } else if (floor === 2) {
      // Tier 2: z jednym nawiasem
      templates = [
        () => { const a = randInt(2, 10); const b = randInt(2, 10); const c = randInt(2, 6); return { text: `(${a} + ${b}) · ${c} = ?`, answer: String((a + b) * c) }; },
        () => { const c = randInt(2, 8); const b = c + randInt(2, 10); const a = randInt(2, 6); return { text: `${a} · (${b} − ${c}) = ?`, answer: String(a * (b - c)) }; },
        () => { const a = randInt(2, 8); const b = randInt(2, 8); const c = randInt(2, 6); return { text: `(${a} − ${b > a ? a - 1 : b}) · ${c} = ?`, answer: String((a - Math.min(b, a - 1)) * c) }; },
      ];
    } else {
      // Tier 3: trzy działania lub zagnieżdżone nawiasy
      templates = [
        () => { const a = randInt(2, 6); const b = randInt(2, 6); const c = randInt(2, 6); const d = randInt(2, 10); return { text: `${a} · ${b} + ${c} · ${d} = ?`, answer: String(a * b + c * d) }; },
        () => { const a = randInt(2, 10); const b = randInt(2, 10); const c = randInt(2, 6); const d = randInt(2, 10); return { text: `(${a} + ${b}) · ${c} − ${d} = ?`, answer: String((a + b) * c - d) }; },
        () => { const a = randInt(10, 30); const b = randInt(2, 5); const c = randInt(2, 5); const d = randInt(2, 5); return { text: `${a} − ${b} · ${c} + ${d} = ?`, answer: String(a - b * c + d) }; },
        () => { const a = randInt(2, 5); const b = randInt(2, 5); const c = randInt(2, 8); const d = randInt(2, 5); return { text: `${a} · (${b} + ${c}) − ${d} = ?`, answer: String(a * (b + c) - d) }; },
      ];
    }
    const q = templates[Math.floor(Math.random() * templates.length)]();
    return { text: q.text, answer: q.answer, type: 'number' };
  },

  // Ciągi liczbowe — 3 tiery
  numberSequence(floor) {
    if (floor === 1) {
      // Tier 1: rosnący arytmetyczny, mały krok
      const start = randInt(2, 20); const step = randInt(2, 5);
      const seq = []; for (let i = 0; i < 6; i++) seq.push(start + i * step);
      const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?';
      return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans), type: 'number' };
    } else if (floor === 2) {
      // Tier 2: malejący lub większy krok
      if (Math.random() < 0.5) {
        const start = randInt(50, 100); const step = randInt(4, 12);
        const seq = []; for (let i = 0; i < 6; i++) seq.push(start - i * step);
        const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?';
        return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans), type: 'number' };
      } else {
        const start = randInt(5, 30); const step = randInt(5, 15);
        const seq = []; for (let i = 0; i < 6; i++) seq.push(start + i * step);
        const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?';
        return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans), type: 'number' };
      }
    } else {
      // Tier 3: geometryczny lub naprzemienne kroki
      if (Math.random() < 0.5) {
        const start = randInt(1, 4); const mult = randInt(2, 3);
        const seq = []; let val = start; for (let i = 0; i < 6; i++) { seq.push(val); val *= mult; }
        const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?';
        return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans), type: 'number' };
      } else {
        // Naprzemiennie +a, +b
        const start = randInt(1, 10); const stepA = randInt(2, 5); const stepB = randInt(3, 8);
        const seq = [start]; for (let i = 1; i < 6; i++) seq.push(seq[i-1] + (i % 2 === 1 ? stepA : stepB));
        const miss = randInt(2, 4); const ans = seq[miss]; seq[miss] = '?';
        return { text: `Uzupełnij ciąg:\n\n${seq.join(', ')}`, answer: String(ans), type: 'number' };
      }
    }
  },

  // Zadania z treścią — 3 tiery
  wordProblem(floor) {
    const tier1 = [
      () => { const a = randInt(20, 50); const b = randInt(5, 30); return { text: `Ania ma ${a} naklejek,\nKasia o ${b} więcej.\nIle naklejek ma Kasia?`, answer: String(a + b) }; },
      () => { const a = randInt(30, 80); const b = randInt(10, a - 5); return { text: `W pudełku było ${a} cukierków.\nDzieci zjadły ${b}.\nIle zostało?`, answer: String(a - b) }; },
      () => { const a = randInt(15, 40); const b = randInt(10, 30); return { text: `Zosia przeczytała ${a} stron,\na Kuba ${b} stron.\nIle stron przeczytali razem?`, answer: String(a + b) }; },
      () => { const a = randInt(50, 90); const b = randInt(10, 30); return { text: `Tomek miał ${a} zł.\nKupił zeszyt za ${b} zł.\nIle mu zostało?`, answer: String(a - b) }; },
      () => { const n = randInt(3, 8); const each = randInt(3, 10); return { text: `Na stole jest ${n} talerzy.\nNa każdym leży ${each} ciasteczek.\nIle jest ciasteczek łącznie?`, answer: String(n * each) }; },
      () => { const total = randInt(40, 90); const boys = randInt(15, total - 15); return { text: `W klasie jest ${total} uczniów.\nChłopców jest ${boys}.\nIle jest dziewcząt?`, answer: String(total - boys) }; },
      () => { const rows = randInt(3, 6); const perRow = randInt(4, 8); return { text: `W ogrodzie posadzono kwiaty\nw ${rows} rzędach po ${perRow}.\nIle kwiatów posadzono?`, answer: String(rows * perRow) }; },
      () => { const a = randInt(20, 60); const b = randInt(10, 25); return { text: `Ola ma ${a} koralików.\nDostała od babci jeszcze ${b}.\nIle ma teraz?`, answer: String(a + b) }; },
    ];
    const tier2 = [
      () => { const a = randInt(20, 40); const b = randInt(25, 45); const c = randInt(10, 25); return { text: `Jaś ma ${a} zł, Maciek ${b} zł.\nKażdy zarobił jeszcze ${c} zł.\nIle mają razem?`, answer: String(a + b + 2 * c) }; },
      () => { const a = randInt(60, 95); const b = randInt(10, 20); return { text: `Babcia zrobiła szalik ${a} cm.\nDrugi jest o ${b} cm krótszy.\nIle cm ma drugi szalik?`, answer: String(a - b) }; },
      () => { const price = randInt(3, 12); const count = randInt(2, 5); const paid = Math.ceil(price * count / 10) * 10; return { text: `Mama kupiła ${count} bułek po ${price} zł.\nZapłaciła ${paid} zł.\nIle dostała reszty?`, answer: String(paid - price * count) }; },
      () => { const a = randInt(15, 35); const b = randInt(10, 20); const c = randInt(5, 15); return { text: `W poniedziałek padało ${a} mm deszczu,\nwe wtorek ${b} mm, w środę ${c} mm.\nIle łącznie?`, answer: String(a + b + c) }; },
      () => { const each = randInt(4, 8); const n = randInt(3, 6); const extra = randInt(2, 10); return { text: `Tata kupił ${n} paczek ciastek\npo ${each} sztuk w każdej.\n${extra} ciastek zjadły dzieci.\nIle zostało?`, answer: String(each * n - extra) }; },
      () => { const a = randInt(30, 60); const b = randInt(10, 25); return { text: `Ola miała ${a} zł.\nWydała ${b} zł na książkę,\na resztę na zeszyt i długopis.\nIle wydała na zeszyt i długopis?`, answer: String(a - b) }; },
      () => { const g = [2, 3, 4, 6][randInt(0, 3)]; const each = randInt(3, 8); const total = g * each; return { text: `${total} orzechów rozdzielono\nrówno na ${g} torebek.\nIle orzechów w każdej?`, answer: String(each) }; },
      () => { const a = randInt(20, 50); const b = randInt(10, 30); const c = randInt(5, 20); return { text: `Zosia zebrała ${a} kasztanów,\nKuba o ${b} mniej.\nIle zebrali razem?`, answer: String(a + (a - b)) }; },
    ];
    const tier3 = [
      () => { const age = randInt(7, 12); const mDiff = randInt(20, 28); const tDiff = randInt(23, 32); return { text: `Adam ma ${age} lat.\nMama jest o ${mDiff} lat starsza,\ntata o ${tDiff} lat starszy.\nIle lat mają wszyscy razem?`, answer: String(age + (age + mDiff) + (age + tDiff)) }; },
      () => { const a = randInt(30, 60); const b = randInt(20, 50); const c = randInt(30, 60); const d = randInt(20, c - 1); return { text: `Do sumy ${a} i ${b}\ndodaj różnicę ${c} i ${d}.`, answer: String(a + b + (c - d)) }; },
      () => { const a = randInt(10, 50); const b = randInt(10, 50); const c = randInt(10, 50); return { text: `Janek zebrał ${a} kasztanów,\nOla ${b}, a Kasia ${c}.\nIle kasztanów zebrali razem?`, answer: String(a + b + c) }; },
      () => { const n = randInt(3, 6); const price = randInt(4, 12); const budget = n * price + randInt(5, 20); return { text: `Mama ma ${budget} zł.\nKupuje ${n} zeszytów po ${price} zł.\nIle złotych jej zostanie?`, answer: String(budget - n * price) }; },
      () => { const a = randInt(100, 300); const b = randInt(50, 150); const c = randInt(20, 80); return { text: `W sklepie było ${a} jabłek.\nRano sprzedano ${b},\npo południu jeszcze ${c}.\nIle zostało?`, answer: String(a - b - c) }; },
      () => { const perDay = randInt(5, 15); const days = randInt(3, 7); const extra = randInt(10, 30); return { text: `Ola czyta ${perDay} stron dziennie.\nCzytała tak przez ${days} dni,\npotem jednego dnia ${extra} stron.\nIle stron przeczytała łącznie?`, answer: String(perDay * days + extra) }; },
      () => { const a = randInt(20, 40); const diff = randInt(5, 15); return { text: `Kasia ma ${a} lat.\nJej brat jest o ${diff} lat młodszy.\nIle lat będą mieli razem\nza 5 lat?`, answer: String((a + 5) + (a - diff + 5)) }; },
      () => { const a = randInt(50, 90); const b = randInt(30, 60); const c = randInt(20, 40); return { text: `Od sumy ${a} i ${b}\nodejmij ${c}.\nIle wyszło?`, answer: String(a + b - c) }; },
    ];
    const pool = floor === 1 ? tier1 : floor === 2 ? tier2 : tier3;
    const gen = pool[Math.floor(Math.random() * pool.length)];
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
    { word: "biega",     answer: "czasownik",   hint: "biega — co robi? → czasownik" },
    { word: "jem",       answer: "czasownik",   hint: "jem — co robię? → czasownik" },
    { word: "skacze",    answer: "czasownik",   hint: "skacze — co robi? → czasownik" },
    { word: "pisze",     answer: "czasownik",   hint: "pisze — co robi? → czasownik" },
    { word: "śpi",       answer: "czasownik",   hint: "śpi — co robi? → czasownik" },
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
    { word: "marzy",     answer: "czasownik",   hint: "marzy — co robi? → czasownik" },
    { word: "rysowali",  answer: "czasownik",   hint: "rysowali — co robili? → czasownik" },
    { word: "odpoczywam",answer: "czasownik",   hint: "odpoczywam — co robię? → czasownik" },
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
    { word: "buduje",    answer: "czasownik",   hint: "buduje — co robi? → czasownik" },
    { word: "padało",    answer: "czasownik",   hint: "padało — co się działo? → czasownik" },
    { word: "świeci",    answer: "czasownik",   hint: "świeci — co robi? → czasownik" },
    { word: "rosło",     answer: "czasownik",   hint: "rosło — co się działo? → czasownik" },
    { word: "pachnie",   answer: "czasownik",   hint: "pachnie — co robi? → czasownik" },
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

  // P5: Wyrazy pokrewne
  wordFamilies(floor) {
    const fam = WORD_FAMILIES[Math.floor(Math.random() * WORD_FAMILIES.length)];
    if (floor === 1) return this._wfTier1(fam);
    if (floor === 2) return this._wfTier2(fam);
    return this._wfTier3(fam);
  },

  _wfTier1(fam) {
    // Pick one family member (not root) and one intruder
    const members = fam.family.filter(w => w !== fam.root);
    const correct = members[Math.floor(Math.random() * members.length)];
    const wrong = fam.intruders[Math.floor(Math.random() * fam.intruders.length)];
    const answers = Math.random() < 0.5 ? [correct, wrong] : [wrong, correct];
    const correctIndex = answers.indexOf(correct);
    return {
      text: `📖 Który wyraz jest pokrewny\ndo „${fam.root}"?`,
      type: 'quiz',
      answers,
      correctIndex,
      answer: ['A', 'B'][correctIndex],
      hint: `Wyrazy pokrewne mają wspólny rdzeń`,
      cssClass: 'word-problem'
    };
  },

  _wfTier2(fam) {
    // 3 family members + 1 intruder, find the intruder
    const members = fam.family.filter(w => w !== fam.root);
    const picked = [];
    const pool = [...members];
    while (picked.length < 3 && pool.length > 0) {
      const i = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(i, 1)[0]);
    }
    const intruder = fam.intruders[Math.floor(Math.random() * fam.intruders.length)];
    const answers = [...picked, intruder].sort(() => Math.random() - 0.5);
    const correctIndex = answers.indexOf(intruder);
    const labels = ['A', 'B', 'C', 'D'];
    return {
      text: `📖 Który wyraz NIE pasuje\ndo rodziny „${fam.root}"?`,
      type: 'quiz',
      answers,
      correctIndex,
      answer: labels[correctIndex],
      hint: `Szukaj wyrazu, który nie ma wspólnego rdzenia`,
      cssClass: 'word-problem'
    };
  },

  _wfTier3(fam) {
    // Input: type a related word
    const acceptable = fam.family.filter(w => w !== fam.root);
    return {
      text: `📖 Podaj wyraz pokrewny do:\n\n„${fam.root}"`,
      type: 'text',
      answer: acceptable[0],
      acceptAlternatives: acceptable,
      hint: `Pomyśl o wyrazie z tym samym rdzeniem`,
      cssClass: 'word-problem'
    };
  },

  // P3: Ortografia ch/h
  ortografiaCHH(floor) {
    const tier = floor === 1 ? ORTHO_CHH.tier1
               : floor === 2 ? ORTHO_CHH.tier2
               : ORTHO_CHH.tier3;
    const item = tier[Math.floor(Math.random() * tier.length)];
    return {
      text: `📝 Wpisz ch lub h\n\n„${item.word}"`,
      type: 'quiz',
      answers: ['ch', 'h'],
      correctIndex: item.answer === 'ch' ? 0 : 1,
      hint: item.hint,
      answer: item.answer === 'ch' ? 'A' : 'B',
      cssClass: 'word-problem'
    };
  },

  // P2: Ortografia rz/ż
  ortografiaRZZ(floor) {
    const tier = floor === 1 ? ORTHO_RZZ.tier1
               : floor === 2 ? ORTHO_RZZ.tier2
               : ORTHO_RZZ.tier3;
    const item = tier[Math.floor(Math.random() * tier.length)];
    return {
      text: `📝 Wpisz rz lub ż\n\n„${item.word}"`,
      type: 'quiz',
      answers: ['rz', 'ż'],
      correctIndex: item.answer === 'rz' ? 0 : 1,
      hint: item.hint,
      answer: item.answer === 'rz' ? 'A' : 'B',
      cssClass: 'word-problem'
    };
  },

  // P1: Ortografia ó/u
  ortografiaOU(floor) {
    const tier = floor === 1 ? ORTHO_OU.tier1
               : floor === 2 ? ORTHO_OU.tier2
               : ORTHO_OU.tier3;
    const item = tier[Math.floor(Math.random() * tier.length)];
    return {
      text: `📝 Wpisz ó lub u\n\n„${item.word}"`,
      type: 'quiz',
      answers: ['ó', 'u'],
      correctIndex: item.answer === 'ó' ? 0 : 1,
      hint: item.hint,
      answer: item.answer === 'ó' ? 'A' : 'B',
      cssClass: 'word-problem'
    };
  },
};

// ─── P1: ORTOGRAFIA ó/u ───
const ORTHO_OU = {
  tier1: [
    { word: "st_ł",      answer: "ó", hint: "R1: stół → stoły (ó wymienia się na o)" },
    { word: "w_z",       answer: "ó", hint: "R1: wóz → wozy (ó→o)" },
    { word: "l_d",       answer: "ó", hint: "R1: lód → lody (ó→o)" },
    { word: "m_j",       answer: "ó", hint: "R1: mój → moje (ó→o)" },
    { word: "tw_j",      answer: "ó", hint: "R1: twój → twoje (ó→o)" },
    { word: "ogr_d",     answer: "ó", hint: "R1: ogród → ogrody (ó→o)" },
    { word: "mr_z",      answer: "ó", hint: "R1: mróz → mrozy (ó→o)" },
    { word: "d_ży",      answer: "u", hint: "R8: duży — u niewymienne, zapamiętaj" },
    { word: "b_ty",      answer: "u", hint: "R8: buty — u niewymienne" },
    { word: "m_r",       answer: "u", hint: "R8: mur — u niewymienne" },
    { word: "d_ch",      answer: "u", hint: "R8: duch — u niewymienne" },
    { word: "kl_cz",     answer: "u", hint: "R8: klucz — u niewymienne" },
  ],
  tier2: [
    { word: "samoch_d",  answer: "ó", hint: "R1: samochód → samochody (ó→o)" },
    { word: "poch_d",    answer: "ó", hint: "R1: pochód → pochody (ó→o)" },
    { word: "dw_r",      answer: "ó", hint: "R1: dwór → dwory (ó→o)" },
    { word: "r_g",       answer: "ó", hint: "R1: róg → rogu, rogi (ó→o)" },
    { word: "pi_rnik",   answer: "ó", hint: "R1: piórnik → pióro → pierze (ó→e)" },
    { word: "wr_cić",    answer: "ó", hint: "R1: wrócić → wracam (ó→a)" },
    { word: "klas_wka",  answer: "ó", hint: "R2: klasówka — zakończenie -ówka, zawsze ó" },
    { word: "pan_w",     answer: "ó", hint: "R2: panów — zakończenie -ów, zawsze ó" },
    { word: "stal_wka",  answer: "ó", hint: "R2: stalówka — zakończenie -ówka" },
    { word: "mal_tki",   answer: "u", hint: "R7: malutki — zakończenie -utki, zawsze u" },
    { word: "rys_nek",   answer: "u", hint: "R7: rysunek — zakończenie -unek, zawsze u" },
    { word: "garn_szek", answer: "u", hint: "R7: garnuszek — zakończenie -uszek, zawsze u" },
    { word: "k_ra",      answer: "u", hint: "R8: kura — u niewymienne" },
    { word: "r_ra",      answer: "u", hint: "R8: rura — u niewymienne" },
    { word: "g_zik",     answer: "u", hint: "R8: guzik — u niewymienne" },
    { word: "p_dło",     answer: "u", hint: "R8: pudło — u niewymienne" },
  ],
  tier3: [
    { word: "g_ra",      answer: "ó", hint: "R4: góra — ó niewymienne! Zapamiętaj: góra, górka, górski" },
    { word: "kr_l",      answer: "ó", hint: "R4: król — ó niewymienne! Zapamiętaj: król, królowa" },
    { word: "c_rka",     answer: "ó", hint: "R4: córka — ó niewymienne! Zapamiętaj" },
    { word: "oł_wek",    answer: "ó", hint: "R4: ołówek — ó niewymienne! Zapamiętaj" },
    { word: "sk_ra",     answer: "ó", hint: "R4: skóra — ó niewymienne! Zapamiętaj" },
    { word: "ż_łty",     answer: "ó", hint: "R4: żółty — ó niewymienne! Zapamiętaj: żółty, żółw" },
    { word: "wr_bel",    answer: "ó", hint: "R4: wróbel — ó niewymienne! Zapamiętaj" },
    { word: "r_wny",     answer: "ó", hint: "R4: równy — ó niewymienne! Zapamiętaj" },
    { word: "kr_tki",    answer: "ó", hint: "R4: krótki — ó niewymienne! Zapamiętaj" },
    { word: "_smy",      answer: "ó", hint: "R3: ósmy — ó na początku! Wyjątek: ósmy, ósemka" },
    { word: "zas_wka",   answer: "u", hint: "WYJĄTEK! zasuwka — u, bo: zasuwać. Choć brzmi jak -ówka!" },
    { word: "ws_wka",    answer: "u", hint: "WYJĄTEK! wsuwka — u, bo: wsuwać. Choć brzmi jak -ówka!" },
    { word: "mal_je",    answer: "u", hint: "R6: maluje — zakończenie -uje w czasownikach, zawsze u" },
    { word: "k_puje",    answer: "u", hint: "R6: kupuje — zakończenie -uje w czasownikach, zawsze u" },
    { word: "k_chnia",   answer: "u", hint: "R8: kuchnia — u niewymienne" },
    { word: "brz_ch",    answer: "u", hint: "R8: brzuch — u niewymienne" },
  ],
};

// ─── P2: ORTOGRAFIA rz/ż ───
const ORTHO_RZZ = {
  tier1: [
    { word: "mo_e",      answer: "rz", hint: "R1: morze → morski (rz wymienia się na r)" },
    { word: "dwo_ec",    answer: "rz", hint: "R1: dworzec → dwory (rz→r)" },
    { word: "bu_a",      answer: "rz", hint: "R1: burza → bury (rz→r)" },
    { word: "wie_ch",    answer: "rz", hint: "R1: wierzch → wierchy (rz→r)" },
    { word: "pieka_",    answer: "rz", hint: "R3: piekarz → piekarnia (rz→r), zakończenie -arz" },
    { word: "kucha_",    answer: "rz", hint: "R3: kucharz → kucharka (rz→r), zakończenie -arz" },
    { word: "du_y",      answer: "ż",  hint: "R5: duży → duzi (ż wymienia się na zi)" },
    { word: "wa_ny",     answer: "ż",  hint: "R5: ważny → waga (ż→g)" },
    { word: "dru_yna",   answer: "ż",  hint: "R5: drużyna → druh (ż→h)" },
    { word: "mą_",       answer: "ż",  hint: "R5: mąż → męski (ż→s)" },
    { word: "wie_a",     answer: "ż",  hint: "R7: wieża — ż niewymienne, zapamiętaj" },
    { word: "je_",       answer: "ż",  hint: "R7: jeż — ż niewymienne" },
  ],
  tier2: [
    { word: "b_oza",     answer: "rz", hint: "R2: brzoza — rz po B" },
    { word: "d_ewo",     answer: "rz", hint: "R2: drzewo — rz po D" },
    { word: "t_eba",     answer: "rz", hint: "R2: trzeba — rz po T" },
    { word: "g_yb",      answer: "rz", hint: "R2: grzyb — rz po G" },
    { word: "k_ak",      answer: "rz", hint: "R2: krzak — rz po K" },
    { word: "k_esło",    answer: "rz", hint: "R2: krzesło — rz po K" },
    { word: "ch_est",    answer: "rz", hint: "R2: chrzest — rz po CH" },
    { word: "w_os",      answer: "rz", hint: "R2: wrzos — rz po W" },
    { word: "w_esień",   answer: "rz", hint: "R2: wrzesień — rz po W" },
    { word: "p_epis",    answer: "rz", hint: "R2: przepis — rz po P" },
    { word: "odwa_ny",   answer: "ż",  hint: "R5: odważny → odwaga (ż→g)" },
    { word: "ksią_ka",   answer: "ż",  hint: "R5: książka → księga (ż→g)" },
    { word: "pie_yk",    answer: "ż",  hint: "R5: pieniążek → pieniądze (ż→dz)" },
    { word: "łó_ko",     answer: "ż",  hint: "R7: łóżko — ż niewymienne, zapamiętaj" },
  ],
  tier3: [
    { word: "p_yjaciel", answer: "rz", hint: "R2: przyjaciel — rz po P i po J" },
    { word: "p_ód",      answer: "rz", hint: "R2: przód — rz po P" },
    { word: "d_emka",    answer: "rz", hint: "R2: drzemka — rz po D" },
    { word: "g_mot",     answer: "rz", hint: "R2: grzmot — rz po G" },
    { word: "t_y",       answer: "rz", hint: "R2: trzy — rz po T" },
    { word: "mala_",     answer: "rz", hint: "R3: malarz → malarstwo (rz→r), zakończenie -arz" },
    { word: "harce_",    answer: "rz", hint: "R3: harcerz → harcerstwo (rz→r), zakończenie -erz" },
    { word: "_eka",      answer: "rz", hint: "R4: rzeka — rz niewymienne na początku. Zapamiętaj!" },
    { word: "_ecz",      answer: "rz", hint: "R4: rzecz — rz niewymienne na początku. Zapamiętaj!" },
    { word: "in_ynier",  answer: "ż",  hint: "R6: inżynier — ż po N" },
    { word: "ka_dy",     answer: "ż",  hint: "R7: każdy — ż niewymienne, zapamiętaj" },
    { word: "pi_ama",    answer: "ż",  hint: "R7: piżama — ż niewymienne, zapamiętaj" },
    { word: "fili_anka", answer: "ż",  hint: "R7: filiżanka — ż niewymienne, zapamiętaj" },
    { word: "ostro_ny",  answer: "ż",  hint: "R7: ostrożny — ż niewymienne" },
    { word: "_aba",      answer: "ż",  hint: "R7: żaba — ż niewymienne na początku. Zapamiętaj!" },
    { word: "_ołnierz",  answer: "ż",  hint: "R7: żołnierz — ż na początku + rz na końcu! Podwójna trudność" },
  ],
};

// ─── P5: WYRAZY POKREWNE ───
const WORD_FAMILIES = [
  { root: "las",    family: ["las","lasy","leśnik","leśny","leśniczówka","lasek","zalesienie"], intruders: ["list","laska","lis"] },
  { root: "morze",  family: ["morze","morza","morski","nadmorski","marynarz","pomorze"], intruders: ["marzec","morwa","marchew"] },
  { root: "dom",    family: ["dom","domy","domek","domowy","domownik","bezdomny"], intruders: ["donica","domena","domin"] },
  { root: "rower",  family: ["rower","rowery","rowerzysta","rowerowy"], intruders: ["równy","rów","rewolucja"] },
  { root: "woda",   family: ["woda","wody","wodny","wodnik","wodospad","podwodny"], intruders: ["wolny","wołać","wosk"] },
  { root: "góra",   family: ["góra","góry","góral","górski","górka","pogórze"], intruders: ["goryl","gorący","gość"] },
  { root: "pies",   family: ["pies","psy","piesek","pieski","psi","psiarnia","psiak"], intruders: ["piasek","pisać","pieśń"] },
  { root: "szkoła", family: ["szkoła","szkoły","szkolny","szkolak","szkolenie","przeszkolenie"], intruders: ["szkło","szklanka","szkoda"] },
  { root: "zima",   family: ["zima","zimy","zimowy","zimno","zimowisko","przezimować","zimować"], intruders: ["zamek","zebra","ziemia"] },
  { root: "kwiat",  family: ["kwiat","kwiaty","kwiatek","kwiatowy","kwiaciarnia"], intruders: ["kwadrat","kwaśny","kwota"] },
  { root: "droga",  family: ["droga","drogi","drogowy","dróżka","podróż","podróżnik"], intruders: ["drewno","drabina","dreszcz"] },
  { root: "noc",    family: ["noc","noce","nocny","nocleg","nocować","północ"], intruders: ["nos","noga","nowy"] },
];

// ─── P3: ORTOGRAFIA ch/h ───
const ORTHO_CHH = {
  tier1: [
    { word: "mu_a",      answer: "ch", hint: "R1: mucha → musze (ch wymienia się na sz)" },
    { word: "su_o",      answer: "ch", hint: "R1: sucho → suszy (ch→sz)" },
    { word: "u_o",       answer: "ch", hint: "R1: ucho → uszko (ch→sz)" },
    { word: "du_",       answer: "ch", hint: "R1: duch → dusza (ch→sz)" },
    { word: "_leb",      answer: "ch", hint: "R4: chleb — ch niewymienne, zapamiętaj" },
    { word: "_odnik",    answer: "ch", hint: "R4: chodnik — ch niewymienne" },
    { word: "_erbata",   answer: "h",  hint: "R8: herbata — h niewymienne, zapamiętaj" },
    { word: "_ałas",     answer: "h",  hint: "R7+R8: hałas — h na początku głośnego wyrazu" },
    { word: "_amak",     answer: "h",  hint: "R8: hamak — h niewymienne" },
    { word: "_ura",      answer: "h",  hint: "R7: hura! — h na początku głośnego wyrazu" },
  ],
  tier2: [
    { word: "da_",       answer: "ch", hint: "R2: dach — ch na końcu wyrazu. Prawie zawsze ch na końcu!" },
    { word: "gro_",      answer: "ch", hint: "R2: groch — ch na końcu wyrazu" },
    { word: "pośpie_",   answer: "ch", hint: "R2: pośpiech — ch na końcu" },
    { word: "s_udnąć",   answer: "ch", hint: "R3: schudnąć — ch po S" },
    { word: "s_abowy",   answer: "ch", hint: "R3: schabowy — ch po S" },
    { word: "_mura",     answer: "ch", hint: "R4: chmura — ch niewymienne" },
    { word: "_wila",     answer: "ch", hint: "R4: chwila — ch niewymienne" },
    { word: "_ustka",    answer: "ch", hint: "R4: chustka — ch niewymienne" },
    { word: "_yba",      answer: "ch", hint: "R4: chyba — ch niewymienne" },
    { word: "dru_",      answer: "h",  hint: "R5: druh → drużyna (h wymienia się na ż)" },
    { word: "_ełm",      answer: "h",  hint: "R8: hełm — h niewymienne" },
    { word: "_uragan",   answer: "h",  hint: "R8: huragan — h niewymienne" },
    { word: "_arcerz",   answer: "h",  hint: "R8: harcerz — h niewymienne" },
  ],
  tier3: [
    { word: "_oinka",    answer: "ch", hint: "R4: choinka — ch niewymienne" },
    { word: "_łopiec",   answer: "ch", hint: "R4: chłopiec — ch niewymienne" },
    { word: "wy_owanie", answer: "ch", hint: "R4: wychowanie — ch niewymienne" },
    { word: "_arakter",  answer: "ch", hint: "R4: charakter — ch! Choć wyraz z greki, piszemy ch" },
    { word: "te_nik",    answer: "ch", hint: "R4: technik — ch niewymienne" },
    { word: "_ór",       answer: "ch", hint: "R4: chór — ch niewymienne" },
    { word: "_orągiew",  answer: "ch", hint: "R4: chorągiew — ch niewymienne" },
    { word: "z_ańbiony", answer: "h",  hint: "R6: zhańbiony — h po Z" },
    { word: "_istoria",  answer: "h",  hint: "R8: historia — h niewymienne" },
    { word: "_ipopotam", answer: "h",  hint: "R8: hipopotam — h niewymienne" },
    { word: "_armonijka",answer: "h",  hint: "R8: harmonijka — h niewymienne" },
    { word: "_ymn",      answer: "h",  hint: "R8: hymn — h niewymienne" },
    { word: "_andel",    answer: "h",  hint: "R8: handel — h niewymienne" },
    { word: "_otel",     answer: "h",  hint: "R8: hotel — h niewymienne" },
    { word: "_uśtawka",  answer: "h",  hint: "R8: huśtawka — h niewymienne" },
    { word: "_umor",     answer: "h",  hint: "R8: humor — h niewymienne" },
  ],
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
    return this._clockQuiz(h, m, minuteOptions);
  },

  _clockQuestion5min() {
    const h = randInt(1, 12);
    const m = randInt(0, 11) * 5;
    const allMin = [];
    for (let i = 0; i < 12; i++) allMin.push(i * 5);
    return this._clockQuiz(h, m, allMin);
  },

  _clockQuiz(h, m, minutePool) {
    const fmt = (hh, mm) => `${hh}:${String(mm).padStart(2, '0')}`;
    const correct = fmt(h, m);
    const wrongs = new Set();
    let safety = 0;
    while (wrongs.size < 2 && safety++ < 50) {
      // Wrong hour or wrong minutes
      if (Math.random() < 0.5) {
        let wh;
        do { wh = randInt(1, 12); } while (wh === h);
        const w = fmt(wh, m);
        if (w !== correct) wrongs.add(w);
      } else {
        let wm;
        do { wm = minutePool[Math.floor(Math.random() * minutePool.length)]; } while (wm === m);
        const w = fmt(h, wm);
        if (w !== correct) wrongs.add(w);
      }
    }
    const answers = [correct, ...wrongs];
    answers.sort(() => Math.random() - 0.5);
    const correctIndex = answers.indexOf(correct);
    const labels = ['A', 'B', 'C'];
    return {
      text: '',
      html: `<div style="text-align:center;"><div style="font-size:14px;color:#aaa;margin-bottom:8px;">🕐 Która jest godzina?</div>${clockSVG(h, m)}</div>`,
      type: 'quiz',
      answers,
      correctIndex,
      answer: labels[correctIndex],
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

// ─── M13: JEDNOSTKI MIARY (masa) ───
const UnitsGen = {
  units(floor) {
    if (floor === 1) return this._basicConversion();
    if (floor === 2) return this._conversion();
    return Math.random() < 0.5 ? this._unitCalc() : this._unitWord();
  },

  _basicConversion() {
    const facts = [
      { text: '1 kg = ☐ dag', answer: '100', hint: '1 kilogram = 100 dekagramów' },
      { text: '1 dag = ☐ g', answer: '10', hint: '1 dekagram = 10 gramów' },
      { text: '1 kg = ☐ g', answer: '1000', hint: '1 kg = 100 dag = 1000 g' },
      { text: '10 dag = ☐ g', answer: '100', hint: '1 dag = 10 g, więc 10 dag = ?' },
      { text: '100 g = ☐ dag', answer: '10', hint: '10 g = 1 dag' },
      { text: '1000 g = ☐ kg', answer: '1', hint: '1000 g = 1 kg' },
      { text: '50 dag = ☐ kg', answer: '0', hint: '50 dag to pół kilograma, ale ile pełnych kg?' },
      { text: '100 dag = ☐ kg', answer: '1', hint: '100 dag = 1 kg' },
    ];
    const f = facts[Math.floor(Math.random() * facts.length)];
    return { text: f.text, answer: f.answer, type: 'number', hint: f.hint };
  },

  _conversion() {
    const templates = [
      () => { const n = randInt(1, 9) * 50; return { text: `${n} g = ☐ dag`, answer: String(n / 10), hint: '10 g = 1 dag' }; },
      () => { const n = randInt(2, 9); return { text: `${n} kg = ☐ dag`, answer: String(n * 100), hint: '1 kg = 100 dag' }; },
      () => { const n = randInt(1, 9) * 10; return { text: `${n} dag = ☐ g`, answer: String(n * 10), hint: '1 dag = 10 g' }; },
      () => { const n = randInt(2, 9) * 100; return { text: `${n} g = ☐ dag`, answer: String(n / 10), hint: '10 g = 1 dag' }; },
      () => { const n = randInt(2, 5); return { text: `${n} kg = ☐ g`, answer: String(n * 1000), hint: '1 kg = 1000 g' }; },
      () => { const n = randInt(2, 9) * 100; return { text: `${n} dag = ☐ kg`, answer: String(n / 100), hint: '100 dag = 1 kg' }; },
    ];
    const gen = templates[Math.floor(Math.random() * templates.length)];
    const q = gen();
    return { text: q.text, answer: q.answer, type: 'number', hint: q.hint };
  },

  _unitCalc() {
    const kgA = randInt(3, 15);
    const dagA = randInt(10, 90);
    const kgB = randInt(1, kgA - 1);
    const dagB = randInt(5, 80);
    const isAdd = Math.random() < 0.5;
    let rKg, rDag;
    if (isAdd) {
      rDag = dagA + dagB;
      rKg = kgA + kgB;
      if (rDag >= 100) { rKg++; rDag -= 100; }
      return {
        text: `${kgA} kg ${dagA} dag + ${kgB} kg ${dagB} dag = ?\n\nWpisz TYLKO dag (łącznie)`,
        answer: String(rKg * 100 + rDag),
        type: 'number',
        hint: `Zamień wszystko na dag: ${kgA}×100+${dagA} + ${kgB}×100+${dagB}`,
        cssClass: 'word-problem'
      };
    } else {
      // Ensure a > b
      const totalA = kgA * 100 + dagA;
      const totalB = kgB * 100 + dagB;
      if (totalA <= totalB) return this._unitCalc();
      const result = totalA - totalB;
      return {
        text: `${kgA} kg ${dagA} dag − ${kgB} kg ${dagB} dag = ?\n\nWpisz TYLKO dag (łącznie)`,
        answer: String(result),
        type: 'number',
        hint: `Zamień na dag: ${totalA} − ${totalB}`,
        cssClass: 'word-problem'
      };
    }
  },

  _unitWord() {
    const problems = [
      () => {
        const kgVal = randInt(1, 3);
        const gVal = randInt(1, 9) * 100;
        return { text: `Ola kupiła ${kgVal} kg jabłek\ni ${gVal} g pomidorów.\nIle gramów ważą razem?`, answer: String(kgVal * 1000 + gVal), hint: `${kgVal} kg = ${kgVal * 1000} g` };
      },
      () => {
        const dagVal = randInt(20, 80);
        const kgVal = randInt(1, 2);
        return { text: `Paczka waży ${kgVal} kg ${dagVal} dag.\nIle to gramów łącznie?`, answer: String(kgVal * 1000 + dagVal * 10), hint: `${kgVal} kg = ${kgVal * 1000} g, ${dagVal} dag = ${dagVal * 10} g` };
      },
      () => {
        const total = randInt(2, 5) * 1000;
        const used = randInt(1, total / 1000 - 1) * 1000 + randInt(1, 9) * 100;
        return { text: `Mama miała ${total / 1000} kg mąki.\nZużyła ${used} g.\nIle gramów zostało?`, answer: String(total - used), hint: `${total / 1000} kg = ${total} g` };
      },
    ];
    const gen = problems[Math.floor(Math.random() * problems.length)];
    const q = gen();
    return { text: q.text, answer: q.answer, type: 'number', hint: q.hint, cssClass: 'word-problem' };
  },
};

// ─── M14: CYFRY RZYMSKIE ───
const ROMAN = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X',11:'XI',12:'XII'};
const ROMAN_ENTRIES = Object.entries(ROMAN).map(([k,v]) => ({num: Number(k), rom: v}));

const RomanGen = {
  roman(floor) {
    if (floor === 1) return this._read();
    if (floor === 2) return Math.random() < 0.5 ? this._write() : this._romanMonth();
    const r = Math.random();
    if (r < 0.5) return this._sort();
    return r < 0.75 ? this._romanQuarter() : this._compare();
  },

  _read() {
    const e = ROMAN_ENTRIES[Math.floor(Math.random() * ROMAN_ENTRIES.length)];
    return { text: `Co oznacza ${e.rom}?`, type: 'number', answer: String(e.num), hint: `I=1, V=5, X=10` };
  },

  _write() {
    const e = ROMAN_ENTRIES[Math.floor(Math.random() * ROMAN_ENTRIES.length)];
    return { text: `Zapisz ${e.num} cyframi rzymskimi`, type: 'text', answer: e.rom, hint: `I=1, V=5, X=10` };
  },

  _romanMonth() {
    const m = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    if (Math.random() < 0.5) {
      return { text: `Który miesiąc to ${ROMAN[m.num]}?`, type: 'text', answer: m.name, hint: `${ROMAN[m.num]} = ${m.num}. miesiąc` };
    } else {
      return { text: `Zapisz numer miesiąca\n${m.name} cyframi rzymskimi`, type: 'text', answer: ROMAN[m.num], hint: `${m.name} = ${m.num}. miesiąc` };
    }
  },

  _romanQuarter() {
    const m = MONTHS[Math.floor(Math.random() * MONTHS.length)];
    return { text: `W którym kwartale jest ${m.name}?\nZapisz cyfrą rzymską.`, type: 'text', answer: m.quarter, hint: `I kw.=sty–mar, II=kwi–cze, III=lip–wrz, IV=paź–gru` };
  },

  _compare() {
    let a, b;
    do { a = randInt(1, 12); b = randInt(1, 12); } while (a === b);
    const correct = a > b ? '>' : '<';
    return {
      text: `Który znak pasuje?\n\n${ROMAN[a]}  ☐  ${ROMAN[b]}`,
      type: 'quiz',
      answers: ['<', '>'],
      correctIndex: correct === '<' ? 0 : 1,
      answer: correct === '<' ? 'A' : 'B',
      hint: `${ROMAN[a]}=${a}, ${ROMAN[b]}=${b}`,
      cssClass: 'word-problem'
    };
  },

  _sort() {
    // Pick 4 distinct numbers, ask to sort ascending
    const nums = new Set();
    while (nums.size < 4) nums.add(randInt(1, 12));
    const arr = [...nums];
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    const sorted = [...arr].sort((a, b) => a - b);
    const display = shuffled.map(n => ROMAN[n]).join(', ');
    const answer = sorted.map(n => ROMAN[n]).join(', ');
    return {
      text: `Ułóż od najmniejszego:\n\n${display}`,
      type: 'text',
      answer: answer,
      hint: `Zamień na zwykłe liczby i posortuj`,
      cssClass: 'word-problem'
    };
  },
};

Subjects.register('class3', {
  name: 'Klasa 3',
  icon: '🧮',
  description: 'Matematyka — klasa 3 szkoły podstawowej',
  mathGen: MathGen3,

  categories: [
    { id: 'addSub100', icon: '➕', name: 'Dodawanie i odejmowanie do 100', desc: 'Bez progu / z progiem / brakująca liczba', gen: (f) => MathGen3.addSub100(f) },
    { id: 'multiplyDivide', icon: '✖️', name: 'Tabliczka mnożenia i dzielenie', desc: '×÷ do 5 / do 10 / brakujący czynnik', gen: (f) => MathGen3.multiplyDivide(f) },
    { id: 'comparison', icon: '⚖️', name: 'Porównywanie liczb', desc: '2-cyfrowe / 3-cyfrowe / wyrażenia', gen: (f) => MathGen3.comparison(f) },
    { id: 'fractionFigure3', icon: '🟦', name: 'Ułamki z obrazka', desc: '½,¼ / ⅓,⅙ / ⅕,⅛', gen: (f) => MathGen3.fractionFigure(f) },
    { id: 'writtenCalc3', icon: '📝', name: 'Działania pisemne', desc: '2-cyfrowe / 3-cyfrowe / trzy liczby i odejmowanie', gen: (f) => MathGen3.writtenCalc(f) },
    { id: 'orderOfOps3', icon: '🔢', name: 'Kolejność działań', desc: 'Bez nawiasów / nawiasy / 3 działania', gen: (f) => MathGen3.orderOfOps(f) },
    { id: 'sequence', icon: '🔗', name: 'Ciągi liczbowe', desc: 'Rosnące / malejące / geometryczne', gen: (f) => MathGen3.numberSequence(f) },
    { id: 'wordProblem3', icon: '📖', name: 'Zadania z treścią', desc: 'Jedno- / dwu- / wieloetapowe', gen: (f) => MathGen3.wordProblem(f) },
    { id: 'clockCalendar', icon: '🕐', name: 'Zegar i kalendarz', desc: 'Odczytaj godzinę, miesiące, kwartały', gen: (f) => ClockCalGen.clockAndCalendar(f) },
    { id: 'digits', icon: '🔢', name: 'Cyfry i liczby', desc: 'Ile cyfr, suma cyfr, układanie liczb', gen: (f) => DigitsGen.digitsAndNumbers(f) },
    { id: 'units', icon: '⚖️', name: 'Jednostki miary (masa)', desc: 'kg, dag, g — przeliczanie i zadania', gen: (f) => UnitsGen.units(f) },
    { id: 'roman', icon: '🏛️', name: 'Cyfry rzymskie', desc: 'I–XII: odczytaj, zapisz, posortuj', gen: (f) => RomanGen.roman(f) },
    // POLSKI
    { id: 'orthoOU', icon: '✏️', name: 'Ortografia ó/u', desc: 'Wpisz ó lub u w brakujące miejsce', gen: (f) => PolishGen3.ortografiaOU(f) },
    { id: 'orthoRZZ', icon: '✏️', name: 'Ortografia rz/ż', desc: 'Wpisz rz lub ż w brakujące miejsce', gen: (f) => PolishGen3.ortografiaRZZ(f) },
    { id: 'orthoCHH', icon: '✏️', name: 'Ortografia ch/h', desc: 'Wpisz ch lub h w brakujące miejsce', gen: (f) => PolishGen3.ortografiaCHH(f) },
    { id: 'partsOfSpeech', icon: '📗', name: 'Części mowy', desc: 'Rzeczownik, czasownik czy przymiotnik?', gen: (f) => PolishGen3.partsOfSpeech(f) },
    { id: 'wordFamilies', icon: '🌳', name: 'Wyrazy pokrewne', desc: 'Rodziny wyrazów — wspólny rdzeń', gen: (f) => PolishGen3.wordFamilies(f) },
  ],

  easyPool: [
    { id: 'addSub100', gen: () => MathGen3.addSub100(1) },
    { id: 'addSub100', gen: () => MathGen3.addSub100(1) },
    { id: 'addSub100', gen: () => MathGen3.addSub100(1) },
    { id: 'addSub100', gen: () => MathGen3.addSub100(1) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(1) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(1) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(1) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(1) },
    { id: 'comparison', gen: () => MathGen3.comparison(1) },
    { id: 'comparison', gen: () => MathGen3.comparison(1) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(1) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(1) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(1) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(1) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(1) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(1) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(1) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(1) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(1) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(1) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(1) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(1) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(1) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(1) },
    { id: 'units', gen: () => UnitsGen.units(1) },
    { id: 'units', gen: () => UnitsGen.units(1) },
    { id: 'roman', gen: () => RomanGen.roman(1) },
    { id: 'roman', gen: () => RomanGen.roman(1) },
  ],

  mediumPool: [
    { id: 'addSub100', gen: () => MathGen3.addSub100(2) },
    { id: 'addSub100', gen: () => MathGen3.addSub100(2) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(2) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(2) },
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure(2) },
    { id: 'fractionFigure3', gen: () => MathGen3.fractionFigure(2) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(2) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(2) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(2) },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps(2) },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps(2) },
    { id: 'sequence', gen: () => MathGen3.numberSequence(2) },
    { id: 'sequence', gen: () => MathGen3.numberSequence(2) },
    { id: 'comparison', gen: () => MathGen3.comparison(2) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(2) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(2) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(2) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(2) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(2) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(2) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(2) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(2) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(2) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(2) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(2) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(2) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(2) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(2) },
    { id: 'units', gen: () => UnitsGen.units(2) },
    { id: 'units', gen: () => UnitsGen.units(2) },
    { id: 'roman', gen: () => RomanGen.roman(2) },
    { id: 'roman', gen: () => RomanGen.roman(2) },
  ],

  hardPool: [
    { id: 'addSub100', gen: () => MathGen3.addSub100(3) },
    { id: 'addSub100', gen: () => MathGen3.addSub100(3) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(3) },
    { id: 'multiplyDivide', gen: () => MathGen3.multiplyDivide(3) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(3) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(3) },
    { id: 'writtenCalc3', gen: () => MathGen3.writtenCalc(3) },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps(3) },
    { id: 'orderOfOps3', gen: () => MathGen3.orderOfOps(3) },
    { id: 'sequence', gen: () => MathGen3.numberSequence(3) },
    { id: 'sequence', gen: () => MathGen3.numberSequence(3) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(3) },
    { id: 'orthoOU', gen: () => PolishGen3.ortografiaOU(3) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(3) },
    { id: 'orthoRZZ', gen: () => PolishGen3.ortografiaRZZ(3) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(3) },
    { id: 'orthoCHH', gen: () => PolishGen3.ortografiaCHH(3) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(3) },
    { id: 'partsOfSpeech', gen: () => PolishGen3.partsOfSpeech(3) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(3) },
    { id: 'wordFamilies', gen: () => PolishGen3.wordFamilies(3) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(3) },
    { id: 'clockCalendar', gen: () => ClockCalGen.clockAndCalendar(3) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(3) },
    { id: 'digits', gen: () => DigitsGen.digitsAndNumbers(3) },
    { id: 'units', gen: () => UnitsGen.units(3) },
    { id: 'units', gen: () => UnitsGen.units(3) },
    { id: 'roman', gen: () => RomanGen.roman(3) },
    { id: 'roman', gen: () => RomanGen.roman(3) },
  ],
});

})();
