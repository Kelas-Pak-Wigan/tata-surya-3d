import { PLANETS_DATA } from '../data/planets.js';

export class ExplorationScreen {
  constructor(solarSystemScene, onNavigate) {
    this.solarSystemScene = solarSystemScene;
    this.onNavigate = onNavigate;
    this.isPlaying = true;
    this.currentSpeed = 1;
    this.activePlanet = null;
  }

  render(container) {
    const planetPillsHtml = PLANETS_DATA.map(p => `
      <button class="planet-pill-btn" data-id="${p.id}" aria-label="Fokus ke ${p.name}">
        <span class="pill-dot" style="background-color: #${p.color.toString(16).padStart(6, '0')}"></span>
        <span class="pill-name">${p.name}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <section class="screen-exploration" id="exploration-view">
        <!-- Overlay Kiri Atas: Tombol Navigasi & Kembali -->
        <div class="viewport-overlay top-left">
          <button class="btn btn-secondary btn-touch" id="btn-explore-back">
            <span class="btn-icon">⬅️</span>
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        <!-- Selector Cepat Planet di Atas (Sangat Membantu di PID 75") -->
        <div class="viewport-overlay top-center planet-selector-bar">
          <button class="planet-pill-btn active" id="btn-pill-overview" data-id="overview">
            <span class="pill-dot" style="background: radial-gradient(circle, #ffe066, #ff8800)"></span>
            <span class="pill-name">Tata Surya Lengkap</span>
          </button>
          ${planetPillsHtml}
        </div>

        <!-- Kontrol Animasi 3D Kiri Bawah -->
        <div class="viewport-overlay bottom-left controls-bar">
          <button class="ctrl-btn" id="btn-explore-play-pause" title="Putar atau Jeda Revolusi" aria-label="Jeda atau Putar">
            <span class="ctrl-icon" id="icon-explore-play">⏸️</span>
            <span class="ctrl-label" id="label-explore-play">Jeda</span>
          </button>
          
          <button class="ctrl-btn" id="btn-explore-speed" title="Atur Kecepatan Orbit" aria-label="Kecepatan Orbit">
            <span class="ctrl-icon">⚡</span>
            <span class="ctrl-label" id="label-explore-speed">1x</span>
          </button>

          <button class="ctrl-btn" id="btn-explore-zoom-in" title="Perbesar Tampilan" aria-label="Perbesar">
            <span class="ctrl-icon">➕</span>
            <span class="ctrl-label">Zoom In</span>
          </button>

          <button class="ctrl-btn" id="btn-explore-zoom-out" title="Perkecil Tampilan" aria-label="Perkecil">
            <span class="ctrl-icon">➖</span>
            <span class="ctrl-label">Zoom Out</span>
          </button>

          <button class="ctrl-btn" id="btn-explore-reset" title="Kembali ke Pandangan Penuh" aria-label="Atur Ulang Tampilan">
            <span class="ctrl-icon">🔄</span>
            <span class="ctrl-label">Atur Ulang</span>
          </button>
        </div>

        <!-- Banner Catatan Skala Edukatif Bawah Tengah -->
        <div class="viewport-overlay bottom-center scale-disclaimer">
          <span>ℹ️ <strong>Skala Edukatif:</strong> Ukuran relatif dan jarak orbit disesuaikan agar semua planet dapat diamati bersama secara jelas di kelas.</span>
        </div>

        <!-- Panel Profil Planet Sisi Kanan (Akan Muncul Saat Planet Dipilih) -->
        <aside class="planet-profile-drawer hidden" id="planet-profile-drawer">
          <div class="drawer-header">
            <div class="drawer-title-group">
              <span class="planet-order-tag" id="drawer-planet-order">Planet ke-1</span>
              <h2 class="drawer-planet-name" id="drawer-planet-name">Merkurius</h2>
              <span class="planet-type-badge" id="drawer-planet-type">Planet Terestrial</span>
            </div>
            <button class="drawer-close-btn" id="btn-drawer-close" aria-label="Tutup Profil Planet">&times;</button>
          </div>

          <div class="drawer-body">
            <!-- Ringkasan Tipe -->
            <div class="profile-section info-callout">
              <p class="profile-type-desc" id="drawer-type-desc"></p>
            </div>

            <!-- Grid Metrik Utama: Rotasi, Revolusi, Satelit -->
            <div class="metrics-grid">
              <div class="metric-card">
                <span class="metric-icon">🔄</span>
                <span class="metric-label">Periode Rotasi (1 Hari)</span>
                <strong class="metric-value" id="drawer-rotation">58,6 hari</strong>
                <p class="metric-note" id="drawer-rotation-note"></p>
              </div>

              <div class="metric-card">
                <span class="metric-icon">☀️</span>
                <span class="metric-label">Periode Revolusi (1 Tahun)</span>
                <strong class="metric-value" id="drawer-revolution">88 hari</strong>
                <p class="metric-note" id="drawer-revolution-note"></p>
              </div>

              <div class="metric-card">
                <span class="metric-icon">🌑</span>
                <span class="metric-label">Satelit Alami</span>
                <strong class="metric-value" id="drawer-satellites">0</strong>
                <p class="metric-note" id="drawer-satellites-note"></p>
              </div>
            </div>

            <!-- Komposisi & Zat Penyusun -->
            <div class="profile-section">
              <h3 class="section-title">
                <span class="sec-icon">🧪</span>
                <span>Komposisi & Zat Penyusun</span>
              </h3>
              <p class="section-text" id="drawer-composition"></p>
              <div class="comp-detail-box" id="drawer-composition-detail"></div>
            </div>

            <!-- Fakta Unik -->
            <div class="profile-section">
              <h3 class="section-title">
                <span class="sec-icon">✨</span>
                <span>Fakta Unik Planet</span>
              </h3>
              <ul class="fun-facts-list" id="drawer-fun-facts"></ul>
            </div>

            <!-- Catatan Sumber -->
            <div class="profile-section source-box">
              <small class="source-text" id="drawer-source"></small>
            </div>
          </div>

          <!-- Aksi Drawer: Pelajari Lewat Quiz & Kembali ke Tata Surya -->
          <div class="drawer-footer">
            <button class="btn btn-outline" id="btn-drawer-return-overview">
              <span>🪐 Kembali ke Tata Surya</span>
            </button>
            <button class="btn btn-primary" id="btn-drawer-take-quiz">
              <span>🏆 Pelajari lewat Quiz ➡️</span>
            </button>
          </div>
        </aside>
      </section>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    const btnBack = container.querySelector('#btn-explore-back');
    const btnPlayPause = container.querySelector('#btn-explore-play-pause');
    const iconPlay = container.querySelector('#icon-explore-play');
    const labelPlay = container.querySelector('#label-explore-play');
    const btnSpeed = container.querySelector('#btn-explore-speed');
    const labelSpeed = container.querySelector('#label-explore-speed');
    const btnZoomIn = container.querySelector('#btn-explore-zoom-in');
    const btnZoomOut = container.querySelector('#btn-explore-zoom-out');
    const btnReset = container.querySelector('#btn-explore-reset');

    const pills = container.querySelectorAll('.planet-pill-btn');
    const drawer = container.querySelector('#planet-profile-drawer');
    const btnDrawerClose = container.querySelector('#btn-drawer-close');
    const btnReturnOverview = container.querySelector('#btn-drawer-return-overview');
    const btnTakeQuiz = container.querySelector('#btn-drawer-take-quiz');

    if (btnBack) {
      btnBack.addEventListener('click', () => this.onNavigate('home'));
    }

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        this.isPlaying = !this.isPlaying;
        if (this.solarSystemScene) {
          this.solarSystemScene.setPlaying(this.isPlaying);
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

    if (btnSpeed) {
      btnSpeed.addEventListener('click', () => {
        if (this.currentSpeed === 1) this.currentSpeed = 2;
        else if (this.currentSpeed === 2) this.currentSpeed = 5;
        else this.currentSpeed = 1;

        labelSpeed.textContent = `${this.currentSpeed}x`;
        if (this.solarSystemScene) {
          this.solarSystemScene.setSpeed(this.currentSpeed);
        }
      });
    }

    if (btnZoomIn && this.solarSystemScene) {
      btnZoomIn.addEventListener('click', () => this.solarSystemScene.zoomIn());
    }

    if (btnZoomOut && this.solarSystemScene) {
      btnZoomOut.addEventListener('click', () => this.solarSystemScene.zoomOut());
    }

    if (btnReset && this.solarSystemScene) {
      btnReset.addEventListener('click', () => {
        this.closeProfileDrawer();
        this.solarSystemScene.resetToOverview();
        pills.forEach(p => p.classList.toggle('active', p.dataset.id === 'overview'));
      });
    }

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.dataset.id;
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        if (id === 'overview') {
          this.closeProfileDrawer();
          if (this.solarSystemScene) {
            this.solarSystemScene.resetToOverview();
          }
        } else {
          if (this.solarSystemScene) {
            this.solarSystemScene.selectPlanet(id);
          }
        }
      });
    });

    if (btnDrawerClose) {
      btnDrawerClose.addEventListener('click', () => {
        this.closeProfileDrawer();
        if (this.solarSystemScene) {
          this.solarSystemScene.resetToOverview();
        }
        pills.forEach(p => p.classList.toggle('active', p.dataset.id === 'overview'));
      });
    }

    if (btnReturnOverview) {
      btnReturnOverview.addEventListener('click', () => {
        this.closeProfileDrawer();
        if (this.solarSystemScene) {
          this.solarSystemScene.resetToOverview();
        }
        pills.forEach(p => p.classList.toggle('active', p.dataset.id === 'overview'));
      });
    }

    if (btnTakeQuiz) {
      btnTakeQuiz.addEventListener('click', () => {
        if (this.activePlanet) {
          this.onNavigate('quiz', { planetId: this.activePlanet.id });
        }
      });
    }
  }

  showPlanetProfile(planetData) {
    this.activePlanet = planetData;
    const drawer = document.getElementById('planet-profile-drawer');
    if (!drawer) return;

    // Isi konten profil
    document.getElementById('drawer-planet-order').textContent = planetData.orderText;
    document.getElementById('drawer-planet-name').textContent = planetData.name;
    document.getElementById('drawer-planet-type').textContent = planetData.type;
    document.getElementById('drawer-type-desc').textContent = planetData.typeDescription;

    document.getElementById('drawer-rotation').textContent = planetData.rotation;
    document.getElementById('drawer-rotation-note').textContent = planetData.rotationDetail || '';

    document.getElementById('drawer-revolution').textContent = planetData.revolution;
    document.getElementById('drawer-revolution-note').textContent = planetData.revolutionDetail || '';

    document.getElementById('drawer-satellites').textContent = planetData.satellites;
    document.getElementById('drawer-satellites-note').textContent = planetData.satellitesNote || '';

    document.getElementById('drawer-composition').textContent = planetData.composition;
    document.getElementById('drawer-composition-detail').textContent = planetData.compositionDetail || '';

    const funFactsEl = document.getElementById('drawer-fun-facts');
    funFactsEl.innerHTML = planetData.funFacts.map(fact => `
      <li>
        <span class="fact-bullet">🚀</span>
        <span>${fact}</span>
      </li>
    `).join('');

    document.getElementById('drawer-source').textContent = `Sumber: ${planetData.sourceNote}`;

    // Aktifkan pill
    const pills = document.querySelectorAll('.planet-pill-btn');
    pills.forEach(p => p.classList.toggle('active', p.dataset.id === planetData.id));

    drawer.classList.remove('hidden');
    drawer.classList.add('visible');
  }

  closeProfileDrawer() {
    const drawer = document.getElementById('planet-profile-drawer');
    if (drawer) {
      drawer.classList.remove('visible');
      drawer.classList.add('hidden');
    }
    this.activePlanet = null;
  }
}

