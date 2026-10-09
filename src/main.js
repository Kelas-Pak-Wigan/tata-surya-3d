import './styles/main.css';
import './styles/responsive.css';

import { NavigationBar } from './ui/Navigation.js';
import { HomeScreen } from './ui/HomeScreen.js';
import { EarthScreen } from './ui/EarthScreen.js';
import { ExplorationScreen } from './ui/ExplorationScreen.js';
import { QuizScreen } from './ui/QuizScreen.js';

import { SolarSystemScene } from './scenes/SolarSystemScene.js';
import { EarthScene } from './scenes/EarthScene.js';
import { QuizScene } from './scenes/QuizScene.js';

class App {
  constructor() {
    this.currentRoute = 'home';
    this.canvasContainer = document.getElementById('canvas-container');
    this.uiContainer = document.getElementById('ui-container');
    this.headerEl = document.getElementById('app-header');

    this.navBar = null;
    this.activeScene = null;
    this.activeScreen = null;

    this.init();
  }

  isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  showWebGLError() {
    this.uiContainer.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 40px;
        text-align: center;
        background: #060814;
        color: #fff;
      ">
        <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
        <h1 style="font-size: 32px; margin-bottom: 16px;">Browser / Perangkat Anda Belum Mendukung WebGL 3D</h1>
        <p style="font-size: 19px; max-width: 600px; color: #a6b5d6; line-height: 1.6; margin-bottom: 24px;">
          Game edukasi ini memerlukan akselerasi grafis 3D (WebGL) untuk menampilkan model planet. 
          Pastikan driver grafis aktif atau coba buka menggunakan browser Google Chrome / Microsoft Edge versi terbaru.
        </p>
        <button onclick="window.location.reload()" style="
          padding: 14px 28px;
          font-size: 18px;
          font-weight: 700;
          background: #00d2ff;
          color: #060814;
          border: none;
          border-radius: 12px;
          cursor: pointer;
        ">
          🔄 Muat Ulang Halaman
        </button>
      </div>
    `;
  }

  init() {
    if (!this.isWebGLAvailable()) {
      this.showWebGLError();
      return;
    }

    this.navBar = new NavigationBar((route, options) => this.navigate(route, options));
    this.navBar.render(this.headerEl);

    // Muat rute awal
    this.navigate('home');

    // Registrasi Service Worker jika didukung
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }

  navigate(route, options = {}) {
    this.currentRoute = route;
    this.navBar.setActiveRoute(route);

    // Bersihkan scene lama jika berganti mode
    this.cleanupActiveScene();

    // Kosongkan overlay UI
    this.uiContainer.innerHTML = '';

    // Hapus label 3D lama jika ada
    const oldLabels = document.getElementById('solar-system-labels');
    if (oldLabels) oldLabels.remove();

    switch (route) {
      case 'home':
        this.renderHome();
        break;
      case 'earth':
        this.renderEarth();
        break;
      case 'exploration':
        this.renderExploration();
        break;
      case 'quiz':
        this.renderQuiz(options);
        break;
      default:
        this.renderHome();
        break;
    }
  }

  cleanupActiveScene() {
    if (this.activeScene) {
      this.activeScene.destroy();
      this.activeScene = null;
    }
    this.canvasContainer.innerHTML = '';
  }

  renderHome() {
    // Di beranda, tampilkan 3D Solar System dengan kecepatan sinematik santai di latar belakang
    this.activeScene = new SolarSystemScene(this.canvasContainer, (planetData) => {
      // Jika di klik saat di beranda, arahkan langsung ke profil eksplorasi planet itu
      this.navigate('exploration');
      setTimeout(() => {
        if (this.activeScreen && this.activeScreen.showPlanetProfile) {
          this.activeScreen.showPlanetProfile(planetData);
        }
      }, 100);
    });
    this.activeScene.setSpeed(0.5);

    this.activeScreen = new HomeScreen((destRoute, opts) => this.navigate(destRoute, opts));
    this.activeScreen.render(this.uiContainer);
  }

  renderEarth() {
    this.activeScene = new EarthScene(this.canvasContainer);
    this.activeScreen = new EarthScreen(this.activeScene, (destRoute, opts) => this.navigate(destRoute, opts));
    this.activeScreen.render(this.uiContainer);
  }

  renderExploration() {
    let explorationUiInstance = null;
    this.activeScene = new SolarSystemScene(this.canvasContainer, (planetData) => {
      if (explorationUiInstance) {
        explorationUiInstance.showPlanetProfile(planetData);
      }
    });

    explorationUiInstance = new ExplorationScreen(this.activeScene, (destRoute, opts) => this.navigate(destRoute, opts));
    this.activeScreen = explorationUiInstance;
    this.activeScreen.render(this.uiContainer);
  }

  renderQuiz(options = {}) {
    this.activeScene = new QuizScene(this.canvasContainer);
    this.activeScreen = new QuizScreen(this.activeScene, (destRoute, opts) => this.navigate(destRoute, opts));
    this.activeScreen.render(this.uiContainer, options);
  }
}

// Inisialisasi Aplikasi Saat DOM Siap
window.addEventListener('DOMContentLoaded', () => {
  new App();
});

