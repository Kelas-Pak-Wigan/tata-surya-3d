/**
 * Bank Soal Kuis Tata Surya Kelas 6 SD (Revamped)
 * 8 Planet x 4 Kategori Wajib = 32 Soal Inti
 * 
 * Standar Soal:
 * Soal 1 (Rotasi): Bagaimana planet berotasi dan berapa lama waktu rotasinya.
 * Soal 2 (Revolusi): Bagaimana planet berevolusi mengelilingi Matahari dan berapa lama waktu revolusinya.
 * Soal 3 (Komposisi): Struktur interior dan komposisi zat penyusun utama planet.
 * Soal 4 (Fakta Unik): Ciri khas unik dan fenomena menarik dari planet tersebut.
 */

export const QUIZ_QUESTIONS = {
  mercury: [
    {
      id: 'mercury-rot',
      planetId: 'mercury',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi planet Merkurius pada porosnya dan berapa lama waktu yang diperlukannya?',
      options: [
        { id: 'opt-a', text: 'Berotasi sangat cepat dengan poros miring menyamping, membutuhkan waktu sekitar 10 jam' },
        { id: 'opt-b', text: 'Berotasi sangat lambat pada poros yang hampir tegak lurus, membutuhkan waktu sekitar 58,6 hari Bumi' },
        { id: 'opt-c', text: 'Berotasi terbalik searah jarum jam dengan kecepatan tinggi, membutuhkan waktu sekitar 24 jam' },
        { id: 'opt-d', text: 'Berotasi bolak-balik berlawanan arah setiap minggu, membutuhkan waktu sekitar 365 hari Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius berotasi sangat lambat pada poros yang hampir tegak lurus sempurna (kemiringan sumbu hanya sekitar 0,03 derajat), menyelesaikan satu kali putaran dalam waktu sekitar 58,6 hari Bumi.',
      sourceNote: 'NASA Mercury Fact Sheet'
    },
    {
      id: 'mercury-rev',
      planetId: 'mercury',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah karakteristik revolusi Merkurius mengelilingi Matahari dan berapa lama periode orbitnya?',
      options: [
        { id: 'opt-a', text: 'Mengorbit paling cepat di Tata Surya karena posisinya paling dekat dengan Matahari, membutuhkan waktu sekitar 88 hari Bumi' },
        { id: 'opt-b', text: 'Mengorbit lambat di luar sabuk asteroid, membutuhkan waktu sekitar 225 hari Bumi' },
        { id: 'opt-c', text: 'Mengorbit sejajar bersama Bumi di lintasan yang sama, membutuhkan waktu sekitar 365 hari Bumi' },
        { id: 'opt-d', text: 'Mengorbit melingkar sempurna paling jauh dari Matahari, membutuhkan waktu sekitar 687 hari Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Karena posisinya paling dekat dengan Matahari, gaya gravitasi kuat Matahari membuat Merkurius melesat paling cepat di orbitnya, menyelesaikan satu kali revolusi hanya dalam waktu sekitar 88 hari Bumi.',
      sourceNote: 'NASA Mercury Fact Sheet'
    },
    {
      id: 'mercury-comp',
      planetId: 'mercury',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Bagaimanakah komposisi utama dan susunan zat pembentuk planet Merkurius?',
      options: [
        { id: 'opt-a', text: 'Berupa bola gas hidrogen cair tanpa kerak batuan padat' },
        { id: 'opt-b', text: 'Planet berbatu padat dengan inti logam besi raksasa (~75% jari-jari) serta mantel dan kerak batuan silikat' },
        { id: 'opt-c', text: 'Gumpalan es amonia dan metana beku yang menyelimuti inti belerang' },
        { id: 'opt-d', text: 'Lautan lava cair aktif di seluruh permukaannya tanpa ada batuan padat' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius adalah planet terestrial berbatu padat dengan inti logam besi raksasa yang menyumbang sekitar 75% dari jari-jari planetnya, diselimuti oleh mantel tipis dan kerak batuan silikat.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'mercury-fact',
      planetId: 'mercury',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Mengapa Merkurius mengalami perbedaan suhu permukaan yang sangat ekstrem antara siang (430°C) dan malam (-180°C)?',
      options: [
        { id: 'opt-a', text: 'Karena Merkurius dikelilingi oleh ribuan cincin es tebal' },
        { id: 'opt-b', text: 'Karena Merkurius hampir tidak memiliki lapisan atmosfer untuk menahan dan meratakan panas Matahari' },
        { id: 'opt-c', text: 'Karena permukaan Merkurius selalu tertutup kabut asam belerang pekat' },
        { id: 'opt-d', text: 'Karena Merkurius berputar terbalik menjauhi pusat galaksi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius hampir tidak memiliki atmosfer (hanya eksosfer yang sangat tipis), sehingga panas terik Matahari di siang hari langsung hilang seketika ke ruang angkasa saat malam tiba.',
      sourceNote: 'NASA Mercury Fact Sheet'
    }
  ],

  venus: [
    {
      id: 'venus-rot',
      planetId: 'venus',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik gerak rotasi planet Venus dan berapa lama waktu yang dibutuhkannya untuk satu kali putaran?',
      options: [
        { id: 'opt-a', text: 'Berotasi searah jarum jam (retrograde) dari timur ke barat secara sangat lambat, membutuhkan waktu sekitar 243 hari Bumi' },
        { id: 'opt-b', text: 'Berotasi dari barat ke timur sangat cepat, membutuhkan waktu sekitar 10 jam' },
        { id: 'opt-c', text: 'Berotasi melompat secara vertikal dari utara ke selatan, membutuhkan waktu sekitar 30 hari Bumi' },
        { id: 'opt-d', text: 'Berotasi normal dari barat ke timur persis seperti Bumi, membutuhkan waktu sekitar 24 jam' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Venus berotasi berlawanan arah (retrograde / searah jarum jam) dari timur ke barat dengan sangat lambat, memerlukan waktu sekitar 243 hari Bumi. Akibatnya, di Venus Matahari tampak terbit dari barat.',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-rev',
      planetId: 'venus',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Venus mengelilingi Matahari dan berapa lama waktu yang diperlukannya untuk satu tahun orbit?',
      options: [
        { id: 'opt-a', text: 'Mengorbit Matahari pada lintasan elips paling luar, membutuhkan waktu sekitar 12 tahun Bumi' },
        { id: 'opt-b', text: 'Mengorbit di antara Merkurius dan Bumi dalam lintasan hampir lingkaran sempurna, membutuhkan waktu sekitar 225 hari Bumi' },
        { id: 'opt-c', text: 'Mengorbit zig-zag melintasi orbit Mars, membutuhkan waktu sekitar 365,25 hari Bumi' },
        { id: 'opt-d', text: 'Mengorbit sangat lambat di tepi Tata Surya, membutuhkan waktu sekitar 88 hari Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Venus mengorbit Matahari dalam lintasan yang hampir melingkar sempurna pada jarak orbit kedua dari Matahari, memerlukan waktu sekitar 225 hari Bumi (lebih singkat daripada satu hari rotasinya yang 243 hari).',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-comp',
      planetId: 'venus',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Zat gas apakah yang mendominasi atmosfer tebal planet Venus sehingga memicu tekanan dan suhu permukaan yang luar biasa tinggi?',
      options: [
        { id: 'opt-a', text: 'Gas nitrogen dan oksigen murni seperti di Bumi' },
        { id: 'opt-b', text: 'Gas karbon dioksida (>96%) tebal ditambah awan asam sulfat pekat' },
        { id: 'opt-c', text: 'Gas hidrogen dan helium ringan tanpa awan' },
        { id: 'opt-d', text: 'Uap air segar dan kristal es metana' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Atmosfer Venus sangat tebal dan berat, didominasi lebih dari 96% gas karbon dioksida (CO2) serta selimut awan pekat asam sulfat yang memerangkap panas Matahari secara dahsyat.',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-fact',
      planetId: 'venus',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Mengapa planet Venus dijuluki sebagai planet terpanas di seluruh Tata Surya (~465°C) meskipun posisinya nomor dua dari Matahari?',
      options: [
        { id: 'opt-a', text: 'Karena permukaannya selalu terbakar oleh kobaran api gas alam' },
        { id: 'opt-b', text: 'Karena efek rumah kaca ekstrem dari atmosfer karbon dioksida tebalnya mengurung panas Matahari tanpa bisa keluar' },
        { id: 'opt-c', text: 'Karena jaraknya lebih dekat ke inti galaksi dibandingkan planet lain' },
        { id: 'opt-d', text: 'Karena memiliki seratus satelit alami yang memantulkan sinar panas' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Efek rumah kaca tak terkendali dari atmosfer karbon dioksida super tebal membuat suhu permukaan Venus mencapai sekitar 465°C (cukup untuk melelehkan timah), menjadikannya lebih panas daripada Merkurius.',
      sourceNote: 'NASA Solar System Exploration'
    }
  ],

  earth: [
    {
      id: 'earth-rot',
      planetId: 'earth',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi Bumi pada porosnya dan berapa lama waktu yang dibutuhkannya?',
      options: [
        { id: 'opt-a', text: 'Berputar dari barat ke timur dengan poros miring sekitar 23,5 derajat, membutuhkan waktu sekitar 24 jam' },
        { id: 'opt-b', text: 'Berputar dari timur ke barat dengan poros tegak lurus sempurna, membutuhkan waktu sekitar 365 hari' },
        { id: 'opt-c', text: 'Berputar secara retrograde menyamping di atas es, membutuhkan waktu sekitar 12 jam' },
        { id: 'opt-d', text: 'Berputar bolak-balik setiap minggu, membutuhkan waktu sekitar 30 hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Bumi berputar dari barat ke timur dengan kemiringan poros rotasi sekitar 23,5 derajat, memerlukan waktu sekitar 24 jam (hari matahari) yang mengakibatkan pergantian siang dan malam serta gerak semu harian benda langit.',
      sourceNote: 'NASA Earth Fact Sheet'
    },
    {
      id: 'earth-rev',
      planetId: 'earth',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Bumi mengelilingi Matahari dan berapa lama waktu yang diperlukannya dalam satu putaran kalender?',
      options: [
        { id: 'opt-a', text: 'Mengorbit mengelilingi Matahari pada lintasan elips dengan poros miring 23,5°, membutuhkan waktu sekitar 365,25 hari (diselaraskan tahun kabisat)' },
        { id: 'opt-b', text: 'Mengorbit secara melingkar kaku tanpa kemiringan poros, membutuhkan waktu tepat 300 hari' },
        { id: 'opt-c', text: 'Mengorbit melingkari Bulan secara berkala, membutuhkan waktu sekitar 687 hari' },
        { id: 'opt-d', text: 'Mengorbit menjauh dan mendekat drastis setiap bulan, membutuhkan waktu tepat 100 hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Bumi mengelilingi Matahari pada lintasan elips dalam waktu sekitar 365,25 hari. Kelebihan 0,25 hari diselaraskan setiap 4 tahun menjadi tahun kabisat (366 hari), dan kemiringan porosnya memicu pergantian musim.',
      sourceNote: 'NASA Earth Fact Sheet'
    },
    {
      id: 'earth-comp',
      planetId: 'earth',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Bagaimanakah struktur lapisan dan komposisi zat pembentuk planet Bumi dari permukaan hingga ke intinya?',
      options: [
        { id: 'opt-a', text: 'Seluruhnya berupa bola gas hidrogen tanpa adanya lapisan batuan dan logam' },
        { id: 'opt-b', text: 'Kerak dan mantel tersusun dari batuan silikat, inti luar cair serta inti dalam padat kaya besi-nikel, dengan air cair di permukaannya' },
        { id: 'opt-c', text: 'Tersusun hanya dari logam emas dan tembaga murni tanpa lapisan tanah' },
        { id: 'opt-d', text: 'Terdiri dari gumpalan es amonia padat yang menutupi batubara' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Bumi tersusun dari kerak dan mantel batuan silikat, inti luar cair serta inti dalam padat yang kaya akan besi dan nikel, serta memiliki samudra air cair melimpah (~71%) di permukaannya.',
      sourceNote: 'NASA Earth Observatory'
    },
    {
      id: 'earth-fact',
      planetId: 'earth',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Apakah peran utama perisai medan magnet (magnetosfer) Bumi bagi kelangsungan hidup di permukaannya?',
      options: [
        { id: 'opt-a', text: 'Membuat gravitasi Bumi menjadi nol saat malam hari' },
        { id: 'opt-b', text: 'Melindungi atmosfer dan makhluk hidup dari terpaan radiasi partikel mematikan angin matahari (solar wind)' },
        { id: 'opt-c', text: 'Menarik Bulan agar semakin mendekat dan menempel ke Bumi' },
        { id: 'opt-d', text: 'Mencegah air laut menguap menjadi awan hujan' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Medan magnet Bumi yang dibangkitkan oleh aliran inti besi cairnya bertindak seperti perisai raksasa (magnetosfer) yang menepis radiasi mematikan angin matahari dan sinar kosmis.',
      sourceNote: 'NASA Earth Observatory'
    }
  ],

  mars: [
    {
      id: 'mars-rot',
      planetId: 'mars',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi planet Mars pada porosnya dan berapa lama waktu satu hari di Mars?',
      options: [
        { id: 'opt-a', text: 'Berotasi sangat cepat dalam waktu kurang dari 10 jam dengan poros tegak lurus' },
        { id: 'opt-b', text: 'Berotasi dari barat ke timur dengan kemiringan poros sekitar 25 derajat, membutuhkan waktu sekitar 24,6 jam (hampir mirip hari di Bumi)' },
        { id: 'opt-c', text: 'Berotasi mundur terbalik (retrograde), membutuhkan waktu sekitar 243 hari Bumi' },
        { id: 'opt-d', text: 'Berotasi sangat lambat selama 58 hari Bumi tanpa pergantian malam' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Mars berotasi dari barat ke timur dengan kemiringan poros sekitar 25,2 derajat (sangat mirip kemiringan poros Bumi), memerlukan waktu sekitar 24 jam 37 menit (sekitar 24,6 jam atau 1 sol), sehingga ritme siang-malamnya hampir sama dengan Bumi.',
      sourceNote: 'NASA Mars Fact Sheet'
    },
    {
      id: 'mars-rev',
      planetId: 'mars',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi planet Mars mengelilingi Matahari dan berapa lama periode satu tahun Mars?',
      options: [
        { id: 'opt-a', text: 'Mengorbit di lintasan luar Bumi pada jarak rata-rata lebih jauh, membutuhkan waktu sekitar 687 hari Bumi (hampir 2 tahun Bumi)' },
        { id: 'opt-b', text: 'Mengorbit lebih dekat ke Matahari daripada Bumi, membutuhkan waktu sekitar 88 hari Bumi' },
        { id: 'opt-c', text: 'Mengorbit sejajar bersama Merkurius, membutuhkan waktu sekitar 225 hari Bumi' },
        { id: 'opt-d', text: 'Mengorbit sangat lambat di luar sabuk Kuiper, membutuhkan waktu sekitar 12 tahun Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Karena orbit Mars berada di luar orbit Bumi dengan keliling lintasan yang lebih besar, Mars membutuhkan waktu sekitar 687 hari Bumi (kurang lebih 1,88 tahun Bumi) untuk satu kali menyelesaikan revolusinya.',
      sourceNote: 'NASA Mars Fact Sheet'
    },
    {
      id: 'mars-comp',
      planetId: 'mars',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Kandungan mineral apakah yang melimpah pada debu permukaan Mars sehingga memberinya warna merah menyala yang khas?',
      options: [
        { id: 'opt-a', text: 'Mineral tembaga hijau beracun' },
        { id: 'opt-b', text: 'Besi teroksidasi atau karat besi (iron oxide)' },
        { id: 'opt-c', text: 'Kristal garam fosfat putih mengilap' },
        { id: 'opt-d', text: 'Endapan batubara hitam pekat' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Permukaan Mars diselimuti debu halus yang kaya senyawa besi teroksidasi (karat), memantulkan warna jingga kemerahan ke pandangan kita sehingga Mars dijuluki sebagai Planet Merah.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'mars-fact',
      planetId: 'mars',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Fitur geologi raksasa apakah yang berada di Mars yang memecahkan rekor sebagai gunung berapi tertinggi di seluruh Tata Surya?',
      options: [
        { id: 'opt-a', text: 'Gunung Everest' },
        { id: 'opt-b', text: 'Olympus Mons (ketinggian sekitar 22 km, tiga kali tinggi Everest)' },
        { id: 'opt-c', text: 'Valles Marineris' },
        { id: 'opt-d', text: 'Mauna Kea' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Olympus Mons di Mars adalah gunung berapi perisai raksasa dengan ketinggian mencapai sekitar 22 km (hampir tiga kali lipat tinggi Gunung Everest di Bumi) dan berdiameter selebar pulau besar.',
      sourceNote: 'NASA Mars Fact Sheet'
    }
  ],

  jupiter: [
    {
      id: 'jupiter-rot',
      planetId: 'jupiter',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi planet raksasa Jupiter dan berapa lama waktu yang diperlukannya untuk satu kali putaran?',
      options: [
        { id: 'opt-a', text: 'Berotasi paling kencang di Tata Surya sehingga bentuknya menggembung di khatulistiwa, membutuhkan waktu hanya sekitar 9 jam 56 menit' },
        { id: 'opt-b', text: 'Berotasi sangat lambat selama 243 hari Bumi karena ukurannya yang amat besar' },
        { id: 'opt-c', text: 'Berotasi terbalik menyamping 98 derajat, membutuhkan waktu sekitar 84 tahun' },
        { id: 'opt-d', text: 'Berotasi santai dengan periode yang sama persis dengan Bumi, yaitu 24 jam' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Meskipun merupakan planet terbesar, Jupiter berotasi luar biasa kencang (tercepat di antara seluruh planet), hanya memerlukan waktu sekitar 9 jam 56 menit untuk satu putaran penuh pada porosnya.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-rev',
      planetId: 'jupiter',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Jupiter mengelilingi Matahari dan berapa lama waktu yang dibutuhkannya untuk satu kali orbit penuh?',
      options: [
        { id: 'opt-a', text: 'Mengorbit di luar sabuk asteroid pada lintasan luas, membutuhkan waktu sekitar 11,86 tahun Bumi' },
        { id: 'opt-b', text: 'Mengorbit di dalam sabuk asteroid dekat Bumi, membutuhkan waktu sekitar 365 hari Bumi' },
        { id: 'opt-c', text: 'Mengorbit di tepi terluar Tata Surya, membutuhkan waktu sekitar 164,8 tahun Bumi' },
        { id: 'opt-d', text: 'Mengorbit sangat cepat dekat Matahari, membutuhkan waktu sekitar 687 hari Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Jupiter berada di luar sabuk asteroid dengan lintasan orbit yang sangat lebar, sehingga membutuhkan waktu sekitar 11,86 tahun waktu di Bumi untuk satu kali menyelesaikan putaran revolusinya.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-comp',
      planetId: 'jupiter',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Termasuk kelompok planet apakah Jupiter dan unsur-unsur apakah yang menyusun sebagian besar tubuhnya?',
      options: [
        { id: 'opt-a', text: 'Planet terestrial berbatu padat dengan mantel silikat tebal' },
        { id: 'opt-b', text: 'Raksasa gas (gas giant), sebagian besar tersusun atas hidrogen (~90%) dan helium (~10%) dengan hidrogen logam cair di kedalaman' },
        { id: 'opt-c', text: 'Raksasa es dengan lautan air tawar padat dari permukaan hingga inti' },
        { id: 'opt-d', text: 'Bola belerang dan besi padat tanpa lapisan atmosfer' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Jupiter tergolong raksasa gas tanpa permukaan padat yang pasti; tubuhnya didominasi oleh gas hidrogen dan helium yang berubah menjadi hidrogen logam cair di bawah tekanan luar biasa di kedalamannya.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-fact',
      planetId: 'jupiter',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Apakah sebenarnya fenomena "Bintik Merah Raksasa" (Great Red Spot) yang tampak menonjol di atmosfer Jupiter?',
      options: [
        { id: 'opt-a', text: 'Kawah tumbukan asteroid purba berapi' },
        { id: 'opt-b', text: 'Badai antisiklon raksasa yang berputar kencang, berukuran lebih besar dari Bumi, dan telah berkecamuk ratusan tahun' },
        { id: 'opt-c', text: 'Danau lahar pijar yang menyembur dari dalam inti planet' },
        { id: 'opt-d', text: 'Kumpulan jutaan komet yang terjebak di awan' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Bintik Merah Raksasa adalah badai pusaran angin antisiklon raksasa berkekuatan dahsyat dengan diameter melebihi diameter Bumi yang telah teramati berputar selama lebih dari 300 tahun.',
      sourceNote: 'NASA Solar System Exploration'
    }
  ],

  saturn: [
    {
      id: 'saturn-rot',
      planetId: 'saturn',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi planet Saturnus pada porosnya dan berapa lama waktu satu hari di sana?',
      options: [
        { id: 'opt-a', text: 'Berotasi sangat cepat pada porosnya dengan kecepatan tinggi, membutuhkan waktu sekitar 10,7 jam' },
        { id: 'opt-b', text: 'Berotasi sangat lambat selama 88 hari Bumi karena terhalang oleh cincinnya' },
        { id: 'opt-c', text: 'Berotasi retrograde terbalik, membutuhkan waktu sekitar 243 hari Bumi' },
        { id: 'opt-d', text: 'Berotasi dengan kecepatan konstan persis sama dengan revolusi Bulan, yaitu 27 hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Sebagai raksasa gas, Saturnus berputar sangat cepat pada porosnya, hanya membutuhkan waktu sekitar 10,7 jam untuk menyelesaikan satu kali rotasi penuh.',
      sourceNote: 'NASA Saturn Fact Sheet'
    },
    {
      id: 'saturn-rev',
      planetId: 'saturn',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Saturnus mengelilingi Matahari dan berapa lama periode satu tahun orbitnya?',
      options: [
        { id: 'opt-a', text: 'Mengorbit di lintasan luas di belakang Jupiter pada jarak sangat jauh, membutuhkan waktu sekitar 29,4 tahun Bumi' },
        { id: 'opt-b', text: 'Mengorbit memotong lintasan Bumi setiap 4 tahun, membutuhkan waktu sekitar 687 hari Bumi' },
        { id: 'opt-c', text: 'Mengorbit berdekatan dengan Mars, membutuhkan waktu sekitar 11,86 tahun Bumi' },
        { id: 'opt-d', text: 'Mengorbit di tepi terjauh galaksi, membutuhkan waktu sekitar 164,8 tahun Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Karena jarak orbitnya yang mencapai sekitar 1,4 miliar kilometer dari Matahari, Saturnus memerlukan waktu sekitar 29,4 tahun waktu di Bumi untuk satu kali mengelilingi Matahari.',
      sourceNote: 'NASA Saturn Fact Sheet'
    },
    {
      id: 'saturn-comp',
      planetId: 'saturn',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Tersusun dari partikel-partikel apakah sistem cincin megah dan spektakuler yang mengitari planet Saturnus?',
      options: [
        { id: 'opt-a', text: 'Lempengan logam baja padat buatan alien' },
        { id: 'opt-b', text: 'Miliaran bongkahan partikel es air murni, debu kosmik, dan pecahan batuan (mulai dari butiran pasir hingga sebesar gunung kecil)' },
        { id: 'opt-c', text: 'Pancaran sinar laser magnetik yang membeku' },
        { id: 'opt-d', text: 'Asap belerang panas yang terbakar terus-menerus' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Cincin Saturnus tersusun atas miliaran partikel yang didominasi es air murni bercampur debu dan pecahan batuan dengan ukuran bervariasi dari butiran pasir hingga sebesar rumah.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'saturn-fact',
      planetId: 'saturn',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Apakah keunikan massa jenis (densitas) planet Saturnus jika dibandingkan dengan zat cair di Bumi?',
      options: [
        { id: 'opt-a', text: 'Memiliki massa jenis paling padat dan terberat di antara semua planet' },
        { id: 'opt-b', text: 'Memiliki massa jenis lebih kecil daripada air (~0,69 g/cm³), sehingga secara teori dapat terapung jika dimasukkan ke bak air raksasa' },
        { id: 'opt-c', text: 'Tidak memiliki gaya gravitasi sama sekali sehingga cincinnya melayang' },
        { id: 'opt-d', text: 'Memiliki massa jenis jutaan kali lipat lebih berat daripada Matahari' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Massa jenis rata-rata Saturnus hanya sekitar 0,69 g/cm³, lebih ringan dari massa jenis air (1 g/cm³). Ini menjadikannya satu-satunya planet yang secara teoretis dapat mengapung di atas air!',
      sourceNote: 'NASA Saturn Fact Sheet'
    }
  ],

  uranus: [
    {
      id: 'uranus-rot',
      planetId: 'uranus',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik unik arah dan sudut rotasi Uranus pada porosnya serta berapa lama durasinya?',
      options: [
        { id: 'opt-a', text: 'Berotasi miring ekstrem menyamping sekitar 98 derajat (seperti menggelinding) secara retrograde, membutuhkan waktu sekitar 17 jam' },
        { id: 'opt-b', text: 'Berotasi tegak lurus sempurna tanpa kemiringan poros sedikit pun, membutuhkan waktu sekitar 24 jam' },
        { id: 'opt-c', text: 'Berotasi sangat lambat selama 84 tahun Bumi tanpa pernah berganti hari' },
        { id: 'opt-d', text: 'Berotasi terbalik naik-turun secara vertikal, membutuhkan waktu sekitar 10,7 jam' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Poros rotasi Uranus miring secara ekstrem sebesar ~98 derajat (hampir sejajar bidang orbitnya) dengan arah retrograde, tampak seolah menggelinding menyamping dan menyelesaikan rotasi dalam tempo sekitar 17 jam.',
      sourceNote: 'NASA Uranus Fact Sheet'
    },
    {
      id: 'uranus-rev',
      planetId: 'uranus',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Uranus mengelilingi Matahari dan berapa lama waktu yang diperlukannya untuk satu tahun penuh?',
      options: [
        { id: 'opt-a', text: 'Mengorbit di wilayah dingin yang luas di antara Saturnus dan Neptunus, membutuhkan waktu sekitar 84 tahun Bumi' },
        { id: 'opt-b', text: 'Mengorbit di sebelah dalam orbit Bumi, membutuhkan waktu sekitar 29,4 tahun Bumi' },
        { id: 'opt-c', text: 'Mengorbit di tepi luar Tata Surya paling lambat, membutuhkan waktu sekitar 164,8 tahun Bumi' },
        { id: 'opt-d', text: 'Mengorbit cepat melintasi orbit komet, membutuhkan waktu sekitar 12 tahun Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Uranus menempuh lintasan orbit yang sangat luas di bagian luar Tata Surya, membutuhkan waktu sekitar 84 tahun Bumi untuk menyelesaikan satu kali perjalanan mengitari Matahari.',
      sourceNote: 'NASA Uranus Fact Sheet'
    },
    {
      id: 'uranus-comp',
      planetId: 'uranus',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Mengapa para ilmuwan mengelompokkan planet Uranus sebagai "Raksasa Es" (Ice Giant)?',
      options: [
        { id: 'opt-a', text: 'Karena tubuhnya berupa balok es batu beku kaku dari permukaan sampai pusat tanpa udara' },
        { id: 'opt-b', text: 'Karena interiornya didominasi fluida padat panas senyawa volatil (air, amonia, dan metana) di bawah atmosfer tebal hidrogen-helium' },
        { id: 'opt-c', text: 'Karena permukaannya berupa lautan es kutub yang dapat dipijak oleh manusia' },
        { id: 'opt-d', text: 'Karena planet ini tidak memiliki inti berbatu sama sekali' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Istilah "raksasa es" merujuk pada komposisi interior tebalnya yang kaya cairan bertekanan tinggi dari senyawa volatil (air, metana, dan amonia), bukan balok es padat seperti es batu di kulkas.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'uranus-fact',
      planetId: 'uranus',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Zat apakah di lapisan atmosfer atas Uranus yang menyerap cahaya merah dan memantulkan warna biru-hijau (sian) yang menawan?',
      options: [
        { id: 'opt-a', text: 'Gas nitrogen murni' },
        { id: 'opt-b', text: 'Gas metana (CH₄)' },
        { id: 'opt-c', text: 'Uap belerang kuning' },
        { id: 'opt-d', text: 'Gas karbon monoksida pekat' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Gas metana (CH₄) di atmosfer Uranus menyerap spektrum gelombang cahaya merah dari Matahari dan memantulkan kembali spektrum cahaya biru-hijau, memberikan Uranus rona sian pastel yang khas.',
      sourceNote: 'NASA Uranus Fact Sheet'
    }
  ],

  neptune: [
    {
      id: 'neptune-rot',
      planetId: 'neptune',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah karakteristik rotasi planet Neptunus pada porosnya dan berapa lama waktu yang dibutuhkannya?',
      options: [
        { id: 'opt-a', text: 'Berotasi dari barat ke timur dengan kemiringan poros sekitar 28 derajat, membutuhkan waktu sekitar 16 jam' },
        { id: 'opt-b', text: 'Berotasi sangat lambat selama 164 tahun Bumi tanpa pernah berganti siang' },
        { id: 'opt-c', text: 'Berotasi mundur terbalik selama 243 hari Bumi persis seperti Venus' },
        { id: 'opt-d', text: 'Berotasi sangat kencang dalam waktu 2 jam saja sehingga memecah cincinnya' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Neptunus berotasi dari barat ke timur dengan poros miring sekitar 28 derajat, berputar cukup gesit dengan menyelesaikan satu kali rotasi penuh dalam waktu sekitar 16 jam.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-rev',
      planetId: 'neptune',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Bagaimanakah gerak revolusi Neptunus sebagai planet terjauh di Tata Surya dan berapa lama waktu satu tahun di Neptunus?',
      options: [
        { id: 'opt-a', text: 'Mengorbit di lintasan terluar dan terpanjang di antara 8 planet, membutuhkan waktu sekitar 164,8 tahun Bumi (hampir 165 tahun)' },
        { id: 'opt-b', text: 'Mengorbit bersilangan dekat matahari setiap dekade, membutuhkan waktu sekitar 84 tahun Bumi' },
        { id: 'opt-c', text: 'Mengorbit sejajar bersama Saturnus di jarak dekat, membutuhkan waktu sekitar 29,4 tahun Bumi' },
        { id: 'opt-d', text: 'Mengorbit sangat cepat di dekat sabuk asteroid, membutuhkan waktu sekitar 11,86 tahun Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Sebagai planet dengan orbit paling luar (sekitar 4,5 miliar km dari Matahari), Neptunus memerlukan waktu sekitar 164,8 tahun waktu di Bumi untuk menyelesaikan satu kali putaran orbit revolusi.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-comp',
      planetId: 'neptune',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Bagaimanakah struktur dan komposisi zat pembentuk tubuh raksasa es Neptunus?',
      options: [
        { id: 'opt-a', text: 'Planet batuan logam padat tanpa lapisan atmosfer gas' },
        { id: 'opt-b', text: 'Raksasa es dengan interior fluida tebal air, amonia, dan metana bertekanan tinggi di atas inti berbatu kecil seukuran Bumi' },
        { id: 'opt-c', text: 'Bola gas hidrogen murni tanpa adanya senyawa air atau metana sedikit pun' },
        { id: 'opt-d', text: 'Bintang katai yang gagal berpijar dan tidak memiliki inti' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Neptunus adalah raksasa es yang interiornya didominasi fluida padat panas senyawa volatil (air, amonia, dan metana) yang menyelimuti inti berbatu kecil, diselimuti atmosfer hidrogen, helium, dan metana.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-fact',
      planetId: 'neptune',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Karakteristik cuaca ekstrem apakah yang paling dahsyat dan memecahkan rekor antariksa di planet Neptunus?',
      options: [
        { id: 'opt-a', text: 'Memiliki badai angin tercepat di Tata Surya, dengan hembusan melesat lebih dari 2.000 km/jam (melampaui kecepatan suara)' },
        { id: 'opt-b', text: 'Mengalami hujan batu meteorit raksasa setiap jam di seluruh permukaannya' },
        { id: 'opt-c', text: 'Memiliki suhu permukaan terpanas yang mampu melelehkan intan' },
        { id: 'opt-d', text: 'Tidak pernah memiliki hembusan angin sedikit pun sepanjang tahun' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Neptunus adalah planet dengan hembusan angin badai terkuat di seluruh Tata Surya; hembusan angin badainya dapat melesat melebihi 2.000 km per jam, jauh melampaui kecepatan suara!',
      sourceNote: 'NASA Solar System Exploration'
    }
  ]
};
