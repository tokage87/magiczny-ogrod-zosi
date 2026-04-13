// ═══════════════════════════════════════════
//  KLASA 4 — Matematyka szkoły podstawowej
// ═══════════════════════════════════════════
// Korzysta z globalnych: randInt, drawFractionFigure, drawNumberLine

(function() {

const MathGen4 = {

  // ── Category A: Missing number ──
  missingNumber(floor) {
    const ops = ['+', '-', '·', ':'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const pos = Math.random() < 0.5 ? 'left' : 'right'; // position of unknown
    let a, b, result, answer;
    const maxNum = floor === 1 ? 50 : floor === 2 ? 200 : 500;

    if (op === '+') {
      a = randInt(10, maxNum);
      b = randInt(10, maxNum);
      result = a + b;
      if (pos === 'left') {
        answer = a;
        return { text: `☐ + ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        answer = b;
        return { text: `${a} + ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    } else if (op === '-') {
      a = randInt(20, maxNum + 50);
      b = randInt(10, a - 1);
      result = a - b;
      if (pos === 'left') {
        return { text: `☐ − ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        return { text: `${a} − ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    } else if (op === '·') {
      b = randInt(2, 12);
      a = randInt(2, floor === 1 ? 12 : 25);
      result = a * b;
      if (pos === 'left') {
        return { text: `☐ · ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        return { text: `${a} · ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    } else { // :
      b = randInt(2, 12);
      a = b * randInt(2, floor === 1 ? 12 : 25);
      result = a / b;
      if (pos === 'left') {
        return { text: `☐ : ${b} = ${result}`, answer: String(a), type: 'number' };
      } else {
        return { text: `${a} : ☐ = ${result}`, answer: String(b), type: 'number' };
      }
    }
  },

  // ── Category B: Calculations ──
  calculation(floor) {
    const ops = ['+', '-', '·', ':'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, result;
    const maxNum = floor === 1 ? 100 : floor === 2 ? 1000 : 10000;

    if (op === '+') {
      a = randInt(10, maxNum);
      b = randInt(10, maxNum);
      result = a + b;
      return { text: `${a} + ${b} = ?`, answer: String(result), type: 'number' };
    } else if (op === '-') {
      a = randInt(20, maxNum);
      b = randInt(10, a);
      result = a - b;
      return { text: `${a} − ${b} = ?`, answer: String(result), type: 'number' };
    } else if (op === '·') {
      if (floor === 1) { a = randInt(2, 12); b = randInt(2, 12); }
      else if (floor === 2) { a = randInt(10, 99); b = randInt(2, 10); }
      else { a = randInt(10, 999); b = randInt(2, 10); }
      result = a * b;
      return { text: `${a} · ${b} = ?`, answer: String(result), type: 'number' };
    } else {
      b = randInt(2, 12);
      result = randInt(2, floor === 1 ? 20 : floor === 2 ? 100 : 500);
      a = b * result;
      return { text: `${a} : ${b} = ?`, answer: String(result), type: 'number' };
    }
  },

  // ── Category C: Written calculations ──
  writtenCalc(floor) {
    const isAdd = Math.random() < 0.5;
    let a, b, result;
    if (isAdd) {
      a = randInt(100, floor === 2 ? 9999 : 4999);
      b = randInt(10, floor === 2 ? 9999 : 2999);
      result = a + b;
      const aStr = String(a);
      const bStr = String(b);
      const maxLen = Math.max(aStr.length, bStr.length);
      const line = '─'.repeat(maxLen + 2);
      const display = `  ${aStr.padStart(maxLen)}\n+ ${bStr.padStart(maxLen)}\n${line}\n  ???`;
      return { text: display, answer: String(result), type: 'number', cssClass: 'written-calc' };
    } else {
      a = randInt(200, floor === 2 ? 9999 : 5999);
      b = randInt(10, a - 1);
      result = a - b;
      const aStr = String(a);
      const bStr = String(b);
      const maxLen = Math.max(aStr.length, bStr.length);
      const line = '─'.repeat(maxLen + 2);
      const display = `  ${aStr.padStart(maxLen)}\n− ${bStr.padStart(maxLen)}\n${line}\n  ???`;
      return { text: display, answer: String(result), type: 'number', cssClass: 'written-calc' };
    }
  },

  // ── Category D: Fraction reduction ──
  fractionReduce() {
    const fractions = [
      [1,2], [1,3], [1,4], [1,5], [1,6], [1,7], [1,8], [1,9], [1,10],
      [2,3], [2,5], [2,7], [2,9],
      [3,4], [3,5], [3,7], [3,8], [3,10],
      [4,5], [4,7], [4,9],
      [5,6], [5,7], [5,8], [5,9],
      [6,7],
      [7,8], [7,9], [7,10],
      [8,9],
      [9,10],
    ];
    const [num, den] = fractions[Math.floor(Math.random() * fractions.length)];
    const factor = randInt(2, 7);
    return {
      text: '',
      displayNum: num * factor,
      displayDen: den * factor,
      answer: `${num}/${den}`,
      type: 'fraction',
      correctNum: num,
      correctDen: den
    };
  },

  // ── Category E: Number words (Polish) ──
  numberWords(floor) {
    const max = floor === 1 ? 999 : 9999;
    const min = floor === 1 ? 100 : 100;
    const n = randInt(min, max);

    if (Math.random() < 0.8) {
      // Number → word (80% — priorytet)
      return {
        text: `Zapisz słownie:\n\n${n}`,
        answer: numberToPolish(n).toLowerCase().trim(),
        type: 'text'
      };
    } else {
      // Word → number (20%)
      const word = numberToPolish(n);
      return {
        text: `Zapisz cyframi:\n\n"${word}"`,
        answer: String(n),
        type: 'number'
      };
    }
  },

  // ── Category F: Word problems ──
  wordProblem() {
    const problems = [
      () => {
        const a = randInt(20, 80);
        const diff = randInt(10, Math.min(30, a - 5));
        return { text: `Tomek ma ${a} modeli samochodów,\nKrzyś o ${diff} mniej.\nIle mają razem?`, answer: String(a + (a - diff)) };
      },
      () => {
        const pupils = randInt(10, 20);
        const diff = randInt(2, 6);
        return { text: `W klasie jest ${pupils} chłopców,\na dziewcząt o ${diff} więcej.\nIlu uczniów jest w klasie?`, answer: String(pupils + pupils + diff) };
      },
      () => {
        const price = randInt(5, 15);
        const count = randInt(3, 6);
        const cost = price * count;
        // Realistic banknote values
        const banknotes = [20, 50, 100, 200];
        const paid = banknotes.find(b => b > cost) || 200;
        return { text: `Mama kupiła ${count} zeszytów po ${price} zł.\nZapłaciła banknotem ${paid} zł.\nIle dostała reszty?`, answer: String(paid - cost) };
      },
      () => {
        const a = randInt(100, 500);
        const b = randInt(100, 500);
        const c = randInt(100, 500);
        return { text: `W sklepie sprzedano:\nponiedziałek — ${a} bułek\nwtorek — ${b} bułek\nśroda — ${c} bułek\nIle bułek sprzedano łącznie?`, answer: String(a + b + c) };
      },
      () => {
        const total = randInt(200, 600);
        const part = randInt(50, total - 50);
        return { text: `Na wycieczce było ${total} osób.\n${part} pojechało autobusem,\nreszta pociągiem.\nIle osób jechało pociągiem?`, answer: String(total - part) };
      },
      () => {
        const perRow = randInt(6, 12);
        const rows = randInt(4, 8);
        return { text: `W kinie jest ${rows} rzędów.\nW każdym rzędzie ${perRow} miejsc.\nIle jest miejsc w kinie?`, answer: String(perRow * rows) };
      },
      () => {
        const shelves = randInt(5, 10);
        const perShelf = randInt(8, 25);
        const total = perShelf * shelves;
        return { text: `W bibliotece jest ${total} książek\nrozmieszczonych równo na ${shelves} półkach.\nIle książek jest na jednej półce?`, answer: String(perShelf) };
      },
      () => {
        const a = randInt(20, 60);
        const b = randInt(5, a - 5);
        const c = a - b;
        return { text: `Ola zebrała ${a} grzybów.\nPrawdziwków było ${b},\na reszta to kurki.\nIle było kurek?`, answer: String(c) };
      },
      () => {
        const days = randInt(3, 6);
        const perDay = randInt(20, 60);
        const dist = perDay * days;
        return { text: `Turysta pokonuje ${dist} km\nw ciągu ${days} dni, równo każdego dnia.\nIle km dziennie pokonuje?`, answer: String(perDay) };
      },
      () => {
        const bags = randInt(3, 8);
        const perBag = randInt(5, 15);
        const realTotal = perBag * bags;
        return { text: `Mama rozłożyła ${realTotal} jabłek\nrówno do ${bags} toreb.\nIle jabłek jest w jednej torbie?`, answer: String(perBag) };
      },
      () => {
        const groups = randInt(2, 5);
        const perGroup = randInt(4, 10);
        const realTotal = perGroup * groups;
        const girls = randInt(Math.floor(realTotal / 3), Math.floor(realTotal / 2));
        const boys = realTotal - girls;
        return { text: `W klasie jest ${boys} chłopców\ni ${girls} dziewcząt.\nNauczyciel podzielił ich\nrówno na ${groups} grupy.\nIle osób w grupie?`, answer: String(perGroup) };
      },
      () => {
        const saved = randInt(50, 200);
        const gift = randInt(20, 100);
        const total = saved + gift;
        const toy = randInt(30, total - 10);
        return { text: `Kasia miała ${saved} zł oszczędności.\nDostała ${gift} zł od babci.\nKupiła zabawkę za ${toy} zł.\nIle zostało Kasi?`, answer: String(total - toy) };
      },
      () => {
        const packs = randInt(3, 7);
        const perPack = randInt(6, 12);
        const totalC = packs * perPack;
        const ate = randInt(3, Math.floor(totalC / 2));
        return { text: `Tata kupił ${packs} paczek ciastek.\nW każdej paczce ${perPack} ciastek.\nDzieci zjadły ${ate} ciastek.\nIle zostało?`, answer: String(totalC - ate) };
      },
      () => {
        const students = randInt(20, 35);
        const pencils = randInt(3, 6);
        return { text: `W klasie jest ${students} uczniów.\nKażdy potrzebuje ${pencils} ołówków.\nIle ołówków trzeba kupić?`, answer: String(students * pencils) };
      },
      () => {
        const floors = randInt(3, 8);
        const perFloor = randInt(4, 10);
        const total = floors * perFloor;
        const empty = randInt(2, Math.min(8, total - 5));
        return { text: `W bloku jest ${floors} pięter.\nNa każdym piętrze ${perFloor} mieszkań.\n${empty} mieszkań jest pustych.\nIle jest zajętych?`, answer: String(total - empty) };
      }
    ];

    const gen = problems[Math.floor(Math.random() * problems.length)];
    const p = gen();
    return { text: p.text, answer: p.answer, type: 'number', cssClass: 'word-problem' };
  },

  // ── Category G: Number line (canvas-rendered) ──
  numberLine(floor) {
    const step = floor === 1 ? randInt(1, 5) * 5 : floor === 2 ? randInt(1, 10) * 10 : randInt(1, 5) * 100;
    const startVal = floor === 1 ? 0 : floor === 2 ? randInt(0, 5) * 100 : randInt(0, 10) * 1000;
    const numMarks = 7;
    const missingIdx = randInt(1, numMarks - 2);
    const answer = startVal + missingIdx * step;

    // Store mark data for canvas rendering
    const marks = [];
    for (let i = 0; i < numMarks; i++) {
      marks.push({ value: startVal + i * step, hidden: i === missingIdx });
    }

    return {
      text: 'Odczytaj brakującą liczbę z osi:',
      type: 'numberline',
      marks,
      answer: String(answer)
    };
  },

  // ── Category H: Written multiplication ──
  writtenMultiply(floor) {
    let a, b;
    if (Math.random() < 0.25) {
      // Mnożenie przez 1-cyfrową (25%)
      a = randInt(12, floor <= 2 ? 999 : 9999);
      b = randInt(2, 9);
    } else {
      // Mnożenie przez 2-cyfrową (75%)
      a = randInt(12, floor <= 2 ? 99 : 999);
      b = randInt(11, floor <= 2 ? 49 : 99);
    }
    const result = a * b;
    const aStr = String(a);
    const bStr = String(b);
    const maxLen = Math.max(aStr.length, bStr.length);
    const line = '─'.repeat(maxLen + 2);
    const display = `  ${aStr.padStart(maxLen)}\n× ${bStr.padStart(maxLen)}\n${line}\n  ???`;
    return { text: display, answer: String(result), type: 'number', cssClass: 'written-calc' };
  },

  // ── Category I: Written division (visual grid) ──
  writtenDivide(floor) {
    const divisor = randInt(2, 9);
    // Max 3-digit dividend (klasa 4) → result is 2-digit
    const result = randInt(11, 99);
    const dividend = divisor * result; // max 9*99 = 891 → always 3 digits or less

    // Compute division steps for display
    const steps = [];
    const dividendStr = String(dividend);
    let carry = 0;
    const resultStr = String(result);

    for (let i = 0; i < dividendStr.length; i++) {
      carry = carry * 10 + parseInt(dividendStr[i]);
      const q = Math.floor(carry / divisor);
      const sub = q * divisor;
      const remainder = carry - sub;
      steps.push({ bring: carry, quotientDigit: q, subtract: sub, remainder });
      carry = remainder;
    }

    return {
      text: '',
      type: 'division',
      dividend, divisor, result, steps,
      answer: String(result)
    };
  },

  // ── Category J: Geometry — lines, rays, segments ──
  geometryBasic() {
    const questions = [
      {
        q: 'Ile końców ma odcinek?',
        a: ['0', '1', '2', 'Nieskończenie wiele'],
        correct: 2,
        hint: 'Odcinek to kawałek prostej ograniczony z DWÓCH stron'
      },
      {
        q: 'Ile końców ma półprosta?',
        a: ['0', '1', '2', '3'],
        correct: 1,
        hint: 'Półprosta zaczyna się w jednym punkcie i ciągnie w nieskończoność'
      },
      {
        q: 'Ile końców ma prosta?',
        a: ['0', '1', '2', '4'],
        correct: 0,
        hint: 'Prosta ciągnie się w nieskończoność w obu kierunkach'
      },
      {
        q: 'Co jest najdłuższe: odcinek, półprosta czy prosta?',
        a: ['Odcinek', 'Półprosta', 'Prosta', 'Wszystkie są takie same'],
        correct: 2,
        hint: 'Prosta nie ma końców — jest nieskończona'
      },
      {
        q: 'Jak nazywamy część prostej ograniczoną dwoma punktami?',
        a: ['Prosta', 'Półprosta', 'Odcinek', 'Promień'],
        correct: 2,
        hint: 'Ma dwa końce — jak kawałek sznurka'
      },
      {
        q: 'Jak nazywamy część prostej ograniczoną jednym punktem?',
        a: ['Odcinek', 'Prosta', 'Półprosta', 'Linia'],
        correct: 2,
        hint: 'Ma jeden początek, ale ciągnie się w nieskończoność'
      },
      {
        q: 'Ile punktów wyznacza odcinek?',
        a: ['0', '1', '2', '3'],
        correct: 2,
        hint: 'Odcinek AB — dwa punkty: A i B'
      },
      {
        q: 'Czy przez dwa punkty można poprowadzić tylko jedną prostą?',
        a: ['Tak, tylko jedną', 'Nie, dwie', 'Nie, trzy', 'Nie, nieskończenie wiele'],
        correct: 0,
        hint: 'Przez dwa punkty przechodzi dokładnie jedna prosta'
      },
      {
        q: 'Przez jeden punkt można poprowadzić...',
        a: ['Jedną prostą', 'Dwie proste', 'Trzy proste', 'Nieskończenie wiele prostych'],
        correct: 3,
        hint: 'Przez jeden punkt przechodzi nieskończenie wiele prostych — w każdym kierunku'
      },
      {
        q: 'Jak oznaczamy prostą przechodzącą przez punkty A i B?',
        a: ['AB (z kreską nad)', '|AB|', 'AB→', '(AB)'],
        correct: 0,
        hint: 'Prosta AB — kreska nad literami oznacza prostą'
      },
      {
        q: 'Czym różni się odcinek AB od prostej AB?',
        a: ['Niczym', 'Odcinek jest skończony, prosta nieskończona', 'Prosta jest krótsza', 'Odcinek jest krzywą'],
        correct: 1,
        hint: 'Odcinek ma dwa końce — prosta ciągnie się bez końca'
      },
      {
        q: 'Ile prostych można poprowadzić przez trzy punkty leżące na jednej linii?',
        a: ['0', '1', '3', 'Nieskończenie wiele'],
        correct: 1,
        hint: 'Punkty współliniowe — leżą na jednej prostej'
      },
      {
        q: 'Punkt leży na prostej. Na ile części dzieli tę prostą?',
        a: ['1', '2', '3', 'Nie dzieli'],
        correct: 1,
        hint: 'Punkt dzieli prostą na dwie półproste'
      },
      {
        q: 'Dwie proste na płaszczyźnie mogą...',
        a: ['Tylko się przecinać', 'Tylko być równoległe', 'Przecinać się lub być równoległe', 'Być krzywymi'],
        correct: 2,
        hint: 'Dwie proste: albo mają punkt wspólny, albo są równoległe'
      },
      {
        q: 'Co to jest punkt przecięcia?',
        a: ['Koniec odcinka', 'Punkt wspólny dwóch prostych', 'Środek prostej', 'Punkt na półprostej'],
        correct: 1,
        hint: 'Tam gdzie dwie proste się spotykają'
      },
      {
        q: 'Ile odcinków można narysować mając 3 punkty (nie na jednej prostej)?',
        a: ['1', '2', '3', '6'],
        correct: 2,
        hint: 'AB, BC, AC — trzy pary punktów, trzy odcinki'
      },
      {
        q: 'Jak nazywamy odległość między końcami odcinka?',
        a: ['Długość odcinka', 'Szerokość prostej', 'Promień', 'Średnica'],
        correct: 0,
        hint: 'Mierzymy linijką — to długość odcinka'
      },
      {
        q: 'Czy półprosta ma długość?',
        a: ['Tak, skończoną', 'Tak, nieskończoną', 'Nie ma długości', 'Ma długość 0'],
        correct: 1,
        hint: 'Półprosta zaczyna się w punkcie i ciągnie w nieskończoność'
      },
      {
        q: 'Ile odcinków wyznaczają 4 punkty na prostej?',
        a: ['3', '4', '6', '8'],
        correct: 2,
        hint: 'Każda para punktów to odcinek: AB, AC, AD, BC, BD, CD = 6'
      },
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];
    const labels = ['A', 'B', 'C', 'D'];
    return {
      text: `📐 Geometria:\n\n${q.q}`,
      type: 'quiz',
      answers: q.a,
      correctIndex: q.correct,
      hint: q.hint,
      answer: labels[q.correct],
      cssClass: 'word-problem'
    };
  },

  // ── Category K: Parallel and perpendicular lines (visual) ──
  geometryParallelPerp() {
    const types = ['parallel', 'perpendicular', 'neither'];
    const type = types[Math.floor(Math.random() * types.length)];

    // Canvas is 220x160, safe area 20..200 x 20..140
    const CX = 110, CY = 80, LEN = 55;

    const makeLine = (cx, cy, angleDeg) => {
      const rad = angleDeg * Math.PI / 180;
      return {
        x1: cx - Math.cos(rad) * LEN,
        y1: cy - Math.sin(rad) * LEN,
        x2: cx + Math.cos(rad) * LEN,
        y2: cy + Math.sin(rad) * LEN,
      };
    };

    let lines;
    if (type === 'parallel') {
      const angle = randInt(15, 165);
      const rad = angle * Math.PI / 180;
      // Offset perpendicular to the line direction
      const sep = randInt(25, 45);
      const nx = -Math.sin(rad), ny = Math.cos(rad);
      lines = [
        makeLine(CX + nx * sep/2, CY + ny * sep/2, angle),
        makeLine(CX - nx * sep/2, CY - ny * sep/2, angle),
      ];
    } else if (type === 'perpendicular') {
      const angle = randInt(15, 75);
      lines = [
        makeLine(CX, CY, angle),
        makeLine(CX, CY, angle + 90),
      ];
    } else {
      // Skośne — diff not 0 and not 90
      const a1 = randInt(10, 70);
      const diff = randInt(20, 60); // not 90
      lines = [
        makeLine(CX - 15, CY, a1),
        makeLine(CX + 15, CY, a1 + diff),
      ];
    }

    const correctIdx = type === 'parallel' ? 0 : type === 'perpendicular' ? 1 : 2;
    const labels = ['A', 'B', 'C'];

    return {
      text: `📐 Jaką relację mają te linie?`,
      type: 'geometry',
      lines,
      answers: ['Równoległe', 'Prostopadłe', 'Żadne z powyższych'],
      correctIndex: correctIdx,
      hint: type === 'parallel' ? 'Nigdy się nie przecinają — biegną w tym samym kierunku'
        : type === 'perpendicular' ? 'Przecinają się pod kątem prostym 90°'
        : 'Przecinają się, ale nie pod kątem prostym',
      answer: labels[correctIdx],
      cssClass: 'word-problem'
    };
  },

  // ── Category M: Fraction from figure (visual) ──
  fractionFigure() {
    // Pick random denominator (how many parts) and numerator (how many colored)
    const denOptions = [2, 3, 4, 5, 6, 8];
    const den = denOptions[Math.floor(Math.random() * denOptions.length)];
    const num = randInt(1, den - 1);
    // Pick shape type
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

  // ── Category L: Order of operations ──
  orderOfOps(floor) {
    const templates = [
      // Type 1: a + b · c
      () => {
        const a = randInt(2, 20);
        const b = randInt(2, 10);
        const c = randInt(2, 10);
        return { text: `${a} + ${b} · ${c} = ?`, answer: String(a + b * c) };
      },
      // Type 2: a · b + c
      () => {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const c = randInt(2, 20);
        return { text: `${a} · ${b} + ${c} = ?`, answer: String(a * b + c) };
      },
      // Type 3: a − b · c
      () => {
        const b = randInt(2, 8);
        const c = randInt(2, 8);
        const a = b * c + randInt(5, 30);
        return { text: `${a} − ${b} · ${c} = ?`, answer: String(a - b * c) };
      },
      // Type 4: a · b − c · d
      () => {
        const a = randInt(2, 8);
        const b = randInt(2, 8);
        const c = randInt(2, 6);
        const d = randInt(2, 6);
        const result = a * b - c * d;
        if (result < 0) return this.orderOfOps(floor); // retry if negative
        return { text: `${a} · ${b} − ${c} · ${d} = ?`, answer: String(result) };
      },
      // Type 5: (a + b) · c
      () => {
        const a = randInt(2, 15);
        const b = randInt(2, 15);
        const c = randInt(2, 8);
        return { text: `(${a} + ${b}) · ${c} = ?`, answer: String((a + b) * c) };
      },
      // Type 6: a · (b − c)
      () => {
        const c = randInt(2, 10);
        const b = c + randInt(2, 15);
        const a = randInt(2, 8);
        return { text: `${a} · (${b} − ${c}) = ?`, answer: String(a * (b - c)) };
      },
      // Type 7: a + b · c − d
      () => {
        const a = randInt(5, 20);
        const b = randInt(2, 8);
        const c = randInt(2, 8);
        const d = randInt(1, 10);
        const result = a + b * c - d;
        if (result < 0) return this.orderOfOps(floor); // retry
        return { text: `${a} + ${b} · ${c} − ${d} = ?`, answer: String(result) };
      },
      // Type 8: a · b + c · d
      () => {
        const a = randInt(2, 8);
        const b = randInt(2, 8);
        const c = randInt(2, 6);
        const d = randInt(2, 6);
        return { text: `${a} · ${b} + ${c} · ${d} = ?`, answer: String(a * b + c * d) };
      },
      // Type 9: (a + b) · c + d
      () => {
        const a = randInt(2, 10);
        const b = randInt(2, 10);
        const c = randInt(2, 6);
        const d = randInt(2, 15);
        return { text: `(${a} + ${b}) · ${c} + ${d} = ?`, answer: String((a + b) * c + d) };
      },
      // Type 10: a · (b + c) − d
      () => {
        const b = randInt(2, 10);
        const c = randInt(2, 10);
        const a = randInt(2, 6);
        const d = randInt(1, a * (b + c) - 1);
        return { text: `${a} · (${b} + ${c}) − ${d} = ?`, answer: String(a * (b + c) - d) };
      },
      // Type 11: a : b + c · d
      () => {
        const b = randInt(2, 9);
        const quotient = randInt(2, 12);
        const a = b * quotient;
        const c = randInt(2, 8);
        const d = randInt(2, 8);
        return { text: `${a} : ${b} + ${c} · ${d} = ?`, answer: String(quotient + c * d) };
      },
      // Type 12: a · b + c : d
      () => {
        const a = randInt(2, 8);
        const b = randInt(2, 8);
        const d = randInt(2, 9);
        const quotient = randInt(2, 12);
        const c = d * quotient;
        return { text: `${a} · ${b} + ${c} : ${d} = ?`, answer: String(a * b + quotient) };
      },
    ];
    const gen = templates[Math.floor(Math.random() * templates.length)];
    const q = gen();
    return { text: q.text, answer: q.answer, type: 'number' };
  },

  // ── Get question for floor ──
  getQuestion(floor) {
    if (floor === 1) {
      const r = Math.random();
      if (r < 0.4) return this.missingNumber(1);
      if (r < 0.8) return this.calculation(1);
      return this.numberWords(1);
    } else if (floor === 2) {
      const r = Math.random();
      if (r < 0.5) return this.writtenCalc(2);
      return this.fractionReduce();
    } else {
      const r = Math.random();
      if (r < 0.5) return this.wordProblem();
      if (r < 0.65) return this.missingNumber(3);
      if (r < 0.75) return this.calculation(3);
      if (r < 0.85) return this.writtenCalc(3);
      if (r < 0.95) return this.fractionReduce();
      return this.numberWords(3);
    }
  },

  getBossQuestion(floor) {
    if (floor === 1) {
      const r = Math.random();
      if (r < 0.33) return this.missingNumber(1);
      if (r < 0.66) return this.calculation(1);
      return this.numberWords(1);
    } else if (floor === 2) {
      const r = Math.random();
      if (r < 0.5) return this.writtenCalc(2);
      return this.fractionReduce();
    } else {
      return this.wordProblem();
    }
  }
};

function numberToPolish(n) {
  if (n === 0) return 'zero';

  const ones = ['', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'];
  const teens = ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście',
                 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście'];
  const tens = ['', 'dziesięć', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt',
                'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'];
  const hundreds = ['', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset',
                    'sześćset', 'siedemset', 'osiemset', 'dziewięćset'];
  const thousands_forms = ['tysięcy', 'tysiąc', 'tysiące', 'tysiące', 'tysiące', 'tysięcy',
                           'tysięcy', 'tysięcy', 'tysięcy', 'tysięcy'];

  let parts = [];
  const th = Math.floor(n / 1000);
  const rest = n % 1000;

  if (th > 0) {
    if (th === 1) {
      parts.push('tysiąc');
    } else if (th >= 2 && th <= 4) {
      parts.push(ones[th] + ' tysiące');
    } else if (th >= 5 && th <= 19) {
      if (th < 10) parts.push(ones[th] + ' tysięcy');
      else if (th < 20) parts.push(teens[th - 10] + ' tysięcy');
    } else {
      // th >= 20
      const thTens = Math.floor(th % 100 / 10);
      const thOnes = th % 10;
      const thHundreds = Math.floor(th / 100);
      let thWord = '';
      if (thHundreds > 0) thWord += hundreds[thHundreds] + ' ';
      if (th % 100 >= 10 && th % 100 < 20) {
        thWord += teens[th % 100 - 10];
      } else {
        if (thTens > 0) thWord += tens[thTens] + ' ';
        if (thOnes > 0) thWord += ones[thOnes];
      }
      thWord = thWord.trim();
      const lastDigit = th % 10;
      const lastTwo = th % 100;
      let form;
      if (lastTwo >= 12 && lastTwo <= 14) form = 'tysięcy';
      else if (lastDigit >= 2 && lastDigit <= 4) form = 'tysiące';
      else form = 'tysięcy';
      parts.push(thWord + ' ' + form);
    }
  }

  const h = Math.floor(rest / 100);
  const t = Math.floor((rest % 100) / 10);
  const o = rest % 10;

  if (h > 0) parts.push(hundreds[h]);

  if (rest % 100 >= 10 && rest % 100 < 20) {
    parts.push(teens[rest % 100 - 10]);
  } else {
    if (t > 0) parts.push(tens[t]);
    if (o > 0) parts.push(ones[o]);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

// ─── QUIZ BANK (Roblox Studio) ───
const quizBank4 = [
    { q: 'Co to jest Part?', a: ['Podstawowy blok 3D do budowania', 'Nazwa postaci gracza', 'Okno z ustawieniami gry', 'Specjalny rodzaj skryptu'], correct: 0, hint: 'To z tego budujemy świat gry — klocek po klocku' },
    { q: 'Jakiego narzędzia używamy do obracania obiektów?', a: ['Scale Tool', 'Move Tool', 'Rotate Tool', 'Select Tool'], correct: 2, hint: 'Rotate = obracać' },
    { q: 'Jakiego narzędzia używamy do zmiany rozmiaru?', a: ['Rotate Tool', 'Scale Tool', 'Transform Tool', 'Resize Tool'], correct: 1, hint: 'Scale = skala, czyli wielkość' },
    { q: 'Co to jest Workspace?', a: ['Okno do pisania skryptów', 'Folder z dźwiękami', 'Miejsce gdzie są wszystkie obiekty w grze', 'Ustawienia postaci'], correct: 2, hint: 'Workspace = przestrzeń robocza' },
    { q: 'Co to jest Explorer?', a: ['Przeglądarka internetowa', 'Okno z listą wszystkich obiektów gry', 'Narzędzie do szukania skryptów', 'Sklep z assetami'], correct: 1, hint: 'Explorer pokazuje drzewko obiektów' },
    { q: 'Do czego służy okno Properties?', a: ['Do tworzenia nowych obiektów', 'Do zmiany ustawień obiektu', 'Do pisania kodu', 'Do testowania gry'], correct: 1, hint: 'Properties = właściwości' },
    { q: 'Co to jest Script?', a: ['Dźwięk w grze', 'Specjalny typ Part', 'Kod który sprawia że rzeczy się dzieją w grze', 'Narzędzie do terenu'], correct: 2, hint: 'Bez skryptów gra to nieruchome klocki' },
    { q: 'Jakiego języka programowania używamy w Roblox?', a: ['Python', 'JavaScript', 'Lua', 'C++'], correct: 2, hint: 'Trzy literki, zaczyna się na L' },
    { q: 'Co to jest SpawnLocation?', a: ['Miejsce w którym gracz pojawia się w grze', 'Punkt końcowy poziomu', 'Skrzynka z nagrodami', 'Efekt cząsteczkowy'], correct: 0, hint: 'Spawn = pojawić się' },
    { q: 'Co się stanie gdy CanCollide = false?', a: ['Obiekt zniknie', 'Obiekt zacznie się ruszać', 'Gracze mogą przechodzić przez obiekt', 'Obiekt zmieni kolor'], correct: 2, hint: 'Collide = zderzenie. Wyłączamy i przelatujemy!' },
    { q: 'Co robi opcja Anchored?', a: ['Obiekt jest niewidoczny', 'Zatrzymuje obiekt — nie spada i nie rusza się', 'Łączy dwa obiekty', 'Włącza grawitację'], correct: 1, hint: 'Anchor = kotwica' },
    { q: 'Co oznacza Transparency?', a: ['Twardość obiektu', 'Szybkość obiektu', 'Jak bardzo obiekt jest przezroczysty', 'Jasność światła'], correct: 2, hint: '0 = widoczny, 1 = niewidoczny' },
    { q: 'Co to jest Baseplate?', a: ['Płaski grunt w nowej grze', 'Nazwa pierwszego gracza', 'Rodzaj broni', 'Panel sterowania'], correct: 0, hint: 'Base = podstawa, Plate = płyta' },
    { q: 'Jaka jest różnica między Script a LocalScript?', a: ['Script jest szybszy', 'Script = serwer, LocalScript = jeden gracz', 'LocalScript jest nowszy', 'Nie ma różnicy'], correct: 1, hint: 'Local = lokalny, czyli u mnie' },
    { q: 'Co to jest GUI?', a: ['Rodzaj Part', 'Przyciski i tekst na ekranie gracza', 'Dźwięk w grze', 'Narzędzie do terenu'], correct: 1, hint: 'Graphical User Interface' },
    { q: 'Jak sprawdzić czy gracz dotknął obiektu?', a: ['ClickDetector', 'Zdarzenie Touched', 'Funkcja print()', 'Okno Properties'], correct: 1, hint: 'Touch = dotyk' },
    { q: 'Co to jest zmienna (variable)?', a: ['Rodzaj narzędzia', 'Błąd w kodzie', 'Przechowuje informacje — np. liczbę lub tekst', 'Specjalny typ Part'], correct: 2, hint: 'Jak pudełko z etykietą' },
    { q: 'Co to jest funkcja (function)?', a: ['Blok kodu który wykonuje zadanie', 'Rodzaj obiektu 3D', 'Ustawienie w Properties', 'Typ gracza'], correct: 0, hint: 'Jak przepis — opisujesz kroki, odpalasz kiedy chcesz' },
    { q: 'Co robi pętla (loop)?', a: ['Kończy grę', 'Powtarza kod wiele razy', 'Kasuje obiekty', 'Zmienia kolor ekranu'], correct: 1, hint: 'Loop = pętla, kręci się w kółko' },
    { q: 'Co to jest Humanoid?', a: ['Nazwa sklepu', 'Kontroluje ruch i zdrowie postaci', 'Narzędzie do animacji', 'Typ materiału'], correct: 1, hint: 'Human = człowiek' },
    { q: 'Co to jest ClickDetector?', a: ['Narzędzie w Explorer', 'Wykrywa kiedy gracz kliknie na obiekt', 'Przycisk na GUI', 'Skrót klawiszowy'], correct: 1, hint: 'Click = kliknięcie, Detector = wykrywacz' },
    { q: 'Co oznacza Parent w skrypcie?', a: ['Główny serwer gry', 'Obiekt który zawiera inny obiekt w sobie', 'Pierwsza linia kodu', 'Nazwa gracza'], correct: 1, hint: 'Parent = rodzic' },
    { q: 'Co robi part.Touched:Connect(zniknij)?', a: ['Tworzy nowy Part', 'Kasuje Part po 3s', 'Gdy ktoś dotknie Part, odpala funkcję zniknij', 'Zmienia nazwę Part'], correct: 2, hint: 'Connect = podłącz funkcję pod zdarzenie' },
    { q: 'Co robi task.wait(3)?', a: ['Tworzy 3 obiekty', 'Zatrzymuje skrypt na 3 sekundy', 'Ustawia Transparency na 3', 'Powtarza kod 3 razy'], correct: 1, hint: 'Wait = czekaj' },
];
let _usedQuiz4 = [];

function getQuizQuestion4() {
  if (_usedQuiz4.length >= quizBank4.length) _usedQuiz4 = [];
  const available = quizBank4.filter((_, i) => !_usedQuiz4.includes(i));
  const idx = quizBank4.indexOf(available[Math.floor(Math.random() * available.length)]);
  _usedQuiz4.push(idx);
  const q = quizBank4[idx];
  const labels = ['A', 'B', 'C', 'D'];
  return {
    text: `💻 Roblox Studio Quiz:\n\n${q.q}`,
    type: 'quiz',
    answers: q.a,
    correctIndex: q.correct,
    hint: q.hint,
    answer: labels[q.correct],
    cssClass: 'word-problem'
  };
}

// ─── REGISTER CLASS 4 ───
Subjects.register('class4', {
  name: 'Klasa 4',
  icon: '📐',
  description: 'Matematyka — klasa 4 szkoły podstawowej',
  mathGen: MathGen4,
  numberToPolish: numberToPolish,

  categories: [
    { id: 'numberLine', icon: '📏', name: 'Oś liczbowa', desc: 'Odczytaj brakującą liczbę', gen: () => MathGen4.numberLine(randInt(1,3)) },
    { id: 'numberWords', icon: '🔤', name: 'Zapis słowny', desc: 'Zapisz liczbę słownie lub cyframi', gen: () => MathGen4.numberWords(randInt(1,3)) },
    { id: 'calculation', icon: '🧮', name: 'Obliczenia (+−·:)', desc: 'Dodawanie, odejmowanie, mnożenie, dzielenie', gen: () => MathGen4.calculation(randInt(1,3)) },
    { id: 'missingNumber', icon: '❓', name: 'Brakująca liczba', desc: 'Znajdź brakującą liczbę w równaniu', gen: () => MathGen4.missingNumber(randInt(1,3)) },
    { id: 'writtenCalc', icon: '📝', name: 'Działania pisemne +/−', desc: 'Dodawanie i odejmowanie w słupku', gen: () => MathGen4.writtenCalc(randInt(1,3)) },
    { id: 'writtenMultiply', icon: '✖️', name: 'Mnożenie pisemne', desc: 'Mnożenie w słupku', gen: () => MathGen4.writtenMultiply(randInt(1,3)) },
    { id: 'writtenDivide', icon: '➗', name: 'Dzielenie pisemne', desc: 'Dzielenie w słupku z kratkami', gen: () => MathGen4.writtenDivide(randInt(1,3)) },
    { id: 'fractions', icon: '½', name: 'Ułamki — skracanie', desc: 'Skróć ułamek do najprostszej postaci', gen: () => MathGen4.fractionReduce() },
    { id: 'geometryBasic', icon: '📐', name: 'Prosta, półprosta, odcinek', desc: 'Pytania o linie geometryczne', gen: () => MathGen4.geometryBasic() },
    { id: 'geometryLines', icon: '📏', name: 'Równoległe i prostopadłe', desc: 'Rozpoznaj relację między liniami', gen: () => MathGen4.geometryParallelPerp() },
    { id: 'wordProblem', icon: '📖', name: 'Zadania z treścią', desc: 'Zadania tekstowe wieloetapowe', gen: () => MathGen4.wordProblem() },
    { id: 'fractionFigure', icon: '🟦', name: 'Ułamki z figury', desc: 'Zapisz zakolorowaną część jako ułamek', gen: () => MathGen4.fractionFigure() },
    { id: 'orderOfOps', icon: '🔢', name: 'Kolejność działań', desc: 'Mnożenie przed dodawaniem, nawiasy najpierw', gen: () => MathGen4.orderOfOps(randInt(1,3)) },
    { id: 'roblox', icon: '💻', name: 'Quiz Roblox Studio', desc: 'Pytania z informatyki', gen: () => getQuizQuestion4() },
  ],

  easyPool: [
    { id: 'calculation', gen: (f) => MathGen4.calculation(f) },
    { id: 'calculation', gen: (f) => MathGen4.calculation(f) },
    { id: 'calculation', gen: (f) => MathGen4.calculation(f) },
    { id: 'calculation', gen: (f) => MathGen4.calculation(f) },
    { id: 'calculation', gen: (f) => MathGen4.calculation(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'missingNumber', gen: (f) => MathGen4.missingNumber(f) },
    { id: 'missingNumber', gen: (f) => MathGen4.missingNumber(f) },
    { id: 'missingNumber', gen: (f) => MathGen4.missingNumber(f) },
    { id: 'missingNumber', gen: (f) => MathGen4.missingNumber(f) },
    { id: 'numberLine', gen: (f) => MathGen4.numberLine(f) },
    { id: 'numberLine', gen: (f) => MathGen4.numberLine(f) },
    { id: 'numberLine', gen: (f) => MathGen4.numberLine(f) },
    { id: 'numberWords', gen: (f) => MathGen4.numberWords(f) },
    { id: 'numberWords', gen: (f) => MathGen4.numberWords(f) },
    { id: 'numberWords', gen: (f) => MathGen4.numberWords(f) },
  ],

  mediumPool: [
    { id: 'geometryLines', gen: () => MathGen4.geometryParallelPerp() },
    { id: 'geometryLines', gen: () => MathGen4.geometryParallelPerp() },
    { id: 'geometryLines', gen: () => MathGen4.geometryParallelPerp() },
    { id: 'geometryLines', gen: () => MathGen4.geometryParallelPerp() },
    { id: 'geometryBasic', gen: () => MathGen4.geometryBasic() },
    { id: 'geometryBasic', gen: () => MathGen4.geometryBasic() },
    { id: 'geometryBasic', gen: () => MathGen4.geometryBasic() },
    { id: 'geometryBasic', gen: () => MathGen4.geometryBasic() },
    { id: 'fractionFigure', gen: () => MathGen4.fractionFigure() },
    { id: 'fractionFigure', gen: () => MathGen4.fractionFigure() },
    { id: 'fractionFigure', gen: () => MathGen4.fractionFigure() },
    { id: 'fractionFigure', gen: () => MathGen4.fractionFigure() },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'orderOfOps', gen: (f) => MathGen4.orderOfOps(f) },
    { id: 'roblox', gen: () => getQuizQuestion4() },
    { id: 'roblox', gen: () => getQuizQuestion4() },
    { id: 'roblox', gen: () => getQuizQuestion4() },
    { id: 'fractions', gen: () => MathGen4.fractionReduce() },
    { id: 'fractions', gen: () => MathGen4.fractionReduce() },
  ],

  hardPool: [
    { id: 'writtenMultiply', gen: (f) => MathGen4.writtenMultiply(f) },
    { id: 'writtenMultiply', gen: (f) => MathGen4.writtenMultiply(f) },
    { id: 'writtenMultiply', gen: (f) => MathGen4.writtenMultiply(f) },
    { id: 'writtenMultiply', gen: (f) => MathGen4.writtenMultiply(f) },
    { id: 'writtenMultiply', gen: (f) => MathGen4.writtenMultiply(f) },
    { id: 'writtenDivide', gen: (f) => MathGen4.writtenDivide(f) },
    { id: 'writtenDivide', gen: (f) => MathGen4.writtenDivide(f) },
    { id: 'writtenDivide', gen: (f) => MathGen4.writtenDivide(f) },
    { id: 'writtenDivide', gen: (f) => MathGen4.writtenDivide(f) },
    { id: 'writtenDivide', gen: (f) => MathGen4.writtenDivide(f) },
    { id: 'writtenCalc', gen: (f) => MathGen4.writtenCalc(f) },
    { id: 'writtenCalc', gen: (f) => MathGen4.writtenCalc(f) },
    { id: 'writtenCalc', gen: (f) => MathGen4.writtenCalc(f) },
    { id: 'writtenCalc', gen: (f) => MathGen4.writtenCalc(f) },
    { id: 'wordProblem', gen: () => MathGen4.wordProblem() },
    { id: 'wordProblem', gen: () => MathGen4.wordProblem() },
    { id: 'wordProblem', gen: () => MathGen4.wordProblem() },
    { id: 'fractions', gen: () => MathGen4.fractionReduce() },
    { id: 'fractions', gen: () => MathGen4.fractionReduce() },
    { id: 'fractions', gen: () => MathGen4.fractionReduce() },
  ],
});

})();
