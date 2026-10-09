# PRD — Game Edukasi 3D Tata Surya Kelas 6 SD

**Nama produk:** DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI  
**Subjudul:** Belajar Tata Surya  
**Jenis produk:** Web game edukasi 3D interaktif  
**Target pengguna:** Siswa kelas 6 SD dan guru yang memfasilitasi pembelajaran  
**Perangkat utama:** Laptop/desktop dan PID (Papan Interaktif Digital) layar sentuh 75 inci  
**Bahasa:** Bahasa Indonesia  
**Status dokumen:** Spesifikasi produk untuk implementasi oleh Gemini 3.8 Flash (High)

---

## 1. Ringkasan Produk

Bangun sebuah game edukasi berbasis web untuk membantu siswa kelas 6 SD mempelajari Bumi dan delapan planet di Tata Surya melalui visualisasi 3D yang semi-realistis, eksplorasi langsung, animasi rotasi dan revolusi, profil benda langit, serta kuis pilihan ganda.

Game harus dapat digunakan pada laptop dengan mouse/keyboard maupun PID 75 inci melalui sentuhan jari. Antarmuka perlu terlihat jelas dari jarak kelas, memiliki tombol besar, teks mudah dibaca, dan navigasi sederhana. Pengalaman inti harus dapat berjalan tanpa login dan tidak membutuhkan backend.

## 2. Tujuan dan Kriteria Keberhasilan

### Tujuan pembelajaran
- Siswa mengenali Bumi dan delapan planet di Tata Surya.
- Siswa memahami perbedaan rotasi dan revolusi serta akibat utamanya.
- Siswa mengenali karakteristik, komposisi umum, satelit alami, dan fakta menarik dari Bumi serta planet-planet.
- Siswa menggunakan informasi pada profil planet untuk menjawab pertanyaan dan memeriksa pemahamannya.

### Kriteria keberhasilan produk
- Pengguna dapat masuk dari beranda ke salah satu dari tiga menu utama tanpa kebingungan.
- Objek 3D dapat diputar, diperbesar/diperkecil, dan dipilih dengan mouse atau sentuhan.
- Memilih planet pada eksplorasi membuka profil planet yang relevan.
- Setiap kuis planet berisi tepat empat soal: rotasi, revolusi, zat penyusun/komposisi, dan fakta unik.
- Pilihan jawaban dapat diisi seluruhnya sebelum hasil diperlihatkan. Hasil baru muncul setelah tombol **Cek Jawaban** ditekan.
- Layout tetap dapat digunakan pada layar laptop dan layar PID 75 inci, termasuk orientasi landscape.
- Tidak ada tombol utama yang tidak berfungsi, tautan mati, teks terpotong, atau error JavaScript yang menghalangi penggunaan.

## 3. Ruang Lingkup

### Termasuk dalam MVP
- Beranda dengan judul utama yang ditentukan.
- Menu **Bumi Kita**, **Eksplorasi Luar Angkasa**, dan **Quiz**.
- Model 3D Bumi, Matahari, dan delapan planet.
- Animasi rotasi dan revolusi yang dapat dikontrol.
- Profil Bumi dan profil tiap planet.
- Kuis empat soal untuk setiap planet dengan empat opsi jawaban per soal.
- Pemeriksaan jawaban per planet, umpan balik dan skor sesi.
- Pengaturan suara, fullscreen jika didukung browser, serta navigasi kembali.
- Penyimpanan progres tidak diperlukan; hasil hanya berlaku selama sesi dan tidak wajib disimpan setelah halaman ditutup.

### Tidak termasuk dalam MVP
- Login, akun siswa/guru, dashboard guru, database, leaderboard, atau penyimpanan hasil permanen.
- Multiplayer atau permainan daring bersama.
- Editor materi atau fitur unggah konten.
- Simulasi fisika astronomi berskala dan berkecepatan nyata.
- Planet di luar delapan planet sebagai konten wajib; Pluto boleh disebut sebagai planet katai pada catatan tambahan, bukan pilihan kuis utama.

## 4. Pengguna dan Skenario Pemakaian

### Siswa
- Menjelajahi model Tata Surya dan memilih planet yang ingin dipelajari.
- Membaca atau mendengarkan penjelasan singkat.
- Mengerjakan kuis satu planet, kemudian memeriksa jawaban dan membaca pembahasan.

### Guru/fasilitator
- Menampilkan game di PID 75 inci untuk pembelajaran bersama.
- Menggunakan mouse atau sentuhan untuk memilih objek, memperbesar planet, dan menunjukkan profilnya.
- Menggunakan kuis sebagai latihan kelas; siswa dapat berdiskusi sebelum guru menekan **Cek Jawaban**.

## 5. Struktur Navigasi

1. **Beranda**
   - Tombol **Mulai Belajar**.
   - Tiga kartu/menu: Bumi Kita, Eksplorasi Luar Angkasa, Quiz.
   - Tombol suara dan fullscreen bila didukung.
2. **Bumi Kita**
   - Model 3D Bumi dan Bulan.
   - Panel materi Bumi.
   - Kontrol rotasi, revolusi, zoom, putar objek, dan kembali ke beranda.
3. **Eksplorasi Luar Angkasa**
   - Tampilan seluruh Tata Surya.
   - Pilih planet untuk membuka detail/profil.
   - Kontrol kamera, animasi, label nama, dan kembali.
4. **Quiz**
   - Pilih salah satu dari delapan planet.
   - Tampilan planet 3D beserta empat soal.
   - Tombol **Cek Jawaban** setelah seluruh soal diisi.
   - Hasil dan pembahasan untuk planet itu; pilihan untuk coba lagi, memilih planet lain, atau kembali.

## 6. Beranda (Homescreen)

Teks wajib ditampilkan persis sebagai berikut:

**DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI**  
**Belajar Tata Surya**

### Arahan desain
- Judul utama besar, dominan, dan mudah dibaca dari jarak jauh.
- Subjudul berada tepat di bawah judul utama.
- Latar luar angkasa yang menarik tetapi tidak mengganggu keterbacaan; gunakan bintang, nebula lembut, dan objek planet 3D.
- Gaya visual semi-realistis dengan pencahayaan sinematik yang tetap ringan untuk browser.
- Sediakan tombol **Mulai Belajar** serta akses langsung ke tiga menu utama.
- Pastikan kontras teks tinggi dan tombol mempunyai area sentuh yang luas.
- Jangan menambahkan login atau form profil pengguna.

## 7. Menu Bumi Kita

### Visual 3D
- Tampilkan Bumi sebagai globe 3D dengan tekstur benua, samudra, awan opsional, pencahayaan Matahari, dan sumbu rotasi yang dapat dijelaskan.
- Tampilkan Bulan sebagai satelit alami Bumi. Jika memungkinkan, animasikan revolusi Bulan secara sederhana.
- Pengguna dapat memutar globe, zoom in/out, dan mengatur animasi.
- Sediakan label atau penanda yang tidak menutupi informasi utama.

### Materi wajib
1. **Rotasi Bumi** — Bumi berputar pada porosnya; satu rotasi relatif terhadap Matahari berlangsung sekitar 24 jam dan berkaitan dengan pergantian siang dan malam.
2. **Revolusi Bumi** — Bumi mengelilingi Matahari; satu putaran memerlukan sekitar 365,25 hari. Tahun kabisat membantu menyelaraskan kalender dengan periode ini.
3. **Lapisan dan zat penyusun Bumi** — Jelaskan kerak, mantel, inti luar, dan inti dalam. Bedakan lapisan struktur Bumi dari komposisi kimianya. Sebutkan secara sederhana bahwa Bumi tersusun terutama dari batuan dan mineral silikat pada lapisan luar, sedangkan inti kaya besi dan nikel.
4. **Satelit alami** — Bulan adalah satelit alami Bumi; jelaskan bahwa Bulan mengorbit Bumi dan memantulkan cahaya Matahari.
5. **Fakta unik Bumi** — Bumi diketahui mendukung kehidupan, memiliki air cair yang melimpah di permukaan, atmosfer, medan magnet, serta satu satelit alami besar relatif terhadap ukuran planetnya.

### Penyajian materi
- Sajikan sebagai kartu informasi singkat, bukan paragraf panjang.
- Setiap kartu memiliki judul, penjelasan sederhana, dan ilustrasi/penanda jika membantu.
- Istilah ilmiah harus dijelaskan dengan bahasa yang sesuai untuk kelas 6 SD.
- Jangan menyatakan bahwa musim terjadi semata-mata karena Bumi lebih dekat atau lebih jauh dari Matahari; kemiringan sumbu Bumi merupakan faktor utama.

## 8. Menu Eksplorasi Luar Angkasa

### Tampilan utama
- Matahari berada di pusat visual dan delapan planet ditampilkan berurutan: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus.
- Setiap planet mempunyai nama yang jelas dan dapat dipilih dengan klik atau tap.
- Berikan dua mode tampilan:
  1. **Tata Surya Lengkap:** seluruh Matahari dan planet terlihat bersama.
  2. **Mode Dekat:** kamera fokus ke planet yang dipilih dan menampilkan model 3D lebih besar.
- Sediakan tombol untuk kembali ke tampilan seluruh Tata Surya.
- Orbit dapat digambar sebagai garis halus agar jalur revolusi mudah dipahami.

### Akurasi visual dan skala
- Ukuran planet dan jarak orbit nyata sangat berbeda. Tata Surya dengan semua planet pada satu layar tidak mungkin sekaligus menunjukkan ukuran dan jarak dengan skala yang akurat serta tetap mudah digunakan.
- Karena itu, gunakan **skala visual edukatif**: urutan planet dan perbedaan relatif ukuran dibuat masuk akal, sedangkan jarak orbit dikompresi agar semua planet terlihat. Beri label singkat bahwa jarak dan ukuran tidak ditampilkan pada skala astronomi yang sama.
- Jangan membuat Matahari dan planet tampak berukuran sama. Saturnus harus memiliki cincin yang mudah dikenali. Uranus dan Neptunus harus dapat dibedakan melalui warna/label, bukan warna saja.
- Hindari klaim bahwa planet bergerak dalam orbit lingkaran sempurna; orbitnya elips, walaupun dapat disederhanakan secara visual.

### Interaksi
- Klik/tap planet untuk membuka **Profil Planet**.
- Putar planet dengan drag satu jari atau mouse; zoom menggunakan pinch, scroll, atau tombol plus/minus.
- Tombol animasi **Putar**, **Jeda**, dan **Atur Ulang Tampilan**.
- Tombol **Kembali ke Tata Surya** selalu tersedia saat profil atau mode dekat terbuka.
- Kamera dan kontrol harus tetap responsif; pengguna tidak boleh terjebak di tampilan dekat.

### Profil setiap planet
Setiap profil minimal memuat:
- Nama planet dan urutannya dari Matahari.
- Jenis planet: kebumian/terestrial atau raksasa gas/es, dengan penjelasan yang sesuai.
- Rotasi: lama satu putaran pada sumbu, satuan jam atau hari, serta catatan bila rotasi retrograde atau nilai memiliki definisi khusus.
- Revolusi: lama satu orbit mengelilingi Matahari, dengan satuan hari atau tahun Bumi.
- Komposisi/zat penyusun utama: gambaran umum yang akurat, tidak menyiratkan bahwa planet tersusun dari satu bahan saja.
- Satelit alami: jumlah dapat berubah berdasarkan penemuan baru; untuk menghindari data cepat usang, tampilkan jumlah hanya jika sumber dapat diverifikasi dan cantumkan waktu pembaruan. Jika tidak, sebutkan contoh atau gunakan frasa aman seperti “memiliki banyak satelit alami”.
- Minimal tiga fakta unik singkat dan sesuai usia.
- Tombol untuk kembali ke Tata Surya dan tombol **Pelajari lewat Quiz**.

## 9. Acuan Materi Planet

Gunakan tabel berikut sebagai acuan awal, lalu verifikasi angka dan redaksi menggunakan sumber astronomi tepercaya sebelum implementasi. Angka dibulatkan untuk pembelajaran kelas 6 SD.

| Planet | Rotasi (perkiraan) | Revolusi mengelilingi Matahari (perkiraan) | Komposisi utama secara umum |
|---|---|---|---|
| Merkurius | 58,6 hari Bumi | 88 hari Bumi | Planet berbatu, inti logam besar, mantel dan kerak batuan |
| Venus | 243 hari Bumi, retrograde | 225 hari Bumi | Planet berbatu dengan atmosfer sangat tebal yang didominasi karbon dioksida |
| Bumi | 23 jam 56 menit relatif terhadap bintang; sekitar 24 jam untuk hari Matahari | 365,25 hari | Batuan dan mineral silikat; inti kaya besi dan nikel; air dan atmosfer di permukaan/luar |
| Mars | 24,6 jam | 687 hari Bumi | Planet berbatu, permukaan kaya mineral besi teroksidasi, atmosfer tipis didominasi karbon dioksida |
| Jupiter | sekitar 9 jam 56 menit | sekitar 11,86 tahun Bumi | Raksasa gas, terutama hidrogen dan helium |
| Saturnus | sekitar 10,7 jam (perkiraan) | sekitar 29,4 tahun Bumi | Raksasa gas, terutama hidrogen dan helium; sistem cincin menonjol |
| Uranus | sekitar 17 jam, retrograde | sekitar 84 tahun Bumi | Raksasa es, kaya senyawa volatil seperti air, amonia, dan metana di bagian dalam; atmosfer hidrogen, helium, dan metana |
| Neptunus | sekitar 16 jam | sekitar 164,8 tahun Bumi | Raksasa es dengan atmosfer hidrogen, helium, dan metana serta interior kaya senyawa volatil |

**Catatan implementasi materi:**
- Bedakan “hari rotasi” dengan panjang hari Matahari jika nilai keduanya berbeda secara bermakna.
- Untuk Venus dan Uranus, jelaskan rotasi retrograde secara singkat sebagai rotasi berlawanan arah dibandingkan kebanyakan planet, dengan definisi acuan yang konsisten.
- Untuk raksasa es, jangan menyebutnya sebagai bola es padat. Jelaskan bahwa istilah tersebut mengacu pada komposisi interior, bukan permukaan es padat seperti es batu.
- Fakta unik harus benar, singkat, menarik, dan tidak mengandalkan mitos populer yang keliru.
- Jangan menyamakan komposisi atmosfer dengan keseluruhan komposisi planet.

## 10. Menu Quiz

### Alur kuis
1. Pengguna masuk ke menu **Quiz**.
2. Tampilkan pilihan delapan planet dengan ikon/nama dan thumbnail 3D.
3. Setelah satu planet dipilih, tampilkan model planet 3D dan empat soal pilihan ganda.
4. Tiap soal memiliki empat opsi (A, B, C, D) dan hanya satu jawaban benar.
5. Pengguna memilih satu jawaban untuk setiap soal. Pilihan dapat diubah sebelum pengecekan.
6. Tombol **Cek Jawaban** dinonaktifkan atau menampilkan petunjuk jika masih ada soal yang belum dijawab.
7. Setelah semua soal dijawab dan tombol **Cek Jawaban** ditekan, tampilkan hasil keempat soal sekaligus: benar/salah, jawaban benar, dan pembahasan ringkas.
8. Tampilkan skor planet, misalnya **3 dari 4 benar (75%)**.
9. Sediakan tombol **Coba Lagi**, **Pilih Planet Lain**, dan **Kembali ke Beranda**.

### Aturan penting
- Jangan memperlihatkan benar/salah, warna benar/salah, pembahasan, atau kunci jawaban sebelum pengguna menekan **Cek Jawaban**.
- Sebelum pengecekan, opsi yang dipilih hanya menunjukkan status terpilih netral, bukan indikasi benar atau salah.
- Pemeriksaan dilakukan per planet, bukan setelah semua delapan planet selesai.
- Empat kategori wajib, tepat satu soal per kategori: rotasi, revolusi, komposisi, dan fakta unik.
- Setiap soal memiliki tepat empat opsi yang masuk akal, tetapi hanya satu yang benar berdasarkan redaksi soal.
- Acak urutan opsi bila mudah diterapkan, tetapi pastikan kunci jawaban mengikuti opsi setelah pengacakan.
- Jangan mengulang pertanyaan yang sama pada satu sesi bila bank soal alternatif tersedia. Minimum MVP boleh memakai empat soal tetap per planet, dengan isi berkualitas dan tanpa ambiguitas.
- Hasil tidak perlu disimpan permanen. Jika pengguna memilih coba lagi, kosongkan pilihan jawaban untuk percobaan baru.

### Desain layar kuis
- Layout dua area: planet 3D pada satu sisi dan panel soal pada sisi lainnya; pada PID, sesuaikan agar soal serta opsi cukup besar untuk disentuh.
- Tampilkan indikator **Planet: [Nama]** dan progres **Soal 1 dari 4** atau empat penanda soal.
- Opsi jawaban berupa kartu/tombol besar, bukan radio kecil.
- Tombol **Cek Jawaban** terlihat jelas di bagian bawah panel dan tidak tertutup objek 3D.
- Hasil akhir planet ditampilkan sebagai panel yang mudah dibaca, dengan pembahasan singkat untuk tiap soal.
- Gunakan ikon dan teks selain warna untuk menandai benar/salah agar tetap mudah dipahami pengguna yang memiliki kesulitan membedakan warna.

## 11. Rancangan Bank Soal

Buat empat soal untuk setiap planet, sehingga terdapat minimal 32 soal inti. Setiap planet harus memiliki:
1. Satu soal tentang rotasi.
2. Satu soal tentang revolusi.
3. Satu soal tentang komposisi/zat penyusun.
4. Satu soal tentang fakta unik.

Untuk tiap soal, sediakan struktur data:
- `id`: ID unik.
- `planetId`: ID planet.
- `category`: `rotation`, `revolution`, `composition`, atau `funFact`.
- `question`: teks soal dalam Bahasa Indonesia.
- `options`: empat opsi jawaban.
- `correctOptionId`: ID opsi benar.
- `explanation`: penjelasan mengapa jawaban benar.
- `sourceNote`: referensi atau catatan sumber untuk validasi konten (dapat disimpan dalam data proyek, tidak harus ditampilkan kepada siswa).

Validasi konten soal:
- Pertanyaan tidak boleh memiliki dua jawaban yang sama-sama dapat dianggap benar.
- Opsi pengecoh harus masuk akal, tidak lucu secara berlebihan, dan tidak bergantung pada permainan kata.
- Hindari pertanyaan angka yang membutuhkan presisi lebih tinggi daripada materi profil. Jika angka dibulatkan, gunakan kata “sekitar”.
- Jangan meminta siswa menghafal jumlah satelit yang bisa berubah kecuali data sudah diverifikasi dan tanggal pembaruannya jelas.
- Pastikan pembahasan tidak bertentangan dengan informasi profil planet.

## 12. Arah Desain UI/UX

### Gaya visual
- Semi-realistis, nuansa luar angkasa yang imersif, tekstur planet yang mudah dikenali, pencahayaan menarik, dan animasi halus.
- Latar gelap untuk kontras, dengan panel informasi yang tetap terang/cukup kontras dan mudah dibaca.
- Hindari efek glow berlebihan, partikel yang mengganggu, dan gerakan kamera mendadak.
- Animasi harus mendukung belajar, bukan mengalihkan perhatian.

### Responsif untuk laptop dan PID
- Prioritaskan landscape.
- Laptop: mendukung lebar viewport mulai sekitar 1280 px dan tetap beradaptasi ke layar lebih kecil.
- PID 75 inci: tombol sentuh minimal sekitar 56–64 CSS px pada kontrol utama, jarak antar tombol cukup, dan target sentuh tidak berdekatan.
- Teks isi idealnya 18–22 CSS px pada layar besar; judul bagian 28–36 px; judul beranda jauh lebih besar dan responsif.
- Gunakan CSS responsif dan satuan relatif, bukan ukuran tetap yang menyebabkan elemen terpotong.
- Tidak boleh mengandalkan hover karena layar sentuh tidak memiliki hover.
- Semua kontrol utama dapat digunakan dengan mouse dan sentuhan.
- Hindari drag yang memerlukan gerakan presisi. Sediakan tombol alternatif untuk rotasi/zoom jika perlu.
- Sediakan tombol fullscreen jika browser mendukungnya dan jelaskan jika browser menolak permintaan fullscreen.

### Aksesibilitas dan kenyamanan
- Kontras warna teks dan latar harus memadai.
- Teks penting tidak hanya dibedakan berdasarkan warna.
- Kontrol dapat diakses dengan keyboard pada laptop, termasuk fokus yang terlihat dan Enter/Space untuk tombol.
- Sediakan tombol jeda animasi dan pengaturan suara.
- Hormati preferensi pengurangan gerakan (`prefers-reduced-motion`) jika memungkinkan.

## 13. Audio

- Musik latar dan efek suara bersifat opsional dan secara default tidak boleh menghalangi pembelajaran.
- Sediakan tombol suara aktif/nonaktif yang mudah ditemukan dan statusnya jelas.
- Jangan memulai audio bersuara otomatis sebelum ada interaksi pengguna jika kebijakan browser melarangnya.
- Jika narasi tidak dapat disediakan dengan andal, jangan membuat fitur narasi palsu; seluruh materi tetap harus lengkap dalam teks.
- Game harus tetap berfungsi penuh tanpa audio.

## 14. Persyaratan Teknis

### Pilihan teknologi
Pilih teknologi berdasarkan keandalan untuk web 3D, kompatibilitas browser, dukungan sentuhan, kemudahan implementasi, dan performa. **Three.js** atau **Babylon.js** dapat digunakan; pilih satu saja agar implementasi tidak membengkak. Jelaskan pilihan singkat di dokumentasi proyek.

### Rekomendasi arsitektur
- Aplikasi single-page web dengan komponen terpisah untuk beranda, Bumi Kita, eksplorasi, profil planet, kuis, dan hasil.
- Data planet serta bank soal dipisahkan dari komponen UI agar mudah diperbaiki.
- Gunakan WebGL melalui engine 3D yang dipilih.
- Gunakan aset tekstur yang dioptimalkan, ukuran file wajar, dan lazy loading jika memungkinkan.
- Sediakan fallback atau pesan yang jelas jika perangkat/browser tidak mendukung WebGL.
- Hindari backend, API key, dan layanan berbayar untuk fungsi inti.
- Jangan memerlukan API AI saat game berjalan; konten pembelajaran harus sudah tersedia di dalam aplikasi.

### Offline (preferensi)
- Utamakan agar aplikasi dapat dipakai kembali tanpa internet setelah seluruh aset utama tersedia.
- Jika memungkinkan, implementasikan PWA/service worker untuk cache shell aplikasi, data planet, bank soal, dan aset yang diperlukan.
- Jika PWA terlalu berisiko untuk cakupan MVP, pastikan setidaknya game dapat dijalankan dari deployment web yang stabil dan dokumentasikan bahwa pemuatan awal memerlukan internet.
- Jangan menjanjikan mode offline penuh sebelum cache aset 3D dan pengujian offline berhasil.

### Performa
- Targetkan animasi terasa lancar pada perangkat kelas umum; usahakan sekitar 30 FPS atau lebih pada perangkat yang memenuhi spesifikasi.
- Batasi jumlah partikel, bayangan real-time, dan efek pascapemrosesan.
- Sediakan tingkat kualitas grafis sederhana atau deteksi kualitas otomatis jika diperlukan.
- Jangan memuat delapan model planet beresolusi tinggi sekaligus bila hal itu menyebabkan waktu muat lama.
- Tampilkan indikator loading saat aset utama sedang dimuat dan pesan kesalahan yang ramah jika gagal.

## 15. Data dan State Aplikasi

Data inti disimpan lokal dalam file proyek:
- `planets`: data delapan planet, nilai rotasi/revolusi, komposisi, satelit, fakta unik, dan informasi sumber.
- `quizQuestions`: empat soal per planet dengan opsi, kunci jawaban, dan pembahasan.
- `appSettings`: status suara dan preferensi tampilan sementara.

State kuis per planet sekurang-kurangnya mencakup:
- planet terpilih;
- pilihan jawaban untuk empat soal;
- apakah kuis sudah diperiksa;
- skor benar;
- hasil dan pembahasan.

Aturan state:
- Sebelum pemeriksaan, simpan pilihan secara sementara di memori aplikasi.
- Setelah tombol **Cek Jawaban** ditekan, kunci pilihan atau tampilkan hasil; tentukan perilaku secara konsisten dan hindari perubahan jawaban yang membuat skor tidak sinkron.
- **Coba Lagi** menghapus jawaban dan hasil untuk planet tersebut pada percobaan baru.
- Berpindah menu tidak boleh menyebabkan error atau membuat antarmuka macet.
- Tidak perlu menyimpan data siswa atau progres ke server/localStorage pada MVP.

## 16. Sumber dan Akurasi Ilmiah

Sebelum merilis, verifikasi fakta dan angka menggunakan sumber yang tepercaya seperti NASA Solar System Exploration, NASA Earth Observatory, atau lembaga astronomi/pendidikan sains yang kredibel. Catat sumber untuk setiap fakta numerik di data proyek atau dokumentasi.

- Gunakan angka perkiraan yang konsisten antara profil dan soal.
- Bedakan data yang relatif tetap dari data yang dapat berubah, misalnya jumlah satelit yang diketahui.
- Jangan mengarang fakta, kutipan, atau sumber.
- Jika sumber memberikan angka berbeda karena metode pengukuran/definisi berbeda, pilih satu definisi yang sesuai untuk tingkat SD dan jelaskan seperlunya.
- Materi siswa tetap ringkas; catatan sumber tidak perlu memenuhi layar.

## 17. Penanganan Error dan Keadaan Kosong

- Jika WebGL tidak tersedia: tampilkan pesan bahwa visual 3D tidak didukung browser/perangkat tersebut, beserta langkah sederhana seperti mencoba browser terbaru; jangan biarkan layar kosong.
- Jika aset gagal dimuat: tampilkan indikator gagal dan tombol **Coba Muat Ulang**.
- Jika pengguna menekan **Cek Jawaban** saat masih ada soal kosong: tampilkan pesan yang jelas dan arahkan ke soal yang belum dijawab; jangan menghitung skor.
- Jika pengguna memilih planet lain saat kuis belum diperiksa, minta konfirmasi singkat atau reset dengan pesan yang jelas agar jawaban tidak hilang tanpa sengaja.
- Jika fullscreen tidak didukung atau ditolak browser, aplikasi tetap harus berfungsi normal.
- Pastikan tidak ada kontrol yang terlihat aktif tetapi tidak melakukan tindakan.

## 18. Acceptance Criteria / Kriteria Penerimaan

### Beranda dan navigasi
- [ ] Judul beranda tertulis persis “DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI”.
- [ ] Subjudul tertulis persis “Belajar Tata Surya”.
- [ ] Tiga menu utama tersedia dan dapat dibuka.
- [ ] Tombol kembali bekerja di seluruh layar dalam aplikasi.

### Bumi Kita
- [ ] Globe Bumi 3D dapat diputar dan diperbesar/diperkecil.
- [ ] Materi rotasi, revolusi, lapisan/komposisi, Bulan, dan fakta unik tersedia.
- [ ] Animasi dapat dijeda atau dihentikan.

### Eksplorasi Luar Angkasa
- [ ] Matahari dan delapan planet ditampilkan dalam urutan yang benar.
- [ ] Tersedia tampilan Tata Surya lengkap dan mode dekat planet.
- [ ] Klik/tap planet membuka profil yang sesuai.
- [ ] Profil memuat rotasi, revolusi, komposisi, satelit alami, dan fakta unik.
- [ ] Pengguna dapat kembali ke tampilan Tata Surya lengkap kapan saja.

### Quiz
- [ ] Delapan planet dapat dipilih untuk kuis.
- [ ] Setiap planet memiliki empat soal, satu per kategori.
- [ ] Setiap soal memiliki empat opsi dan satu jawaban benar.
- [ ] Jawaban tidak diperiksa sebelum tombol **Cek Jawaban** ditekan.
- [ ] Tombol pengecekan mencegah hasil jika masih ada soal belum dijawab.
- [ ] Setelah pengecekan, hasil, jawaban benar, penjelasan, dan skor planet muncul.
- [ ] **Coba Lagi** mereset kuis dengan benar.

### Perangkat dan kualitas
- [ ] Semua fitur inti dapat dipakai dengan mouse dan layar sentuh.
- [ ] Target sentuh cukup besar untuk PID 75 inci.
- [ ] Layout tidak terpotong pada laptop dan PID landscape.
- [ ] Tidak ada error fatal pada alur utama.
- [ ] Suara dapat dimatikan dan game tetap berfungsi tanpa suara.
- [ ] Jika offline/PWA didukung, fungsi offline sudah diuji; jika belum, keterbatasannya didokumentasikan.

## 19. Rencana Pengujian Manual

1. Buka beranda di laptop dan PID, periksa judul, tombol, dan responsivitas.
2. Buka Bumi Kita, putar globe, zoom, jeda animasi, dan buka setiap kartu materi.
3. Buka Eksplorasi, pilih masing-masing planet, periksa urutan, profil, dan navigasi kembali.
4. Buka kuis setiap planet; pastikan ada empat kategori dan empat opsi per soal.
5. Pilih tiga jawaban saja, tekan **Cek Jawaban**, dan pastikan sistem meminta melengkapi soal yang kosong.
6. Isi keempat jawaban, pastikan tidak ada umpan balik benar/salah sebelum pengecekan.
7. Tekan **Cek Jawaban**, verifikasi skor, kunci, dan pembahasan.
8. Uji **Coba Lagi**, memilih planet lain, dan kembali ke beranda.
9. Uji mouse, keyboard, sentuhan, suara, fullscreen, dan ukuran viewport berbeda.
10. Uji kegagalan WebGL atau aset bila memungkinkan, serta perilaku saat koneksi internet tidak tersedia jika mode offline diimplementasikan.

## 20. Instruksi Implementasi untuk Gemini 3.8 Flash (High)

Bertindak sebagai tim pengembang produk yang mencakup product designer, pengembang web 3D, pengembang frontend, dan pemeriksa konten sains. Bangun aplikasi yang benar-benar berjalan, bukan hanya mockup atau dokumentasi.

Urutan kerja yang diharapkan:
1. Tentukan stack web 3D yang paling sesuai dan jelaskan keputusan secara singkat.
2. Buat struktur proyek yang jelas dan data planet/soal terpisah dari UI.
3. Implementasikan semua alur inti: beranda, Bumi Kita, eksplorasi, profil planet, kuis, pemeriksaan jawaban, dan hasil.
4. Gunakan model/tekstur 3D yang tersedia dan legal digunakan. Jika aset eksternal tidak tersedia, buat visual planet prosedural atau placeholder 3D berkualitas; jangan menampilkan kotak kosong atau mengklaim placeholder sebagai tekstur ilmiah asli.
5. Pastikan interaksi bekerja dengan mouse dan layar sentuh serta layout cocok untuk PID 75 inci.
6. Verifikasi fakta sains, khususnya angka rotasi/revolusi dan komposisi, sebelum memasukkannya ke profil dan soal.
7. Jalankan aplikasi, perbaiki error build/runtime, dan uji acceptance criteria di atas.
8. Berikan petunjuk menjalankan aplikasi, struktur file, teknologi yang digunakan, batasan offline, dan daftar pengujian yang telah dilakukan.

### Prioritas implementasi
- **P0 — Wajib:** seluruh navigasi, visualisasi 3D inti, profil Bumi/delapan planet, kuis per planet dengan empat soal, pemeriksaan jawaban tertunda sampai tombol ditekan, dan layout laptop/PID.
- **P1 — Penting:** kontrol animasi yang nyaman, suara opsional, fullscreen, penanganan error, aksesibilitas dasar, dan optimasi performa.

### Definisi selesai
Proyek dianggap selesai jika dapat dijalankan melalui browser, semua alur P0 berfungsi, seluruh delapan planet memiliki profil dan kuis yang benar, mekanisme **Cek Jawaban** mengikuti aturan yang ditetapkan, serta pengujian pada laptop dan layar sentuh besar tidak menemukan masalah penghalang.
