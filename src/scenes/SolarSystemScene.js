import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SUN_DATA, PLANETS_DATA } from '../data/planets.js';
import { PlanetMeshFactory } from '../gfx/planetMeshes.js';

export class SolarSystemScene {
  constructor(containerEl, onSelectPlanetCallback) {
    this.container = containerEl;
    this.onSelectPlanet = onSelectPlanetCallback;
    this.meshFactory = new PlanetMeshFactory();

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.sun = null;
    this.asteroidBelt = null;
    this.planetObjects = []; // { data, group, bodyMesh, cloudsMesh, ringsMesh, orbitDistance, angle, speed, labelEl }
    this.orbitLines = [];

    this.isPlaying = true;
    this.speedMultiplier = 1;
    this.selectedPlanetId = null;
    this.isCloseUpMode = false;

    // Smooth camera transition state
    this.cameraTargetPos = new THREE.Vector3(0, 75, 120);
    this.controlsTargetPos = new THREE.Vector3(0, 0, 0);
    this.isTransitioning = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.animationFrameId = null;
    this.lastTime = performance.now();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060814);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);
    this.camera.position.set(0, 75, 120);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 400;
    this.controls.minDistance = 10;
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 0.8;
    this.controls.enablePan = true;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    // 5. Pencahayaan
    // Ambient light seimbang: sisi gelap planet tetap memperlihatkan siluet & detail kontur estetis
    const ambientLight = new THREE.AmbientLight(0x283850, 0.55);
    this.scene.add(ambientLight);

    // Hemisphere light kosmis untuk memberikan gradasi halus antara belahan atas dan bawah antariksa
    const hemiLight = new THREE.HemisphereLight(0x1a2638, 0x080e1a, 0.35);
    this.scene.add(hemiLight);

    // Lampu inspeksi edukatif terarah (Camera Headlamp)
    // Memastikan planet yang sedang diamati dari dekat selalu terang, kaya detail tekstur, dan jelas untuk belajar
    this.cameraLight = new THREE.DirectionalLight(0xfff8ee, 0.70);
    this.cameraLight.position.set(0, 0, 1);
    this.camera.add(this.cameraLight);
    this.scene.add(this.camera);

    // 6. Starfield
    const starfield = this.meshFactory.createStarfield(3200, 420);
    this.scene.add(starfield);

    // 7. Matahari
    this.sun = this.meshFactory.createSun(SUN_DATA);
    this.scene.add(this.sun.group);

    // 8. Sabuk Asteroid 3D Ilmiah (Terletak di antara orbit Mars dan Jupiter)
    this.asteroidBelt = this.meshFactory.createAsteroidBelt(43.0, 49.0, 1350);
    this.scene.add(this.asteroidBelt);

    // 9. Buat Delapan Planet & Orbitnya
    this.buildPlanets();

    // 10. Event Listeners
    this.bindEvents();

    // 11. Mulai Render Loop
    this.animate = this.animate.bind(this);
    this.animate();
  }

  buildPlanets() {
    const labelsContainer = document.getElementById('solar-system-labels') || this.createLabelsOverlay();

    PLANETS_DATA.forEach((planetData, index) => {
      // 1. Garis orbit
      const orbitLine = this.meshFactory.createOrbitLine(planetData.orbitDistanceVisual);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // 2. Mesh planet
      const meshObj = this.meshFactory.createPlanet(planetData);
      
      // Sudut awal menyebar acak agar tidak sejajar di satu garis lurus
      const startAngle = (index / PLANETS_DATA.length) * Math.PI * 2 + index * 0.4;
      meshObj.group.position.x = Math.cos(startAngle) * planetData.orbitDistanceVisual;
      meshObj.group.position.z = -Math.sin(startAngle) * planetData.orbitDistanceVisual;

      this.scene.add(meshObj.group);

      // 3. Label HTML interaktif untuk PID 75" dan desktop
      const labelEl = document.createElement('button');
      labelEl.className = 'planet-3d-label';
      labelEl.textContent = planetData.name;
      labelEl.setAttribute('aria-label', `Pilih planet ${planetData.name}`);
      labelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectPlanet(planetData.id);
      });
      labelsContainer.appendChild(labelEl);

      this.planetObjects.push({
        data: planetData,
        group: meshObj.group,
        bodyMesh: meshObj.bodyMesh,
        cloudsMesh: meshObj.cloudsMesh,
        ringsMesh: meshObj.ringsMesh,
        orbitDistance: planetData.orbitDistanceVisual,
        angle: startAngle,
        speed: planetData.orbitSpeedVisual,
        rotSpeed: planetData.rotationSpeedVisual,
        labelEl
      });
    });
  }

  createLabelsOverlay() {
    let el = document.getElementById('solar-system-labels');
    if (!el) {
      el = document.createElement('div');
      el.id = 'solar-system-labels';
      el.className = 'solar-system-labels-overlay';
      this.container.appendChild(el);
    }
    return el;
  }

  bindEvents() {
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // Membedakan drag memutar kamera vs tap/klik memilih planet
    this.pointerStartPos = { x: 0, y: 0 };
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    this.renderer.domElement.addEventListener('pointerup', this.onPointerUp);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onPointerDown(event) {
    this.pointerStartPos = { x: event.clientX, y: event.clientY };
  }

  onPointerUp(event) {
    // Jika pergerakan lebih dari 8 piksel, berarti pengguna sedang melakukan drag untuk memutar view!
    const dx = event.clientX - this.pointerStartPos.x;
    const dy = event.clientY - this.pointerStartPos.y;
    if (Math.hypot(dx, dy) > 8) {
      return; // Biarkan OrbitControls memutar view 3D tanpa memicu seleksi
    }

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const interactiveMeshes = [];
    this.planetObjects.forEach(p => {
      interactiveMeshes.push(p.bodyMesh);
      if (p.ringsMesh) interactiveMeshes.push(p.ringsMesh);
    });

    const intersects = this.raycaster.intersectObjects(interactiveMeshes, true);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const foundPlanet = this.planetObjects.find(p =>
        p.bodyMesh === hit || p.ringsMesh === hit || p.group.getObjectById(hit.id)
      );
      if (foundPlanet) {
        this.selectPlanet(foundPlanet.data.id);
      }
    }
  }

  computeCloseUpCameraTarget(planetObj) {
    const radius = planetObj.data.radiusVisual;
    const pPos = planetObj.group.position;

    // Jarak observasi edukatif yang lega & proporsional
    let viewDistance = Math.max(20, radius * 6.5 + 12);
    if (planetObj.data.hasRings) {
      const ringR = planetObj.data.ringOuterRadius || radius * 2.8;
      viewDistance = Math.max(viewDistance, ringR * 4.6 + 6);
    }
    if (planetObj.data.id === 'earth') {
      viewDistance = 26; // Ruang lega untuk sistem Bumi & Bulan
    }

    // Vektor satuan dari Matahari (0,0,0) ke Planet (arah pancaran sinar matahari utama)
    const orbDist = Math.hypot(pPos.x, pPos.z) || 1;
    const ux = pPos.x / orbDist;
    const uz = pPos.z / orbDist;

    // Vektor tangensial (tegak lurus terhadap arah sinar matahari)
    const tx = -uz;
    const tz = ux;

    // Supaya kamera memandang SISI PLANET YANG TERKENA SINAR MATAHARI (illuminated day side):
    // Kamera ditempatkan di sisi yang menghadap datangnya sinar matahari (-ux, -uz),
    // dipadukan dengan sedikit sudut samping (+tx, +tz) dan elevasi atas (+Y) untuk menghasilkan fase gibbous 3D yang indah.
    // Untuk planet terdekat (Merkurius), batasi pergeseran ke arah matahari agar kamera tidak masuk ke dalam bola matahari (radius 8.5)
    const maxSunStep = Math.max(2.5, orbDist - 12.5);
    const kSun = Math.min(viewDistance * 0.65, maxSunStep);
    const kTangent = Math.sqrt(Math.max(0, viewDistance * viewDistance * 0.85 - kSun * kSun * 0.5));
    const kY = Math.max(8, viewDistance * 0.35);

    // Posisi kamera di sisi siang hari planet (sunward daylit hemisphere)
    const camX = pPos.x - ux * kSun + tx * kTangent;
    const camY = pPos.y + kY;
    const camZ = pPos.z - uz * kSun + tz * kTangent;

    this.cameraTargetPos.set(camX, camY, camZ);
    this.controlsTargetPos.copy(pPos);
  }

  selectPlanet(planetId) {
    const planetObj = this.planetObjects.find(p => p.data.id === planetId);
    if (!planetObj) return;

    this.selectedPlanetId = planetId;
    this.isCloseUpMode = true;

    // PENTING: JANGAN KUNCI maxDistance! 
    // Biarkan pengguna tetap bisa zoom-out bebas (hingga 400) untuk melihat tata surya kapan saja!
    const radius = planetObj.data.radiusVisual;
    this.controls.minDistance = Math.max(2.5, radius * 1.5);
    this.controls.maxDistance = 400; // Selalu bebas zoom-out kapan saja!

    this.computeCloseUpCameraTarget(planetObj);
    this.isTransitioning = true;

    if (this.onSelectPlanet) {
      this.onSelectPlanet(planetObj.data);
    }
  }

  resetToOverview() {
    this.selectedPlanetId = null;
    this.isCloseUpMode = false;

    // Kembalikan batas jarak kamera ke mode tata surya lengkap
    this.controls.minDistance = 10;
    this.controls.maxDistance = 400;

    this.cameraTargetPos.set(0, 75, 120);
    this.controlsTargetPos.set(0, 0, 0);
    this.isTransitioning = true;
  }

  zoomIn() {
    const dist = this.camera.position.distanceTo(this.controls.target);
    const step = Math.max(2.0, dist * 0.16);
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    if (dist - step >= this.controls.minDistance) {
      this.camera.position.addScaledVector(dir, step);
    }
    this.controls.update();
  }

  zoomOut() {
    const dist = this.camera.position.distanceTo(this.controls.target);
    const step = Math.max(2.0, dist * 0.16);
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    if (dist + step <= this.controls.maxDistance) {
      this.camera.position.addScaledVector(dir, -step);
    }
    this.controls.update();
  }

  setPlaying(playing) {
    this.isPlaying = playing;
  }

  setSpeed(speed) {
    this.speedMultiplier = speed;
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const rawDelta = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const delta = Math.min(rawDelta, 0.1);

    // 1. Rotasi matahari & efek pijar (5x lebih cepat)
    if (this.sun) {
      this.sun.coreMesh.rotation.y += 0.20 * delta * (this.isPlaying ? this.speedMultiplier : 0.2);
    }

    // 2. Revolusi sabuk asteroid mengelilingi matahari (diferensial keplerian multi-zona & tumbling)
    if (this.asteroidBelt) {
      if (this.asteroidBelt.userData && this.asteroidBelt.userData.update) {
        this.asteroidBelt.userData.update(delta, this.speedMultiplier, this.isPlaying);
      } else {
        this.asteroidBelt.rotation.y += 0.018 * delta * (this.isPlaying ? this.speedMultiplier : 0.2);
      }
    }

    // 3. Animasi Planet (Revolusi & Rotasi)
    this.planetObjects.forEach(p => {
      if (this.isPlaying) {
        const prevX = p.group.position.x;
        const prevZ = p.group.position.z;

        // Revolusi mengelilingi matahari (Berlawanan arah jarum jam / Counter-clockwise dilihat dari kutub utara surya)
        p.angle += p.speed * 0.2 * this.speedMultiplier * delta;
        p.group.position.x = Math.cos(p.angle) * p.orbitDistance;
        p.group.position.z = -Math.sin(p.angle) * p.orbitDistance;

        // Jika planet ini sedang dipilih dalam mode dekat, geser target dan kamera bersama pergerakan revolusi planet
        // sehingga rotasi manual kamera oleh pengguna dengan mouse/sentuhan tetap terjaga sempurna!
        if (this.selectedPlanetId === p.data.id && this.isCloseUpMode && !this.isTransitioning) {
          const moveX = p.group.position.x - prevX;
          const moveZ = p.group.position.z - prevZ;
          this.camera.position.x += moveX;
          this.camera.position.z += moveZ;
          this.controls.target.x += moveX;
          this.controls.target.z += moveZ;
        }
      }

      // Rotasi pada poros berbasis delta-time (ditingkatkan 5x lebih cepat: dari 8.0 menjadi 40.0)
      const rotFactor = 40.0 * delta * (this.isPlaying ? this.speedMultiplier : 0.3);
      p.bodyMesh.rotation.y += p.rotSpeed * rotFactor;

      // Awan bumi
      if (p.cloudsMesh) {
        p.cloudsMesh.rotation.y += p.rotSpeed * rotFactor * 1.25;
      }

      // Update posisi label HTML pada layar 2D
      this.updatePlanetLabelPosition(p);
    });

    // 3. Transisi kamera yang mulus (smooth slerp/lerp)
    if (this.isTransitioning) {
      if (this.selectedPlanetId) {
        const selObj = this.planetObjects.find(p => p.data.id === this.selectedPlanetId);
        if (selObj) {
          this.computeCloseUpCameraTarget(selObj);
        }
      }

      this.camera.position.lerp(this.cameraTargetPos, 0.08);
      this.controls.target.lerp(this.controlsTargetPos, 0.08);

      if (this.camera.position.distanceTo(this.cameraTargetPos) < 0.6) {
        this.camera.position.copy(this.cameraTargetPos);
        this.controls.target.copy(this.controlsTargetPos);
        this.isTransitioning = false;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  updatePlanetLabelPosition(planetObj) {
    if (!planetObj.labelEl || !this.camera) return;

    // Jika sedang mode dekat planet lain, sembunyikan label kecuali planet terpilih
    if (this.isCloseUpMode && this.selectedPlanetId !== planetObj.data.id) {
      planetObj.labelEl.style.display = 'none';
      return;
    }

    const pos = new THREE.Vector3();
    planetObj.group.getWorldPosition(pos);
    pos.y += planetObj.data.radiusVisual + 1.2; // Tampilkan sedikit di atas planet

    // Proyeksikan koordinat 3D ke 2D screen coordinate
    pos.project(this.camera);

    // Cek apakah di belakang kamera
    if (pos.z > 1) {
      planetObj.labelEl.style.display = 'none';
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    const x = Math.round((pos.x * 0.5 + 0.5) * width);
    const y = Math.round((-pos.y * 0.5 + 0.5) * height);

    planetObj.labelEl.style.display = 'block';
    planetObj.labelEl.style.left = `${x}px`;
    planetObj.labelEl.style.top = `${y}px`;
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
      this.renderer.domElement.removeEventListener('pointerup', this.onPointerUp);
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}

