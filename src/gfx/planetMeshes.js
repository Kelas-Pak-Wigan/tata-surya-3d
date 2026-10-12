import * as THREE from 'three';
import { TextureGenerator } from './textureGenerator.js';

/**
 * Factory Pembuat Mesh & Objek 3D Tata Surya
 * Menggunakan tekstur beresolusi tinggi resmi NASA untuk fotorealisme maksimal,
 * akurat secara astronomis, dan optimal untuk 60+ FPS di layar PID 75" maupun laptop.
 */
export class PlanetMeshFactory {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textureCache = new Map();
  }

  loadTexture(path) {
    if (!this.textureCache.has(path)) {
      const texture = this.textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      this.textureCache.set(path, texture);
    }
    return this.textureCache.get(path);
  }

  getTexture(type) {
    const textureMap = {
      sun: '/textures/sun.jpg',
      mercury: '/textures/mercury.jpg',
      venus: '/textures/venus.jpg',
      earth: '/textures/earth.jpg',
      moon: '/textures/moon.jpg',
      mars: '/textures/mars.jpg',
      jupiter: '/textures/jupiter.jpg',
      saturn: '/textures/saturn.jpg',
      uranus: '/textures/uranus.jpg',
      neptune: '/textures/neptune.jpg'
    };

    if (textureMap[type]) {
      return this.loadTexture(textureMap[type]);
    }
    return TextureGenerator.getTextureForPlanet(type);
  }

  createSun(sunData) {
    const group = new THREE.Group();
    group.name = 'sun-group';

    // Bola inti matahari dengan tekstur NASA SDO/SOHO
    const geometry = new THREE.SphereGeometry(sunData.radiusVisual, 64, 64);
    const texture = this.getTexture('sun');
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    coreMesh.name = 'sun-core';
    group.add(coreMesh);

    // Efek pijar korona dalam (Inner Corona Glow)
    const innerGlowGeo = new THREE.SphereGeometry(sunData.radiusVisual * 1.10, 36, 36);
    const innerGlowMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xffbb33) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, max(0.0, intensity * 0.95));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    group.add(innerGlow);

    // Efek pijar korona luar (Outer Halo)
    const glowGeo = new THREE.SphereGeometry(sunData.radiusVisual * 1.28, 36, 36);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xff6600) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          gl_FragColor = vec4(glowColor, max(0.0, intensity * 0.75));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.name = 'sun-glow';
    group.add(glowMesh);

    // Cahaya point light matahari menyinari seluruh planet di tata surya
    const sunLight = new THREE.PointLight(0xfff5e6, 3.8, 500, 0.35);
    sunLight.name = 'sun-light';
    group.add(sunLight);

    return { group, coreMesh, glowMesh, sunLight };
  }

  createPlanet(planetData, isDetailed = false) {
    const group = new THREE.Group();
    group.name = `planet-${planetData.id}`;
    group.userData = { planetData };

    // Group kemiringan poros (Tilt Group)
    // Menjaga orientasi sumbu rotasi & cincin tetap stabil dan konsisten di antariksa
    const tiltGroup = new THREE.Group();
    tiltGroup.name = `${planetData.id}-tilt`;
    if (planetData.axialTiltVisual) {
      tiltGroup.rotation.z = planetData.axialTiltVisual;
    }
    group.add(tiltGroup);

    const segments = isDetailed ? 64 : 48;
    const geometry = new THREE.SphereGeometry(planetData.radiusVisual, segments, segments);
    const texture = this.getTexture(planetData.id);

    // Konfigurasi Material Berdasarkan Karakteristik Fisik Planet
    let material;
    if (planetData.id === 'earth') {
      const earthSpecular = this.loadTexture('/textures/earth_specular.jpg');
      material = new THREE.MeshStandardMaterial({
        map: texture,
        metalnessMap: earthSpecular,
        metalness: 0.15,
        roughness: 0.75
      });
    } else {
      let roughness = 0.75;
      if (planetData.id === 'venus') roughness = 0.55;
      else if (planetData.id === 'mercury') roughness = 0.85;
      else if (planetData.id === 'mars') roughness = 0.82;
      else if (planetData.id === 'jupiter' || planetData.id === 'saturn') roughness = 0.65;
      else if (planetData.id === 'uranus' || planetData.id === 'neptune') roughness = 0.60;

      material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness,
        metalness: 0.04
      });
    }

    const bodyMesh = new THREE.Mesh(geometry, material);
    bodyMesh.name = `${planetData.id}-body`;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;

    // Efek Pemipihan Kutub (Oblateness) Akibat Kecepatan Rotasi Ekstrem
    // Jupiter berotasi dalam ~10 jam (flattening ~6.5%), Saturnus ~10.7 jam (flattening ~10%)
    if (planetData.id === 'jupiter') {
      bodyMesh.scale.set(1.0, 0.935, 1.0);
    } else if (planetData.id === 'saturn') {
      bodyMesh.scale.set(1.0, 0.90, 1.0);
    }

    tiltGroup.add(bodyMesh);

    let cloudsMesh = null;
    let atmosphereMesh = null;
    let ringsMesh = null;

    // -------------------------------------------------------------
    // Fitur Atmosfer, Awan & Cincin Tiap Planet
    // -------------------------------------------------------------

    // 1. Bumi: Awan Fotorealistik NASA + Pijar Hamburan Rayleigh Biru
    if (planetData.id === 'earth') {
      const cloudsGeo = new THREE.SphereGeometry(planetData.radiusVisual * 1.018, segments, segments);
      const cloudsTexture = this.loadTexture('/textures/earth_clouds.png');
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.90,
        blending: THREE.NormalBlending,
        roughness: 0.95
      });
      cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      cloudsMesh.name = 'earth-clouds';
      tiltGroup.add(cloudsMesh);

      // Pijar Atmosfer Biru Lembut (Rayleigh Atmospheric Scattering Glow)
      atmosphereMesh = this.createAtmosphereGlow(planetData.radiusVisual, 0x3388ff, 1.08, 0.65, 2.2);
      atmosphereMesh.name = 'earth-atmosphere';
      tiltGroup.add(atmosphereMesh);
    }

    // 2. Venus: Pijar Atmosfer Emas-Amber Pekat (90 atm Karbon Dioksida)
    if (planetData.id === 'venus') {
      atmosphereMesh = this.createAtmosphereGlow(planetData.radiusVisual, 0xe8be6a, 1.06, 0.55, 2.0);
      atmosphereMesh.name = 'venus-atmosphere';
      tiltGroup.add(atmosphereMesh);
    }

    // 3. Mars: Pijar Tipis Kabut Gurun & Langit Lavender
    if (planetData.id === 'mars') {
      atmosphereMesh = this.createAtmosphereGlow(planetData.radiusVisual, 0xd48b6d, 1.04, 0.35, 2.6);
      atmosphereMesh.name = 'mars-atmosphere';
      tiltGroup.add(atmosphereMesh);
    }

    // 4. Saturnus: Sistem Cincin Es Megah NASA Cassini dengan Divisi Cassini
    if (planetData.id === 'saturn' && planetData.hasRings) {
      const ringGeo = new THREE.RingGeometry(
        planetData.ringInnerRadius,
        planetData.ringOuterRadius,
        96
      );
      // Koreksi orientasi UV cincin agar terpetakan radial sempurna dari tepi dalam ke luar
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x * x + y * y);
        const normDist = (dist - planetData.ringInnerRadius) / (planetData.ringOuterRadius - planetData.ringInnerRadius);
        uvs.setXY(i, normDist, 0.5);
      }
      uvs.needsUpdate = true;

      const ringTexture = this.loadTexture('/textures/saturn_ring.png');
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.65,
        metalness: 0.05
      });

      ringsMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsMesh.name = 'saturn-rings';
      // Letakkan di bidang ekuator cincin dalam tiltGroup
      ringsMesh.rotation.x = Math.PI / 2;
      tiltGroup.add(ringsMesh);
    }

    // 5. Uranus: Cincin Tipis Berotasi Miring Menyamping (~98 derajat) & Pijar Sian
    if (planetData.id === 'uranus') {
      if (planetData.hasRings) {
        const ringGeo = new THREE.RingGeometry(
          planetData.ringInnerRadius,
          planetData.ringOuterRadius,
          64
        );
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x9be0f5,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.45
        });
        ringsMesh = new THREE.Mesh(ringGeo, ringMat);
        ringsMesh.name = 'uranus-rings';
        ringsMesh.rotation.x = Math.PI / 2;
        tiltGroup.add(ringsMesh);
      }

      atmosphereMesh = this.createAtmosphereGlow(planetData.radiusVisual, 0x66ddff, 1.06, 0.45, 2.3);
      atmosphereMesh.name = 'uranus-atmosphere';
      tiltGroup.add(atmosphereMesh);
    }

    // 6. Neptunus: Pijar Atmosfer Biru Kobalt Listrik
    if (planetData.id === 'neptune') {
      atmosphereMesh = this.createAtmosphereGlow(planetData.radiusVisual, 0x3366ff, 1.07, 0.65, 2.1);
      atmosphereMesh.name = 'neptune-atmosphere';
      tiltGroup.add(atmosphereMesh);
    }

    return { group, bodyMesh, cloudsMesh, ringsMesh, atmosphereMesh };
  }

  // Shader Pembungkus Atmosfer (Fresnel Limb Glow Rim)
  createAtmosphereGlow(radius, colorHex, scaleFactor = 1.06, intensity = 0.60, power = 2.2) {
    const atmoGeo = new THREE.SphereGeometry(radius * scaleFactor, 36, 36);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(colorHex) },
        intensity: { value: intensity },
        power: { value: power }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        uniform float intensity;
        uniform float power;
        void main() {
          float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
          gl_FragColor = vec4(glowColor, max(0.0, rim * intensity));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    return new THREE.Mesh(atmoGeo, atmoMat);
  }

  createMoon(moonData) {
    const geometry = new THREE.SphereGeometry(moonData.radiusVisual, 48, 48);
    const texture = this.getTexture('moon');

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.88,
      metalness: 0.04
    });
    const moonMesh = new THREE.Mesh(geometry, material);
    moonMesh.name = 'moon-mesh';
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    return moonMesh;
  }

  createOrbitLine(radius, color = 0x3a5a88) {
    const segments = 128;
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.32,
      linewidth: 1
    });
    const line = new THREE.LineLoop(geometry, material);
    line.name = `orbit-${radius}`;
    return line;
  }

  createPointTexture() {
    if (!this.pointTexture) {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      this.pointTexture = new THREE.CanvasTexture(canvas);
    }
    return this.pointTexture;
  }

  createStarfield(numStars = 3200, radius = 420) {
    const vertices = [];
    const colors = [];

    // Palet warna bintang alami (Klasifikasi Spektral Harvard: O, B, A, F, G, K, M)
    const starColors = [
      new THREE.Color(0xffffff), // Putih murni kelas A
      new THREE.Color(0xd6eaff), // Biru keputihan kelas B
      new THREE.Color(0xfff5e4), // Putih kekuningan kelas F/G (seperti Matahari)
      new THREE.Color(0xffdfb8), // Oranye hangat kelas K
      new THREE.Color(0xffc2b0), // Merah dingin kelas M
      new THREE.Color(0x9bd8ff)  // Biru kosmik kelas O
    ];

    for (let i = 0; i < numStars; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.65 + 0.35 * Math.random());

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      vertices.push(x, y, z);

      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const brightness = 0.5 + Math.random() * 0.5;
      colors.push(color.r * brightness, color.g * brightness, color.b * brightness);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: this.createPointTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      depthWrite: false
    });

    const starfield = new THREE.Points(geometry, material);
    starfield.name = 'starfield';
    return starfield;
  }

  getAsteroidTexture() {
    if (!this.asteroidTexture) {
      this.asteroidTexture = TextureGenerator.createAsteroidTexture(512, 512);
    }
    return this.asteroidTexture;
  }

  getAsteroidBumpMap() {
    if (!this.asteroidBumpMap) {
      this.asteroidBumpMap = TextureGenerator.createAsteroidBumpMap(512, 512);
    }
    return this.asteroidBumpMap;
  }

  /**
   * Helper Pemahat Geometri Asteroid Prosedural Ilmiah (Scientific Asteroid Sculptor)
   * Menghasilkan 5 arketipe bentuk asteroid realistis berdasarkan data misi luar angkasa
   * (NEAR Shoemaker, Hayabusa, OSIRIS-REx, Dawn, Galileo)
   */
  sculptAsteroidGeometries() {
    const applyCrater = (x, y, z, cx, cy, cz, radius, depth, rimHeight) => {
      const dx = x - cx;
      const dy = y - cy;
      const dz = z - cz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < radius) {
        const normDist = dist / radius;
        if (normDist < 0.75) {
          const bowl = (1.0 - Math.pow(normDist / 0.75, 2)) * depth;
          return -bowl;
        } else {
          const rimFactor = (normDist - 0.75) / 0.25;
          return Math.sin(rimFactor * Math.PI) * rimHeight;
        }
      }
      return 0;
    };

    const applyPlaneCut = (x, y, z, nx, ny, nz, dCut, strength = 0.55) => {
      const dot = x * nx + y * ny + z * nz;
      if (dot > dCut) {
        const push = (dot - dCut) * strength;
        return { x: x - nx * push, y: y - ny * push, z: z - nz * push };
      }
      return { x, y, z };
    };

    const normalizeGeo = (geo) => {
      geo.computeBoundingSphere();
      const maxR = geo.boundingSphere ? geo.boundingSphere.radius : 1.0;
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(i, pos.getX(i) / maxR, pos.getY(i) / maxR, pos.getZ(i) / maxR);
      }
      geo.computeVertexNormals();
      geo.computeBoundingSphere();
      return geo;
    };

    // 1. Arketipe Eros / Ida: Kentang Lonjong Asimetris Melengkung (Oblong Potato)
    const sculptEros = () => {
      const geo = new THREE.IcosahedronGeometry(1.0, 2);
      const pos = geo.attributes.position;
      const craters = [
        { cx: 0.6, cy: 0.4, cz: 0.5, r: 0.55, d: 0.22, rim: 0.08 },
        { cx: -0.7, cy: -0.3, cz: 0.4, r: 0.65, d: 0.26, rim: 0.09 },
        { cx: 0.1, cy: -0.7, cz: -0.5, r: 0.45, d: 0.18, rim: 0.06 },
        { cx: -0.2, cy: 0.6, cz: -0.6, r: 0.50, d: 0.20, rim: 0.07 }
      ];
      for (let i = 0; i < pos.count; i++) {
        const ox = pos.getX(i), oy = pos.getY(i), oz = pos.getZ(i);
        const len = Math.hypot(ox, oy, oz) || 1;
        const nx = ox / len, ny = oy / len, nz = oz / len;
        let dr = 0;
        for (const c of craters) dr += applyCrater(nx, ny, nz, c.cx, c.cy, c.cz, c.r, c.d, c.rim);
        const noise = 0.07 * Math.sin(3.5 * nx + 2.0 * ny) * Math.cos(4.0 * nz + 1.2 * nx);
        const r = 1.0 + dr + noise;
        let x = nx * r * 2.15, y = ny * r * 1.0, z = nz * r * 0.85;
        z += 0.32 * (1.0 - Math.min(1.0, Math.pow(x / 1.8, 2)));
        const cut = applyPlaneCut(x, y, z, 0.7, 0.5, 0.3, 1.2, 0.4);
        pos.setXYZ(i, cut.x, cut.y, cut.z);
      }
      return normalizeGeo(geo);
    };

    // 2. Arketipe Bennu / Ryugu: Berlian Gasing Berigi Ekuator (Diamond "Spinning Top")
    const sculptBennu = () => {
      const geo = new THREE.IcosahedronGeometry(1.0, 2);
      const pos = geo.attributes.position;
      const craters = [
        { cx: 0.2, cy: 0.7, cz: 0.3, r: 0.50, d: 0.20, rim: 0.07 },
        { cx: -0.3, cy: -0.6, cz: 0.4, r: 0.55, d: 0.22, rim: 0.08 },
        { cx: 0.7, cy: -0.2, cz: -0.4, r: 0.45, d: 0.17, rim: 0.06 }
      ];
      for (let i = 0; i < pos.count; i++) {
        const ox = pos.getX(i), oy = pos.getY(i), oz = pos.getZ(i);
        const len = Math.hypot(ox, oy, oz) || 1;
        const nx = ox / len, ny = oy / len, nz = oz / len;
        const eqRidge = 0.52 * Math.exp(-4.2 * ny * ny);
        let y = ny * 0.78;
        let dr = 0;
        for (const c of craters) dr += applyCrater(nx, ny, nz, c.cx, c.cy, c.cz, c.r, c.d, c.rim);
        const noise = 0.06 * Math.sin(4.0 * nx) * Math.cos(4.0 * nz);
        const r = 1.0 + eqRidge + dr + noise;
        const x = nx * r * 1.08, z = nz * r * 1.04;
        y = y * (1.0 + dr * 0.5);
        let p = applyPlaneCut(x, y, z, 0.8, 0.2, 0.5, 1.05, 0.45);
        p = applyPlaneCut(p.x, p.y, p.z, -0.7, 0.3, -0.6, 1.05, 0.45);
        pos.setXYZ(i, p.x, p.y, p.z);
      }
      return normalizeGeo(geo);
    };

    // 3. Arketipe Itokawa / Toutatis: Biner Kontak Kacang Berleher (Contact Binary Peanut)
    const sculptItokawa = () => {
      const geo = new THREE.IcosahedronGeometry(1.0, 2);
      const pos = geo.attributes.position;
      const craters = [
        { cx: -0.7, cy: 0.4, cz: 0.2, r: 0.48, d: 0.22, rim: 0.08 },
        { cx: 0.6, cy: -0.3, cz: -0.4, r: 0.40, d: 0.18, rim: 0.06 },
        { cx: 0.0, cy: -0.6, cz: 0.5, r: 0.35, d: 0.15, rim: 0.05 }
      ];
      for (let i = 0; i < pos.count; i++) {
        const ox = pos.getX(i), oy = pos.getY(i), oz = pos.getZ(i);
        const len = Math.hypot(ox, oy, oz) || 1;
        const nx = ox / len, ny = oy / len, nz = oz / len;
        const neckWaist = 1.0 - 0.48 * Math.exp(-6.0 * (nx - 0.05) * (nx - 0.05));
        let dr = 0;
        for (const c of craters) dr += applyCrater(nx, ny, nz, c.cx, c.cy, c.cz, c.r, c.d, c.rim);
        const noise = 0.06 * Math.sin(3.0 * nx + 1.0) * Math.cos(3.0 * nz);
        const r = 1.0 + dr + noise;
        const isHead = nx > 0.05;
        const lobeScale = isHead ? 0.82 : 1.12;
        let x = nx * r * 1.95 * lobeScale;
        let y = ny * r * 0.95 * neckWaist * lobeScale;
        let z = nz * r * 0.90 * neckWaist * lobeScale;
        if (isHead) {
          y += (x - 0.2) * 0.22;
          z += (x - 0.2) * 0.18;
        }
        pos.setXYZ(i, x, y, z);
      }
      return normalizeGeo(geo);
    };

    // 4. Arketipe Vesta / Ceres: Protoplanet Raksasa Berkawah Rheasilvia (Cratered Basin)
    const sculptVesta = () => {
      const geo = new THREE.IcosahedronGeometry(1.0, 2);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = pos.getX(i), oy = pos.getY(i), oz = pos.getZ(i);
        const len = Math.hypot(ox, oy, oz) || 1;
        const nx = ox / len, ny = oy / len, nz = oz / len;
        let dr = 0;
        // Cekungan tabrakan raksasa kutub selatan (analog Rheasilvia)
        const distSouthPole = Math.hypot(nx, ny - (-0.9), nz);
        if (distSouthPole < 0.95) {
          const normD = distSouthPole / 0.95;
          if (normD < 0.25) {
            dr += 0.18 * (1.0 - normD / 0.25); // Puncak pantulan tengah (central peak)
          } else if (normD < 0.75) {
            dr -= 0.32 * Math.cos((normD - 0.25) / 0.5 * Math.PI * 0.5); // Lantai cekungan
          } else {
            dr += 0.12 * Math.sin((normD - 0.75) / 0.25 * Math.PI); // Tebing rim
          }
        }
        dr += applyCrater(nx, ny, nz, 0.4, 0.5, 0.5, 0.45, 0.18, 0.06);
        dr += applyCrater(nx, ny, nz, -0.5, 0.3, -0.4, 0.40, 0.16, 0.05);
        if (Math.abs(ny) < 0.35) dr += 0.04 * Math.cos(ny * 25.0); // Palung graben ekuator
        const noise = 0.04 * Math.sin(5.0 * nx) * Math.cos(5.0 * nz);
        const r = 1.0 + dr + noise;
        const x = nx * r * 1.05, y = ny * r * 0.88, z = nz * r * 1.02;
        pos.setXYZ(i, x, y, z);
      }
      return normalizeGeo(geo);
    };

    // 5. Arketipe Gaspra / Mathilde: Serpihan Pecahan Bersudut Tajam (Angular Shard)
    const sculptGaspra = () => {
      const geo = new THREE.IcosahedronGeometry(1.0, 2);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = pos.getX(i), oy = pos.getY(i), oz = pos.getZ(i);
        const len = Math.hypot(ox, oy, oz) || 1;
        const nx = ox / len, ny = oy / len, nz = oz / len;
        const x = nx * 1.45, y = ny * 1.05, z = nz * 0.82;
        let p = applyPlaneCut(x, y, z, 0.8, 0.4, 0.2, 0.85, 0.65);
        p = applyPlaneCut(p.x, p.y, p.z, -0.7, 0.5, -0.3, 0.85, 0.60);
        p = applyPlaneCut(p.x, p.y, p.z, 0.2, -0.8, 0.4, 0.80, 0.65);
        p = applyPlaneCut(p.x, p.y, p.z, -0.3, -0.6, -0.6, 0.80, 0.60);
        p = applyPlaneCut(p.x, p.y, p.z, 0.1, 0.8, -0.4, 0.80, 0.60);
        const cr = applyCrater(nx, ny, nz, -0.2, 0.1, 0.8, 0.60, 0.25, 0.08);
        pos.setXYZ(i, p.x * (1 + cr), p.y * (1 + cr), p.z * (1 + cr));
      }
      return normalizeGeo(geo);
    };

    return [
      sculptEros(),
      sculptBennu(),
      sculptItokawa(),
      sculptVesta(),
      sculptGaspra()
    ];
  }

  createAsteroidBelt(innerRadius = 43.0, outerRadius = 49.0, count = 1350) {
    const beltGroup = new THREE.Group();
    beltGroup.name = 'asteroid-belt';

    // 1. Dapatkan 5 arketipe geometri asteroid ilmiah yang dipahat secara akurat
    const archetypes = this.sculptAsteroidGeometries();

    // 2. Material Batuan Realistis dengan Peta Tekstur Regolith & Peta Relief Bump Kawah
    // Roughness tinggi & metalness rendah agar batuan tidak berkilau plastik
    const rockMat = new THREE.MeshStandardMaterial({
      map: this.getAsteroidTexture(),
      bumpMap: this.getAsteroidBumpMap(),
      bumpScale: 0.16,
      roughness: 0.94,
      metalness: 0.05,
      flatShading: true
    });

    // 3. Palet Warna Alami Tipe Spektral Asteroid Nyata (C-type, S-type, M-type, V-type)
    // Nada batuan antariksa alami gelap: arang karbon, silikat tanah, besi-nikel kuno
    const colorPalette = [
      new THREE.Color(0x544e44), // S-type: Silikat berbatu taupe
      new THREE.Color(0x635b4f), // S-type: Abu kecokelatan tanah
      new THREE.Color(0x2c2925), // C-type: Karbon gelap chondrite (seperti Ryugu)
      new THREE.Color(0x38342f), // C-type: Arang gelap
      new THREE.Color(0x45423e), // M-type: Besi-nikel gelap (seperti Psyche)
      new THREE.Color(0x3d3a36), // M-type: Baja teroksidasi
      new THREE.Color(0x6e6659), // V-type: Basaltik (seperti Vesta)
      new THREE.Color(0x5a5348)  // V-type: Ejekta batuan
    ];

    // 4. Struktur Sabuk Terbagi Menjadi 3 Zona Diferensial (Keplerian Multi-Band)
    // Inner Belt (43.0 - 45.0), Mid Belt (45.0 - 47.0), Outer Belt (47.0 - 49.0)
    const subBands = [
      { name: 'inner', rMin: innerRadius, rMax: innerRadius + (outerRadius - innerRadius) * 0.35, count: Math.floor(count * 0.30), speed: 0.022 },
      { name: 'mid',   rMin: innerRadius + (outerRadius - innerRadius) * 0.30, rMax: innerRadius + (outerRadius - innerRadius) * 0.70, count: Math.floor(count * 0.45), speed: 0.018 },
      { name: 'outer', rMin: innerRadius + (outerRadius - innerRadius) * 0.65, rMax: outerRadius, count: Math.floor(count * 0.25), speed: 0.015 }
    ];

    const dummy = new THREE.Object3D();
    const bandGroups = [];

    subBands.forEach((band) => {
      const bandGroup = new THREE.Group();
      bandGroup.name = `asteroid-band-${band.name}`;
      bandGroup.userData = { speed: band.speed };

      const countPerArchetype = Math.floor(band.count / archetypes.length);

      archetypes.forEach((geo, archIdx) => {
        const instMesh = new THREE.InstancedMesh(geo, rockMat, countPerArchetype);
        instMesh.name = `asteroids-${band.name}-type${archIdx}`;

        for (let i = 0; i < countPerArchetype; i++) {
          // Distribusi radius berpusat di tengah masing-masing sub-band
          const u = Math.random();
          const r = band.rMin + (band.rMax - band.rMin) * (u * 0.65 + Math.random() * 0.35);
          const theta = Math.random() * Math.PI * 2;

          // Sebaran ketebalan vertikal torus (Gaussian bell curve)
          const y = (Math.random() - 0.5) * (Math.random() - 0.5) * 3.0;

          dummy.position.set(
            Math.cos(theta) * r,
            y,
            -Math.sin(theta) * r
          );

          // Orientasi rotasi 3D acak penuh
          dummy.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );

          // Distribusi ukuran 3D bervolume jelas (tidak lagi spek mikroskopis atau kotak)
          // 55% batuan kecil padat (0.30 - 0.48), 35% batuan sedang (0.48 - 0.75), 10% batuan besar (0.75 - 1.15)
          const tier = Math.random();
          let baseScale;
          if (tier < 0.55) {
            baseScale = 0.30 + Math.random() * 0.18;
          } else if (tier < 0.90) {
            baseScale = 0.48 + Math.random() * 0.27;
          } else {
            baseScale = 0.75 + Math.random() * 0.40;
          }

          // Variasi rasio sumbu asimetris unik per batuan
          dummy.scale.set(
            baseScale * (0.85 + Math.random() * 0.35),
            baseScale * (0.75 + Math.random() * 0.45),
            baseScale * (0.85 + Math.random() * 0.35)
          );

          dummy.updateMatrix();
          instMesh.setMatrixAt(i, dummy.matrix);

          const rockColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
          instMesh.setColorAt(i, rockColor);
        }

        instMesh.instanceMatrix.needsUpdate = true;
        if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;
        bandGroup.add(instMesh);
      });

      beltGroup.add(bandGroup);
      bandGroups.push(bandGroup);
    });

    // 5. Landmark Asteroid Raksasa Menonjol (10 Landmark Asteroids)
    // Tubuh utama nyata: Ceres, Vesta, Pallas, Hygiea, Eros (2), Bennu, Itokawa, Gaspra, Mathilde
    const landmarkDefs = [
      { name: 'ceres-analog',    geoIdx: 3, r: 45.4, scale: 1.65, angle: 0.45, speed: 0.0185, tumble: [0.12, 0.35, 0.08], color: 0x4f4942 },
      { name: 'vesta-analog',    geoIdx: 3, r: 44.2, scale: 1.45, angle: 2.10, speed: 0.0210, tumble: [0.20, 0.30, 0.12], color: 0x6e6659 },
      { name: 'pallas-analog',   geoIdx: 1, r: 47.6, scale: 1.35, angle: 3.80, speed: 0.0160, tumble: [0.15, 0.25, 0.10], color: 0x565047 },
      { name: 'hygiea-analog',   geoIdx: 1, r: 48.3, scale: 1.25, angle: 5.20, speed: 0.0152, tumble: [0.10, 0.18, 0.08], color: 0x302d29 },
      { name: 'eros-analog-1',   geoIdx: 0, r: 44.6, scale: 1.20, angle: 1.25, speed: 0.0205, tumble: [0.45, 0.38, 0.25], color: 0x625b50 },
      { name: 'eros-analog-2',   geoIdx: 0, r: 46.5, scale: 1.15, angle: 4.50, speed: 0.0175, tumble: [0.38, 0.50, 0.20], color: 0x5b5449 },
      { name: 'bennu-analog',    geoIdx: 1, r: 45.9, scale: 1.10, angle: 2.95, speed: 0.0180, tumble: [0.28, 0.40, 0.18], color: 0x2e2c28 },
      { name: 'itokawa-analog',  geoIdx: 2, r: 46.8, scale: 1.05, angle: 0.90, speed: 0.0170, tumble: [0.50, 0.30, 0.35], color: 0x554e44 },
      { name: 'gaspra-analog',   geoIdx: 4, r: 43.8, scale: 1.15, angle: 3.40, speed: 0.0215, tumble: [0.35, 0.45, 0.20], color: 0x5e574c },
      { name: 'mathilde-analog', geoIdx: 4, r: 47.2, scale: 1.10, angle: 5.80, speed: 0.0165, tumble: [0.25, 0.35, 0.15], color: 0x33302c }
    ];

    const landmarkAsteroids = [];
    landmarkDefs.forEach((ld) => {
      const geo = archetypes[ld.geoIdx];
      const mat = rockMat.clone();
      mat.color = new THREE.Color(ld.color);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = `landmark-${ld.name}`;
      mesh.scale.set(ld.scale, ld.scale * 0.95, ld.scale * 1.05);

      const pivot = new THREE.Group();
      pivot.name = `landmark-pivot-${ld.name}`;
      pivot.rotation.y = ld.angle;

      mesh.position.set(ld.r, (Math.random() - 0.5) * 1.6, 0);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      pivot.add(mesh);
      beltGroup.add(pivot);

      landmarkAsteroids.push({
        pivot,
        mesh,
        orbitSpeed: ld.speed,
        tumbleX: ld.tumble[0],
        tumbleY: ld.tumble[1],
        tumbleZ: ld.tumble[2]
      });
    });

    // 6. Dynamic Animation Update Function (Differential Keplerian Motion & Tumbling)
    // Tidak ada partikel debu kotak-kotak; murni bebatuan 3D yang berotasi dan berguling anggun
    beltGroup.userData.update = (delta, speedMultiplier, isPlaying) => {
      const factor = delta * (isPlaying ? speedMultiplier : 0.2);

      // Rotasi diferensial ketiga zona sabuk
      bandGroups.forEach((bg) => {
        bg.rotation.y += bg.userData.speed * factor;
      });

      // Revolusi dan tumbling independen asteroid-asteroid raksasa
      landmarkAsteroids.forEach((la) => {
        la.pivot.rotation.y += la.orbitSpeed * factor;
        la.mesh.rotation.x += la.tumbleX * factor;
        la.mesh.rotation.y += la.tumbleY * factor;
        la.mesh.rotation.z += la.tumbleZ * factor;
      });
    };

    return beltGroup;
  }
}
