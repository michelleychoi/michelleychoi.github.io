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
      {
        // edge mode: the two columns nearest the page edge stay a full grid, the rest scatter and thin out toward the center
        const edge = h > w ? opts.edge : null; // only when the strip runs down the side of the page
        const k = edge ? x : -1;
        const px = edge === "right" ? w - (k + 0.5) * cell : (x + 0.5) * cell;
        const s0 = Math.floor(R() * sp.length), j = R(), keep = R(), jx = R() - 0.5, jy = R() - 0.5;
        // t runs 0 at the edge to 1 at the inner side of the strip; density, jitter and size all ease along it
        const t = k >= 1 ? Math.min(1, (k - 1) / Math.max(1, cols - 2)) : 0;
        const p = Math.pow(1 - t, 1.7);
        if (k >= 2 && keep > p) continue;
        const spread = k >= 0 ? t * cell * 1.1 : 0;
        const f = k >= 0 ? 1 - t * 0.4 : 1;
        if (opts.corners) {
          // corner mode: a light scatter fanning out from the four corners, kept off the side strips and the content
          const cx = (x + 0.5) * cell, cy = (y + 0.5) * cell, side = opts.corners.side();
          if (cx < side || cx > w - side) continue;
          const dc = Math.min(Math.hypot(cx - side, cy), Math.hypot(w - side - cx, cy), Math.hypot(cx - side, h - cy), Math.hypot(w - side - cx, h - cy));
          const cp = Math.max(0, 1 - dc / (opts.corners.reach * 2.6));
          if (keep > Math.pow(cp, 2) * 0.75) continue;
          if (opts.corners.avoid().some((r) => cx > r.left - 40 && cx < r.right + 40 && cy > r.top - 40 && cy < r.bottom + 40)) continue;
          cells.push({ x: cx + jx * cell * 0.9, y: cy + jy * cell * 0.9, s: s0, j, f: 0.6 + cp * 0.35, b: 0.05 + cp * 0.2 });
          continue;
        }
        cells.push({ x: px + jx * spread, y: (y + 0.5) * cell + jy * spread, s: s0, j, f, b: k < 0 ? 0 : 0.1 + 0.25 * p });
      }
      if (opts.onCount) opts.onCount(cells.length);
      draw(performance.now());
    }

    function draw(t) {
      const T = reduce ? 4000 : t;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const k = T / 1000 * 0.6;
      for (const c of cells) {
        const wave = Math.sin(c.x * 0.011 + k * 0.55) * Math.cos(c.y * 0.017 - k * 0.4) + Math.sin((c.x + c.y) * 0.006 - k * 0.3);
        let v = 0.5 + wave * 0.35 + (c.j - 0.5) * 0.5;
        const dx = c.x - pointer.x, dy = c.y - pointer.y, d2 = dx * dx + dy * dy;
        const near = d2 < 160 * 160 ? 1 - Math.sqrt(d2) / 160 : 0;
        v += near * 0.6 + (c.b || 0);
        if (v < 0.32) continue;
        const scale = Math.min(1, 0.35 + (v - 0.32) * 2.2) * (0.9 + near * 0.9);
        const size = cell * 2 * 0.5 * scale * (c.f || 1);
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

  function seal(canvas, text, pick) {
    const pal = palette();
    if (pick === "soft") { pal.c = pal.soft; pal.ink = pal.soft[3]; } // the side-graphics palette
    else if (pick) { const cs = pick.map((i) => pal.c[i]); pal.c = cs; pal.ink = cs[cs.length - 1]; } // only these colors, no black
    const px = canvas.clientWidth || 48;
    canvas.width = canvas.height = Math.ceil(px * DPR);
    const g = canvas.getContext("2d");
    g.scale(DPR, DPR); g.translate(px / 2, px / 2);
    drawGlyph(g, px * 0.47 * (Number(canvas.dataset.scale) || 1), String(text).startsWith("#") ? Number(String(text).slice(1)) : hash(text), pal.c, pal.ink);
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

  // Glyphs.streams(canvas): a few columns of glyphs flowing down like lines of code, each one gently breathing.
  // On narrow screens (canvas wider than tall) the streams run sideways instead.
  function streams(canvas, opts = {}) {
    const ctx = canvas.getContext("2d");
    let W, H, across, sprites = [], cols = [], dotCols = [];
    const dots = opts.dots ?? true; // dots mode (bob's pick 2026-11-19): soft coloured dots instead of the flower glyphs
    function build() {
      const r = canvas.getBoundingClientRect(); W = r.width; H = r.height; across = W > H;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      const pal = palette(), soft = pal.soft, px = 30;
      sprites = []; dotCols = soft;
      for (let i = 0; i < 40; i++) {
        const c = document.createElement("canvas"); c.width = c.height = Math.ceil(px * DPR);
        const g = c.getContext("2d"); g.scale(DPR, DPR); g.translate(px / 2, px / 2);
        drawGlyph(g, px * 0.46, 977 + i * 7919, soft, soft[3]); sprites.push(c);
      }
      const R = rng(opts.seed || 42), n = opts.count || 4;
      cols = Array.from({ length: n }, (_, k) => {
        // dots: one even spacing in every column and no empty slots (bob 2026-11-21: the gaps looked uneven)
        const size = [22, 16, 19, 13][k % 4], gap = dots ? 34 : size * (1.9 + R() * 0.5), speed = [15, 24, 11, 19][k % 4];
        const len = Math.ceil(((across ? W : H) + 400) / gap) + 2;
        const cells = Array.from({ length: len }, () => (!dots && R() < 0.2 ? -1 : Math.floor(R() * sprites.length)));
        return { k, size, gap, speed, cells, len, phase: R() * 10 };
      });
    }
    // hover: glyphs near the pointer swell and breathe deeper; the stream keeps flowing
    let mx = -1e4, my = -1e4, tx = -1e4, ty = -1e4, near = 0, nearTarget = 0;
    const onMove = (e) => {
      if (!canvas.isConnected) return removeEventListener("pointermove", onMove);
      const r = canvas.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (mx < -1e3) { mx = tx; my = ty; }
      nearTarget = tx > -60 && tx < W + 60 && ty > -60 && ty < H + 60 ? 1 : 0;
    };
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", () => { nearTarget = 0; });
    function draw(t) {
      if (!canvas.isConnected) { running.delete(draw); return; }
      const s = reduce ? 0 : t / 1000, span = across ? H : W, along = across ? W : H;
      near += (nearTarget - near) * 0.06;
      if (tx > -1e3) { mx += (tx - mx) * 0.18; my += (ty - my) * 0.18; }
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
      cols.forEach((c) => {
        const lane = ((c.k + 0.5) * span) / cols.length, total = c.len * c.gap, off = (s * c.speed) % total;
        for (let i = 0; i < c.len; i++) {
          const id = c.cells[i]; if (id < 0) continue;
          const p = ((i * c.gap + off) % total) - c.gap; if (p < -c.gap || p > along + c.gap) continue;
          const edge = Math.min(1, Math.max(0, p / (along * 0.16)), Math.max(0, (along - p) / (along * 0.16)));
          const x = across ? p : lane, y = across ? lane : p;
          // hover: a soft, eased swell around the pointer. The breathing keeps its own steady rhythm
          // (changing its speed made glyphs jump), it just breathes a little deeper near the pointer.
          const d = Math.hypot(x - mx, y - my), r = Math.max(0, 1 - d / 130);
          const f = near * r * r * (3 - 2 * r); // smoothstep
          const wave = Math.sin(s * 1.3 + i * 0.55 + c.phase);
          if (dots) {
            // dots: one size, each slowly fading in and out on its own rhythm (a gentle breath, not a blink)
            const fade = 0.5 + 0.5 * Math.sin(s * 0.9 + i * 1.7 + c.k * 2.3 + c.phase);
            const br = 0.96 + (0.04 + f * 0.08) * wave;
            const rad = 3.3 * br * (1 + f * 0.7);
            ctx.globalAlpha = Math.min(1, edge * 0.85 * (0.45 + 0.55 * fade + f * 0.35));
            ctx.fillStyle = dotCols[id % dotCols.length]; ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.fill();
          } else {
            const breathe = 0.78 + (0.22 + f * 0.1) * wave;
            const sz = c.size * breathe * (1 + f * 0.75);
            ctx.globalAlpha = Math.min(1, edge * (0.55 + 0.45 * breathe + f * 0.4));
            ctx.drawImage(sprites[id], x - sz / 2, y - sz / 2, sz, sz);
          }
        }
      });
      ctx.globalAlpha = 1;
    }
    build();
    let rt = 0;
    const onResize = () => { if (!canvas.isConnected) return removeEventListener("resize", onResize); clearTimeout(rt); rt = setTimeout(() => { build(); if (reduce) draw(0); }, 120); };
    addEventListener("resize", onResize);
    if (reduce) draw(0); else start(draw);
  }

  window.Glyphs = { field, seal, orb, streams, hash, draw: drawGlyph };
})();
