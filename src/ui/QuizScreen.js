import { PLANETS_DATA } from '../data/planets.js';
import { QUIZ_QUESTIONS } from '../data/quizData.js';
import { soundManager } from '../audio/soundEffects.js';

export class QuizScreen {
  constructor(quizScene, onNavigate) {
    this.quizScene = quizScene;
    this.onNavigate = onNavigate;

    this.selectedPlanetId = null;
    this.selectedAnswers = {}; // { questionId: optionId }
    this.isSubmitted = false;
    this.currentScore = 0;
  }

  render(container, options = {}) {
    if (options.planetId) {
      this.selectedPlanetId = options.planetId;
    }

    if (!this.selectedPlanetId) {
      this.renderPlanetSelector(container);
    } else {
      this.renderQuizPanel(container, this.selectedPlanetId);
    }
  }

  renderPlanetSelector(container) {
    const planetCardsHtml = PLANETS_DATA.map(p => `
      <div class="quiz-planet-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Mulai Kuis ${p.name}">
        <div class="card-planet-preview">
          <div class="planet-circle" style="background: radial-gradient(circle at 35% 35%, #${(p.color + 0x222222).toString(16).padStart(6, '0')}, #${p.color.toString(16).padStart(6, '0')}, #111122)">
            ${p.hasRings ? '<div class="preview-rings"></div>' : ''}
          </div>
        </div>
        <div class="card-planet-info">
          <span class="card-planet-order">Planet ke-${p.orderNumber}</span>
          <h3 class="card-planet-name">${p.name}</h3>
          <span class="card-planet-type">${p.type}</span>
          <span class="card-planet-badge">4 Soal Pilihan Ganda</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <section class="screen-quiz-selection" id="quiz-selection-view">
        <div class="quiz-selection-header">
          <button class="btn btn-secondary btn-touch" id="btn-quiz-select-back">
            <span class="btn-icon">⬅️</span>
            <span>Kembali ke Beranda</span>
          </button>
          <div class="header-titles">
            <h1 class="quiz-main-title">Pilih Planet untuk Kuis Interaktif</h1>
            <p class="quiz-sub-title">Setiap planet memiliki 4 soal: Rotasi, Revolusi, Komposisi, dan Fakta Unik.</p>
          </div>
        </div>

        <div class="quiz-planets-grid">
          ${planetCardsHtml}
        </div>
      </section>
    `;

    const btnBack = container.querySelector('#btn-quiz-select-back');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        soundManager.playClick();
        this.onNavigate('home');
      });
    }

    const cards = container.querySelectorAll('.quiz-planet-card');
    cards.forEach(card => {
      const startQuiz = () => {
        soundManager.playSelect();
        const planetId = card.dataset.id;
        this.selectedPlanetId = planetId;
        this.selectedAnswers = {};
        this.isSubmitted = false;
        this.renderQuizPanel(container, planetId);
      };

      card.addEventListener('click', startQuiz);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startQuiz();
        }
      });
    });
  }

  renderQuizPanel(container, planetId) {
    const planetData = PLANETS_DATA.find(p => p.id === planetId) || PLANETS_DATA[0];
    const questions = QUIZ_QUESTIONS[planetId] || [];

    // Muat model 3D di scene
    if (this.quizScene) {
      this.quizScene.loadPlanet(planetId);
    }

    const questionsHtml = questions.map((q, qIndex) => {
      const selectedOptId = this.selectedAnswers[q.id];
      const isAnswered = !!selectedOptId;

      return `
        <div class="quiz-question-card ${this.isSubmitted ? 'submitted' : ''}" id="question-card-${q.id}" data-qid="${q.id}">
          <div class="question-header">
            <span class="question-number">Soal ${qIndex + 1} dari 4</span>
            <span class="question-category-tag">${q.categoryName}</span>
          </div>

          <h3 class="question-text">${q.question}</h3>

          <div class="options-grid" role="radiogroup" aria-labelledby="question-text-${q.id}">
            ${q.options.map(opt => {
              const isSelected = selectedOptId === opt.id;
              let optionClass = 'option-btn';

              if (this.isSubmitted) {
                if (opt.id === q.correctOptionId) {
                  optionClass += ' option-correct';
                } else if (isSelected && opt.id !== q.correctOptionId) {
                  optionClass += ' option-incorrect';
                } else {
                  optionClass += ' option-neutral';
                }
              } else if (isSelected) {
                optionClass += ' option-selected';
              }

              return `
                <button 
                  class="${optionClass}" 
                  data-qid="${q.id}" 
                  data-oid="${opt.id}" 
                  role="radio" 
                  aria-checked="${isSelected}"
                  ${this.isSubmitted ? 'disabled' : ''}
                >
                  <span class="opt-label">${opt.id.replace('opt-', '').toUpperCase()}</span>
                  <span class="opt-text">${opt.text}</span>
                  ${this.isSubmitted && opt.id === q.correctOptionId ? '<span class="result-badge-correct">✓ Benar</span>' : ''}
                  ${this.isSubmitted && isSelected && opt.id !== q.correctOptionId ? '<span class="result-badge-wrong">✗ Kurang Tepat</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Bagian Pembahasan (Hanya Tampil Setelah Cek Jawaban) -->
          ${this.isSubmitted ? `
            <div class="explanation-box ${selectedOptId === q.correctOptionId ? 'exp-correct' : 'exp-wrong'}">
              <div class="exp-header">
                <span class="exp-icon">${selectedOptId === q.correctOptionId ? '🎉' : '📖'}</span>
                <strong>${selectedOptId === q.correctOptionId ? 'Jawaban Benar!' : 'Kunci Jawaban & Pembahasan:'}</strong>
              </div>
              <p class="exp-text">${q.explanation}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <section class="screen-quiz-interactive" id="quiz-interactive-view">
        <!-- Area 3D Sisi Kiri (Tampilan Planet 3D Berputar) -->
        <div class="quiz-3d-pane">
          <div class="quiz-3d-header">
            <button class="btn btn-secondary btn-touch" id="btn-quiz-back-list">
              <span class="btn-icon">⬅️</span>
              <span>Ganti Planet</span>
            </button>
            <div class="planet-badge-group">
              <span class="badge-planet-order">${planetData.orderText}</span>
              <h2 class="badge-planet-title">${planetData.name}</h2>
            </div>
          </div>

          <!-- Kontrol Kamera 3D Planet Kuis -->
          <div class="quiz-3d-controls">
            <button class="ctrl-btn-mini" id="btn-quiz-zoom-in" title="Perbesar" aria-label="Perbesar">➕</button>
            <button class="ctrl-btn-mini" id="btn-quiz-zoom-out" title="Perkecil" aria-label="Perkecil">➖</button>
            <button class="ctrl-btn-mini" id="btn-quiz-reset-cam" title="Atur Ulang" aria-label="Atur Ulang">🔄</button>
          </div>

          <div class="quiz-3d-footer-hint">
            <span>💡 Kamu dapat memutar objek planet ini dengan sentuhan atau mouse!</span>
          </div>
        </div>

        <!-- Area Soal Sisi Kanan (Panel Kuis Interaktif) -->
        <main class="quiz-form-pane">
          <div class="quiz-form-header">
            <div class="quiz-progress-info">
              <span class="progress-title">Latihan Pemahaman Materi: <strong>${planetData.name}</strong></span>
              <span class="progress-count" id="quiz-answered-count">Terjawab: ${Object.keys(this.selectedAnswers).length} dari 4 soal</span>
            </div>
          </div>

          <!-- Pesan Peringatan jika Belum Lengkap -->
          <div class="quiz-alert-banner hidden" id="quiz-alert-banner">
            <span class="alert-icon">⚠️</span>
            <span id="quiz-alert-text">Mohon lengkapi semua 4 soal terlebih dahulu sebelum memeriksa jawaban.</span>
          </div>

          <!-- Banner Hasil / Skor Sesi (Setelah Cek Jawaban) -->
          ${this.isSubmitted ? `
            <div class="quiz-score-banner ${this.currentScore >= 3 ? 'score-high' : 'score-mid'}">
              <div class="score-main">
                <span class="score-emoji">${this.currentScore === 4 ? '🌟' : this.currentScore >= 3 ? '👏' : '📚'}</span>
                <div>
                  <h3 class="score-title">
                    ${this.currentScore === 4 ? 'Luar Biasa Sempurna!' : this.currentScore >= 3 ? 'Bagus Sekali!' : 'Tetap Semangat Belajar!'}
                  </h3>
                  <p class="score-desc">
                    Skor kamu: <strong>${this.currentScore} dari 4 benar (${Math.round((this.currentScore / 4) * 100)}%)</strong>
                  </p>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Daftar 4 Soal -->
          <div class="quiz-questions-list">
            ${questionsHtml}
          </div>

          <!-- Panel Aksi Bawah -->
          <div class="quiz-form-footer">
            ${!this.isSubmitted ? `
              <button class="btn btn-primary btn-large btn-touch" id="btn-check-answers">
                <span class="btn-icon">✔️</span>
                <span class="btn-text">Cek Jawaban</span>
              </button>
            ` : `
              <div class="quiz-post-actions">
                <button class="btn btn-primary btn-touch" id="btn-quiz-retry">
                  <span class="btn-icon">🔄</span>
                  <span>Coba Lagi</span>
                </button>
                <button class="btn btn-secondary btn-touch" id="btn-quiz-other-planet">
                  <span class="btn-icon">🪐</span>
                  <span>Pilih Planet Lain</span>
                </button>
                <button class="btn btn-outline btn-touch" id="btn-quiz-home">
                  <span class="btn-icon">🏠</span>
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            `}
          </div>
        </main>
      </section>
    `;

    this.bindQuizPanelEvents(container, planetId, questions);
  }

  bindQuizPanelEvents(container, planetId, questions) {
    const btnBackList = container.querySelector('#btn-quiz-back-list');
    const btnZoomIn = container.querySelector('#btn-quiz-zoom-in');
    const btnZoomOut = container.querySelector('#btn-quiz-zoom-out');
    const btnResetCam = container.querySelector('#btn-quiz-reset-cam');

    if (btnBackList) {
      btnBackList.addEventListener('click', () => {
        soundManager.playClick();
        this.selectedPlanetId = null;
        this.renderPlanetSelector(container);
      });
    }

    if (btnZoomIn && this.quizScene) {
      btnZoomIn.addEventListener('click', () => this.quizScene.zoomIn());
    }
    if (btnZoomOut && this.quizScene) {
      btnZoomOut.addEventListener('click', () => this.quizScene.zoomOut());
    }
    if (btnResetCam && this.quizScene) {
      btnResetCam.addEventListener('click', () => this.quizScene.resetCamera());
    }

    // Pemilihan Opsi Jawaban
    if (!this.isSubmitted) {
      const optionButtons = container.querySelectorAll('.option-btn');
      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          soundManager.playSelect();
          const qid = btn.dataset.qid;
          const oid = btn.dataset.oid;

          this.selectedAnswers[qid] = oid;

          // Perbarui tampilan opsi untuk pertanyaan ini
          const siblingButtons = container.querySelectorAll(`.option-btn[data-qid="${qid}"]`);
          siblingButtons.forEach(sb => {
            const isMatch = sb.dataset.oid === oid;
            sb.classList.toggle('option-selected', isMatch);
            sb.setAttribute('aria-checked', isMatch ? 'true' : 'false');
          });

          // Perbarui hitungan terjawab
          const answeredCount = Object.keys(this.selectedAnswers).length;
          const countEl = container.querySelector('#quiz-answered-count');
          if (countEl) {
            countEl.textContent = `Terjawab: ${answeredCount} dari 4 soal`;
          }

          // Sembunyikan banner alert jika ada
          const alertBanner = container.querySelector('#quiz-alert-banner');
          if (alertBanner) {
            alertBanner.classList.add('hidden');
          }
        });
      });

      // Tombol Cek Jawaban
      const btnCheck = container.querySelector('#btn-check-answers');
      if (btnCheck) {
        btnCheck.addEventListener('click', () => {
          // Validasi: seluruh 4 soal harus dijawab
          const unanswered = questions.filter(q => !this.selectedAnswers[q.id]);
          if (unanswered.length > 0) {
            soundManager.playWrong();
            const alertBanner = container.querySelector('#quiz-alert-banner');
            const alertText = container.querySelector('#quiz-alert-text');
            if (alertBanner && alertText) {
              const missingNums = unanswered.map(q => {
                const idx = questions.findIndex(item => item.id === q.id);
                return `Soal ${idx + 1}`;
              }).join(', ');
              alertText.textContent = `Masih ada soal yang belum dijawab (${missingNums}). Silakan pilih jawaban untuk semua soal sebelum menekan Cek Jawaban!`;
              alertBanner.classList.remove('hidden');

              // Scroll ke soal pertama yang belum terjawab
              const firstMissingEl = container.querySelector(`#question-card-${unanswered[0].id}`);
              if (firstMissingEl) {
                firstMissingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstMissingEl.classList.add('highlight-unanswered');
                setTimeout(() => firstMissingEl.classList.remove('highlight-unanswered'), 1800);
              }
            }
            return;
          }

          // Hitung skor
          let correctCount = 0;
          questions.forEach(q => {
            if (this.selectedAnswers[q.id] === q.correctOptionId) {
              correctCount++;
            }
          });

          this.currentScore = correctCount;
          this.isSubmitted = true;

          // Efek suara
          if (correctCount === 4) {
            soundManager.playCelebration();
          } else if (correctCount >= 2) {
            soundManager.playCorrect();
          } else {
            soundManager.playWrong();
          }

          // Render ulang panel dengan kunci jawaban dan pembahasan
          this.renderQuizPanel(container, planetId);
        });
      }
    } else {
      // Tombol Pasca Cek Jawaban
      const btnRetry = container.querySelector('#btn-quiz-retry');
      const btnOtherPlanet = container.querySelector('#btn-quiz-other-planet');
      const btnHome = container.querySelector('#btn-quiz-home');

      if (btnRetry) {
        btnRetry.addEventListener('click', () => {
          soundManager.playClick();
          this.selectedAnswers = {};
          this.isSubmitted = false;
          this.currentScore = 0;
          this.renderQuizPanel(container, planetId);
        });
      }

      if (btnOtherPlanet) {
        btnOtherPlanet.addEventListener('click', () => {
          soundManager.playClick();
          this.selectedPlanetId = null;
          this.selectedAnswers = {};
          this.isSubmitted = false;
          this.currentScore = 0;
          this.renderPlanetSelector(container);
        });
      }

      if (btnHome) {
        btnHome.addEventListener('click', () => {
          soundManager.playClick();
          this.onNavigate('home');
        });
      }
    }
  }
}

