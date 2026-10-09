import { soundManager } from '../audio/soundEffects.js';

export class NavigationBar {
  constructor(onNavigate) {
    this.onNavigate = onNavigate;
    this.currentRoute = 'home';
    this.isMuted = soundManager.isMuted;
    this.isFullscreen = false;
  }

  render(headerEl) {
    headerEl.innerHTML = `
      <div class="header-container">
        <!-- Judul Ringkas Kiri -->
        <div class="header-brand" id="brand-home-link" role="button" tabindex="0" aria-label="Kembali ke Beranda">
          <span class="brand-logo">🪐</span>
          <div class="brand-text-group">
            <span class="brand-title">Tata Surya 3D</span>
            <span class="brand-subtitle">Kelas 6 SD</span>
          </div>
        </div>

        <!-- Menu Navigasi Tengah -->
        <nav class="header-nav" aria-label="Navigasi Utama">
          <button class="nav-item-btn active" data-route="home">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Beranda</span>
          </button>
          <button class="nav-item-btn" data-route="earth">
            <span class="nav-icon">🌍</span>
            <span class="nav-label">Bumi Kita</span>
          </button>
          <button class="nav-item-btn" data-route="exploration">
            <span class="nav-icon">☀️</span>
            <span class="nav-label">Eksplorasi Luar Angkasa</span>
          </button>
          <button class="nav-item-btn" data-route="quiz">
            <span class="nav-icon">🏆</span>
            <span class="nav-label">Quiz Planet</span>
          </button>
        </nav>

        <!-- Utilitas Kanan: Suara & Fullscreen -->
        <div class="header-tools">
          <button class="tool-btn" id="btn-toggle-sound" title="Aktifkan / Matikan Suara" aria-label="Pengaturan Suara">
            <span class="tool-icon" id="sound-icon">${this.isMuted ? '🔇' : '🔊'}</span>
            <span class="tool-label" id="sound-label">${this.isMuted ? 'Senyap' : 'Suara Aktif'}</span>
          </button>

          <button class="tool-btn" id="btn-toggle-fullscreen" title="Layar Penuh (Fullscreen)" aria-label="Layar Penuh">
            <span class="tool-icon" id="fs-icon">⛶</span>
            <span class="tool-label" id="fs-label">Layar Penuh</span>
          </button>
        </div>
      </div>
    `;

    this.bindEvents(headerEl);
  }

  bindEvents(headerEl) {
    const brandLink = headerEl.querySelector('#brand-home-link');
    if (brandLink) {
      brandLink.addEventListener('click', () => {
        soundManager.playClick();
        this.onNavigate('home');
      });
      brandLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          soundManager.playClick();
          this.onNavigate('home');
        }
      });
    }

    const navBtns = headerEl.querySelectorAll('.nav-item-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundManager.playClick();
        const route = btn.dataset.route;
        this.onNavigate(route);
      });
    });

    const btnSound = headerEl.querySelector('#btn-toggle-sound');
    const soundIcon = headerEl.querySelector('#sound-icon');
    const soundLabel = headerEl.querySelector('#sound-label');

    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isSoundOn = soundManager.toggleSound();
        this.isMuted = !isSoundOn;
        soundIcon.textContent = isSoundOn ? '🔊' : '🔇';
        soundLabel.textContent = isSoundOn ? 'Suara Aktif' : 'Senyap';
      });
    }

    const btnFs = headerEl.querySelector('#btn-toggle-fullscreen');
    const fsIcon = headerEl.querySelector('#fs-icon');
    const fsLabel = headerEl.querySelector('#fs-label');

    if (btnFs) {
      btnFs.addEventListener('click', () => {
        soundManager.playClick();
        if (!document.fullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {
              alert('Browser tidak mengizinkan mode fullscreen otomatis pada perangkat ini.');
            });
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });

      document.addEventListener('fullscreenchange', () => {
        this.isFullscreen = !!document.fullscreenElement;
        fsIcon.textContent = this.isFullscreen ? '🗗' : '⛶';
        fsLabel.textContent = this.isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh';
      });
    }
  }

  setActiveRoute(route) {
    this.currentRoute = route;
    const navBtns = document.querySelectorAll('.nav-item-btn');
    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.route === route);
    });
  }
}

