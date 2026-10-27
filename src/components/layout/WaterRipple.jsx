import React, { useEffect, useRef } from "react";

/**
 * WaterRipple
 *
 * Click anywhere and a stone drops into the page. This is a real wave
 * simulation, not a drawn animation:
 *
 *  - The water is a height field that obeys a damped wave equation, so rings
 *    travel outward, thin out, trail smaller rings, cross each other cleanly
 *    when you click several times, and fade into the screen edges.
 *  - Every frame the height field is lit like a glossy surface: bright and
 *    dark flanks on each wave, a cool sheen where the water tilts, and a sharp
 *    specular glint from a light at the upper left.
 *  - The impact also throws up a few droplets that fall back and make tiny
 *    secondary ripples.
 *
 * Note: this is an overlay canvas, so it lights the water but cannot bend the
 * page content underneath it.
 */

/* ------------------------------------------------------------------ */
/* Water surface core (pure JS, no DOM)                                */
/* ------------------------------------------------------------------ */
const BASE_STEP_MS = 1000 / 120; // physics step at the finest grid (2px cells)
const BASE_DAMPING = 0.9925; // energy kept per base step
const SLOPE_GAIN = 3.2; // how strongly height differences tilt the surface
const SHININESS = 70;

// Light from the upper left, viewer straight above.
const LIGHT = (() => {
  const x = -0.55, y = -0.6, z = 0.58;
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
})();
const HALF = (() => {
  const x = LIGHT[0], y = LIGHT[1], z = LIGHT[2] + 1;
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
})();

const SPEC_LUT = (() => {
  const lut = new Float32Array(1024);
  for (let i = 0; i < 1024; i++) lut[i] = Math.pow(i / 1023, SHININESS);
  return lut;
})();

class WaterSurface {
  // options: damping (per step), spongeWidth (cells), slopeGain
  constructor(gw, gh, options) {
    this.damping = options.damping;
    this.spongeWidth = options.spongeWidth;
    this.slopeGain = options.slopeGain;
    this.resize(gw, gh);
  }

  resize(gw, gh) {
    this.gw = gw;
    this.gh = gh;
    const sponge = this.spongeWidth;
    this.cur = new Float32Array(gw * gh);
    this.next = new Float32Array(gw * gh);

    // Per-column / per-row damping that ramps up near the edges.
    const ramp = (n) => {
      const a = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const d = Math.min(i, n - 1 - i);
        const t = d < sponge ? 1 - d / sponge : 0;
        a[i] = 1 - 0.14 * t * t;
      }
      return a;
    };
    this.edgeX = ramp(gw);
    this.edgeY = ramp(gh);
    this.clear();
  }

  clear() {
    this.cur.fill(0);
    this.next.fill(0);
    this.x0 = this.gw;
    this.y0 = this.gh;
    this.x1 = -1;
    this.y1 = -1;
  }

  get active() {
    return this.x1 >= this.x0;
  }

  // Push the water by `amp` in a smooth round patch. `rings` > 0 makes the
  // patch oscillate (dip, lip, dip...) so it sends out a train of rings.
  addImpulse(gx, gy, amp, radius, rings = 0) {
    const { gw, gh, cur } = this;
    const r = Math.ceil(radius);
    const xa = Math.max(1, Math.floor(gx - r));
    const xb = Math.min(gw - 2, Math.ceil(gx + r));
    const ya = Math.max(1, Math.floor(gy - r));
    const yb = Math.min(gh - 2, Math.ceil(gy + r));
    if (xa > xb || ya > yb) return;

    for (let y = ya; y <= yb; y++) {
      for (let x = xa; x <= xb; x++) {
        const d = Math.hypot(x - gx, y - gy) / radius;
        if (d >= 1) continue;
        const bump = 0.5 * (1 + Math.cos(Math.PI * d));
        const wave = rings > 0 ? Math.cos(Math.PI * rings * d) : 1;
        cur[y * gw + x] += amp * bump * wave;
      }
    }

    this.x0 = Math.min(this.x0, xa - 1);
    this.y0 = Math.min(this.y0, ya - 1);
    this.x1 = Math.max(this.x1, xb + 1);
    this.y1 = Math.max(this.y1, yb + 1);
  }

  // One wave-equation step. Waves can't travel faster than 1 cell/step,
  // so the active box only has to grow by 1 cell each step.
  step() {
    const { gw, gh, edgeX, edgeY } = this;
    let cur = this.cur;
    let next = this.next;

    this.x0 = Math.max(1, this.x0 - 1);
    this.y0 = Math.max(1, this.y0 - 1);
    this.x1 = Math.min(gw - 2, this.x1 + 1);
    this.y1 = Math.min(gh - 2, this.y1 + 1);

    for (let y = this.y0; y <= this.y1; y++) {
      const rowDamp = this.damping * edgeY[y];
      let i = y * gw + this.x0;
      for (let x = this.x0; x <= this.x1; x++, i++) {
        next[i] =
          ((cur[i - 1] + cur[i + 1] + cur[i - gw] + cur[i + gw]) * 0.5 -
            next[i]) *
          (rowDamp * edgeX[x]);
      }
    }

    this.cur = next;
    this.next = cur;
  }

  // Turn the height field into lit pixels. Returns the largest wave height.
  shade(data) {
    const { gw, cur } = this;
    const x0 = Math.max(1, this.x0);
    const x1 = Math.min(gw - 2, this.x1);
    const y0 = Math.max(1, this.y0);
    const y1 = Math.min(this.gh - 2, this.y1);
    const [LX, LY, LZ] = LIGHT;
    const [HX, HY, HZ] = HALF;
    const gain = this.slopeGain;
    let maxAbs = 0;

    for (let y = y0; y <= y1; y++) {
      let i = y * gw + x0;
      for (let x = x0; x <= x1; x++, i++) {
        const o = i * 4;
        const h = cur[i];
        const ah = h < 0 ? -h : h;
        if (ah > maxAbs) maxAbs = ah;

        const sx = (cur[i + 1] - cur[i - 1]) * gain;
        const sy = (cur[i + gw] - cur[i - gw]) * gain;
        const s2 = sx * sx + sy * sy;

        if (s2 < 0.0004) {
          data[o + 3] = 0;
          continue;
        }

        const inv = 1 / Math.sqrt(1 + s2);
        const nl = (LZ - sx * LX - sy * LY) * inv;
        const nh = (HZ - sx * HX - sy * HY) * inv;
        const delta = nl - LZ;

        // Body shading: bright on the lit flank, dark on the shaded flank.
        let pr, pg, pb, A;
        if (delta < 0) {
          A = Math.min(0.5, -delta * 1.3);
          pr = 10 * A;
          pg = 38 * A;
          pb = 90 * A;
        } else {
          A = Math.min(0.5, delta * 1.3);
          pr = 215 * A;
          pg = 238 * A;
          pb = 255 * A;
        }

        // Cool sky-blue sheen wherever the surface is tilted.
        const tint = Math.min(0.16, s2 * 0.2);
        pr = 110 * tint + pr * (1 - tint);
        pg = 185 * tint + pg * (1 - tint);
        pb = 255 * tint + pb * (1 - tint);
        A = tint + A * (1 - tint);

        // Glossy highlight.
        if (nh > 0.8) {
          const spec = SPEC_LUT[(nh * 1023) | 0] * 1.6;
          const sa = spec > 0.9 ? 0.9 : spec;
          pr = 255 * sa + pr * (1 - sa);
          pg = 255 * sa + pg * (1 - sa);
          pb = 255 * sa + pb * (1 - sa);
          A = sa + A * (1 - sa);
        }

        if (A < 0.004) {
          data[o + 3] = 0;
          continue;
        }

        data[o] = pr / A;
        data[o + 1] = pg / A;
        data[o + 2] = pb / A;
        data[o + 3] = A * 255;
      }
    }

    return maxAbs;
  }
}

/* ------------------------------------------------------------------ */
/* Tuning (sizes are in CSS pixels)                                    */
/* ------------------------------------------------------------------ */
const IMPACT_AMPLITUDE = 2.4; // how hard the stone hits
const IMPACT_RADIUS = 40; // size of the crater
const IMPACT_RINGS = 1.8; // number of rings in the first wave train
const REBOUND_DELAY = 130; // ms until the water bounces back up
const REBOUND_AMPLITUDE = 1.1;
const REBOUND_RADIUS = 24;
const DROP_LANDING_AMPLITUDE = 0.14; // strength of a droplet's tiny ripple
const DROP_LANDING_RADIUS = 4.5;
const DROP_GRAVITY = 900; // px / s²
const MAX_STEPS_PER_FRAME = 4;
const REST_THRESHOLD = 0.03; // stop animating once the water is this calm

const WaterRipple = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // The waves are simulated on a coarse grid and drawn from this small
    // off-screen canvas, which the browser smooths when scaling up.
    const layer = document.createElement("canvas");
    const layerCtx = layer.getContext("2d");

    let width = 0;
    let height = 0;
    let cell = 2; // CSS pixels per simulation cell
    let gw = 0;
    let gh = 0;
    let surface = null;
    let image = null;
    let stepMs = BASE_STEP_MS;

    let frameId = null;
    let lastTime = 0;
    let accumulator = 0;
    let simTime = 0;
    let pending = []; // impulses that fire a little later (rebound)
    let drops = []; // flying droplets

    const stopAnimation = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
      lastTime = 0;
      accumulator = 0;
      simTime = 0;
      pending = [];
      drops = [];
      if (surface) surface.clear();
      if (image) image.data.fill(0);
      layerCtx.clearRect(0, 0, layer.width, layer.height);
      ctx.clearRect(0, 0, width, height);
    };

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      if (surface && nextWidth === width && nextHeight === height) return;

      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Bigger screens use bigger cells to keep the simulation cheap.
      cell = Math.min(
        4,
        Math.max(2, Math.ceil(Math.sqrt((width * height) / 400000)))
      );
      gw = Math.max(8, Math.ceil(width / cell));
      gh = Math.max(8, Math.ceil(height / cell));

      layer.width = gw;
      layer.height = gh;
      image = layerCtx.createImageData(gw, gh);

      // Keep wave speed, fade-out time and look the same for every cell size.
      stepMs = BASE_STEP_MS * (cell / 2);
      surface = new WaterSurface(gw, gh, {
        damping: Math.pow(BASE_DAMPING, stepMs / BASE_STEP_MS),
        spongeWidth: Math.round(52 / cell),
        slopeGain: (SLOPE_GAIN * 2) / cell,
      });

      stopAnimation();
    };

    // Physics step: waves, delayed impulses and droplets.
    const advance = () => {
      surface.step();
      simTime += stepMs;
      const dt = stepMs / 1000;

      for (let i = pending.length - 1; i >= 0; i--) {
        const p = pending[i];
        if (simTime >= p.time) {
          surface.addImpulse(p.gx, p.gy, p.amplitude, p.radius);
          pending.splice(i, 1);
        }
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.vz -= DROP_GRAVITY * dt;
        d.z += d.vz * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;

        if (d.z <= 0) {
          // Landing makes a small ripple of its own.
          surface.addImpulse(
            d.x / cell,
            d.y / cell,
            -DROP_LANDING_AMPLITUDE * (d.size / 2.7),
            DROP_LANDING_RADIUS / cell
          );
          drops.splice(i, 1);
        }
      }
    };

    const drawDrops = () => {
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const r = d.size;
        const sx = d.x;
        const sy = d.y - d.z;

        // Soft shadow on the water below the droplet.
        const shadowAlpha = 0.16 * Math.max(0, 1 - d.z / 70);
        if (shadowAlpha > 0.01) {
          ctx.fillStyle = `rgba(10, 40, 90, ${shadowAlpha})`;
          ctx.beginPath();
          ctx.ellipse(d.x, d.y, r * 1.15, r * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Glossy bead: bright glint, pale body, deeper blue edge.
        const bead = ctx.createRadialGradient(
          sx - r * 0.4,
          sy - r * 0.4,
          r * 0.1,
          sx,
          sy,
          r
        );
        bead.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        bead.addColorStop(0.5, "rgba(170, 215, 255, 0.8)");
        bead.addColorStop(1, "rgba(35, 90, 165, 0.8)");
        ctx.fillStyle = bead;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Light the height field and draw it, then the droplets on top.
    const render = () => {
      const maxHeight = surface.shade(image.data);

      const x0 = Math.max(0, surface.x0 - 1);
      const y0 = Math.max(0, surface.y0 - 1);
      const x1 = Math.min(gw - 1, surface.x1 + 1);
      const y1 = Math.min(gh - 1, surface.y1 + 1);
      const w = x1 - x0 + 1;
      const h = y1 - y0 + 1;

      ctx.clearRect(0, 0, width, height);

      if (w > 0 && h > 0) {
        layerCtx.putImageData(image, 0, 0, x0, y0, w, h);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          layer,
          x0,
          y0,
          w,
          h,
          x0 * cell,
          y0 * cell,
          w * cell,
          h * cell
        );
      }

      drawDrops();
      return maxHeight;
    };

    const frame = (time) => {
      frameId = null;

      const delta = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;
      accumulator += delta;

      let steps = 0;
      while (accumulator >= stepMs && steps < MAX_STEPS_PER_FRAME) {
        advance();
        accumulator -= stepMs;
        steps++;
      }
      if (accumulator > stepMs) accumulator = 0; // too far behind: skip ahead

      const maxHeight = render();

      if (
        maxHeight < REST_THRESHOLD &&
        pending.length === 0 &&
        drops.length === 0
      ) {
        stopAnimation(); // the water is calm again
        return;
      }

      frameId = requestAnimationFrame(frame);
    };

    const splash = (x, y) => {
      const gx = x / cell;
      const gy = y / cell;

      // The stone punches a crater and sends out a train of rings...
      surface.addImpulse(
        gx,
        gy,
        -IMPACT_AMPLITUDE,
        IMPACT_RADIUS / cell,
        IMPACT_RINGS
      );

      // ...then the water springs back up in the middle.
      pending.push({
        time: simTime + REBOUND_DELAY,
        gx,
        gy,
        amplitude: REBOUND_AMPLITUDE,
        radius: REBOUND_RADIUS / cell,
      });

      // A few droplets are thrown out and fall back in.
      const count = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 30 + Math.random() * 80;
        drops.push({
          x,
          y,
          z: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.8,
          vz: 140 + Math.random() * 160,
          size: 1.8 + Math.random() * 1.8,
        });
      }

      if (!frameId) {
        lastTime = 0;
        frameId = requestAnimationFrame(frame);
      }
    };

    const handlePointerDown = (event) => {
      if (event.button !== 0) return;
      splash(event.clientX, event.clientY);
    };

    resize();

    window.addEventListener("resize", resize);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerdown", handlePointerDown);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        pointerEvents: "none",
      }}
    />
  );
};

export default WaterRipple;
