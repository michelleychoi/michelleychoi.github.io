/* Generative graphics for the site:
   - Glyphs.field(canvas, opts): a grid of small symmetric glyphs whose density "breathes" and swells near the cursor
   - Glyphs.seal(canvas, text):  one larger glyph generated from a word (each project gets its own mark)
   - Glyphs.orb(canvas):         a halftone dot sphere with a slowly moving light
   No libraries. Colors come from CSS variables, so they follow light/dark mode. */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function rng(seed) {
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hash(str) { let h = 2166136261; for (const c of String(str)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
  function palette() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    return { ink: v("--ink"), c: [v("--g-yellow"), v("--g-magenta"), v("--accent"), v("--g-purple")],
      soft: [v("--s-yellow"), v("--s-pink"), v("--s-blue"), v("--s-purple")], paper: v("--paper") };
  }

  // Draw one glyph centered at 0,0 with radius r.
  function drawGlyph(ctx, r, seed, colors, ink) {
    const R = rng(seed);
    const n = [4, 4, 6, 8, 8, 12][Math.floor(R() * 6)];
    const main = colors[Math.floor(R() * colors.length)];
    const second = R() < 0.45 ? ink : colors[Math.floor(R() * colors.length)];
    const layers = 1 + Math.floor(R() * 3);
    ctx.lineCap = "round";
    for (let L = 0; L < layers; L++) {
      const col = L === 1 ? second : main;
      const kind = Math.floor(R() * 5);
      const d = r * (0.25 + R() * 0.55);
      const s = r * (0.12 + R() * 0.28);
      const off = R() < 0.5 ? 0 : Math.PI / n;
      ctx.fillStyle = ctx.strokeStyle = col;
      ctx.lineWidth = Math.max(1, r * 0.11);
      for (let i = 0; i < n; i++) {
        ctx.save(); ctx.rotate(off + (i * 2 * Math.PI) / n);
        ctx.beginPath();
        if (kind === 0) { ctx.ellipse(d * 0.7, 0, d * 0.55, s * 0.6, 0, 0, Math.PI * 2); ctx.fill(); }          // petal
        else if (kind === 1) { ctx.arc(d, 0, s * 0.55, 0, Math.PI * 2); ctx.fill(); }                          // dot
        else if (kind === 2) { ctx.moveTo(r * 0.18, 0); ctx.lineTo(d + s, 0); ctx.stroke(); }                  // ray
        else if (kind === 3) { ctx.rect(d - s * 0.5, -s * 0.5, s, s); ctx.fill(); }                           // square
        else { ctx.arc(d * 0.8, 0, s * 0.6, 0, Math.PI * 2); ctx.lineWidth = Math.max(1, r * 0.07); ctx.stroke(); } // ring
        ctx.restore();
      }
    }
    if (R() < 0.6) { ctx.beginPath(); ctx.arc(0, 0, r * (0.08 + R() * 0.12), 0, Math.PI * 2); ctx.fillStyle = R() < 0.5 ? ink : main; ctx.fill(); }
  }

  function sprites(count, px, colorsFor, ink, seedBase) {
    const out = [];
    for (let i = 0; i < count; i++) {
      const c = document.createElement("canvas");
      c.width = c.height = Math.ceil(px * DPR);
      const g = c.getContext("2d");
      g.scale(DPR, DPR); g.translate(px / 2, px / 2);
      drawGlyph(g, px * 0.46, seedBase + i * 7919, colorsFor(i), ink);
      out.push(c);
    }
    return out;
  }

  const running = new Set();
  function loop(t) { running.forEach((f) => f(t)); if (running.size) requestAnimationFrame(loop); }
  function start(f) { const was = running.size; running.add(f); if (!was) requestAnimationFrame(loop); }

  function field(canvas, opts = {}) {
    const cell = opts.cell || 22;
    const seedBase = opts.seed || 1;
    let pal = palette(), sp, w = 0, h = 0, cols = 0, rows = 0, cells = [];
    const ctx = canvas.getContext("2d");
    const pointer = { x: -9999, y: -9999 };

    function build() {
      pal = palette();
      const colors = opts.colors ? opts.colors.map((i) => pal.c[i]) : pal.c;
      sp = opts.soft
        ? sprites(48, cell * 2, () => pal.soft, pal.soft[3], seedBase)
        : sprites(48, cell * 2, (i) => (i % 5 === 0 ? [pal.ink] : colors), pal.ink, seedBase);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * DPR); canvas.height = Math.round(h * DPR);
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
      const R = rng(seedBase);
      cells = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)
        cells.push({ x: (x + 0.5) * cell, y: (y + 0.5) * cell, s: Math.floor(R() * sp.length), j: R() });
      if (opts.onCount) opts.onCount(cells.length);
      draw(performance.now());
    }

    function draw(t) {
      const T = reduce ? 4000 : t;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const k = T / 1000;
      for (const c of cells) {
        const wave = Math.sin(c.x * 0.011 + k * 0.55) * Math.cos(c.y * 0.017 - k * 0.4) + Math.sin((c.x + c.y) * 0.006 - k * 0.3);
        let v = 0.5 + wave * 0.35 + (c.j - 0.5) * 0.5;
        const dx = c.x - pointer.x, dy = c.y - pointer.y, d2 = dx * dx + dy * dy;
        const near = d2 < 160 * 160 ? 1 - Math.sqrt(d2) / 160 : 0;
        v += near * 0.6;
        if (v < 0.32) continue;
        const scale = Math.min(1, 0.35 + (v - 0.32) * 2.2) * (0.9 + near * 0.9);
        const size = cell * 2 * 0.5 * scale;
        ctx.drawImage(sp[c.s], c.x - size / 2, c.y - size / 2, size, size);
      }
    }

    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
    const tick = (t) => { if (!canvas.isConnected) { running.delete(tick); return; } if (visible && !document.hidden) draw(t); };
    canvas.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; if (reduce) draw(0); });
    canvas.addEventListener("pointerleave", () => { pointer.x = pointer.y = -9999; if (reduce) draw(0); });
    new ResizeObserver(() => build()).observe(canvas);
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", build);
    build();
    if (!reduce) start(tick);
  }

  function seal(canvas, text) {
    const pal = palette();
    const px = canvas.clientWidth || 48;
    canvas.width = canvas.height = Math.ceil(px * DPR);
    const g = canvas.getContext("2d");
    g.scale(DPR, DPR); g.translate(px / 2, px / 2);
    drawGlyph(g, px * 0.47, hash(text), pal.c, pal.ink);
  }

  function orb(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, pal;
    function size() { const r = canvas.getBoundingClientRect(); w = r.width; h = r.height; canvas.width = w * DPR; canvas.height = h * DPR; pal = palette(); }
    function draw(t) {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.44, cx = w / 2, cy = h / 2, step = Math.max(5, R / 18);
      const a = (reduce ? 1 : t / 2600);
      const L = [Math.cos(a) * 0.7, -0.5, Math.sin(a) * 0.7 + 0.5];
      const ln = Math.hypot(...L); L[0] /= ln; L[1] /= ln; L[2] /= ln;
      ctx.fillStyle = pal.ink;
      for (let y = -R; y <= R; y += step) for (let x = -R; x <= R; x += step) {
        const d = x * x + y * y; if (d > R * R) continue;
        const z = Math.sqrt(R * R - d);
        const lit = Math.max(0, (x * L[0] + y * L[1] + z * L[2]) / R);
        const dot = (1 - lit) * step * 0.62;
        if (dot < 0.3) continue;
        ctx.beginPath(); ctx.arc(cx + x, cy + y, dot, 0, Math.PI * 2); ctx.fill();
      }
    }
    size(); draw(0);
    new ResizeObserver(() => { size(); draw(performance.now()); }).observe(canvas);
    const tick = (t) => { if (!canvas.isConnected) { running.delete(tick); return; } if (!document.hidden) draw(t); };
    if (!reduce) start(tick);
  }

  window.Glyphs = { field, seal, orb, hash };
})();
