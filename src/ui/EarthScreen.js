import { EARTH_SYSTEM_DATA } from '../data/planets.js';

export class EarthScreen {
  constructor(earthScene, onNavigate) {
    this.earthScene = earthScene;
    this.onNavigate = onNavigate;
    this.isPlaying = true;
    this.activeCardIndex = 0;
  }

  render(container) {
    const cardsHtml = EARTH_SYSTEM_DATA.cards.map((card, idx) => `
      <article class="earth-material-card ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <div class="card-header-badge">
          <span class="badge-text">${card.badge}</span>
        </div>
        <h3 class="material-title">${card.title}</h3>
        <p class="material-summary">${card.summary}</p>
        <ul class="material-points">
          ${card.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
        <div class="material-tip">
          <span class="tip-icon">💡</span>
          <span class="tip-text">${card.tip}</span>
        </div>
      </article>
    `).join('');

    const tabsHtml = EARTH_SYSTEM_DATA.cards.map((card, idx) => `
      <button class="tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Lihat materi ${card.title}">
        <span>${idx + 1}. ${card.badge}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <section class="screen-earth" id="earth-view">
        <!-- Overlay Panel Kontrol 3D Kiri Atas -->
        <div class="viewport-overlay top-left">
          <button class="btn btn-secondary btn-touch" id="btn-earth-back">
            <span class="btn-icon">⬅️</span>
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        <!-- On-screen 3D Controls -->
        <div class="viewport-overlay bottom-left controls-bar">
          <button class="ctrl-btn" id="btn-earth-play-pause" title="Putar atau Jeda Animasi" aria-label="Jeda atau Putar Animasi">
            <span class="ctrl-icon" id="icon-earth-play">⏸️</span>
            <span class="ctrl-label" id="label-earth-play">Jeda</span>
          </button>
          <button class="ctrl-btn" id="btn-earth-zoom-in" title="Perbesar Tampilan" aria-label="Perbesar">
            <span class="ctrl-icon">➕</span>
            <span class="ctrl-label">Zoom In</span>
          </button>
          <button class="ctrl-btn" id="btn-earth-zoom-out" title="Perkecil Tampilan" aria-label="Perkecil">
            <span class="ctrl-icon">➖</span>
            <span class="ctrl-label">Zoom Out</span>
          </button>
          <button class="ctrl-btn" id="btn-earth-reset" title="Atur Ulang Sudut Kamera" aria-label="Atur Ulang Tampilan">
            <span class="ctrl-icon">🔄</span>
            <span class="ctrl-label">Atur Ulang</span>
          </button>
        </div>

        <div class="viewport-overlay top-center hint-banner">
          <span class="hint-icon">👆</span>
          <span>Sentuh & geser untuk memutar globe Bumi • Gunakan 2 jari / tombol +/- untuk zoom</span>
        </div>

        <!-- Panel Informasi Materi Pembelajaran di Sisi Kanan -->
        <aside class="earth-info-panel">
          <div class="panel-header">
            <div class="panel-tag">MODUL MATERI KELAS 6 SD</div>
            <h2 class="panel-title">${EARTH_SYSTEM_DATA.title}</h2>
            <p class="panel-subtitle">${EARTH_SYSTEM_DATA.subtitle}</p>
          </div>

          <!-- Navigasi Tab Cepat (Sangat Mudah Disentuh di PID 75") -->
          <nav class="earth-tabs-nav" aria-label="Navigasi Materi Bumi">
            ${tabsHtml}
          </nav>

          <!-- Konten Kartu Materi -->
          <div class="earth-cards-container">
            ${cardsHtml}
          </div>

          <div class="earth-panel-actions">
            <button class="btn btn-outline" id="btn-prev-card" disabled>
              <span>⬅️ Materi Sebelumnya</span>
            </button>
            <button class="btn btn-primary" id="btn-next-card">
              <span>Materi Selanjutnya ➡️</span>
            </button>
          </div>
        </aside>
      </section>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    const btnBack = container.querySelector('#btn-earth-back');
    const btnPlayPause = container.querySelector('#btn-earth-play-pause');
    const iconPlay = container.querySelector('#icon-earth-play');
    const labelPlay = container.querySelector('#label-earth-play');
    const btnZoomIn = container.querySelector('#btn-earth-zoom-in');
    const btnZoomOut = container.querySelector('#btn-earth-zoom-out');
    const btnReset = container.querySelector('#btn-earth-reset');

    const tabBtns = container.querySelectorAll('.tab-btn');
    const cards = container.querySelectorAll('.earth-material-card');
    const btnPrev = container.querySelector('#btn-prev-card');
    const btnNext = container.querySelector('#btn-next-card');

    if (btnBack) {
      btnBack.addEventListener('click', () => this.onNavigate('home'));
    }

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        if (this.earthScene) {
          this.earthScene.setPlaying(this.isPlaying);
        }
        if (this.isPlaying) {
          iconPlay.textContent = '⏸️';
          labelPlay.textContent = 'Jeda';
        } else {
          iconPlay.textContent = '▶️';
          labelPlay.textContent = 'Putar';
        }
      });
    }

    if (btnZoomIn && this.earthScene) {
      btnZoomIn.addEventListener('click', () => this.earthScene.zoomIn());
    }

    if (btnZoomOut && this.earthScene) {
      btnZoomOut.addEventListener('click', () => this.earthScene.zoomOut());
    }

    if (btnReset && this.earthScene) {
      btnReset.addEventListener('click', () => this.earthScene.resetCamera());
    }

    const selectCard = (index) => {
      this.activeCardIndex = index;
      cards.forEach((c, idx) => {
        c.classList.toggle('active', idx === index);
      });
      tabBtns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === index);
      });
      btnPrev.disabled = index === 0;
      btnNext.disabled = index === cards.length - 1;
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index, 10);
        selectCard(idx);
      });
    });

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (this.activeCardIndex > 0) {
          selectCard(this.activeCardIndex - 1);
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (this.activeCardIndex < cards.length - 1) {
          selectCard(this.activeCardIndex + 1);
        }
      });
    }
  }
}

