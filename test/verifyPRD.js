import { PLANETS_DATA, SUN_DATA, MOON_DATA, EARTH_SYSTEM_DATA } from '../src/data/planets.js';
import { QUIZ_QUESTIONS } from '../src/data/quizData.js';

console.log('=== MEMULAI VERIFIKASI PRD EDUKASI TATA SURYA 3D ===\n');

let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failedTests++;
  }
}

// 1. Verifikasi Data Planet
console.log('--- 1. Verifikasi Data Planet & Objek Langit ---');
assert(SUN_DATA && SUN_DATA.name === 'Matahari', 'Data Matahari tersedia');
assert(MOON_DATA && MOON_DATA.name === 'Bulan', 'Data Bulan tersedia');
assert(PLANETS_DATA.length === 8, 'Tepat ada 8 planet dalam tata surya');

const expectedPlanets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
PLANETS_DATA.forEach((p, index) => {
  assert(p.id === expectedPlanets[index], `Planet ke-${index + 1} adalah ${expectedPlanets[index]} (${p.name})`);
  assert(p.orderNumber === index + 1, `Urutan planet ${p.name} adalah ${index + 1}`);
  assert(p.rotation && p.rotation.length > 5, `Rotasi ${p.name} tersedia: ${p.rotation}`);
  assert(p.revolution && p.revolution.length > 5, `Revolusi ${p.name} tersedia: ${p.revolution}`);
  assert(p.composition && p.composition.length > 10, `Komposisi ${p.name} tersedia`);
  assert(p.satellites && p.satellites.length > 0, `Satelit ${p.name} dicatat`);
  assert(Array.isArray(p.funFacts) && p.funFacts.length >= 3, `${p.name} memiliki minimal 3 fakta unik (ada ${p.funFacts?.length})`);
  assert(p.sourceNote && p.sourceNote.length > 5, `Catatan sumber ilmiah untuk ${p.name} tercatat`);
});

// 2. Verifikasi Materi Bumi Kita
console.log('\n--- 2. Verifikasi Materi Bumi Kita ---');
assert(EARTH_SYSTEM_DATA.cards.length === 5, 'Materi Bumi Kita memiliki tepat 5 modul wajib');
const requiredCardIds = ['rotation', 'revolution', 'structure', 'moon', 'facts'];
requiredCardIds.forEach(id => {
  const card = EARTH_SYSTEM_DATA.cards.find(c => c.id === id);
  assert(!!card, `Modul Bumi Kita '${id}' (${card?.title}) tersedia`);
  assert(card?.points?.length > 0, `Modul '${id}' memiliki rincian poin penjelasan`);
});

// 3. Verifikasi Bank Soal Kuis (32 Soal: 8 Planet x 4 Kategori Wajib)
console.log('\n--- 3. Verifikasi Bank Soal Kuis (32 Soal) ---');
const requiredCategories = ['rotation', 'revolution', 'composition', 'funFact'];

let totalQuestions = 0;
expectedPlanets.forEach(planetId => {
  const pQuestions = QUIZ_QUESTIONS[planetId];
  assert(Array.isArray(pQuestions), `Soal untuk planet ${planetId} tersedia`);
  assert(pQuestions.length === 4, `Planet ${planetId} memiliki tepat 4 soal`);

  const categoriesFound = new Set();
  pQuestions.forEach((q, qIdx) => {
    totalQuestions++;
    categoriesFound.add(q.category);
    assert(requiredCategories.includes(q.category), `[${planetId}] Soal ${qIdx + 1} memiliki kategori valid (${q.category})`);
    assert(Array.isArray(q.options) && q.options.length === 4, `[${planetId}] Soal ${q.id} memiliki tepat 4 opsi pilihan`);
    assert(q.options.some(opt => opt.id === q.correctOptionId), `[${planetId}] Kunci jawaban ${q.correctOptionId} valid dan ada pada opsi`);
    assert(q.explanation && q.explanation.length > 15, `[${planetId}] Soal ${q.id} memiliki pembahasan mendalam`);
    assert(q.sourceNote && q.sourceNote.length > 3, `[${planetId}] Soal ${q.id} memiliki rujukan sumber`);
  });

  assert(categoriesFound.size === 4, `Planet ${planetId} mencakup seluruh 4 kategori tanpa duplikat`);
});

assert(totalQuestions === 32, `Total soal di seluruh sistem adalah 32 soal (ditemukan ${totalQuestions})`);

// 4. Ringkasan
console.log('\n=== HASIL AKHIR PENGUJIAN ===');
if (failedTests === 0) {
  console.log('🎉 SEMUA PENGUJIAN DATA & PERSYARATAN PRD LULUS 100%!');
} else {
  console.error(`❌ TERDAPAT ${failedTests} PENGUJIAN GAGAL.`);
  process.exit(1);
}

