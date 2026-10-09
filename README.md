# DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI
## Belajar Tata Surya — Web Game Edukasi 3D Interaktif (Kelas 6 SD)

Aplikasi media pembelajaran interaktif berbasis web 3D untuk siswa kelas 6 SD dan guru, dirancang khusus untuk penggunaan di laptop dan **Papan Interaktif Digital (PID) layar sentuh 75 inci**.

---

## 🚀 Fitur Utama

1. **Beranda Interaktif (Homescreen)**
   - Judul utama: **DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI**
   - Subjudul: **Belajar Tata Surya**
   - Latar belakang antariksa 3D sinematik dengan bintang, pencahayaan, dan planet yang berputar halus.
   - Akses instan ke 3 menu pembelajaran: *Bumi Kita*, *Eksplorasi Luar Angkasa*, dan *Quiz Planet*.

2. **Menu Bumi Kita**
   - Model 3D globe Bumi dengan kemiringan sumbu rotasi 23,5°, lapisan awan berputar, atmosfer biru, serta Bulan yang mengorbit.
   - Kontrol navigasi 3D (putar, zoom in/out, jeda/putar rotasi, dan atur ulang tampilan).
   - 5 modul materi wajib kelas 6 SD:
     1. **Rotasi Bumi** (24 jam, pergantian siang & malam, gerak semu harian).
     2. **Revolusi Bumi** (365,25 hari, tahun kabisat, kemiringan sumbu 23,5° penyebab pergantian musim).
     3. **Lapisan & Zat Penyusun Bumi** (kerak, mantel, inti luar cair, inti dalam padat, komposisi silikat vs besi-nikel).
     4. **Satelit Alami (Bulan)** (orbit ~27,3 hari, pemantulan sinar matahari, pasang surut air laut).
     5. **Fakta Unik Bumi** (planet berkehidupan, 71% air cair, perisai medan magnet).

3. **Menu Eksplorasi Luar Angkasa**
   - Tampilan visual Matahari di pusat dan 8 planet berurutan (*Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus*).
   - Dua mode: **Tata Surya Lengkap** dan **Mode Dekat Planet**.
   - Selector cepat planet di bagian atas layar untuk mempermudah sentuhan jari pada PID 75 inci.
   - Profil lengkap setiap planet: urutan, jenis (terestrial/raksasa gas/raksasa es), periode rotasi, periode revolusi, komposisi, satelit alami, dan 3+ fakta unik.
   - Tombol **Pelajari lewat Quiz** langsung dari profil planet.

4. **Menu Quiz Planet (32 Soal Terverifikasi)**
   - Pilihan 8 planet dengan pratinjau visual.
   - Layout dua area: Planet 3D interaktif di sisi kiri dan panel soal di sisi kanan.
   - Tepat 4 soal pilihan ganda per planet (1 rotasi, 1 revolusi, 1 komposisi, 1 fakta unik).
   - Status pemilihan netral sebelum tombol **Cek Jawaban** ditekan (tidak membocorkan benar/salah).
   - Validasi kelengkapan soal sebelum penilaian.
   - Umpan balik komprehensif setelah tombol ditekan: skor akhir, tanda benar/salah, kunci jawaban, dan pembahasan ilmiah mendalam.
   - Tombol *Coba Lagi*, *Pilih Planet Lain*, dan *Kembali ke Beranda*.

5. **Audio Sintetis & Layar Sentuh PID**
   - Synthesizer suara procedural via **Web Audio API** (tanpa download MP3 eksternal, bebas error CORS/jaringan).
   - Tombol sentuh ekstra besar (min. 58–68px) yang ramah jari pada PID 75 inci.
   - Tombol layar penuh (fullscreen) terintegrasi.
   - 100% Berjalan offline tanpa memerlukan koneksi internet setelah aset terpasang.

---

## 🛠️ Teknologi yang Digunakan

- **Three.js**: Engine grafis 3D WebGL performa tinggi.
- **Canvas 2D Procedural Textures**: Generator tekstur planet semi-realistis resolusi tinggi dalam memori (tanpa ketergantungan aset gambar eksternal).
- **Web Audio API**: Efek suara dan nada kosmis prosedural tanpa file audio luar.
- **Vite**: Bundler frontend modern dan server pengembangan ultra-cepat.
- **PWA Service Worker**: Caching aset shell web untuk kesiapan pembelajaran offline di ruang kelas.

---

## 💻 Cara Menjalankan Aplikasi

### Prasyarat
- Node.js (versi 18+)
- Browser modern (Google Chrome, Microsoft Edge, Mozilla Firefox)

### Langkah Instalasi & Menjalankan:
```bash
# 1. Masuk ke direktori proyek
cd "tata surya 3d"

# 2. Instal dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka URL yang ditampilkan di terminal (default: `http://localhost:3000`).

### Pengujian Otomatis (Verifikasi PRD):
```bash
npm test
```
Menjalankan pengujian kepatuhan PRD (32 soal, 8 planet, 4 kategori, data ilmiah, dan materi Bumi Kita).

### Build Produksi:
```bash
npm run build
```
Menghasilkan bundle statis di folder `dist/` yang siap di-deploy ke web hosting atau dijalankan secara offline.

---

## 📚 Sumber Ilmiah & Akurasi Sains
Seluruh fakta numerik dan karakteristik planet diverifikasi mengacu pada:
- **NASA Solar System Exploration** (*Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune Fact Sheets*)
- **NASA Earth Observatory** (*Earth’s Layers, Atmosphere, and Seasons*)

