import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLANETS_DATA } from '../data/planets.js';
import { PlanetMeshFactory } from '../gfx/planetMeshes.js';

export class QuizScene {
  constructor(containerEl) {
    this.container = containerEl;
    this.meshFactory = new PlanetMeshFactory();

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.currentPlanetGroup = null;
    this.currentBodyMesh = null;
    this.currentCloudsMesh = null;
    this.currentPlanetData = null;

    this.isPlaying = true;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060919);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    this.camera.position.set(0, 2, 8.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 20;
    this.controls.rotateSpeed = 0.8;
    this.controls.zoomSpeed = 1.0;
    this.controls.panSpeed = 0.8;
    this.controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

    // Pencahayaan
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(10, 8, 12);
    this.scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0x334466, 0.4);
    this.scene.add(ambientLight);

    // Starfield halus di latar kuis
    const stars = this.meshFactory.createStarfield(1000, 150);
    this.scene.add(stars);

    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  loadPlanet(planetId) {
    const planetData = PLANETS_DATA.find(p => p.id === planetId) || PLANETS_DATA[0];
    this.currentPlanetData = planetData;

    // Hapus planet sebelumnya
    if (this.currentPlanetGroup) {
      this.scene.remove(this.currentPlanetGroup);
    }

    const meshObj = this.meshFactory.createPlanet(planetData, true);
    this.currentPlanetGroup = meshObj.group;
    this.currentBodyMesh = meshObj.bodyMesh;
    this.currentCloudsMesh = meshObj.cloudsMesh;

    // Sesuaikan posisi kamera berdasarkan radius visual planet
    const targetDistance = Math.max(7, planetData.radiusVisual * 2.8 + 3.5);
    this.camera.position.set(0, planetData.radiusVisual * 0.3, targetDistance);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.scene.add(this.currentPlanetGroup);
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  zoomIn() {
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    this.camera.position.addScaledVector(dir, 1.5);
    this.controls.update();
  }

  zoomOut() {
    const dir = new THREE.Vector3().subVectors(this.controls.target, this.camera.position).normalize();
    this.camera.position.addScaledVector(dir, -1.5);
    this.controls.update();
  }

  resetCamera() {
    if (!this.currentPlanetData) return;
    const targetDistance = Math.max(7, this.currentPlanetData.radiusVisual * 2.8 + 3.5);
    this.camera.position.set(0, this.currentPlanetData.radiusVisual * 0.3, targetDistance);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);

    if (this.currentBodyMesh && this.isPlaying) {
      this.currentBodyMesh.rotation.y += 0.16 * delta;
      if (this.currentCloudsMesh) {
        this.currentCloudsMesh.rotation.y += 0.20 * delta;
      }
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

