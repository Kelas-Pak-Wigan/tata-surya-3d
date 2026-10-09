import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLANETS_DATA, MOON_DATA } from '../data/planets.js';
import { PlanetMeshFactory } from '../gfx/planetMeshes.js';

export class EarthScene {
  constructor(containerEl) {
    this.container = containerEl;
    this.meshFactory = new PlanetMeshFactory();

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.earthGroup = null;
    this.earthBodyMesh = null;
    this.cloudsMesh = null;
    this.moonGroup = null;
    this.moonMesh = null;
    this.axisLine = null;

    this.isPlaying = true;
    this.speedMultiplier = 1;
    this.moonAngle = 0;

    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050813);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    this.camera.position.set(0, 5, 14);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 35;
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 0.8;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    // 5. Starfield
    const starfield = this.meshFactory.createStarfield(1800, 200);
    this.scene.add(starfield);

    // 6. Pencahayaan (Simulasi Sinar Matahari dari sisi kiri depan)
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.set(-20, 8, 15);
    this.scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x223344, 0.35);
    this.scene.add(ambientLight);

    // 7. Globe Bumi
    const earthData = PLANETS_DATA.find(p => p.id === 'earth');
    const earthObj = this.meshFactory.createPlanet(earthData, true);
    this.earthGroup = earthObj.group;
    this.earthBodyMesh = earthObj.bodyMesh;
    this.cloudsMesh = earthObj.cloudsMesh;

    // Tambahkan garis poros kemiringan rotasi Bumi (23,5 derajat)
    const axisGeo = new THREE.CylinderGeometry(0.02, 0.02, earthData.radiusVisual * 2.8, 16);
    const axisMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.65
    });
    this.axisLine = new THREE.Mesh(axisGeo, axisMat);
    this.earthBodyMesh.add(this.axisLine);

    this.scene.add(this.earthGroup);

    // 8. Sistem Bulan
    this.moonGroup = new THREE.Group();
    this.moonMesh = this.meshFactory.createMoon(MOON_DATA);
    this.moonMesh.position.set(MOON_DATA.orbitRadius, 0, 0);
    this.moonGroup.add(this.moonMesh);

    // Garis orbit Bulan
    const moonOrbitLine = this.meshFactory.createOrbitLine(MOON_DATA.orbitRadius, 0x5588aa);
    this.moonGroup.add(moonOrbitLine);

    this.scene.add(this.moonGroup);

    // 9. Resize Listener
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // 10. Loop Animasi
    this.animate = this.animate.bind(this);
    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setPlaying(playing) {
    this.isPlaying = playing;
  }

  resetCamera() {
    this.camera.position.set(0, 5, 14);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  zoomIn() {
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    this.camera.position.addScaledVector(dir, 2.5);
    this.controls.update();
  }

  zoomOut() {
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    this.camera.position.addScaledVector(dir, -2.5);
    this.controls.update();
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);

    if (this.isPlaying) {
      // Rotasi bumi pada porosnya (berbasis delta-time, konsisten di semua refresh rate)
      this.earthBodyMesh.rotation.y += 0.16 * delta * this.speedMultiplier;

      // Rotasi awan sedikit lebih cepat
      if (this.cloudsMesh) {
        this.cloudsMesh.rotation.y += 0.20 * delta * this.speedMultiplier;
      }

      // Revolusi bulan mengitari bumi
      this.moonAngle += 0.08 * delta * this.speedMultiplier;
      this.moonMesh.position.x = Math.cos(this.moonAngle) * MOON_DATA.orbitRadius;
      this.moonMesh.position.z = Math.sin(this.moonAngle) * MOON_DATA.orbitRadius;

      // Rotasi bulan pada porosnya (sinkron pasang surut)
      this.moonMesh.rotation.y += 0.08 * delta * this.speedMultiplier;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}

