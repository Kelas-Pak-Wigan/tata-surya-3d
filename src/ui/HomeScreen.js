export class HomeScreen {
  constructor(onNavigate) {
    this.onNavigate = onNavigate;
  }

  render(container) {
    container.innerHTML = `
      <section class="screen-home" id="home-view">
        <div class="home-hero">
          <div class="hero-badge">
            <span class="badge-icon">🪐</span>
            <span>Media Pembelajaran IPA Kelas 6 SD • Tata Surya 3D</span>
          </div>

          <h1 class="main-title">DIPAKSA PRAKTEK NGAJAR SAMA PAK ADI</h1>
          <h2 class="sub-title">Belajar Tata Surya</h2>

          <p class="hero-desc">
            Selamat datang di petualangan antariksa interaktif! Jelajahi keagungan Bumi dan 
            delapan planet di Tata Surya dengan visual 3D, pelajari gerak rotasi & revolusi, 
            serta uji pemahamanmu melalui kuis interaktif.
          </p>

          <div class="hero-action">
            <button class="btn btn-primary btn-large btn-pulse" id="btn-start-learning">
              <span class="btn-icon">🚀</span>
              <span class="btn-text">Mulai Belajar Sekarang</span>
            </button>
          </div>
        </div>

        <div class="home-menu-grid">
          <!-- Card 1: Bumi Kita -->
          <div class="menu-card menu-card-earth" id="card-earth" tabindex="0" role="button" aria-label="Buka Menu Bumi Kita">
            <div class="card-glow"></div>
            <div class="card-icon-wrap">
              <span class="card-emoji">🌍</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">Bumi Kita</h3>
              <p class="card-desc">
                Pelajari globe 3D Bumi, rotasi (siang & malam), revolusi (pergantian musim), 
                lapisan struktur tanah dan batuan, serta satelit setia kita: Bulan.
              </p>
              <div class="card-footer">
                <span class="card-btn-link">Buka Menu Bumi Kita &rarr;</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Eksplorasi Luar Angkasa -->
          <div class="menu-card menu-card-exploration" id="card-exploration" tabindex="0" role="button" aria-label="Buka Menu Eksplorasi Luar Angkasa">
            <div class="card-glow"></div>
            <div class="card-icon-wrap">
              <span class="card-emoji">☀️</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">Eksplorasi Luar Angkasa</h3>
              <p class="card-desc">
                Jelajahi seluruh Tata Surya dari dekat! Amati Matahari dan delapan planet berurutan, 
                cincin megah Saturnus, dan profil lengkap setiap planet.
              </p>
              <div class="card-footer">
                <span class="card-btn-link">Mulai Eksplorasi 3D &rarr;</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Quiz -->
          <div class="menu-card menu-card-quiz" id="card-quiz" tabindex="0" role="button" aria-label="Buka Menu Quiz Tata Surya">
            <div class="card-glow"></div>
            <div class="card-icon-wrap">
              <span class="card-emoji">🏆</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">Quiz Planet</h3>
              <p class="card-desc">
                Tantang dirimu dengan 4 soal seru per planet (rotasi, revolusi, komposisi, fakta unik). 
                Diskusikan di kelas, lalu cek hasil dan pembahasannya bersama!
              </p>
              <div class="card-footer">
                <span class="card-btn-link">Mulai Latihan Kuis &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        <div class="home-footer-info">
          <span>Dirancang khusus untuk pembelajaran laptop & Papan Interaktif Digital (PID) 75 Inci</span>
        </div>
      </section>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    const btnStart = container.querySelector('#btn-start-learning');
    const cardEarth = container.querySelector('#card-earth');
    const cardExploration = container.querySelector('#card-exploration');
    const cardQuiz = container.querySelector('#card-quiz');

    if (btnStart) {
      btnStart.addEventListener('click', () => this.onNavigate('exploration'));
    }

    if (cardEarth) {
      cardEarth.addEventListener('click', () => this.onNavigate('earth'));
      cardEarth.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.onNavigate('earth');
        }
      });
    }

    if (cardExploration) {
      cardExploration.addEventListener('click', () => this.onNavigate('exploration'));
      cardExploration.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.onNavigate('exploration');
        }
      });
    }

    if (cardQuiz) {
      cardQuiz.addEventListener('click', () => this.onNavigate('quiz'));
      cardQuiz.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.onNavigate('quiz');
        }
      });
    }
  }
}

