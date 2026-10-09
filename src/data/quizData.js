/**
 * Bank Soal Kuis Tata Surya Kelas 6 SD
 * 8 Planet x 4 Kategori Wajib = 32 Soal Inti
 * Kategori: rotation, revolution, composition, funFact
 * Struktur: id, planetId, category, question, options, correctOptionId, explanation, sourceNote
 */

export const QUIZ_QUESTIONS = {
  mercury: [
    {
      id: 'mercury-rot',
      planetId: 'mercury',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama perkiraan waktu yang dibutuhkan Merkurius untuk melakukan satu kali putaran pada porosnya (rotasi)?',
      options: [
        { id: 'opt-a', text: 'Sekitar 24 jam' },
        { id: 'opt-b', text: 'Sekitar 58,6 hari Bumi' },
        { id: 'opt-c', text: 'Sekitar 365 hari Bumi' },
        { id: 'opt-d', text: 'Sekitar 10 jam' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius berotasi dengan sangat lambat. Satu kali putaran penuh pada porosnya membutuhkan waktu sekitar 58,6 hari Bumi.',
      sourceNote: 'NASA Mercury Fact Sheet'
    },
    {
      id: 'mercury-rev',
      planetId: 'mercury',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama periode revolusi Merkurius untuk mengitari Matahari satu putaran penuh?',
      options: [
        { id: 'opt-a', text: 'Sekitar 88 hari Bumi' },
        { id: 'opt-b', text: 'Sekitar 225 hari Bumi' },
        { id: 'opt-c', text: 'Sekitar 365 hari Bumi' },
        { id: 'opt-d', text: 'Sekitar 687 hari Bumi' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Karena posisinya yang paling dekat dengan Matahari, Merkurius mengorbit paling cepat, yaitu hanya membutuhkan waktu sekitar 88 hari Bumi.',
      sourceNote: 'NASA Mercury Fact Sheet'
    },
    {
      id: 'mercury-comp',
      planetId: 'mercury',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Bagaimanakah karakteristik komposisi utama dari struktur benda langit Merkurius?',
      options: [
        { id: 'opt-a', text: 'Berupa bola gas hidrogen dan helium tanpa permukaan padat' },
        { id: 'opt-b', text: 'Planet berbatu dengan inti logam besi raksasa dan mantel silikat tipis' },
        { id: 'opt-c', text: 'Tersusun seluruhnya dari gumpalan es padat dan amonia beku' },
        { id: 'opt-d', text: 'Permukaannya berupa lautan air tawar yang sangat dalam' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius adalah planet terestrial (berbatu) padat dengan inti besi raksasa yang menyumbang sekitar 75% dari jari-jari planetnya.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'mercury-fact',
      planetId: 'mercury',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Mengapa Merkurius mengalami perbedaan suhu yang sangat ekstrem antara siang (430°C) dan malam (-180°C)?',
      options: [
        { id: 'opt-a', text: 'Karena tertutup cincin es yang sangat tebal' },
        { id: 'opt-b', text: 'Karena hampir tidak memiliki atmosfer untuk menahan dan menyebarkan panas' },
        { id: 'opt-c', text: 'Karena berotasi terbalik berlawanan arah jarum jam' },
        { id: 'opt-d', text: 'Karena terletak paling jauh dari garis edar galaksi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Merkurius hampir tidak memiliki lapisan atmosfer (hanya eksosfer yang sangat tipis), sehingga panas terik Matahari di siang hari langsung hilang seketika saat malam tiba.',
      sourceNote: 'NASA Mercury Fact Sheet'
    }
  ],

  venus: [
    {
      id: 'venus-rot',
      planetId: 'venus',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Apakah keunikan gerak rotasi planet Venus jika dibandingkan dengan sebagian besar planet di Tata Surya?',
      options: [
        { id: 'opt-a', text: 'Berputar sangat cepat dalam waktu 2 jam saja' },
        { id: 'opt-b', text: 'Berputar berlawanan arah (retrograde / searah jarum jam) sehingga Matahari terbit dari barat' },
        { id: 'opt-c', text: 'Sama sekali tidak berputar pada porosnya' },
        { id: 'opt-d', text: 'Berputar melompat-lompat secara vertikal' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Venus memiliki rotasi retrograde (berputar searah jarum jam), berlawanan arah dengan arah rotasi Bumi dan mayoritas planet lainnya. Akibatnya, di Venus Matahari tampak terbit dari barat.',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-rev',
      planetId: 'venus',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama waktu yang dibutuhkan Venus untuk satu kali mengelilingi Matahari (revolusi)?',
      options: [
        { id: 'opt-a', text: 'Sekitar 88 hari Bumi' },
        { id: 'opt-b', text: 'Sekitar 225 hari Bumi' },
        { id: 'opt-c', text: 'Sekitar 365,25 hari Bumi' },
        { id: 'opt-d', text: 'Sekitar 12 tahun Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Venus mengelilingi Matahari dalam waktu sekitar 225 hari Bumi. Menariknya, waktu revolusi ini lebih cepat daripada waktu satu kali rotasinya (243 hari Bumi)!',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-comp',
      planetId: 'venus',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Zat gas apakah yang mendominasi atmosfer planet Venus sehingga memicu efek rumah kaca yang luar biasa hebat?',
      options: [
        { id: 'opt-a', text: 'Gas nitrogen dan oksigen' },
        { id: 'opt-b', text: 'Gas karbon dioksida (CO₂) tebal (>96%)' },
        { id: 'opt-c', text: 'Gas hidrogen murni' },
        { id: 'opt-d', text: 'Uap air dan helium' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Atmosfer Venus sangat tebal dan berat, didominasi lebih dari 96% gas karbon dioksida (CO₂) ditambah awan pekat asam sulfat yang memerangkap panas Matahari secara ekstrem.',
      sourceNote: 'NASA Venus Fact Sheet'
    },
    {
      id: 'venus-fact',
      planetId: 'venus',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Mengapa planet Venus dinobatkan sebagai planet terpanas di Tata Surya dengan suhu mencapai ~465°C?',
      options: [
        { id: 'opt-a', text: 'Karena posisinya terletak paling dekat dengan inti Matahari' },
        { id: 'opt-b', text: 'Karena atmosfer tebal karbon dioksidanya menghasilkan efek rumah kaca ekstrem' },
        { id: 'opt-c', text: 'Karena permukaannya selalu terbakar api batubara' },
        { id: 'opt-d', text: 'Karena ditabrak ratusan komet panas setiap hari' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Meskipun posisinya nomor dua setelah Merkurius, efek rumah kaca ekstrem dari selimut karbon dioksida tebal menjadikan Venus planet paling panas di Tata Surya.',
      sourceNote: 'NASA Solar System Exploration'
    }
  ],

  earth: [
    {
      id: 'earth-rot',
      planetId: 'earth',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama waktu rotasi Bumi pada porosnya dan apakah akibat langsung dari perputaran tersebut bagi kita?',
      options: [
        { id: 'opt-a', text: 'Sekitar 365 hari, mengakibatkan pergantian musim' },
        { id: 'opt-b', text: 'Sekitar 24 jam, mengakibatkan terjadinya siang dan malam' },
        { id: 'opt-c', text: 'Sekitar 30 hari, mengakibatkan pasang surut air laut' },
        { id: 'opt-d', text: 'Sekitar 12 jam, mengakibatkan gerhana matahari total' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Bumi berputar pada porosnya selama sekitar 24 jam (satu hari matahari), yang menyebabkan bagian Bumi bergantian menghadap dan membelakangi Matahari (siang dan malam).',
      sourceNote: 'NASA Earth Fact Sheet'
    },
    {
      id: 'earth-rev',
      planetId: 'earth',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama periode revolusi Bumi dan bagaimana kelebihan seperempat harinya diselaraskan dalam kalender?',
      options: [
        { id: 'opt-a', text: 'Sekitar 365,25 hari, diselaraskan dengan tahun kabisat (366 hari) tiap 4 tahun sekali' },
        { id: 'opt-b', text: 'Tepat 300 hari, diselaraskan dengan mengurangi 1 hari setiap tahun' },
        { id: 'opt-c', text: 'Sekitar 687 hari, diselaraskan dengan menambah 1 bulan' },
        { id: 'opt-d', text: 'Tepat 365 hari pas tanpa ada kelebihan seperempat hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Bumi memerlukan sekitar 365,25 hari untuk mengitari Matahari. Kelebihan 0,25 hari digabungkan setiap 4 tahun menjadi tanggal 29 Februari (tahun kabisat dengan 366 hari).',
      sourceNote: 'NASA Earth Fact Sheet'
    },
    {
      id: 'earth-comp',
      planetId: 'earth',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Bagaimanakah susunan lapisan struktur dan zat pembentuk planet Bumi secara umum?',
      options: [
        { id: 'opt-a', text: 'Seluruhnya terdiri dari gumpalan gas metana beku tanpa batuan' },
        { id: 'opt-b', text: 'Kerak dan mantel kaya mineral silikat, inti kaya besi dan nikel, serta permukaan kaya air' },
        { id: 'opt-c', text: 'Tersusun hanya dari logam emas murni dari permukaan sampai inti' },
        { id: 'opt-d', text: 'Bola es raksasa yang tidak memiliki inti logam' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Bumi tersusun dari kerak dan mantel batuan silikat, inti luar dan dalam yang kaya logam besi dan nikel, serta permukaan yang diselimuti air cair dan atmosfer.',
      sourceNote: 'NASA Earth Observatory'
    },
    {
      id: 'earth-fact',
      planetId: 'earth',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Faktor utama apakah yang menyebabkan terjadinya pergantian musim di berbagai belahan Bumi?',
      options: [
        { id: 'opt-a', text: 'Jarak Bumi yang kadang sangat dekat dan kadang sangat jauh dari Matahari' },
        { id: 'opt-b', text: 'Kemiringan poros rotasi Bumi sekitar 23,5 derajat saat mengelilingi Matahari' },
        { id: 'opt-c', text: 'Kecepatan putaran Bumi yang melambat saat musim dingin' },
        { id: 'opt-d', text: 'Besarnya bayangan Bulan yang menutupi Bumi secara bergantian' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Kemiringan poros rotasi Bumi sebesar ~23,5 derajat membuat belahan utara dan selatan menerima sudut datang sinar Matahari yang berbeda saat revolusi, memicu pergantian musim.',
      sourceNote: 'NASA Earth Observatory'
    }
  ],

  mars: [
    {
      id: 'mars-rot',
      planetId: 'mars',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama waktu rotasi planet Mars pada porosnya dalam satu hari (satu sol)?',
      options: [
        { id: 'opt-a', text: 'Sekitar 9 jam 56 menit' },
        { id: 'opt-b', text: 'Sekitar 24,6 jam (hampir mirip dengan panjang hari di Bumi)' },
        { id: 'opt-c', text: 'Sekitar 58 hari Bumi' },
        { id: 'opt-d', text: 'Sekitar 243 hari Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Mars berotasi pada porosnya dalam waktu sekitar 24,6 jam (24 jam 37 menit), sehingga panjang hari di Mars hampir sama persis dengan di Bumi.',
      sourceNote: 'NASA Mars Fact Sheet'
    },
    {
      id: 'mars-rev',
      planetId: 'mars',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama waktu yang dibutuhkan planet Mars untuk menyelesaikan satu putaran orbit mengelilingi Matahari?',
      options: [
        { id: 'opt-a', text: 'Sekitar 88 hari Bumi' },
        { id: 'opt-b', text: 'Sekitar 365 hari Bumi' },
        { id: 'opt-c', text: 'Sekitar 687 hari Bumi (hampir 2 tahun Bumi)' },
        { id: 'opt-d', text: 'Sekitar 12 tahun Bumi' }
      ],
      correctOptionId: 'opt-c',
      explanation: 'Mars berada di orbit luar setelah Bumi, sehingga membutuhkan waktu sekitar 687 hari Bumi (kurang lebih 1,88 tahun Bumi) untuk satu kali revolusi.',
      sourceNote: 'NASA Mars Fact Sheet'
    },
    {
      id: 'mars-comp',
      planetId: 'mars',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Senyawa apakah yang melimpah di debu permukaan Mars sehingga menyebabkannya tampak berwarna merah kemerahan?',
      options: [
        { id: 'opt-a', text: 'Mineral tembaga hijau' },
        { id: 'opt-b', text: 'Besi teroksidasi atau karat besi (iron oxide)' },
        { id: 'opt-c', text: 'Garam dapur kristal putih' },
        { id: 'opt-d', text: 'Endapan minyak bumi mentah' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Permukaan Mars diselimuti debu halus yang kaya senyawa besi teroksidasi (karat), sehingga memantulkan warna jingga kemerahan ke pandangan mata kita.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'mars-fact',
      planetId: 'mars',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Apakah nama gunung berapi tertinggi dan terbesar di seluruh Tata Surya yang terletak di planet Mars?',
      options: [
        { id: 'opt-a', text: 'Gunung Everest' },
        { id: 'opt-b', text: 'Olympus Mons' },
        { id: 'opt-c', text: 'Mauna Kea' },
        { id: 'opt-d', text: 'Gunung Krakatau' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Olympus Mons adalah gunung berapi raksasa di Mars yang memiliki ketinggian sekitar 22 km, hampir tiga kali lipat ketinggian Gunung Everest di Bumi!',
      sourceNote: 'NASA Mars Fact Sheet'
    }
  ],

  jupiter: [
    {
      id: 'jupiter-rot',
      planetId: 'jupiter',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama waktu rotasi Jupiter pada porosnya dan apa rekornya di antara planet-planet Tata Surya?',
      options: [
        { id: 'opt-a', text: 'Sekitar 24 jam, persis seperti Bumi' },
        { id: 'opt-b', text: 'Sekitar 9 jam 56 menit, merupakan rotasi tercepat di Tata Surya' },
        { id: 'opt-c', text: 'Sekitar 30 hari, merupakan rotasi paling santai' },
        { id: 'opt-d', text: 'Sekitar 84 tahun, bergerak sangat lambat' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Meskipun merupakan planet terbesar, Jupiter berputar luar biasa kencang pada porosnya, hanya butuh sekitar 9 jam 56 menit untuk satu putaran penuh.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-rev',
      planetId: 'jupiter',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama periode revolusi planet Jupiter untuk sekali mengitari Matahari?',
      options: [
        { id: 'opt-a', text: 'Sekitar 365 hari Bumi' },
        { id: 'opt-b', text: 'Sekitar 11,86 tahun Bumi' },
        { id: 'opt-c', text: 'Sekitar 29,4 tahun Bumi' },
        { id: 'opt-d', text: 'Sekitar 165 tahun Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Jupiter membutuhkan waktu sekitar 11,86 tahun Bumi (hampir 12 tahun) untuk menyelesaikan satu putaran orbit penuh mengelilingi Matahari.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-comp',
      planetId: 'jupiter',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Termasuk dalam kelompok planet apakah Jupiter dan unsur gas apakah yang menyusun sebagian besar tubuhnya?',
      options: [
        { id: 'opt-a', text: 'Planet berbatu, didominasi gas oksigen padat' },
        { id: 'opt-b', text: 'Raksasa gas, terutama tersusun atas hidrogen dan helium' },
        { id: 'opt-c', text: 'Raksasa es padat dengan lautan metana beku' },
        { id: 'opt-d', text: 'Planet logam mulia berinti merkuri' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Jupiter adalah raksasa gas (gas giant). Tubuhnya sebagian besar tersusun atas gas hidrogen (~90%) dan helium (~10%), dengan lapisan hidrogen logam di kedalamannya.',
      sourceNote: 'NASA Jupiter Fact Sheet'
    },
    {
      id: 'jupiter-fact',
      planetId: 'jupiter',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Fenomena cuaca antariksa apakah yang dinamakan "Bintik Merah Raksasa" (Great Red Spot) di planet Jupiter?',
      options: [
        { id: 'opt-a', text: 'Danau lava cair yang berpijar terang' },
        { id: 'opt-b', text: 'Badai antisiklon raksasa yang berputar ratusan tahun dan berukuran lebih besar dari Bumi' },
        { id: 'opt-c', text: 'Lubang kawah akibat hantaman asteroid raksasa' },
        { id: 'opt-d', text: 'Kumpulan jutaan kunang-kunang kosmik antariksa' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Bintik Merah Raksasa di Jupiter adalah badai pusaran angin berkekuatan dahsyat yang ukurannya melebihi diameter Bumi dan telah berkecamuk lebih dari 300 tahun.',
      sourceNote: 'NASA Solar System Exploration'
    }
  ],

  saturn: [
    {
      id: 'saturn-rot',
      planetId: 'saturn',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama perkiraan waktu yang diperlukan Saturnus untuk melakukan satu putaran rotasi pada porosnya?',
      options: [
        { id: 'opt-a', text: 'Sekitar 10,7 jam' },
        { id: 'opt-b', text: 'Sekitar 24 jam' },
        { id: 'opt-c', text: 'Sekitar 58 hari' },
        { id: 'opt-d', text: 'Sekitar 88 hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Saturnus berputar sangat cepat pada porosnya, memerlukan waktu sekitar 10,7 jam untuk menyelesaikan satu putaran penuh.',
      sourceNote: 'NASA Saturn Fact Sheet'
    },
    {
      id: 'saturn-rev',
      planetId: 'saturn',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama periode revolusi Saturnus dalam mengelilingi Matahari satu kali putaran?',
      options: [
        { id: 'opt-a', text: 'Sekitar 687 hari Bumi' },
        { id: 'opt-b', text: 'Sekitar 11,86 tahun Bumi' },
        { id: 'opt-c', text: 'Sekitar 29,4 tahun Bumi' },
        { id: 'opt-d', text: 'Sekitar 84 tahun Bumi' }
      ],
      correctOptionId: 'opt-c',
      explanation: 'Karena jarak orbitnya yang jauh dari Matahari, satu tahun di Saturnus setara dengan sekitar 29,4 tahun waktu di planet Bumi.',
      sourceNote: 'NASA Saturn Fact Sheet'
    },
    {
      id: 'saturn-comp',
      planetId: 'saturn',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Tersusun atas bahan apakah sistem cincin indah dan megah yang mengelilingi planet Saturnus?',
      options: [
        { id: 'opt-a', text: 'Lempengan emas padat dan perak murni' },
        { id: 'opt-b', text: 'Miliaran partikel es air, debu kosmik, dan pecahan batuan' },
        { id: 'opt-c', text: 'Gas beracun yang menyala oleh sengatan listrik' },
        { id: 'opt-d', text: 'Kaca kristal buatan satelit antariksa' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Cincin Saturnus tersusun atas miliaran pecahan es air, partikel debu, dan bebatuan berukuran mulai dari butiran pasir kecil hingga bongkahan sebesar rumah.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'saturn-fact',
      planetId: 'saturn',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Apakah keunikan massa jenis (densitas) planet Saturnus dibandingkan dengan planet-planet lainnya?',
      options: [
        { id: 'opt-a', text: 'Merupakan planet paling padat dan terberat di alam semesta' },
        { id: 'opt-b', text: 'Memiliki massa jenis lebih kecil dari air, sehingga secara teoritis dapat mengapung di air' },
        { id: 'opt-c', text: 'Memiliki gravitasi jutaan kali lipat lebih kuat dari Matahari' },
        { id: 'opt-d', text: 'Tidak memiliki massa sama sekali' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Saturnus memiliki massa jenis rata-rata sekitar 0,69 g/cm³, lebih rendah daripada massa jenis air (1 g/cm³). Jika ada bak air raksasa yang muat, Saturnus akan terapung!',
      sourceNote: 'NASA Saturn Fact Sheet'
    }
  ],

  uranus: [
    {
      id: 'uranus-rot',
      planetId: 'uranus',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Bagaimanakah keunikan posisi poros rotasi Uranus jika dibandingkan dengan planet-planet lainnya?',
      options: [
        { id: 'opt-a', text: 'Berputar sangat lambat selama 1.000 tahun per putaran' },
        { id: 'opt-b', text: 'Porosnya miring menyamping sekitar 98 derajat, sehingga tampak menggelinding di orbitnya' },
        { id: 'opt-c', text: 'Berputar bolak-balik ke atas dan ke bawah setiap hari' },
        { id: 'opt-d', text: 'Berputar tegak lurus sempurna 0 derajat tanpa kemiringan' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Poros rotasi Uranus memiliki kemiringan ekstrem sekitar 98 derajat (hampir horizontal), sehingga Uranus tampak menggelinding menyamping saat mengitari orbitnya.',
      sourceNote: 'NASA Uranus Fact Sheet'
    },
    {
      id: 'uranus-rev',
      planetId: 'uranus',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama waktu revolusi yang dibutuhkan Uranus untuk mengelilingi Matahari satu kali putaran penuh?',
      options: [
        { id: 'opt-a', text: 'Sekitar 29,4 tahun Bumi' },
        { id: 'opt-b', text: 'Sekitar 84 tahun Bumi' },
        { id: 'opt-c', text: 'Sekitar 164,8 tahun Bumi' },
        { id: 'opt-d', text: 'Sekitar 10 tahun Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Uranus membutuhkan waktu sekitar 84 tahun waktu di Bumi untuk menyelesaikan satu kali putaran revolusi mengelilingi Matahari.',
      sourceNote: 'NASA Uranus Fact Sheet'
    },
    {
      id: 'uranus-comp',
      planetId: 'uranus',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Mengapa ilmuwan mengelompokkan planet Uranus sebagai "Raksasa Es" (Ice Giant)?',
      options: [
        { id: 'opt-a', text: 'Karena seluruh tubuhnya adalah balok es padat seperti es batu di kulkas' },
        { id: 'opt-b', text: 'Karena interiornya kaya akan fluida senyawa volatil (air, amonia, dan metana) di atas inti berbatu kecil' },
        { id: 'opt-c', text: 'Karena sama sekali tidak memiliki atmosfer gas' },
        { id: 'opt-d', text: 'Karena terbentuk dari jutaan komet salju yang menempel' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Istilah "raksasa es" merujuk pada komposisi interior tebalnya yang didominasi zat-zat volatil padat/panas seperti air, amonia, dan metana, bukan es balok padat kaku.',
      sourceNote: 'NASA Solar System Exploration'
    },
    {
      id: 'uranus-fact',
      planetId: 'uranus',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Gas apakah di atmosfer atas Uranus yang menyerap cahaya merah dan memantulkan warna biru-hijau (sian) khas?',
      options: [
        { id: 'opt-a', text: 'Gas nitrogen murni' },
        { id: 'opt-b', text: 'Gas metana (CH₄)' },
        { id: 'opt-c', text: 'Gas karbon monoksida' },
        { id: 'opt-d', text: 'Uap belerang kuning' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Metana di lapisan atmosfer Uranus menyerap spektrum cahaya merah dari Matahari dan memantulkan kembali spektrum biru-hijau, menghasilkan warna sian pastel yang menawan.',
      sourceNote: 'NASA Uranus Fact Sheet'
    }
  ],

  neptune: [
    {
      id: 'neptune-rot',
      planetId: 'neptune',
      category: 'rotation',
      categoryName: 'Rotasi Planet',
      question: 'Berapa lama periode rotasi planet Neptunus pada porosnya?',
      options: [
        { id: 'opt-a', text: 'Sekitar 16 jam' },
        { id: 'opt-b', text: 'Sekitar 24 jam' },
        { id: 'opt-c', text: 'Sekitar 88 hari' },
        { id: 'opt-d', text: 'Sekitar 365 hari' }
      ],
      correctOptionId: 'opt-a',
      explanation: 'Neptunus berotasi cukup cepat pada porosnya, menyelesaikan satu kali putaran dalam waktu sekitar 16 jam.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-rev',
      planetId: 'neptune',
      category: 'revolution',
      categoryName: 'Revolusi Planet',
      question: 'Berapa lama waktu revolusi Neptunus sebagai planet yang posisinya paling terluar di Tata Surya?',
      options: [
        { id: 'opt-a', text: 'Sekitar 84 tahun Bumi' },
        { id: 'opt-b', text: 'Sekitar 164,8 tahun Bumi (hampir 165 tahun)' },
        { id: 'opt-c', text: 'Sekitar 29,4 tahun Bumi' },
        { id: 'opt-d', text: 'Sekitar 11,86 tahun Bumi' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Karena jarak orbitnya yang paling jauh dari Matahari, Neptunus membutuhkan waktu sekitar 164,8 tahun Bumi untuk menyelesaikan satu putaran orbit revolusi.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-comp',
      planetId: 'neptune',
      category: 'composition',
      categoryName: 'Komposisi & Zat Penyusun',
      question: 'Termasuk dalam jenis planet apakah Neptunus dan bagaimanakah susunan bagian dalamnya?',
      options: [
        { id: 'opt-a', text: 'Planet batuan padat mirip seperti Merkurius' },
        { id: 'opt-b', text: 'Raksasa es dengan interior fluida pekat air, amonia, dan metana di atas inti berbatu kecil' },
        { id: 'opt-c', text: 'Raksasa gas murni tanpa ada senyawa air atau es sedikit pun' },
        { id: 'opt-d', text: 'Bintang kerdil yang gagal bersinar' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Neptunus adalah raksasa es yang interiornya didominasi fluida padat panas senyawa volatil (air, amonia, dan metana) yang menyelimuti inti berbatu seukuran Bumi.',
      sourceNote: 'NASA Neptune Fact Sheet'
    },
    {
      id: 'neptune-fact',
      planetId: 'neptune',
      category: 'funFact',
      categoryName: 'Fakta Unik',
      question: 'Karakteristik cuaca ekstrem apakah yang paling luar biasa dan memecahkan rekor di planet Neptunus?',
      options: [
        { id: 'opt-a', text: 'Memiliki suhu permukaan terpanas yang bisa melelehkan besi' },
        { id: 'opt-b', text: 'Memiliki angin badai tercepat di Tata Surya yang melaju lebih dari 2.000 km/jam' },
        { id: 'opt-c', text: 'Mengalami hujan bongkahan asteroid setiap sore' },
        { id: 'opt-d', text: 'Tidak pernah memiliki angin atau badai sedikit pun' }
      ],
      correctOptionId: 'opt-b',
      explanation: 'Neptunus memiliki hembusan angin badai terkuat di seluruh Tata Surya, dengan kecepatan angin yang dapat melesat melebihi 2.000 km per jam (melampaui kecepatan suara).',
      sourceNote: 'NASA Solar System Exploration'
    }
  ]
};

