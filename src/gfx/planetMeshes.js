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
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.90
    });

    const starfield = new THREE.Points(geometry, material);
    starfield.name = 'starfield';
    return starfield;
  }
}
