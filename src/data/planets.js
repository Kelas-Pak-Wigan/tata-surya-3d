/**
 * Data Ilmiah Planet Tata Surya
 * Sumber: NASA Solar System Exploration & NASA Fact Sheets
 * Disesuaikan untuk pembelajaran siswa Kelas 6 SD
 */

export const SUN_DATA = {
  id: 'sun',
  name: 'Matahari',
  subtitle: 'Pusat Tata Surya kita',
  type: 'Bintang (Bintang Katai Kuning / G2V)',
  radiusVisual: 8.5,
  color: 0xffaa00,
  description: 'Matahari adalah bintang di pusat Tata Surya yang memancarkan energi panas dan cahaya bagi seluruh planet.',
  rotation: 'Sekitar 25-35 hari (bervariasi menurut garis lintang karena berbentuk gas plasma)',
  temperature: 'Sekitar 5.500°C di permukaan, dan mencapai 15 juta°C di bagian intinya',
  composition: 'Terutama gas hidrogen (sekitar 73%) dan helium (sekitar 25%), dengan sedikit unsur berat seperti oksigen, karbon, dan besi',
  funFacts: [
    'Massa Matahari mencakup lebih dari 99,8% dari total seluruh massa Tata Surya!',
    'Cahaya Matahari membutuhkan waktu sekitar 8 menit 20 detik untuk sampai ke Bumi.',
    'Di dalam inti Matahari terjadi reaksi fusi nuklir dahsyat yang mengubah hidrogen menjadi helium tanpa henti.'
  ]
};

export const MOON_DATA = {
  id: 'moon',
  name: 'Bulan',
  subtitle: 'Satelit Alami Bumi',
  type: 'Satelit Alami Berbatu',
  radiusVisual: 0.7,
  orbitRadius: 4.8,
  color: 0xcccccc,
  rotation: 'Sekitar 27,3 hari Bumi (terkunci secara pasang surut dengan revolusinya)',
  revolution: 'Sekitar 27,3 hari Bumi mengitari Bumi',
  composition: 'Kerak berbatu silikat, mantel berbatu, dan inti logam kecil kaya besi',
  funFacts: [
    'Bulan tidak menghasilkan cahaya sendiri; Bulan bersinar karena memantulkan cahaya Matahari ke arah Bumi.',
    'Karena waktu rotasi dan revolusi Bulan sama, kita di Bumi selalu melihat sisi permukaan Bulan yang sama (sisi dekat).',
    'Gravitasi Bulan merupakan faktor pemicu utama terjadinya fenomena pasang surut air laut di Bumi.'
  ]
};

export const PLANETS_DATA = [
  {
    id: 'mercury',
    name: 'Merkurius',
    orderNumber: 1,
    orderText: 'Planet ke-1 dari Matahari (Terdekat)',
    type: 'Planet Kebumian (Terestrial / Berbatu)',
    typeDescription: 'Planet padat dengan permukaan berbatu seperti Bumi, bukan bola gas.',
    radiusVisual: 1.1,
    orbitDistanceVisual: 16,
    orbitSpeedVisual: 0.04,
    rotationSpeedVisual: 0.005,
    axialTiltVisual: 0.03, // hampir tegak lurus
    color: 0x9e9e9e,
    textureType: 'mercury',
    hasRings: false,
    rotation: 'Sekitar 58,6 hari Bumi',
    rotationDetail: 'Merkurius berotasi sangat lambat. Satu hari matahari di Merkurius memakan waktu sekitar 176 hari Bumi.',
    revolution: 'Sekitar 88 hari Bumi',
    revolutionDetail: 'Karena posisinya paling dekat dengan Matahari, Merkurius memiliki periode revolusi tercepat di Tata Surya.',
    composition: 'Planet berbatu padat dengan inti logam besi raksasa (mencakup ~75% jari-jari planet), diselimuti mantel tipis dan kerak silikat.',
    compositionDetail: 'Inti besi yang sangat besar membuat Merkurius memiliki kepadatan tertinggi kedua setelah Bumi.',
    satellites: '0 (Tidak memiliki satelit alami)',
    satellitesCount: 0,
    satellitesNote: 'Tidak ada satelit alami yang mengorbit Merkurius.',
    funFacts: [
      'Merkurius mengalami perbedaan suhu paling ekstrem: siang hari mencapai ~430°C dan malam hari anjlok drastis hingga -180°C karena hampir tidak memiliki atmosfer untuk menahan panas.',
      'Merupakan planet terkecil di seluruh Tata Surya, hanya sedikit lebih besar dari Bulan kita.',
      'Walaupun paling dekat dengan Matahari, Merkurius bukanlah planet terpanas (gelar terpanas dipegang oleh Venus).'
    ],
    sourceNote: 'NASA Solar System Exploration: Mercury Fact Sheet'
  },
  {
    id: 'venus',
    name: 'Venus',
    orderNumber: 2,
    orderText: 'Planet ke-2 dari Matahari',
    type: 'Planet Kebumian (Terestrial / Berbatu)',
    typeDescription: 'Planet padat berbatu berukuran hampir sama dengan Bumi, namun bersuasana luar biasa panas dan beracun.',
    radiusVisual: 1.8,
    orbitDistanceVisual: 23,
    orbitSpeedVisual: 0.03,
    rotationSpeedVisual: -0.003, // retrograde (Timur ke Barat)
    axialTiltVisual: 0.05, // ~2.6 derajat (kutub utara menghadap atas, putaran retrograde berlawanan arah dengan Bumi)
    color: 0xe3bb76,
    textureType: 'venus',
    hasRings: false,
    rotation: 'Sekitar 243 hari Bumi (Retrograde)',
    rotationDetail: 'Venus berotasi berlawanan arah jarum jam (retrograde) dibandingkan mayoritas planet lain. Di Venus, Matahari terbit di barat dan terbenam di timur.',
    revolution: 'Sekitar 225 hari Bumi',
    revolutionDetail: 'Uniknya, satu hari rotasi di Venus (243 hari Bumi) lebih lama daripada satu tahun revolusinya (225 hari Bumi)!',
    composition: 'Planet berbatu dengan kerak silikat dan inti besi-nikel, diselimuti atmosfer sangat tebal yang didominasi gas karbon dioksida (>96%) serta awan pekat asam sulfat.',
    compositionDetail: 'Atmosfernya yang luar biasa tebal menghasilkan tekanan permukaan sekitar 90 kali lebih besar daripada tekanan di permukaan Bumi.',
    satellites: '0 (Tidak memiliki satelit alami)',
    satellitesCount: 0,
    satellitesNote: 'Venus tidak memiliki satelit alami sama sekali.',
    funFacts: [
      'Planet terpanas di Tata Surya dengan suhu permukaan rata-rata sekitar 465°C akibat efek rumah kaca ekstrem yang memerangkap panas Matahari.',
      'Sering dijuluki "Bintang Kejora" atau "Bintang Fajar" karena tampak sangat terang dan cemerlang di langit Bumi saat menjelang fajar atau senja.',
      'Venus sering disebut "Kembaran Bumi" karena ukuran, massa, dan gravitasinya hampir sama, meski iklim permukaannya sangat bertolak belakang.'
    ],
    sourceNote: 'NASA Solar System Exploration: Venus Fact Sheet'
  },
  {
    id: 'earth',
    name: 'Bumi',
    orderNumber: 3,
    orderText: 'Planet ke-3 dari Matahari (Tempat Tinggal Kita)',
    type: 'Planet Kebumian (Terestrial / Berbatu)',
    typeDescription: 'Planet rumah kita dengan daratan berbatu, samudra luas yang kaya air cair, dan atmosfer kaya oksigen.',
    radiusVisual: 1.9,
    orbitDistanceVisual: 31,
    orbitSpeedVisual: 0.024,
    rotationSpeedVisual: 0.02,
    axialTiltVisual: 0.41, // ~23.5 derajat
    color: 0x2b82c9,
    textureType: 'earth',
    hasRings: false,
    hasMoon: true,
    rotation: 'Sekitar 24 jam (Hari Matahari) / 23 jam 56 menit (Sideris)',
    rotationDetail: 'Satu putaran pada porosnya mengakibatkan fenomena penting sehari-hari: pergantian siang dan malam serta gerak semu harian benda langit.',
    revolution: 'Sekitar 365,25 hari Bumi',
    revolutionDetail: 'Satu putaran mengitari Matahari menentukan periode 1 tahun. Kelebihan seperempat hari diselaraskan dengan tahun kabisat (366 hari) tiap 4 tahun sekali.',
    composition: 'Kerak dan mantel luar kaya batuan dan mineral silikat, sedangkan inti bumi kaya akan logam besi dan nikel. Permukaan dilapisi air cair (~71%) dan atmosfer nitrogen-oksigen.',
    compositionDetail: 'Struktur Bumi terbagi menjadi 4 lapisan utama: Kerak Bumi (padat), Mantel Bumi (batuan silikat panas), Inti Luar (cair), dan Inti Dalam (padat).',
    satellites: '1 satelit alami (Bulan)',
    satellitesCount: 1,
    satellitesNote: 'Bulan adalah satelit alami Bumi yang mengorbit setiap ~27,3 hari dan memantulkan sinar Matahari.',
    funFacts: [
      'Satu-satunya tempat di alam semesta yang sejauh ini terbukti dihuni dan mendukung kehidupan jutaan spesies makhluk hidup.',
      'Satu-satunya planet di Tata Surya yang memiliki air dalam bentuk cair melimpah dan stabil di permukaannya.',
      'Memiliki medan magnet kuat (magnetosfer) yang melindungi atmosfer dan kehidupan dari terjangan radiasi mematikan angin matahari.'
    ],
    sourceNote: 'NASA Earth Observatory & NASA Solar System Exploration'
  },
  {
    id: 'mars',
    name: 'Mars',
    orderNumber: 4,
    orderText: 'Planet ke-4 dari Matahari',
    type: 'Planet Kebumian (Terestrial / Berbatu)',
    typeDescription: 'Planet berbatu gurun yang dingin dan berdebu dengan atmosfer tipis.',
    radiusVisual: 1.3,
    orbitDistanceVisual: 39,
    orbitSpeedVisual: 0.018,
    rotationSpeedVisual: 0.018,
    axialTiltVisual: 0.44, // ~25.2 derajat
    color: 0xc1440e,
    textureType: 'mars',
    hasRings: false,
    rotation: 'Sekitar 24,6 jam (1 Sol)',
    rotationDetail: 'Panjang hari di Mars hampir persis sama dengan di Bumi (selisih sekitar 39 menit lebih lama). Hari di Mars biasa disebut Sol.',
    revolution: 'Sekitar 687 hari Bumi',
    revolutionDetail: 'Karena jarak orbitnya lebih jauh dari Matahari, satu tahun di Mars hampir dua kali lipat lebih lama daripada satu tahun di Bumi.',
    composition: 'Planet berbatu dengan inti besi-nikel, mantel silikat padat, dan permukaan dilapisi debu kaya mineral besi teroksidasi (karat) dengan atmosfer tipis karbon dioksida.',
    compositionDetail: 'Kandungan zat besi yang berkarat di lapisan pasir dan bebatuannya yang menyebabkan Mars tampak berwarna merah kemerahan.',
    satellites: '2 satelit alami kecil (Phobos dan Deimos)',
    satellitesCount: 2,
    satellitesNote: 'Kedua satelit Mars berbentuk tidak beraturan seperti kentang dan diduga merupakan asteroid yang tertangkap gravitasi Mars.',
    funFacts: [
      'Memiliki gunung berapi tertinggi dan terbesar di seluruh Tata Surya: Olympus Mons, dengan ketinggian sekitar 22 km (tiga kali lipat Gunung Everest).',
      'Memiliki ngarai raksasa bernama Valles Marineris yang membentang sepanjang lebih dari 4.000 km dan kedalaman hingga 7 km.',
      'Memiliki tudung es di kutub utara dan kutub selatannya yang tersusun atas es air dan es kering (karbon dioksida beku).'
    ],
    sourceNote: 'NASA Solar System Exploration: Mars Fact Sheet'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    orderNumber: 5,
    orderText: 'Planet ke-5 dari Matahari (Terbesar)',
    type: 'Raksasa Gas (Gas Giant)',
    typeDescription: 'Planet bola gas raksasa tanpa permukaan padat yang pasti untuk dipijak.',
    radiusVisual: 4.2,
    orbitDistanceVisual: 52,
    orbitSpeedVisual: 0.011,
    rotationSpeedVisual: 0.045, // rotasi tercepat
    axialTiltVisual: 0.05, // ~3.1 derajat
    color: 0xd4a373,
    textureType: 'jupiter',
    hasRings: false,
    rotation: 'Sekitar 9 jam 56 menit',
    rotationDetail: 'Jupiter adalah planet dengan rotasi tercepat di seluruh Tata Surya! Kecepatan putaran ini membuat planetnya sedikit menggembung di bagian khatulistiwa.',
    revolution: 'Sekitar 11,86 tahun Bumi',
    revolutionDetail: 'Membutuhkan waktu hampir 12 tahun Bumi untuk menyelesaikan satu kali perjalanan mengitari Matahari.',
    composition: 'Raksasa gas yang komposisi utamanya mirip dengan Matahari: sebagian besar gas hidrogen (~90%) dan helium (~10%), dengan lapisan hidrogen logam cair di kedalaman.',
    compositionDetail: 'Para ilmuwan memperkirakan di pusat terdalam Jupiter terdapat inti padat bertekanan luar biasa tinggi yang ukurannya bisa sebesar Bumi.',
    satellites: 'Memiliki lebih dari 90 satelit alami (95 terkonfirmasi per 2024)',
    satellitesCount: 95,
    satellitesNote: 'Empat satelit terbesarnya disebut Satelit Galilea: Io (penuh gunung berapi), Europa (berlapis es dengan samudra bawah tanah), Ganymede (satelit terbesar di Tata Surya), dan Callisto.',
    funFacts: [
      'Merupakan planet terbesar di Tata Surya; jika digabungkan, massanya lebih dari dua kali lipat total seluruh planet lainnya!',
      'Memiliki "Bintik Merah Raksasa" (Great Red Spot), badai antisiklon raksasa yang berputar kencang dan sudah teramati ratusan tahun, berukuran lebih lebar dari Bumi.',
      'Memiliki medan magnet paling dahsyat di antara seluruh planet, belasan kali lebih kuat daripada medan magnet Bumi.'
    ],
    sourceNote: 'NASA Solar System Exploration: Jupiter Fact Sheet'
  },
  {
    id: 'saturn',
    name: 'Saturnus',
    orderNumber: 6,
    orderText: 'Planet ke-6 dari Matahari (Cincin Termegah)',
    type: 'Raksasa Gas (Gas Giant)',
    typeDescription: 'Planet gas raksasa yang dikelilingi ribuan cincin spektakuler berkilau.',
    radiusVisual: 3.6,
    orbitDistanceVisual: 66,
    orbitSpeedVisual: 0.008,
    rotationSpeedVisual: 0.04,
    axialTiltVisual: 0.47, // ~26.7 derajat
    color: 0xe2c48d,
    textureType: 'saturn',
    hasRings: true,
    ringInnerRadius: 4.4,
    ringOuterRadius: 7.8,
    rotation: 'Sekitar 10,7 jam',
    rotationDetail: 'Saturnus berputar sangat kencang pada porosnya, menyelesaikan satu kali rotasi hanya dalam waktu kurang dari 11 jam.',
    revolution: 'Sekitar 29,4 tahun Bumi',
    revolutionDetail: 'Satu tahun di Saturnus sama dengan hampir 30 tahun di Bumi.',
    composition: 'Raksasa gas terutama hidrogen dan helium, dengan inti logam padat kecil yang diselimuti lapisan hidrogen logam cair di bawah tekanan ekstrem.',
    compositionDetail: 'Cincin megahnya tersusun atas miliaran pecahan partikel es air murni, debu kosmik, dan batuan dengan ukuran mulai dari butiran halus sampai sebesar gunung kecil.',
    satellites: 'Memiliki lebih dari 140 satelit alami (146 terkonfirmasi per 2024)',
    satellitesCount: 146,
    satellitesNote: 'Satelit terbesarnya adalah Titan, satelit unik yang memiliki atmosfer tebal kaya nitrogen dan danau cair metana di permukaannya.',
    funFacts: [
      'Memiliki massa jenis (densitas) terendah di seluruh Tata Surya (sekitar 0,69 g/cm³), lebih ringan daripada air. Artinya, jika ada wadah air yang cukup raksasa, Saturnus bisa terapung!',
      'Sistem cincinnya membentang selebar ratusan ribu kilometer, tetapi ketebalan vertikal rata-ratanya sangat tipis (hanya sekitar 10 hingga 100 meter saja).',
      'Di kutub utara Saturnus terdapat pola badai awan berbentuk heksagon (segi enam) yang sangat unik dan misterius.'
    ],
    sourceNote: 'NASA Solar System Exploration: Saturn Fact Sheet'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    orderNumber: 7,
    orderText: 'Planet ke-7 dari Matahari',
    type: 'Raksasa Es (Ice Giant)',
    typeDescription: 'Planet gas dingin dengan mantel tebal berupa fluida volatil air, amonia, dan metana di atas inti berbatu.',
    radiusVisual: 2.5,
    orbitDistanceVisual: 78,
    orbitSpeedVisual: 0.005,
    rotationSpeedVisual: -0.025, // retrograde
    axialTiltVisual: 1.71, // ~98 derajat (miring menyamping)
    color: 0x76d7ea,
    textureType: 'uranus',
    hasRings: true,
    ringInnerRadius: 2.8,
    ringOuterRadius: 3.4,
    rotation: 'Sekitar 17 jam (Retrograde & Miring Menyamping)',
    rotationDetail: 'Uranus berotasi secara miring menyamping dengan sudut kemiringan poros mencapai ~98 derajat! Tampak seolah-olah menggelinding di lintasan orbitnya.',
    revolution: 'Sekitar 84 tahun Bumi',
    revolutionDetail: 'Karena kemiringan porosnya yang ekstrem, setiap kutub di Uranus mengalami 42 tahun siang hari terus-menerus disusul 42 tahun malam hari berturut-turut.',
    composition: 'Raksasa es; interiornya berupa fluida tebal senyawa volatil (air, amonia, dan metana) di atas inti berbatu kecil, diselimuti atmosfer hidrogen, helium, dan metana.',
    compositionDetail: 'Istilah "raksasa es" bukan berarti Uranus adalah balok es padat seperti es batu di kulkas, melainkan interiornya didominasi fluida padat panas dari unsur-unsur volatil.',
    satellites: 'Memiliki 28 satelit alami terkonfirmasi per 2024',
    satellitesCount: 28,
    satellitesNote: 'Sebagian besar satelit Uranus diberi nama berdasarkan karakter tokoh sastra karya William Shakespeare dan Alexander Pope (seperti Miranda, Ariel, Umbriel, Titania, dan Oberon).',
    funFacts: [
      'Gas metana di atmosfer bagian atas Uranus menyerap cahaya merah dari sinar Matahari dan memantulkan cahaya biru kehijauan, memberinya rona sian yang khas.',
      'Memiliki atmosfer terdingin di Tata Surya dengan temperatur terendah bisa mencapai -224°C.',
      'Merupakan planet pertama yang ditemukan menggunakan bantuan teleskop modern oleh astronom William Herschel pada tahun 1781.'
    ],
    sourceNote: 'NASA Solar System Exploration: Uranus Fact Sheet'
  },
  {
    id: 'neptune',
    name: 'Neptunus',
    orderNumber: 8,
    orderText: 'Planet ke-8 dari Matahari (Planet Terluar)',
    type: 'Raksasa Es (Ice Giant)',
    typeDescription: 'Planet terjauh di Tata Surya, raksasa es berwarna biru pekat dengan angin badai yang luar biasa dahsyat.',
    radiusVisual: 2.4,
    orbitDistanceVisual: 90,
    orbitSpeedVisual: 0.004,
    rotationSpeedVisual: 0.026,
    axialTiltVisual: 0.5, // ~28.3 derajat
    color: 0x274690,
    textureType: 'neptune',
    hasRings: false,
    rotation: 'Sekitar 16 jam',
    rotationDetail: 'Neptunus berputar cukup gesit pada porosnya, menyelesaikan satu rotasi penuh dalam tempo sekitar 16 jam.',
    revolution: 'Sekitar 164,8 tahun Bumi',
    revolutionDetail: 'Jaraknya yang teramat jauh membuat Neptunus memerlukan hampir 165 tahun waktu di Bumi hanya untuk satu kali menyelesaikan orbit revolusinya!',
    composition: 'Raksasa es dengan interior fluida pekat air, amonia, dan metana bertekanan tinggi di atas inti berbatu kecil seukuran Bumi, dengan atmosfer hidrogen, helium, dan metana.',
    compositionDetail: 'Warna biru laut cerah Neptunus berasal dari gas metana di atmosfernya yang menyerap cahaya merah, namun warnanya jauh lebih cerah dan intens dibanding Uranus.',
    satellites: 'Memiliki 16 satelit alami terkonfirmasi per 2024',
    satellitesCount: 16,
    satellitesNote: 'Satelit terbesarnya adalah Triton, satelit es raksasa yang memiliki geyser nitrogen cair dan mengorbit berlawanan arah dengan rotasi Neptunus (orbit retrograde).',
    funFacts: [
      'Memiliki angin badai tercepat di seluruh Tata Surya, hembusannya dapat melesat lebih dari 2.000 km per jam (melampaui kecepatan suara!).',
      'Merupakan planet pertama yang ditemukan melalui perhitungan matematika astronomi sebelum berhasil dilihat melalui teleskop.',
      'Sejak pertama kali ditemukan pada tahun 1846, Neptunus baru menyelesaikan orbit penuh pertamanya pada tahun 2011.'
    ],
    sourceNote: 'NASA Solar System Exploration: Neptune Fact Sheet'
  }
];

export const EARTH_SYSTEM_DATA = {
  title: 'Materi Lengkap: Planet Bumi Kita',
  subtitle: 'Memahami Tempat Tinggal Kita dalam Alam Semesta',
  cards: [
    {
      id: 'rotation',
      badge: 'Gerakan Bumi',
      title: '1. Rotasi Bumi (Berputar pada Poros)',
      summary: 'Bumi berputar pada porosnya dari barat ke timur membutuhkan waktu sekitar 24 jam.',
      points: [
        'Waktu satu putaran penuh: Sekitar 24 jam (1 hari matahari) atau 23 jam 56 menit (periode sideris).',
        'Arah putaran: Dari arah barat ke timur.',
        'Akibat utama rotasi bumi:',
        '• Terjadinya pergantian siang dan malam.',
        '• Terjadinya gerak semu harian Matahari dan bintang (Matahari seolah bergerak terbit di timur dan tenggelam di barat).',
        '• Terjadinya perbedaan zona waktu di berbagai belahan dunia.',
        '• Pembelokan arah angin dan arus laut (efek Coriolis).'
      ],
      tip: 'Ingat: Siang dan malam terjadi karena Bumi berputar pada porosnya, bukan karena Matahari yang mengitari Bumi!'
    },
    {
      id: 'revolution',
      badge: 'Gerakan Bumi',
      title: '2. Revolusi Bumi (Mengelilingi Matahari)',
      summary: 'Bumi bergerak mengelilingi Matahari pada bidang edarnya memerlukan waktu 365,25 hari.',
      points: [
        'Waktu satu putaran orbit: Sekitar 365,25 hari (1 tahun surya).',
        'Tahun Kabisat: Sisa 0,25 hari (seperempat hari) dikumpulkan selama 4 tahun menjadi 1 hari ekstra (29 Februari), sehingga tahun kabisat memiliki 366 hari.',
        'Kemiringan poros Bumi: Poros Bumi miring sekitar 23,5 derajat dari garis tegak lurus bidang orbitnya.',
        'Akibat utama revolusi bumi:',
        '• Terjadinya pergantian musim (panas, gugur, dingin, semi di daerah subtropis; hujan dan kemarau di tropis).',
        '• Perbedaan lamanya waktu siang dan malam di berbagai belahan bumi.',
        '• Gerak semu tahunan Matahari.',
        '• Terlihatnya rasi bintang yang berbeda-beda setiap bulan.'
      ],
      tip: 'PENTING: Musim terjadi terutama karena kemiringan sumbu Bumi 23,5°, BUKAN semata-mata karena Bumi lebih dekat atau lebih jauh dari Matahari!'
    },
    {
      id: 'structure',
      badge: 'Struktur Planet',
      title: '3. Lapisan & Zat Penyusun Bumi',
      summary: 'Bumi terbagi atas struktur fisik berlapis serta komposisi kimia mineral batuan dan logam.',
      points: [
        '4 Lapisan Utama Struktur Bumi:',
        '1. Kerak Bumi (Crust): Lapisan terluar yang padat tempat kita tinggal (tebal 5-70 km), tersusun dari batuan silikat, tanah, dan mineral.',
        '2. Mantel Bumi (Mantle): Lapisan tebal di bawah kerak (tebal ~2.900 km), berupa batuan silikat semi-cair kental dan panas.',
        '3. Inti Luar (Outer Core): Lapisan cair setebal ~2.200 km, tersusun dari logam besi dan nikel cair yang mengalir dan membangkitkan medan magnet Bumi.',
        '4. Inti Dalam (Inner Core): Bola padat di pusat Bumi setebal ~1.200 km dengan suhu mencapai 5.400°C, tersusun dari besi dan nikel padat bertekanan luar biasa tinggi.',
        'Komposisi kimia umum: Lapisan luar kaya silikat, aluminium, dan oksigen; bagian dalam kaya besi dan nikel.'
      ],
      tip: 'Kerak dan mantel berupa batuan silikat, sedangkan inti bumi kaya akan logam besi dan nikel.'
    },
    {
      id: 'moon',
      badge: 'Satelit Alami',
      title: '4. Satelit Alami Bumi: Bulan',
      summary: 'Bulan adalah satu-satunya satelit alami Bumi yang setia mengiringi orbit kita.',
      points: [
        'Jarak rata-rata Bulan ke Bumi: Sekitar 384.400 kilometer.',
        'Periode rotasi dan revolusi: Sekitar 27,3 hari (keduanya berlangsung dalam waktu yang sama sehingga sisi Bulan yang menghadap Bumi selalu sama).',
        'Sumber cahaya: Bulan tidak memiliki sumber cahaya sendiri; Bulan memantulkan cahaya dari Matahari.',
        'Pengaruh Bulan terhadap Bumi:',
        '• Menimbulkan peristiwa pasang surut air laut akibat gaya tarik gravitasinya.',
        '• Menstabilkan kemiringan poros rotasi Bumi sehingga iklim kita tetap stabil.',
        '• Menghasilkan fenomena fase-fase bulan (bulan baru, sabit, purnama) dan gerhana.'
      ],
      tip: 'Cahaya bulan malam hari yang indah sebenarnya adalah pantulan sinar Matahari!'
    },
    {
      id: 'facts',
      badge: 'Fakta Sains',
      title: '5. Keistimewaan & Fakta Unik Bumi',
      summary: 'Bumi adalah satu-satunya planet yang terbukti dapat menopang jutaan kehidupan.',
      points: [
        'Planet Biru: Sekitar 71% permukaan Bumi diselimuti oleh air dalam bentuk cair, menjadikannya unik di antara seluruh planet Tata Surya.',
        'Atmosfer Penyokong Hidup: Terdiri atas 78% Nitrogen, 21% Oksigen, serta gas lain seperti uap air dan argon yang menjaga suhu hangat dan memberi kita udara bernapas.',
        'Perisai Magnetosfer: Inti besi cair Bumi bertindak seperti dinamo raksasa yang membangkitkan medan magnet pelindung dari radiasi mematikan angin matahari.',
        'Lapisan Ozon: Gas ozon di stratosfer menyaring radiasi sinar ultraviolet berbahaya dari Matahari.',
        'Ukuran seimbang: Gravitasi Bumi pas untuk menahan atmosfer tanpa membuatnya terlalu tebal atau beracun.'
      ],
      tip: 'Bumi adalah rumah kita bersama di antariksa yang harus selalu kita rawat dan jaga kelestariannya!'
    }
  ]
};

