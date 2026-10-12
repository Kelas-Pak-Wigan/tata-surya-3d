import * as THREE from 'three';

/**
 * Generator Tekstur Prosedural Planet Tata Surya
 * Menghasilkan tekstur resolusi tinggi, fotorealistik, dan akurat secara ilmiah
 * langsung di Canvas browser tanpa download aset eksternal.
 * 100% offline, waktu muat instan, dan bebas sambungan (seamless horizontally).
 */

// -------------------------------------------------------------
// Noise Primitives (3D Periodic Cylindrical / Spherical Mapping)
// -------------------------------------------------------------

function hash3D(x, y, z) {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothNoise3D(x, y, z) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fy = y - iy;
  const fz = z - iz;

  const wx = fx * fx * (3 - 2 * fx);
  const wy = fy * fy * (3 - 2 * fy);
  const wz = fz * fz * (3 - 2 * fz);

  const n000 = hash3D(ix, iy, iz);
  const n100 = hash3D(ix + 1, iy, iz);
  const n010 = hash3D(ix, iy + 1, iz);
  const n110 = hash3D(ix + 1, iy + 1, iz);
  const n001 = hash3D(ix, iy, iz + 1);
  const n101 = hash3D(ix + 1, iy, iz + 1);
  const n011 = hash3D(ix, iy + 1, iz + 1);
  const n111 = hash3D(ix + 1, iy + 1, iz + 1);

  const x00 = n000 * (1 - wx) + n100 * wx;
  const x10 = n010 * (1 - wx) + n110 * wx;
  const x01 = n001 * (1 - wx) + n101 * wx;
  const x11 = n011 * (1 - wx) + n111 * wx;

  const y0 = x00 * (1 - wy) + x10 * wy;
  const y1 = x01 * (1 - wy) + x11 * wy;

  return y0 * (1 - wz) + y1 * wz;
}

function fbm3D(x, y, z, octaves = 4) {
  let val = 0;
  let freq = 1;
  let amp = 0.5;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise3D(x * freq, y * freq, z * freq) * amp;
    max += amp;
    freq *= 2;
    amp *= 0.5;
  }
  return val / max;
}

// Horizontally seamless 3D spherical projection
function sphereNoise(u, v, freqX = 4, freqY = 4, octaves = 4) {
  const theta = u * Math.PI * 2;
  const cx = Math.cos(theta) * (freqX / (Math.PI * 2));
  const cz = Math.sin(theta) * (freqX / (Math.PI * 2));
  const cy = (v - 0.5) * freqY;
  return fbm3D(cx, cy, cz, octaves);
}

// Domain-warped turbulence for swirling storms & atmospheric currents
function warpedSphereNoise(u, v, freqX = 4, freqY = 4, octaves = 3, warp = 0.35) {
  const q1 = sphereNoise(u, v, freqX, freqY, octaves);
  const q2 = sphereNoise(u + 0.2, v + 0.3, freqX, freqY, octaves);
  return sphereNoise(u + q1 * warp, v + q2 * warp, freqX, freqY, octaves);
}

export class TextureGenerator {
  // =========================================================================
  // 1. MATAHARI (SUN)
  // =========================================================================
  static createSunTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Koordinat pusat kluster bintik matahari aktif
    const sunspots = [
      { u: 0.35, v: 0.40, r: 0.022 },
      { u: 0.38, v: 0.42, r: 0.015 },
      { u: 0.72, v: 0.60, r: 0.025 },
      { u: 0.75, v: 0.58, r: 0.018 },
      { u: 0.15, v: 0.62, r: 0.014 }
    ];

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;
      const limbFactor = 1.0 - lat * lat * 0.25; // Limb darkening

      for (let x = 0; x < width; x++) {
        const u = x / width;

        // Granulasi konveksi plasma matahari
        const gran1 = sphereNoise(u, v, 24, 16, 4);
        const gran2 = sphereNoise(u, v, 48, 32, 2);
        const plasma = (gran1 * 0.7 + gran2 * 0.3) * limbFactor;

        // Cek bintik matahari (sunspots: umbra gelap, penumbra cokelat, plages putih terang)
        let spotUmbra = 0;
        let spotPenumbra = 0;
        let spotPlage = 0;

        for (const s of sunspots) {
          const du = Math.abs(u - s.u);
          const wrapDu = Math.min(du, 1 - du) * 2.0; // horizontal wrap
          const dv = (v - s.v);
          const dist = Math.sqrt(wrapDu * wrapDu + dv * dv);

          if (dist < s.r * 0.4) {
            spotUmbra = Math.max(spotUmbra, 1.0 - dist / (s.r * 0.4));
          } else if (dist < s.r) {
            spotPenumbra = Math.max(spotPenumbra, 1.0 - (dist - s.r * 0.4) / (s.r * 0.6));
          } else if (dist < s.r * 1.8) {
            spotPlage = Math.max(spotPlage, (1.0 - (dist - s.r) / (s.r * 0.8)) * 0.5);
          }
        }

        const idx = (y * width + x) * 4;

        if (spotUmbra > 0) {
          // Umbra bintik matahari (inti magnetik gelap)
          data[idx] = Math.floor(40 + plasma * 30);
          data[idx + 1] = Math.floor(20 + plasma * 15);
          data[idx + 2] = Math.floor(5 + plasma * 10);
        } else if (spotPenumbra > 0) {
          // Penumbra (tepi serat bintik cokelat kejinggaan)
          const pVal = spotPenumbra;
          data[idx] = Math.floor(180 * (1 - pVal * 0.6) + plasma * 50);
          data[idx + 1] = Math.floor(80 * (1 - pVal * 0.6) + plasma * 30);
          data[idx + 2] = Math.floor(15 * (1 - pVal * 0.6));
        } else {
          // Photosphere plasma cerah normal dengan faculae/plages
          const rBase = 255;
          const gBase = Math.floor(180 + plasma * 65 + spotPlage * 40);
          const bBase = Math.floor(25 + plasma * 70 + spotPlage * 80);

          data[idx] = Math.min(255, Math.floor(rBase * limbFactor));
          data[idx + 1] = Math.min(255, Math.floor(gBase * limbFactor));
          data[idx + 2] = Math.min(255, Math.floor(bBase * limbFactor));
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 2. MERKURIUS (MERCURY) - Tekstur Batuan Kawah & Peta Bump
  // =========================================================================
  static createMercuryTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Kawah muda dengan pancaran sinar terang (Ray Craters seperti Kuiper & Debussy)
    const rayCraters = [
      { u: 0.28, v: 0.42, r: 12, numRays: 16, rayLen: 180 },
      { u: 0.68, v: 0.58, r: 15, numRays: 20, rayLen: 220 },
      { u: 0.45, v: 0.75, r: 10, numRays: 12, rayLen: 140 }
    ];

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;

        const rockBase = sphereNoise(u, v, 12, 6, 5);
        const microNoise = sphereNoise(u, v, 32, 16, 2);
        const blend = rockBase * 0.75 + microNoise * 0.25;

        // Dataran rendah basaltik vulkanik gelap (Caloris Planitia)
        const isCaloris = Math.hypot((u - 0.32) * 2.0, (v - 0.48) * 1.5) < 0.25;
        const toneFactor = isCaloris ? 0.78 : 1.0;

        // Nuansa abu-abu batu silikat dengan sedikit sentuhan kecokelatan hangat
        const grey = Math.floor((105 + blend * 80) * toneFactor);
        const idx = (y * width + x) * 4;

        data[idx] = Math.min(255, grey + 6);     // R (sedikit lebih hangat)
        data[idx + 1] = Math.min(255, grey);     // G
        data[idx + 2] = Math.max(0, grey - 8);    // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Gambar sinar kawah (ejecta rays) yang membentang ratusan kilometer
    for (const rc of rayCraters) {
      const cx = rc.u * width;
      const cy = rc.v * height;

      ctx.save();
      for (let i = 0; i < rc.numRays; i++) {
        const angle = (i / rc.numRays) * Math.PI * 2 + (i * 0.17);
        const grad = ctx.createLinearGradient(
          cx, cy,
          cx + Math.cos(angle) * rc.rayLen,
          cy + Math.sin(angle) * rc.rayLen
        );
        grad.addColorStop(0, 'rgba(235, 235, 240, 0.45)');
        grad.addColorStop(0.3, 'rgba(215, 215, 225, 0.25)');
        grad.addColorStop(1, 'rgba(160, 160, 170, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2 + (i % 3) * 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * rc.rayLen, cy + Math.sin(angle) * rc.rayLen);
        ctx.stroke();
      }

      // Pusat kawah cerah
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rc.r);
      centerGrad.addColorStop(0, 'rgba(245, 245, 250, 0.85)');
      centerGrad.addColorStop(0.7, 'rgba(180, 180, 190, 0.5)');
      centerGrad.addColorStop(1, 'rgba(100, 100, 110, 0)');
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, rc.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Taburkan kawah-kawah impak beragam ukuran
    for (let i = 0; i < 90; i++) {
      const seedX = Math.sin(i * 19.3) * 0.5 + 0.5;
      const seedY = Math.cos(i * 31.7) * 0.5 + 0.5;
      const cx = seedX * width;
      const cy = seedY * height;
      const r = 2.5 + (Math.sin(i * 47.1) * 0.5 + 0.5) * 16;

      // Dasar kawah gelap
      ctx.fillStyle = 'rgba(65, 60, 55, 0.35)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Rim kawah bersinar tertimpa cahaya matahari
      ctx.strokeStyle = 'rgba(210, 205, 195, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createMercuryBumpMap(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const n1 = sphereNoise(u, v, 16, 8, 4);
        const n2 = sphereNoise(u, v, 36, 18, 2);
        const val = Math.floor((n1 * 0.8 + n2 * 0.2) * 200 + 40);

        const idx = (y * width + x) * 4;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Kawah timbul pada peta relief bump
    for (let i = 0; i < 90; i++) {
      const cx = (Math.sin(i * 19.3) * 0.5 + 0.5) * width;
      const cy = (Math.cos(i * 31.7) * 0.5 + 0.5) * height;
      const r = 2.5 + (Math.sin(i * 47.1) * 0.5 + 0.5) * 16;

      // Interior cekung
      ctx.fillStyle = 'rgba(40, 40, 40, 0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fill();

      // Rim timbul
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 3. VENUS - Lapisan Awan Pekat Asam Sulfat Super-Rotasi
  // =========================================================================
  static createVenusTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2; // 0 ekuator, 1 kutub

      for (let x = 0; x < width; x++) {
        const u = x / width;

        // Karakteristik khas awan Venus: pola gelombang chevron berbentuk V/Y akibat super-rotasi atmosfer
        const chevronOffset = (1.0 - lat) * 0.45;
        const wave1 = Math.sin((u * 4.0 - chevronOffset + Math.sin(v * 10) * 0.2) * Math.PI * 2) * 0.5 + 0.5;
        const flow = warpedSphereNoise(u, v, 6, 4, 4, 0.35);
        const cloudBlend = wave1 * 0.35 + flow * 0.65;

        // Palet warna ilmiah Venus: krem pastel sutra, butterscotch muda, ochre keemasan halus
        const r = Math.floor(236 + cloudBlend * 18 - lat * 10);
        const g = Math.floor(205 + cloudBlend * 26 - lat * 15);
        const b = Math.floor(155 + cloudBlend * 35 - lat * 10);

        const idx = (y * width + x) * 4;
        data[idx] = Math.min(255, r);
        data[idx + 1] = Math.min(255, g);
        data[idx + 2] = Math.min(255, b);
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 4. BUMI (EARTH) - Benua Realistis, Samudra Berkilau & Es Kutub
  // =========================================================================
  static createEarthTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2; // 0 ekuator, 1 kutub

      for (let x = 0; x < width; x++) {
        const u = x / width;

        // Distribusi benua menggunakan domain-warped noise
        const continentBase = warpedSphereNoise(u, v, 5, 4, 5, 0.3);
        const mountainNoise = sphereNoise(u, v, 16, 8, 3);

        const isLand = continentBase > 0.47;
        const idx = (y * width + x) * 4;

        if (lat > 0.88) {
          // Kutub es Arktik & Antarktika (putih es kebiruan)
          const iceVar = Math.floor(sphereNoise(u, v, 8, 4, 3) * 20);
          data[idx] = 235 + iceVar;
          data[idx + 1] = 242 + iceVar;
          data[idx + 2] = 255;
        } else if (isLand) {
          const elev = (continentBase - 0.47) / 0.53;

          if (elev > 0.65) {
            // Pegunungan tinggi (Himalaya / Andes: abu-abu kecokelatan & salju puncak)
            const snowPeak = elev > 0.85;
            if (snowPeak) {
              data[idx] = 240;
              data[idx + 1] = 240;
              data[idx + 2] = 245;
            } else {
              data[idx] = Math.floor(130 + mountainNoise * 35);
              data[idx + 1] = Math.floor(110 + mountainNoise * 25);
              data[idx + 2] = Math.floor(85 + mountainNoise * 20);
            }
          } else if (lat > 0.18 && lat < 0.42 && elev < 0.45) {
            // Zona Sabuk Gurun Subtropis (Sahara, Arab, Australia: pasir keemasan ochre)
            data[idx] = Math.floor(190 + elev * 30);
            data[idx + 1] = Math.floor(155 + elev * 25);
            data[idx + 2] = Math.floor(100 + elev * 20);
          } else {
            // Hutan hujan tropis ekuator & vegetasi hijau subur
            data[idx] = Math.floor(35 + elev * 35);
            data[idx + 1] = Math.floor(115 + elev * 45);
            data[idx + 2] = Math.floor(40 + elev * 25);
          }
        } else {
          // Samudra perairan dalam vs paparan benua dangkal pantai (turquoise)
          const depth = (0.47 - continentBase) / 0.47;
          if (depth < 0.12) {
            // Perairan dangkal pesisir / karang (turquoise cerah)
            data[idx] = 24;
            data[idx + 1] = 128;
            data[idx + 2] = 178;
          } else {
            // Laut dalam biru pekat (abyssal ocean)
            data[idx] = Math.floor(10 + (1 - depth) * 20);
            data[idx + 1] = Math.floor(45 + (1 - depth) * 45);
            data[idx + 2] = Math.floor(125 + (1 - depth) * 55);
          }
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Peta Kekasaran Bumi (Roughness Map): Lautan licin mengilap (refleksi cahaya matahari), Daratan kasar
  static createEarthRoughnessMap(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;

      for (let x = 0; x < width; x++) {
        const u = x / width;
        const continentBase = warpedSphereNoise(u, v, 5, 4, 5, 0.3);
        const isLand = continentBase > 0.47;

        let roughVal = 30; // Laut sangat halus (specular highlight tajam)
        if (lat > 0.88) {
          roughVal = 95; // Es kutub semi-reflektif
        } else if (isLand) {
          roughVal = 225; // Daratan matte/kasar
        }

        const idx = (y * width + x) * 4;
        data[idx] = roughVal;
        data[idx + 1] = roughVal;
        data[idx + 2] = roughVal;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createEarthBumpMap(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const continentBase = warpedSphereNoise(u, v, 5, 4, 5, 0.3);
        const m = sphereNoise(u, v, 18, 9, 3);

        let heightVal = 120; // Permukaan laut netral
        if (continentBase > 0.47) {
          const elev = (continentBase - 0.47) / 0.53;
          heightVal = Math.floor(140 + elev * 90 + m * 25);
        }

        const idx = (y * width + x) * 4;
        data[idx] = heightVal;
        data[idx + 1] = heightVal;
        data[idx + 2] = heightVal;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Lapisan Awan Dinamis Bumi (Swirling Cyclones, ITCZ & Frontal Belts)
  static createEarthCloudsTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;

      for (let x = 0; x < width; x++) {
        const u = x / width;

        // Pusaran awan dinamis & sabuk konvergensi antartropis (ITCZ)
        const cloudFlow = warpedSphereNoise(u, v, 7, 5, 4, 0.45);
        const itczBand = Math.exp(-Math.pow((v - 0.5) * 12, 2)) * 0.28; // Awan tebal di ekuator
        const temperateStorms = Math.sin(lat * 8.0 + u * 10.0) * 0.15;

        const density = cloudFlow + itczBand + temperateStorms;
        const cloudAlpha = Math.max(0, Math.min(235, Math.floor((density - 0.44) * 450)));

        const idx = (y * width + x) * 4;
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = cloudAlpha;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 5. BULAN (MOON) - Maria Basaltik Gelap & Dataran Tinggi Kawah Tycho
  // =========================================================================
  static createMoonTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;

        const base = sphereNoise(u, v, 8, 4, 5);
        const mariaNoise = sphereNoise(u * 1.5, v * 1.5, 4, 3, 3);

        // Maria Bulan (Lautan basal gelap di belahan tampak bumi: Mare Imbrium, Tranquillitatis, Serenitatis)
        const isMaria = mariaNoise < 0.38 && u > 0.15 && u < 0.85;
        const tone = isMaria ? 0.62 : 1.0;

        const grey = Math.floor((125 + base * 95) * tone);
        const idx = (y * width + x) * 4;

        data[idx] = grey;
        data[idx + 1] = grey - 2;
        data[idx + 2] = grey - 4;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Kawah Tycho dengan sinar-sinar putih spektakuler membentang
    const tychoX = width * 0.48;
    const tychoY = height * 0.76;
    ctx.save();
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + (i * 0.1);
      const len = 160 + (i % 4) * 60;
      const grad = ctx.createLinearGradient(tychoX, tychoY, tychoX + Math.cos(angle) * len, tychoY + Math.sin(angle) * len);
      grad.addColorStop(0, 'rgba(240, 240, 245, 0.6)');
      grad.addColorStop(0.3, 'rgba(210, 210, 220, 0.25)');
      grad.addColorStop(1, 'rgba(150, 150, 160, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tychoX, tychoY);
      ctx.lineTo(tychoX + Math.cos(angle) * len, tychoY + Math.sin(angle) * len);
      ctx.stroke();
    }
    ctx.restore();

    // Kawah-kawah impak bulan
    for (let i = 0; i < 85; i++) {
      const cx = (Math.sin(i * 17.1) * 0.5 + 0.5) * width;
      const cy = (Math.cos(i * 29.3) * 0.5 + 0.5) * height;
      const r = 2 + (Math.sin(i * 41.5) * 0.5 + 0.5) * 14;

      ctx.fillStyle = 'rgba(55, 55, 60, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(215, 215, 225, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createMoonBumpMap(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const b = sphereNoise(u, v, 14, 7, 4);
        const val = Math.floor(b * 190 + 50);

        const idx = (y * width + x) * 4;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    for (let i = 0; i < 85; i++) {
      const cx = (Math.sin(i * 17.1) * 0.5 + 0.5) * width;
      const cy = (Math.cos(i * 29.3) * 0.5 + 0.5) * height;
      const r = 2 + (Math.sin(i * 41.5) * 0.5 + 0.5) * 14;

      ctx.fillStyle = 'rgba(40, 40, 40, 0.6)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 6. MARS - Karat Besi Oksida, Syrtis Major, Valles Marineris & Tudung Es
  // =========================================================================
  static createMarsTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Lokasi Syrtis Major Planum (wilayah segitiga vulkanik gelap legendaris)
    const syrtisU = 0.62;
    const syrtisV = 0.48;

    // Lokasi Olympus Mons
    const olympusU = 0.22;
    const olympusV = 0.42;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;

      for (let x = 0; x < width; x++) {
        const u = x / width;

        const desertNoise = sphereNoise(u, v, 8, 4, 5);
        const microNoise = sphereNoise(u, v, 24, 12, 2);

        // Syrtis Major: fitur gelap segitiga basal
        const duS = Math.abs(u - syrtisU) * 2.5;
        const dvS = (v - syrtisV) * 3.0;
        const isSyrtis = Math.sqrt(duS * duS + dvS * dvS) < 0.28;

        // Dataran rendah Acidalia gelap
        const isAcidalia = u > 0.40 && u < 0.56 && v > 0.25 && v < 0.40;
        const isDarkProvince = isSyrtis || isAcidalia || desertNoise < 0.32;

        const idx = (y * width + x) * 4;

        if (lat > 0.91) {
          // Tudung es kutub putih cemerlang (es air & CO2 beku) dengan alur spiral
          const iceVar = Math.floor(microNoise * 15);
          data[idx] = 245 + iceVar;
          data[idx + 1] = 245 + iceVar;
          data[idx + 2] = 250;
        } else if (isDarkProvince) {
          // Dataran basal gelap abu-abu kehijauan/kecokelatan
          data[idx] = Math.floor(100 + desertNoise * 35);
          data[idx + 1] = Math.floor(65 + desertNoise * 25);
          data[idx + 2] = Math.floor(45 + desertNoise * 20);
        } else {
          // Gurun karat besi oksida oranye kemerahan & butterscotch khas Mars
          const blend = desertNoise * 0.7 + microNoise * 0.3;
          data[idx] = Math.floor(190 + blend * 55);  // R tinggi
          data[idx + 1] = Math.floor(85 + blend * 45);   // G
          data[idx + 2] = Math.floor(35 + blend * 25);   // B
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Lembah Ngarai Raksasa Valles Marineris (panjang 4.000 km di ekuator)
    ctx.save();
    ctx.strokeStyle = 'rgba(65, 30, 18, 0.75)';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(width * 0.32, height * 0.53);
    ctx.bezierCurveTo(
      width * 0.42, height * 0.56,
      width * 0.48, height * 0.51,
      width * 0.58, height * 0.54
    );
    ctx.stroke();

    // Cabang ngarai samping (Candor & Ophir Chasma)
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(width * 0.44, height * 0.54);
    ctx.lineTo(width * 0.47, height * 0.48);
    ctx.stroke();

    // Olympus Mons (kaldera gunung berapi raksasa)
    const ox = olympusU * width;
    const oy = olympusV * height;
    const oGrad = ctx.createRadialGradient(ox, oy, 2, ox, oy, 20);
    oGrad.addColorStop(0, 'rgba(80, 40, 25, 0.8)');
    oGrad.addColorStop(0.3, 'rgba(215, 110, 55, 0.9)');
    oGrad.addColorStop(0.8, 'rgba(165, 80, 40, 0.6)');
    oGrad.addColorStop(1, 'rgba(200, 95, 45, 0)');
    ctx.fillStyle = oGrad;
    ctx.beginPath();
    ctx.arc(ox, oy, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createMarsBumpMap(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const n = sphereNoise(u, v, 10, 5, 4);
        const val = Math.floor(n * 160 + 60);

        const idx = (y * width + x) * 4;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Celah ngarai dalam pada bump map
    ctx.strokeStyle = 'rgba(20, 20, 20, 0.85)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width * 0.32, height * 0.53);
    ctx.bezierCurveTo(
      width * 0.42, height * 0.56,
      width * 0.48, height * 0.51,
      width * 0.58, height * 0.54
    );
    ctx.stroke();

    // Puncak Olympus Mons menjulang tinggi
    const ox = 0.22 * width;
    const oy = 0.42 * height;
    const oGrad = ctx.createRadialGradient(ox, oy, 2, ox, oy, 22);
    oGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    oGrad.addColorStop(0.7, 'rgba(200, 200, 200, 0.5)');
    oGrad.addColorStop(1, 'rgba(128, 128, 128, 0)');
    ctx.fillStyle = oGrad;
    ctx.beginPath();
    ctx.arc(ox, oy, 22, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 7. JUPITER - Sabuk Awan Zonal, Vorteks Turbulen & Bintik Merah Raksasa
  // =========================================================================
  static createJupiterTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Lokasi Great Red Spot (22 derajat Lintang Selatan)
    const grsU = 0.65;
    const grsV = 0.62;

    for (let y = 0; y < height; y++) {
      const v = y / height;

      // Aliran sabuk-sabuk awan lintang (Zonal Jet Streams)
      const latWave = Math.sin(v * 48.0 + Math.sin(v * 24.0) * 0.4) * 0.5 + 0.5;
      const shearSwirl = warpedSphereNoise(y % 2 === 0 ? 0 : 0.01, v, 14, 8, 4, 0.35);

      for (let x = 0; x < width; x++) {
        const u = x / width;

        // Pusaran gelombang Kelvin-Helmholtz antara pita awan yang berlawanan arah
        const turbulent = sphereNoise(u + latWave * 0.1, v, 12, 18, 3) * 0.35;
        const bandVal = latWave * 0.65 + turbulent + shearSwirl * 0.2;

        // Cek kedekatan dengan Bintik Merah Raksasa (Great Red Spot)
        const du = Math.abs(u - grsU);
        const wrapDu = Math.min(du, 1 - du) * 2.8;
        const dv = (v - grsV) * 7.0;
        const distSpot = Math.sqrt(wrapDu * wrapDu + dv * dv);
        const inSpot = distSpot < 0.24;

        // Pusaran angin di belakang GRS (turbulent wake)
        const isWake = (u > grsU && u < grsU + 0.18) && Math.abs(v - grsV) < 0.05;

        const idx = (y * width + x) * 4;

        if (inSpot) {
          // Bintik Merah Raksasa (oval terakota tua dengan mata merah pekat konsentris)
          const spotGrad = distSpot / 0.24;
          const swirlAngle = Math.atan2(dv, wrapDu);
          const swirlVar = Math.sin(swirlAngle * 3.0 + distSpot * 20.0) * 15;

          data[idx] = Math.floor(225 - spotGrad * 40 + swirlVar); // R tinggi
          data[idx + 1] = Math.floor(75 + spotGrad * 55);         // G
          data[idx + 2] = Math.floor(45 + spotGrad * 45);         // B
        } else if (isWake) {
          // Turbulensi berbusa putih kejinggaan di belakang GRS
          data[idx] = 230;
          data[idx + 1] = 165;
          data[idx + 2] = 115;
        } else {
          // Zona Terang (krem/putih susu) vs Sabuk Gelap (cokelat kemerahan/amber)
          const r = Math.floor(190 + bandVal * 55);
          const g = Math.floor(135 + bandVal * 50);
          const b = Math.floor(85 + bandVal * 45);

          data[idx] = Math.min(255, r);
          data[idx + 1] = Math.min(255, g);
          data[idx + 2] = Math.min(255, b);
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Tambahkan beberapa badai oval putih ("String of Pearls" di belahan selatan)
    for (let i = 0; i < 5; i++) {
      const px = ((grsU + 0.2 + i * 0.14) % 1.0) * width;
      const py = height * 0.72;
      ctx.fillStyle = 'rgba(245, 240, 230, 0.7)';
      ctx.beginPath();
      ctx.ellipse(px, py, 14, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 8. SATURNUS - Pita Halus Keemasan, Heksagon Kutub & Cincin Megah
  // =========================================================================
  static createSaturnTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;

      // Pita awan lembut mentega keemasan (butterscotch & honey tones)
      const band = Math.sin(v * 36.0 + Math.sin(v * 12.0) * 0.2) * 0.5 + 0.5;
      const haze = sphereNoise(0.5, v, 6, 6, 3) * 0.15;
      const blend = band * 0.85 + haze;

      // Heksagon Kutub Utara Saturnus (vorteks heksagonal kehijauan/kebiruan di kutub utara)
      const isNorthPole = v < 0.12;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        if (isNorthPole) {
          // Sentuhan warna teal-hijau heksagon kutub utara yang terkenal
          data[idx] = Math.floor(165 + blend * 30);
          data[idx + 1] = Math.floor(180 + blend * 25);
          data[idx + 2] = Math.floor(145 + blend * 25);
        } else {
          // Warna keemasan anggun Saturnus
          data[idx] = Math.min(255, Math.floor(222 + blend * 28 - lat * 15));
          data[idx + 1] = Math.min(255, Math.floor(192 + blend * 25 - lat * 20));
          data[idx + 2] = Math.min(255, Math.floor(138 + blend * 25 - lat * 18));
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // Cincin Saturnus Resolusi Tinggi (Cincin C, Cincin B Padat, Divisi Cassini, Cincin A & Celah Encke)
  static createSaturnRingTexture(width = 1024, height = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let x = 0; x < width; x++) {
      const r = x / width; // 0 = tepi dalam, 1 = tepi luar

      let alpha = 0;
      let brightness = 180;
      let rTint = 220;
      let gTint = 195;
      let bTint = 145;

      // Variasi puluhan ribu cincin kecil konsentris (fine ringlets)
      const microRings = (Math.sin(r * 400.0) * 0.08 + Math.sin(r * 1200.0) * 0.04);

      if (r < 0.20) {
        // Cincin C (Crepe Ring / dalam): transparan redup
        alpha = (r / 0.20) * 0.35 + microRings * 0.1;
        brightness = 140;
      } else if (r >= 0.20 && r < 0.62) {
        // Cincin B (Paling lebar, paling padat & berkilau terang keemasan)
        const density = 0.88 + microRings;
        alpha = Math.min(0.98, Math.max(0.65, density));
        brightness = 230;
      } else if (r >= 0.62 && r < 0.70) {
        // Divisi Cassini (Celah kosong gelap selebar 4.800 km)
        alpha = 0.02; // Hampir tembus pandang total
        brightness = 40;
      } else if (r >= 0.70 && r < 0.94) {
        // Cincin A (Cincin luar utama)
        // Celah Encke pada r ~ 0.88
        const isEncke = Math.abs(r - 0.88) < 0.012;
        if (isEncke) {
          alpha = 0.05;
          brightness = 60;
        } else {
          alpha = 0.72 + microRings;
          brightness = 195;
        }
      } else {
        // Tepi terluar cincin A & cincin F memudar ke ruang hampa
        alpha = Math.max(0, (1.0 - (r - 0.94) / 0.06) * 0.35);
        brightness = 120;
      }

      const finalR = Math.min(255, Math.floor(brightness * (rTint / 200)));
      const finalG = Math.min(255, Math.floor(brightness * (gTint / 200)));
      const finalB = Math.min(255, Math.floor(brightness * (bTint / 200)));
      const finalA = Math.min(255, Math.max(0, Math.floor(alpha * 255)));

      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        data[idx] = finalR;
        data[idx + 1] = finalG;
        data[idx + 2] = finalB;
        data[idx + 3] = finalA;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  // =========================================================================
  // 9. URANUS - Raksasa Es Berotasi Miring, Sian Pastel & Tudung Kutub
  // =========================================================================
  static createUranusTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const lat = Math.abs(v - 0.5) * 2;

      // Penyerapan gas metana menghasilkan warna aquamarine / sian pastel lembut yang seragam
      const polarCollar = v > 0.80 ? 0.15 : 0; // Tudung terang kutub musiman (JWST/Hubble)
      const band = Math.sin(v * 20.0) * 0.04;

      for (let x = 0; x < width; x++) {
        const u = x / width;
        const micro = sphereNoise(u, v, 6, 6, 2) * 0.03;
        const val = band + micro + polarCollar;

        const idx = (y * width + x) * 4;
        data[idx] = Math.floor(168 + val * 40 - lat * 15); // R rendah (merah terserap metana)
        data[idx + 1] = Math.floor(226 + val * 25);        // G
        data[idx + 2] = Math.floor(238 + val * 20);        // B cerah
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 10. NEPTUNUS - Biru Kobalt Memikat, Badai Gelap & Awan Sirus Putih
  // =========================================================================
  static createNeptuneTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Lokasi Great Dark Spot (GDS - Badai antisiiklon biru tua selatan)
    const gdsU = 0.45;
    const gdsV = 0.58;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      const latWave = Math.sin(v * 24.0) * 0.08;

      for (let x = 0; x < width; x++) {
        const u = x / width;

        const flow = sphereNoise(u, v, 8, 4, 3) * 0.08;
        const blend = latWave + flow;

        // Cek kedekatan dengan Great Dark Spot
        const du = Math.abs(u - gdsU);
        const wrapDu = Math.min(du, 1 - du) * 3.2;
        const dv = (v - gdsV) * 7.5;
        const distSpot = Math.sqrt(wrapDu * wrapDu + dv * dv);
        const inGDS = distSpot < 0.22;

        const idx = (y * width + x) * 4;

        if (inGDS) {
          // Badai raksasa biru nila gelap pekat
          data[idx] = 18;
          data[idx + 1] = 48;
          data[idx + 2] = 120;
        } else {
          // Biru kobalt intens / royal azure khas Neptunus
          data[idx] = Math.floor(36 + blend * 30);
          data[idx + 1] = Math.floor(94 + blend * 40);
          data[idx + 2] = Math.floor(215 + blend * 35);
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Tambahkan awan cirrus metana putih berkilau ("Scooter")
    ctx.save();
    ctx.fillStyle = 'rgba(240, 248, 255, 0.75)';

    // Awan terang pendamping GDS
    ctx.beginPath();
    ctx.ellipse(width * 0.44, height * 0.52, 45, 6, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // Jalur awan cirrus lintang ekuator
    ctx.fillStyle = 'rgba(220, 240, 255, 0.55)';
    ctx.beginPath();
    ctx.ellipse(width * 0.72, height * 0.42, 60, 5, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // 10. ASTEROID - Regolith Berdebu, Kawah Tabrakan & Faset Batuan Alami
  // =========================================================================
  static createAsteroidTexture(width = 512, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;

        const n1 = sphereNoise(u, v, 6, 6, 4);
        const n2 = sphereNoise(u * 2, v * 2, 12, 12, 3);
        const rockNoise = n1 * 0.7 + n2 * 0.3;

        // Palet gelap regolith batuan kosmis (albedo ~ 0.10 - 0.18)
        const base = Math.floor(65 + rockNoise * 45);
        const idx = (y * width + x) * 4;
        data[idx] = Math.floor(base * 1.02);     // sedikit kehangatan silikat
        data[idx + 1] = Math.floor(base * 0.98); // netral abu-abu
        data[idx + 2] = Math.floor(base * 0.92); // silikat gelap
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Kawah tabrakan dengan rim bercahaya dan bayangan interior
    const numCraters = 65;
    for (let i = 0; i < numCraters; i++) {
      const cx = (Math.sin(i * 17.3) * 0.5 + 0.5) * width;
      const cy = (Math.cos(i * 29.7) * 0.5 + 0.5) * height;
      const r = 3 + Math.pow(Math.sin(i * 43.1) * 0.5 + 0.5, 2) * 28;

      // Halo ejekta debu cerah
      const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 1.8);
      grad.addColorStop(0, 'rgba(160, 155, 145, 0.25)');
      grad.addColorStop(1, 'rgba(100, 95, 85, 0.0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Cekungan kawah gelap
      ctx.fillStyle = 'rgba(28, 26, 24, 0.75)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fill();

      // Bibir kawah (crater rim highlight)
      ctx.strokeStyle = 'rgba(175, 168, 158, 0.85)';
      ctx.lineWidth = Math.max(1.2, r * 0.12);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  static createAsteroidBumpMap(width = 512, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      const v = y / height;
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const n = sphereNoise(u, v, 10, 10, 4);
        const bumpVal = Math.floor(100 + n * 55);

        const idx = (y * width + x) * 4;
        data[idx] = bumpVal;
        data[idx + 1] = bumpVal;
        data[idx + 2] = bumpVal;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Kawah timbul / cekung pada peta bump
    const numCraters = 65;
    for (let i = 0; i < numCraters; i++) {
      const cx = (Math.sin(i * 17.3) * 0.5 + 0.5) * width;
      const cy = (Math.cos(i * 29.7) * 0.5 + 0.5) * height;
      const r = 3 + Math.pow(Math.sin(i * 43.1) * 0.5 + 0.5, 2) * 28;

      // Cekungan kawah (nilai bump rendah / gelap)
      ctx.fillStyle = 'rgba(25, 25, 25, 0.7)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.fill();

      // Bibir rim kawah (nilai bump tinggi / putih timbul)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = Math.max(1.5, r * 0.15);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // Dispatcher Generator
  // =========================================================================
  static getTextureForPlanet(type) {
    switch (type) {
      case 'sun': return this.createSunTexture();
      case 'mercury': return this.createMercuryTexture();
      case 'venus': return this.createVenusTexture();
      case 'earth': return this.createEarthTexture();
      case 'moon': return this.createMoonTexture();
      case 'mars': return this.createMarsTexture();
      case 'jupiter': return this.createJupiterTexture();
      case 'saturn': return this.createSaturnTexture();
      case 'uranus': return this.createUranusTexture();
      case 'neptune': return this.createNeptuneTexture();
      case 'asteroid': return this.createAsteroidTexture();
      default: return this.createEarthTexture();
    }
  }

  static getBumpMapForPlanet(type) {
    switch (type) {
      case 'mercury': return this.createMercuryBumpMap();
      case 'moon': return this.createMoonBumpMap();
      case 'mars': return this.createMarsBumpMap();
      case 'earth': return this.createEarthBumpMap();
      case 'asteroid': return this.createAsteroidBumpMap();
      default: return null;
    }
  }

  static getRoughnessMapForPlanet(type) {
    switch (type) {
      case 'earth': return this.createEarthRoughnessMap();
      default: return null;
    }
  }
}
