import * as THREE from 'three';

/**
 * Generator Tekstur Prosedural Planet Tata Surya
 * Menghasilkan tekstur resolusi tinggi langsung di Canvas browser tanpa download aset eksternal.
 * Menjamin 100% offline, waktu muat instan, dan visual yang semi-realistis serta mudah dikenali siswa.
 */

// Helper: noise sederhana 2D
function pseudoNoise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x, y) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  // Bilinear interpolation dengan smoothing s-curve
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = pseudoNoise(i, j);
  const n10 = pseudoNoise(i + 1, j);
  const n01 = pseudoNoise(i, j + 1);
  const n11 = pseudoNoise(i + 1, j + 1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;

  return nx0 * (1 - sy) + nx1 * sy;
}

function fbm(x, y, octaves = 4) {
  let val = 0;
  let freq = 1;
  let amp = 0.5;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x * freq, y * freq) * amp;
    max += amp;
    freq *= 2;
    amp *= 0.5;
  }
  return val / max;
}

export class TextureGenerator {
  static createSunTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const n = fbm(u * 12, v * 6, 4);
        const n2 = fbm(u * 24 + 1.2, v * 12 + 2.5, 3);
        const combined = n * 0.7 + n2 * 0.3;

        const idx = (y * width + x) * 4;
        // Warna plasma matahari: kuning terang, jingga berpijar, merah tua
        data[idx] = Math.min(255, Math.floor(255 * (0.85 + combined * 0.25))); // R
        data[idx + 1] = Math.min(255, Math.floor(180 + combined * 70)); // G
        data[idx + 2] = Math.min(255, Math.floor(20 + combined * 60)); // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createMercuryTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const n = fbm(u * 18, v * 9, 5);
        const craters = Math.sin(u * 60) * Math.cos(v * 40) * 0.15;
        const val = Math.min(1, Math.max(0, n * 0.85 + craters + 0.1));

        const baseGrey = 110 + Math.floor(val * 85);
        const idx = (y * width + x) * 4;
        data[idx] = baseGrey; // Sedikit nuansa abu kecokelatan
        data[idx + 1] = baseGrey - 8;
        data[idx + 2] = baseGrey - 14;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Tambahkan kawah-kawah impak bulat
    ctx.fillStyle = 'rgba(60, 55, 50, 0.4)';
    for (let i = 0; i < 70; i++) {
      const cx = (pseudoNoise(i * 3.1, 1.7) * width) % width;
      const cy = (pseudoNoise(i * 5.7, 4.3) * height) % height;
      const r = 3 + pseudoNoise(i * 2.3, 7.1) * 18;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Sorotan tepi kawah
      ctx.strokeStyle = 'rgba(210, 205, 195, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createVenusTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        // Gelombang awan tebal miring
        const swirl = Math.sin(v * 14 + u * 4 + fbm(u * 6, v * 6, 3) * 3) * 0.5 + 0.5;
        const n = fbm(u * 10, v * 5, 4);
        const blend = swirl * 0.6 + n * 0.4;

        const idx = (y * width + x) * 4;
        // Nuansa kuning keemasan, krem, dan ochre awan asam sulfat
        data[idx] = Math.floor(215 + blend * 35); // R
        data[idx + 1] = Math.floor(180 + blend * 40); // G
        data[idx + 2] = Math.floor(120 + blend * 40); // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createEarthTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const lat = Math.abs(v - 0.5) * 2; // 0 di ekuator, 1 di kutub

        // Noise untuk daratan benua
        const n = fbm(u * 8, v * 5, 5);
        const isLand = n > 0.46;

        const idx = (y * width + x) * 4;

        if (lat > 0.88) {
          // Kutub es putih
          const iceTint = 230 + Math.floor(n * 25);
          data[idx] = iceTint;
          data[idx + 1] = iceTint + 5;
          data[idx + 2] = 255;
        } else if (isLand) {
          // Benua (hijau tua hutan tropis, cokelat dataran, hijau muda)
          const landElevation = (n - 0.46) / 0.54;
          if (landElevation > 0.5) {
            // Pegunungan / dataran tinggi cokelat
            data[idx] = Math.floor(140 + landElevation * 40);
            data[idx + 1] = Math.floor(120 + landElevation * 30);
            data[idx + 2] = Math.floor(80 + landElevation * 20);
          } else {
            // Hutan & padang rumput hijau
            data[idx] = Math.floor(45 + landElevation * 50);
            data[idx + 1] = Math.floor(130 + landElevation * 50);
            data[idx + 2] = Math.floor(45 + landElevation * 30);
          }
        } else {
          // Samudra biru dalam & perairan dangkal di pantai
          const depth = (0.46 - n) / 0.46;
          data[idx] = Math.floor(15 + (1 - depth) * 30);
          data[idx + 1] = Math.floor(65 + (1 - depth) * 60);
          data[idx + 2] = Math.floor(160 + (1 - depth) * 65);
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createEarthCloudsTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const n = fbm(u * 10 + 3.1, v * 6 + 1.5, 4);

        const cloudDensity = Math.max(0, (n - 0.48) / 0.52);
        const idx = (y * width + x) * 4;

        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
        data[idx + 3] = Math.floor(cloudDensity * 220); // Alpha transparan
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createMoonTexture(width = 512, height = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const n = fbm(u * 12, v * 6, 4);

        const idx = (y * width + x) * 4;
        const grey = Math.floor(120 + n * 90);
        data[idx] = grey;
        data[idx + 1] = grey;
        data[idx + 2] = grey;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Kawah dan maria (lautan basal gelap)
    ctx.fillStyle = 'rgba(70, 70, 75, 0.35)';
    for (let i = 0; i < 40; i++) {
      const cx = (pseudoNoise(i * 4.3, 2.1) * width) % width;
      const cy = (pseudoNoise(i * 6.1, 7.3) * height) % height;
      const r = 2 + pseudoNoise(i * 1.9, 3.4) * 14;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createMarsTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const lat = Math.abs(v - 0.5) * 2;
        const n = fbm(u * 12, v * 6, 5);

        const idx = (y * width + x) * 4;

        if (lat > 0.92) {
          // Tudung es kutub putih Mars
          data[idx] = 245;
          data[idx + 1] = 240;
          data[idx + 2] = 240;
        } else {
          // Warna merah karat, oranye gurun, dan dataran basal gelap
          const red = Math.floor(180 + n * 60);
          const green = Math.floor(70 + n * 40);
          const blue = Math.floor(25 + n * 25);
          data[idx] = red;
          data[idx + 1] = green;
          data[idx + 2] = blue;
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Lembah Valles Marineris (garis gelap membentang di ekuator)
    ctx.strokeStyle = 'rgba(70, 25, 10, 0.6)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.52);
    ctx.quadraticCurveTo(width * 0.5, height * 0.54, width * 0.65, height * 0.51);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createJupiterTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Koordinat Bintik Merah Raksasa (Great Red Spot)
    const spotX = 0.65;
    const spotY = 0.62;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;

        // Pita awan zonal garis lintang Jupiter
        const wave = Math.sin(v * 36 + Math.sin(u * 14) * 0.8) * 0.5 + 0.5;
        const turbulent = fbm(u * 14, v * 8, 4) * 0.4;
        const bandVal = (wave + turbulent) * 0.7;

        // Cek kedekatan dengan Great Red Spot
        const dx = (u - spotX) * 2.5;
        const dy = (v - spotY) * 6.0;
        const distSpot = Math.sqrt(dx * dx + dy * dy);
        const inSpot = distSpot < 0.22;

        const idx = (y * width + x) * 4;

        if (inSpot) {
          // Bintik Merah Raksasa (oval oranye kemerahan menyala)
          const spotGrad = distSpot / 0.22;
          data[idx] = Math.floor(215 - spotGrad * 30);
          data[idx + 1] = Math.floor(75 + spotGrad * 40);
          data[idx + 2] = Math.floor(40 + spotGrad * 30);
        } else {
          // Variasi warna pita oranye, cokelat muda, krem keputihan
          data[idx] = Math.floor(190 + bandVal * 55); // R
          data[idx + 1] = Math.floor(140 + bandVal * 45); // G
          data[idx + 2] = Math.floor(95 + bandVal * 35); // B
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createSaturnTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        // Pita lembut keemasan / butterscotch yang lebih tenang dibanding Jupiter
        const band = Math.sin(v * 28 + Math.sin(u * 6) * 0.2) * 0.5 + 0.5;
        const n = fbm(u * 8, v * 5, 3) * 0.15;
        const val = band * 0.85 + n;

        const idx = (y * width + x) * 4;
        data[idx] = Math.floor(220 + val * 30); // R
        data[idx + 1] = Math.floor(190 + val * 25); // G
        data[idx + 2] = Math.floor(135 + val * 25); // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createSaturnRingTexture(width = 512, height = 64) {
    // Tekstur 1D direntangkan melingkar pada RingGeometry UV
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let x = 0; x < width; x++) {
      const r = x / width; // 0 = inner, 1 = outer
      let alpha = 0;
      let brightness = 180;

      // Cincin C (dalam): redup
      if (r < 0.22) {
        alpha = r / 0.22 * 0.35;
        brightness = 150;
      }
      // Cincin B (tengah-dalam): paling terang dan padat
      else if (r >= 0.22 && r < 0.62) {
        alpha = 0.85 + Math.sin(r * 180) * 0.1;
        brightness = 220;
      }
      // Divisi Cassini (celah kosong gelap antara cincin B dan A)
      else if (r >= 0.62 && r < 0.70) {
        alpha = 0.04;
        brightness = 60;
      }
      // Cincin A (luar): sedang
      else if (r >= 0.70 && r < 0.94) {
        alpha = 0.65 + Math.sin(r * 120) * 0.1;
        brightness = 190;
      }
      // Tepi terluar memudar
      else {
        alpha = (1 - (r - 0.94) / 0.06) * 0.4;
        brightness = 140;
      }

      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        data[idx] = brightness;
        data[idx + 1] = Math.floor(brightness * 0.9);
        data[idx + 2] = Math.floor(brightness * 0.72);
        data[idx + 3] = Math.floor(alpha * 255);
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createUranusTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const v = y / height;
        // Uranus sangat seragam dan lembut warnanya (sian pastel / aquamarine)
        const lat = Math.abs(v - 0.5) * 2;
        const grad = lat * 0.15;

        const idx = (y * width + x) * 4;
        data[idx] = Math.floor(165 - grad * 35); // R (rendah karena metana menyerap merah)
        data[idx + 1] = Math.floor(225 - grad * 25); // G
        data[idx + 2] = Math.floor(240 - grad * 20); // B
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  static createNeptuneTexture(width = 1024, height = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Lokasi Great Dark Spot
    const darkSpotX = 0.45;
    const darkSpotY = 0.58;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const band = Math.sin(v * 16 + u * 3) * 0.1;
        const n = fbm(u * 8, v * 5, 3) * 0.08;
        const blend = band + n;

        // Cek kedekatan dengan Dark Spot
        const dx = (u - darkSpotX) * 3;
        const dy = (v - darkSpotY) * 6;
        const inDarkSpot = Math.sqrt(dx * dx + dy * dy) < 0.2;

        const idx = (y * width + x) * 4;

        if (inDarkSpot) {
          // Badai biru tua pekat
          data[idx] = 20;
          data[idx + 1] = 45;
          data[idx + 2] = 110;
        } else {
          // Warna biru kobalt cemerlang
          data[idx] = Math.floor(40 + blend * 20);
          data[idx + 1] = Math.floor(95 + blend * 30);
          data[idx + 2] = Math.floor(215 + blend * 40);
        }
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Tambahkan awan cirrus putih terang ("Scooter")
    ctx.fillStyle = 'rgba(235, 245, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(width * 0.42, height * 0.45, 60, 8, -0.1, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

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
      default: return this.createEarthTexture();
    }
  }
}

