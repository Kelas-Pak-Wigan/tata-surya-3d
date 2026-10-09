import * as THREE from 'three';
import { TextureGenerator } from './textureGenerator.js';

/**
 * Factory Pembuat Mesh & Objek 3D Tata Surya
 */
export class PlanetMeshFactory {
  constructor() {
    this.textureCache = new Map();
  }

  getTexture(type) {
    if (!this.textureCache.has(type)) {
      this.textureCache.set(type, TextureGenerator.getTextureForPlanet(type));
    }
    return this.textureCache.get(type);
  }

  createSun(sunData) {
    const group = new THREE.Group();
    group.name = 'sun-group';

    // Bola inti matahari
    const geometry = new THREE.SphereGeometry(sunData.radiusVisual, 48, 48);
    const texture = this.getTexture('sun');
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    coreMesh.name = 'sun-core';
    group.add(coreMesh);

    // Efek pijar korona luar (glow sphere)
    const glowGeo = new THREE.SphereGeometry(sunData.radiusVisual * 1.18, 32, 32);
    const glowMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xff8811) }
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
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(glowColor, intensity * 0.85);
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

    // Cahaya point light matahari
    const sunLight = new THREE.PointLight(0xfff7e6, 3.5, 350, 0.5);
    sunLight.name = 'sun-light';
    group.add(sunLight);

    return { group, coreMesh, glowMesh, sunLight };
  }

  createPlanet(planetData, isDetailed = false) {
    const group = new THREE.Group();
    group.name = `planet-${planetData.id}`;
    group.userData = { planetData };

    const segments = isDetailed ? 64 : 40;
    const geometry = new THREE.SphereGeometry(planetData.radiusVisual, segments, segments);
    const texture = this.getTexture(planetData.id);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.75,
      metalness: 0.1
    });

    const bodyMesh = new THREE.Mesh(geometry, material);
    bodyMesh.name = `${planetData.id}-body`;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;

    // Terapkan kemiringan sumbu rotasi (axial tilt)
    if (planetData.axialTiltVisual) {
      bodyMesh.rotation.z = planetData.axialTiltVisual;
    }
    group.add(bodyMesh);

    let cloudsMesh = null;
    let atmosphereMesh = null;
    let ringsMesh = null;

    // Fitur khusus Bumi: Lapisan awan berputar + atmosfer biru lembut
    if (planetData.id === 'earth') {
      const cloudsGeo = new THREE.SphereGeometry(planetData.radiusVisual * 1.02, segments, segments);
      const cloudsTexture = TextureGenerator.createEarthCloudsTexture();
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.NormalBlending,
        roughness: 0.9
      });
      cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
      cloudsMesh.name = 'earth-clouds';
      bodyMesh.add(cloudsMesh);

      // Atmosfer glow
      const atmoGeo = new THREE.SphereGeometry(planetData.radiusVisual * 1.08, 32, 32);
      const atmoMat = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0x3388ff) }
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
          uniform vec3 color;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(color, max(0.0, intensity * 0.6));
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false
      });
      atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
      bodyMesh.add(atmosphereMesh);
    }

    // Fitur khusus Saturnus: Cincin es spektakuler
    if (planetData.id === 'saturn' && planetData.hasRings) {
      const ringGeo = new THREE.RingGeometry(
        planetData.ringInnerRadius,
        planetData.ringOuterRadius,
        64
      );
      // Koreksi orientasi UV cincin agar radial
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

      const ringTexture = TextureGenerator.createSaturnRingTexture();
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.8,
        metalness: 0.1
      });

      ringsMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsMesh.name = 'saturn-rings';
      ringsMesh.rotation.x = Math.PI / 2 + 0.1;
      bodyMesh.add(ringsMesh);
    }

    // Fitur khusus Uranus: Cincin tipis
    if (planetData.id === 'uranus' && planetData.hasRings) {
      const ringGeo = new THREE.RingGeometry(
        planetData.ringInnerRadius,
        planetData.ringOuterRadius,
        48
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x99ddff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      ringsMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsMesh.name = 'uranus-rings';
      ringsMesh.rotation.x = Math.PI / 2;
      bodyMesh.add(ringsMesh);
    }

    return { group, bodyMesh, cloudsMesh, ringsMesh, atmosphereMesh };
  }

  createMoon(moonData) {
    const geometry = new THREE.SphereGeometry(moonData.radiusVisual, 32, 32);
    const texture = this.getTexture('moon');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(geometry, material);
    moonMesh.name = 'moon-mesh';
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    return moonMesh;
  }

  createOrbitLine(radius, color = 0x446699) {
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
      opacity: 0.28,
      linewidth: 1
    });
    const line = new THREE.LineLoop(geometry, material);
    line.name = `orbit-${radius}`;
    return line;
  }

  createStarfield(numStars = 2500, radius = 400) {
    const vertices = [];
    const colors = [];

    const colorPalette = [
      new THREE.Color(0xffffff), // putih murni
      new THREE.Color(0xddeeff), // biru muda dingin
      new THREE.Color(0xffeedd), // kuning hangat
      new THREE.Color(0xffccaa), // jingga kemerahan
      new THREE.Color(0x99ddff)  // sian kosmis
    ];

    for (let i = 0; i < numStars; i++) {
      // Distribusi bola seragam
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.6 + 0.4 * Math.random());

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      vertices.push(x, y, z);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors.push(color.r, color.g, color.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starfield = new THREE.Points(geometry, material);
    starfield.name = 'starfield';
    return starfield;
  }
}

