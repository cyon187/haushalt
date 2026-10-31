// Selbsttest: node test.js
require('./calc.js');
const assert = require('assert');
const { periods, stats, mood, streak, validReadings } = globalThis.calc;

const r = [
  { date: '2026-01-01', value: 1000 },
  { date: '2026-02-01', value: 1310 }, // 31 Tage, 10/Tag
  { date: '2026-03-01', value: 1590 }, // 28 Tage, 10/Tag
  { date: '2026-04-01', value: 1900 }, // 31 Tage, 10/Tag
  { date: '2026-05-01', value: 2500 }, // 30 Tage, 20/Tag -> extrem
];
const ps = periods([...r].reverse()); // Reihenfolge egal
assert.strictEqual(ps.length, 4);
assert.strictEqual(ps[0].days, 31);
assert.strictEqual(ps[0].avgBefore, null);
assert.strictEqual(ps[2].high, false);   // zu wenig Historie
assert.strictEqual(ps[3].avgBefore, 10);
assert.strictEqual(ps[3].high, true);
assert.strictEqual(stats(ps.slice(0, 2)), null);
assert.ok(Math.abs(stats(ps.slice(0, 3)).perDay - 10) < 1e-9);
assert.ok(validReadings(r));
assert.ok(!validReadings([{ date: '1.1.2026', value: 1 }]));
assert.ok(!validReadings([{ date: '2026-01-01', value: '1' }]));
assert.strictEqual(mood(undefined), 'hello');
assert.strictEqual(mood(ps[0]), 'neutral');
assert.strictEqual(mood(ps[3]), 'high');
assert.strictEqual(mood({ perDay: 8, avgBefore: 10 }), 'good');
assert.strictEqual(mood({ perDay: 10, avgBefore: 10 }), 'ok');
assert.strictEqual(streak(r, '2026-05-20'), 5);  // Jan–Mai
assert.strictEqual(streak(r, '2026-06-03'), 5);  // Juni noch offen, Serie hält
assert.strictEqual(streak(r, '2026-07-01'), 0);  // Juni verpasst
assert.strictEqual(streak([{ date: '2025-12-01', value: 1 }, { date: '2026-01-01', value: 2 }], '2026-01-05'), 2); // Jahreswechsel

// Zahlungen
const { monthsFor, dueDate, dueIn, nextDue, perMonth, validItems } = globalThis.calc;
assert.deepStrictEqual(monthsFor('vierteljaehrlich', 11), [2, 5, 8, 11]);
assert.deepStrictEqual(monthsFor('halbjaehrlich', 9), [3, 9]);
assert.strictEqual(monthsFor('monatlich', 4).length, 12);
assert.strictEqual(dueDate(31, '2026-02'), '2026-02-28');
assert.strictEqual(dueDate(31, '2028-02'), '2028-02-29');
const rf = { id: 'a', name: 'Rundfunk', amount: 55.08, months: [2, 5, 8, 11], day: 15, since: '2026-11-15', paid: {} };
assert.strictEqual(nextDue(rf), '2026-11-15');
rf.paid['2026-11'] = true;
assert.strictEqual(nextDue(rf), '2027-02-15');
assert.strictEqual(dueIn(rf, '2026-08'), null);   // vor Beginn
assert.strictEqual(dueIn(rf, '2027-05'), '2027-05-15');
assert.ok(Math.abs(perMonth(rf) - 18.36) < 1e-9);
const late = { id: 'b', name: 'X', amount: 1, months: [10], day: 5, since: '2026-10-20', paid: {} };
assert.strictEqual(nextDue(late), '2027-10-05'); // 05.10.26 liegt vor Beginn
const once = { id: 'c', name: 'Y', amount: 9, once: '2026-12-01', paid: {} };
assert.strictEqual(nextDue(once), '2026-12-01');
assert.strictEqual(perMonth(once), 0);
assert.ok(validItems([rf, late, once]));
assert.ok(!validItems([{ ...rf, months: [13] }]));
assert.ok(!validItems([{ ...rf, amount: '5' }]));

// Einkauf + Sparen
const { validShopping, validSaving, notes } = globalThis.calc;
assert.ok(validShopping([{ id: 'a', text: 'Milch', done: false }]));
assert.ok(!validShopping([{ id: 'a', text: 'Milch' }]));
assert.deepStrictEqual(notes(185), [100, 50, 20, 10, 5]);
assert.deepStrictEqual(notes(3), []);
assert.strictEqual(notes(1e6, 50).length, 50);
assert.ok(validSaving({ name: 'Urlaub', goal: 1000, balance: 250, step: 50 }));
assert.ok(!validSaving({ name: 'Urlaub', goal: -1, balance: 250, step: 50 }));
assert.ok(!validSaving({ name: 'Urlaub', goal: 1000, balance: 250, step: 25 }));

// Bilanz + Geburtstage
const { validBilanz, balance, validBirthdays, nextBirthday } = globalThis.calc;
const bal = balance([{ id: 'g', name: 'Gehalt', amount: 2400 }], [rf, once], 200);
assert.ok(Math.abs(bal.fixed - 18.36) < 1e-9);         // einmalige Zahlung zählt nicht
assert.ok(Math.abs(bal.free - (2400 - 18.36 - 200)) < 1e-9);
assert.ok(Math.abs(bal.perDay - bal.free * 12 / 365) < 1e-9);
assert.ok(validBilanz({ incomes: [{ id: 'g', name: 'Gehalt', amount: 2400 }], saving: 0 }));
assert.ok(!validBilanz({ incomes: [{ id: 'g', name: 'Gehalt', amount: -1 }], saving: 0 }));
const anna = { id: 'a', name: 'Anna', month: 3, day: 14, year: 1990, note: '' };
assert.deepStrictEqual(nextBirthday(anna, '2026-03-14'), { date: '2026-03-14', days: 0, age: 36 });
assert.deepStrictEqual(nextBirthday(anna, '2026-03-15'), { date: '2027-03-14', days: 364, age: 37 });
assert.strictEqual(nextBirthday({ ...anna, month: 2, day: 29 }, '2026-11-01').date, '2027-02-28');
assert.strictEqual(nextBirthday({ ...anna, month: 2, day: 29 }, '2027-03-01').date, '2028-02-29');
assert.strictEqual(nextBirthday({ ...anna, year: null }, '2026-01-01').age, null);
assert.ok(validBirthdays([anna, { ...anna, year: null }]));
assert.ok(!validBirthdays([{ ...anna, month: 13 }]));
console.log('ok');
