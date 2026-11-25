/* Renders the whole site from content/site.js + content/projects/*.js.
   You shouldn't need to edit this file to add content. */
(function () {
  const PROJECTS = window.__PROJECTS || {};
  window.addProject = (p) => { PROJECTS[p.slug] = p; };

  const S = window.SITE;
  let app;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- load every project file listed in site.js ----------
  const slugs = [...S.tabs.digital.projects, ...S.tabs.physical.projects];
  let pending = slugs.length;
  if (window.__PROJECTS_INLINE) addEventListener("DOMContentLoaded", () => boot());
  else
  slugs.forEach((slug) => {
    const s = document.createElement("script");
    s.src = "content/projects/" + slug + ".js?v=" + (window.SITE_VERSION || "");
    s.onload = s.onerror = () => { if (--pending === 0) boot(); };
    document.head.appendChild(s);
  });

  // ---------- media: real image, or a labeled placeholder ----------
  function ph(src, ratio, label) {
    const r = (ratio || "16/10").replace("/", ":");
    return `<div class="ph" style="aspect-ratio:${esc(ratio || "16/10")}"><span><b>${esc(label || "Image")}</b>${esc(src || "add image path")} · ${esc(r)}</span></div>`;
  }
  // Go For It's designed cover, built live so it can animate: the title slides in from the left and the
  // three phones rise from the bottom each time it comes into view (see liveCovers()).
  const GFI = "assets/digital/gamify/";
  function liveCover(img) {
    if (img.live !== "gfi") return "";
    const ph = (c, f) => `<div class="gfi-ph ${c}"><img src="${GFI}screen-${f}.png" alt="" loading="lazy"></div>`;
    return `<div class="gfi-cover" role="img" aria-label="${esc(img.alt || "Go For It cover")}">
      <div class="gfi-t"><b>Go For It.</b><i>Gamify the Mundane Challenge</i></div>
      ${ph("l", "countdown")}${ph("m", "task")}${ph("r", "leaderboard")}</div>`;
  }
  function media(img, label) {
    if (img && img.live) return `<div class="media" style="aspect-ratio:16/10">${liveCover(img)}</div>`;
    if (!img) return ph("", "16/10", label);
    const ratio = img.ratio || "16/10";
    if (!img.src) return ph("", ratio, label);
    return `<div class="media" style="aspect-ratio:${esc(ratio)}"><img src="${esc(img.src)}" alt="${esc(img.alt || img.caption || "")}" loading="lazy"
      data-ratio="${esc(ratio)}" data-label="${esc(label || "Image")}" onerror="window.__ph(this)"></div>`;
  }
  // cover drawing (bob's line drawing, 2026-11-23): her raised hand waves gently every few seconds.
  // girl-draw.png packs the art: alpha = the line, green 128 = the waving arm, green 255 = a neckline dot
  // (red = which dot, for the rainbow), blue = the white shine in her eyes. Colours come from CSS so dark mode follows the page.
  function peekGirl(cv) {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth, h = img.naturalHeight;
      cv.width = w; cv.height = h;
      const o = document.createElement("canvas"); o.width = w; o.height = h;
      const oc = o.getContext("2d"); oc.drawImage(img, 0, 0);
      const src = oc.getImageData(0, 0, w, h).data;
      const layer = () => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
      const body = layer(), arm = layer();
      const rgb = (v) => { const x = String(v).trim();
        if (x[0] === "#") return [1, 3, 5].map((k) => parseInt(x.slice(k, k + 2), 16) || 0);
        return (x.match(/\d+/g) || [0, 0, 0]).slice(0, 3).map(Number); };
      const paintLayers = () => {
        const cs = getComputedStyle(cv), ink = rgb(cs.color), hl = rgb(cs.getPropertyValue("--pg-hl") || "#fff");
        const rainbow = ["--s-pink", "--s-yellow", "--s-purple", "--s-blue"].map((v) => rgb(cs.getPropertyValue(v) || "#888"));
        const bd = body.getContext("2d").createImageData(w, h), ad = arm.getContext("2d").createImageData(w, h);
        for (let j = 0; j < src.length; j += 4) {
          const a = src[j + 3]; if (!a) continue;
          const g = src[j + 1], isDot = g > 200, isArm = g > 100 && g <= 200, b = src[j + 2] / 255;
          let c = isDot ? rainbow[(Math.max(1, src[j]) - 1) % 4] : ink;
          c = [0, 1, 2].map((k) => c[k] + (hl[k] - c[k]) * b);
          const t = isArm ? ad.data : bd.data;
          t[j] = c[0]; t[j + 1] = c[1]; t[j + 2] = c[2]; t[j + 3] = a;
        }
        body.getContext("2d").putImageData(bd, 0, 0); arm.getContext("2d").putImageData(ad, 0, 0);
      };
      const ctx = cv.getContext("2d"), px = 0.25 * w, py = 0.4886 * h; // pivot where the arm meets her side
      const draw = (deg) => {
        ctx.clearRect(0, 0, w, h); ctx.drawImage(body, 0, 0);
        ctx.save(); ctx.translate(px, py); ctx.rotate((deg * Math.PI) / 180); ctx.translate(-px, -py); ctx.drawImage(arm, 0, 0); ctx.restore();
      };
      paintLayers(); draw(0);
      matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => setTimeout(() => { paintLayers(); draw(0); }, 30));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // two small waves (about 1.4s), then a longer pause; eased in and out so it never snaps (toned down 2026-11-23)
      const t0 = performance.now() + 700;
      const step = (now) => {
        if (!cv.isConnected) return;
        const t = ((now - t0) / 1000) % 7;
        const env = t > 0 && t < 1.4 ? Math.sin((Math.PI * t) / 1.4) : 0;
        draw(-4 * env * Math.sin((2 * Math.PI * t) / 0.7));
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    img.src = cv.dataset.src;
  }
  // floorplan flip (Statler before plan): click, tap, Enter or Space turns it over
  const planFlip = (f) => { const on = f.classList.toggle("flipped"); f.setAttribute("aria-pressed", on); f.closest("figure")?.classList.toggle("pf-on", on); };
  document.addEventListener("click", (e) => { const f = e.target.closest && e.target.closest(".plan-flip, .pf-hint"); if (f) planFlip(f.classList.contains("pf-hint") ? f.closest("figure").querySelector(".plan-flip") : f); });
  document.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.classList?.contains("plan-flip")) { e.preventDefault(); planFlip(e.target); } });
  // flip cards: tap to flip on touch screens (hover and keyboard focus are handled in CSS)
  document.addEventListener("click", (e) => {
    const f = e.target.closest && e.target.closest(".flip");
    if (f && !e.target.closest("a") && matchMedia("(hover: none)").matches) f.classList.toggle("flipped");
  });
  // lightbox for tiles: click a tile to see the whole piece; click anywhere or press Esc to close
  document.addEventListener("click", (e) => {
    const t = e.target.closest && e.target.closest(".art-btn");
    if (!t) return;
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", t.dataset.title || "Artwork");
    box.innerHTML = `<figure><img src="${t.dataset.full}" alt="${t.dataset.title || ""}">${t.dataset.title ? `<figcaption>${t.dataset.title}</figcaption>` : ""}</figure><button class="lb-x" type="button" aria-label="Close">×</button>`;
    const close = () => { box.classList.remove("on"); setTimeout(() => box.remove(), 250); document.removeEventListener("keydown", esc); t.focus(); };
    const esc = (k) => { if (k.key === "Escape") close(); };
    box.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    document.body.appendChild(box);
    requestAnimationFrame(() => box.classList.add("on"));
    box.querySelector(".lb-x").focus();
  });
  window.__ph = (el) => {
    const box = el.parentElement;
    box.outerHTML = ph(el.getAttribute("src"), el.dataset.ratio, el.dataset.label);
  };
  const isPlaceholder = (t) => /^\[.*\]$/.test(String(t || "").trim());
  const txt = (t) => `<span${isPlaceholder(t) ? ' class="muted"' : ""}>${esc(t)}</span>`;

  // ---------- chrome ----------
  // Same bar as the overview screens (brand left, plain mono links right), kept on screen while the page scrolls
  function header(active) {
    const tab = (id, label) => `<a href="#${id}"${active === id ? ' class="on" aria-current="page"' : ""}>${label}</a>`;
    return `<header class="ph-bar is-page"><a class="brand" href="#" data-home="0">${esc(S.name)}</a>
      <nav class="mono" aria-label="Sections">${tab("digital", esc(S.tabs.digital.label))}${tab("physical", esc(S.tabs.physical.label))}${tab("about", "About")}</nav></header>`;
  }
  const footer = () => `<footer><div class="wrap mono muted">
    <span>${esc(S.name)} · ${esc(S.role)}</span><span>${esc(S.email)}</span></div></footer>`;

  // ---------- views ----------
  function indexList(tabId) {
    return S.tabs[tabId].projects.filter((s) => PROJECTS[s]).map((s) => {
      const p = PROJECTS[s];
      // "locked": shown as In progress, not clickable
      const tag = p.locked ? "span" : "a";
      return `<li${p.locked ? ' class="locked"' : ""}><${tag} ${p.locked ? 'aria-disabled="true"' : `href="#${p.slug}"`} data-cover="${esc(p.cover?.src || "")}" data-ratio="${esc(p.cover?.ratio || "16/10")}">
        <span class="t"><canvas class="seal" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas>${esc(p.title)}</span><span class="k mono muted">${esc(p.kicker)}</span>
        <span class="y mono muted">${p.locked ? "In progress" : esc(p.year)}</span><span class="arrow">${p.locked ? "" : "→"}</span></${tag}></li>`;
    }).join("");
  }

  // Home is a stack of full-screen phases: cover → Design → Art & Making. Each swipe/scroll swooshes to the next,
  // and one more past Art & Making goes to the About page.
  let homePhase = 0;
  function home() {
    const parts = S.name.trim().split(" ");
    const last = parts.length > 1 ? parts.pop() : "";
    const card = (p) => `<a class="pcard" href="#${p.slug}"><div class="pc-img"><img src="${esc(p.cover?.src || "")}" alt="${esc(p.title)} cover" loading="lazy"></div>
        <div class="pc-meta"><b>${esc(p.title)}</b><span class="mono muted">${esc(p.year)}</span></div>
        <span class="mono muted pc-k">${esc(p.kicker)}</span></a>`;
    // Design screen: Go For It as the big featured piece, the other two side by side underneath.
    // Each shows only its details (tags · year), and Go For It fades in first.
    const featured = (id, n) => {
      const t = S.tabs[id], list = t.projects.map((s) => PROJECTS[s]).filter((p) => p && !p.locked);
      const [hero, ...rest] = list;
      const img = (p) => `<div class="pc-img">${p.cover?.live ? liveCover(p.cover) : `<img src="${esc(p.cover?.src || "")}" alt="${esc(p.title)} cover">`}</div>`;
      const det = (p) => `<span class="mono muted">${esc(p.tags || p.kicker).replace(/\n/g, "<br>")}${p.noYearDot ? " " : " · "}${esc(p.year)}</span>`;
      return `<section class="phase ph-work ph-${id}" aria-label="${esc(t.label)}"><div class="ph-in feat">
        <div class="ph-head" style="--o:0"><h2>${esc(t.label)}</h2><span class="mono muted">0${n} / 02</span></div>
        <a class="f-hero" href="#${hero.slug}" style="--o:0">${img(hero)}<div class="f-txt">
          <h3>${esc(hero.title)}</h3>${det(hero)}<span class="cta mono"><i>→</i>View case study</span></div></a>
        <div class="f-row">${rest.map((p, k) => `<a class="f-sm" href="#${p.slug}" style="--o:${k + 1}">${img(p)}<div>
          <h4>${esc(p.title)}</h4>${det(p)}</div></a>`).join("")}</div>
      </div></section>`;
    };
    const phase = (id, n) => {
      const t = S.tabs[id], list = t.projects.map((s) => PROJECTS[s]).filter((p) => p && !p.locked);
      const head = (cls) => `<div class="ph-head${cls}"><h2>${esc(t.label)}</h2><p>${esc(t.blurb)}</p><span class="mono muted">0${n} / 02</span></div>`;
      // an odd number of projects: the title takes the first (top-left) cell of the grid instead of sitting on top
      const inCell = list.length % 2 === 1;
      return `<section class="phase ph-work ph-${id}" aria-label="${esc(t.label)}"><div class="ph-in">
        ${inCell ? "" : head("")}
        <div class="pgrid">${inCell ? head(" cell") : ""}${list.map(card).join("")}</div></div></section>`;
    };
    return `<main class="view phases">
      <section class="phase home cover2" aria-label="Cover">
        <canvas class="streams" id="streams" aria-hidden="true"></canvas>
        <nav class="cover-nav mono" aria-label="Sections"><a href="#digital" data-go="1">Work</a><a href="#about" data-go="3">About</a></nav>
        <div class="hero">
          <h1 class="name"><span class="hi">Hi, I'm</span><span class="nm">${parts.map((w) => `<span>${esc(w)}</span>`).join("")}${last ? `<span>${esc(last)}</span>` : ""}</span></h1>
          <p class="tagline">${txt(S.tagline)}</p>
          <div class="facts"><span class="dot"></span>${esc(S.school)}</div>
        </div>
        <a class="scroll-cue mono" href="#" data-go="1"><i></i>Scroll to see my work</a>
        <canvas class="peek-girl" data-src="assets/girl-draw.png?v=202611231210d" aria-hidden="true"></canvas>
      </section>
      ${featured("digital", 1)}
      ${phase("physical", 2)}
      <section class="phase ph-about" aria-label="About">${aboutBody()}${footer()}</section>
      <div class="ph-bar"><a class="brand" href="#" data-go="0">${esc(S.name)}</a>
        <nav class="mono" aria-label="Sections"><a href="#digital" data-go="1">${esc(S.tabs.digital.label)}</a><a href="#physical" data-go="2">${esc(S.tabs.physical.label)}</a><a href="#about" data-go="3">About</a></nav></div>
      <nav class="ph-dots" aria-label="Screens">${["Cover", S.tabs.digital.label, S.tabs.physical.label, "About"].map((l, k) => `<a href="#" data-go="${k}" aria-label="${esc(l)}"><i></i><span class="mono">${esc(l)}</span></a>`).join("")}</nav>
    </main>`;
  }

  let phasesOff = null;
  function phases() {
    if (phasesOff) { phasesOff(); phasesOff = null; }
    const root = document.querySelector(".phases");
    document.documentElement.classList.toggle("phased", !!root);
    if (!root) return;
    const els = [...root.querySelectorAll(".phase")], last = els.length - 1;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, DUR = reduce ? 200 : 750;
    let i = Math.min(homePhase, last), busy = false;
    const set = (n) => {
      i = n; homePhase = n;
      els.forEach((e, k) => { e.classList.toggle("is-past", k < n); e.classList.toggle("is-cur", k === n); e.classList.toggle("is-next", k > n); if (k !== n) e.classList.remove("is-peek", "play"); e.inert = k !== n; });
      // "play" starts the entrance animations (Design text slides in, Go For It cover builds); a swipe adds it
      // part-way through the slide, otherwise it's added as the screen arrives
      const cur = els[n]; if (!cur.classList.contains("play")) requestAnimationFrame(() => requestAnimationFrame(() => { if (i === n) cur.classList.add("play"); }));
      root.dataset.phase = n;
      root.querySelectorAll("[data-go]").forEach((a) => a.classList.toggle("on", +a.dataset.go === n));
    };
    // project screens: shrink the cards until the screen fits without scrolling (desktop only)
    const fit = (k = i) => {
      const el = els[k]; if (!el.classList.contains("ph-work")) return;
      const g = el.querySelector(".pgrid"); if (!g) return; g.style.removeProperty("--cw");
      if (innerWidth <= 760) return;
      for (let j = 0; j < 12 && el.scrollHeight > el.clientHeight; j++) {
        const w = g.firstElementChild.getBoundingClientRect().width; g.style.setProperty("--cw", Math.floor(w * 0.96) + "px");
      }
    };
    const onResize = () => fit();
    addEventListener("resize", onResize);
    const HASH = ["", "digital", "physical", "about"];
    const land = (n) => {
      set(n);
      history.replaceState(null, "", HASH[n] ? "#" + HASH[n] : location.pathname + location.search);
      document.title = (n ? ["", S.tabs.digital.label, S.tabs.physical.label, "About"][n] + " · " : "") + S.name;
    };
    const afterMove = () => { busy = false; const d = pending; pending = 0; if (d && edge(d)) go(i + d); };
    // can the current screen still scroll in this direction? then let it scroll first
    const edge = (dir) => { const e = els[i]; return dir > 0 ? e.scrollTop + e.clientHeight >= e.scrollHeight - 12 : e.scrollTop <= 12; };

    // --- Motion: every move between neighbouring screens runs on one requestAnimationFrame loop ---
    // drag.t is where the swipe wants the slide to be (0 = this screen, 1 = the next one); drag.v is what's
    // shown, eased toward t each frame so uneven trackpad/wheel input still moves smoothly. Only transform and
    // opacity change. Letting go hands over to a timed ease from the exact spot shown, and the screens' classes
    // are swapped only once the slide has fully arrived, so nothing jumps at the hand-off.
    const SNAP = reduce ? 200 : 520, FULL = reduce ? 200 : 720;
    let drag = null, anim = null, raf = 0;
    const SCRUB = () => Math.max(360, innerHeight * 0.5); // wheel distance for a full screen change
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    const SH = "0 -24px 60px -20px rgba(30,25,60,.22)"; // soft edge on the screen sliding over
    const paint = () => {
      const { dir, a, b, v } = drag;
      if (v > 0.35 && !b.classList.contains("play")) b.classList.add("play");
      if (dir > 0) { a.style.transform = `translate3d(0,${-12 * v}%,0)`; a.style.opacity = 1 - 0.4 * v; b.style.transform = `translate3d(0,${100 * (1 - v)}%,0)`; }
      else { a.style.transform = `translate3d(0,${100 * v}%,0)`; b.style.transform = `translate3d(0,${-12 * (1 - v)}%,0)`; b.style.opacity = 0.6 + 0.4 * v; }
    };
    const loop = (now) => {
      raf = 0; if (!drag) return;
      if (anim) {
        const k = Math.min(1, (now - anim.start) / anim.dur);
        drag.v = anim.from + (anim.to - anim.from) * easeOut(k); paint();
        if (k >= 1) { finish(anim.to === 1); return; }
      } else {
        drag.v += (drag.t - drag.v) * 0.3;
        if (Math.abs(drag.t - drag.v) < 0.0005) drag.v = drag.t;
        paint();
        if (drag.v === drag.t) return;
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const begin = (dir) => {
      const n = i + dir; if (busy || drag || n < 0 || n > last) return false;
      const a = els[i], b = els[n];
      b.scrollTop = 0; fit(n);
      b.classList.add("is-peek"); // the incoming screen shows fully formed while it slides
      [a, b].forEach((e) => { e.style.transition = "none"; e.style.visibility = "visible"; e.style.willChange = "transform, opacity"; });
      (dir > 0 ? b : a).style.boxShadow = SH;
      drag = { dir, a, b, n, t: 0, v: 0 }; anim = null; busy = true;
      return true;
    };
    const scrub = (t) => { drag.t = Math.min(1, Math.max(0, t)); kick(); };
    const settleTo = (commit, dur) => {
      if (!drag) return;
      const to = commit ? 1 : 0, dist = Math.abs(to - drag.v);
      anim = { from: drag.v, to, start: performance.now(), dur: dur || Math.max(200, SNAP * Math.sqrt(dist)) };
      drag.t = to; kick();
    };
    const finish = (commit) => {
      const d = drag; drag = null; anim = null; if (raf) { cancelAnimationFrame(raf); raf = 0; }
      els.forEach((e) => { e.style.transition = "none"; });
      [d.a, d.b].forEach((e) => { e.style.transform = ""; e.style.opacity = ""; e.style.boxShadow = ""; e.style.visibility = ""; e.style.willChange = ""; });
      if (commit) land(d.n); else d.b.classList.remove("is-peek", "play");
      void root.offsetHeight; // apply the final classes with no transition, then turn transitions back on
      requestAnimationFrame(() => els.forEach((e) => { e.style.transition = ""; }));
      afterMove();
    };
    // jump straight to a screen (nav, dots, keys, mouse wheel clicks): neighbours slide on the same loop
    const go = (n) => {
      if (busy || n < 0 || n > last || n === i) return;
      if (Math.abs(n - i) === 1) { if (begin(n - i)) settleTo(true, FULL); return; }
      busy = true; els[n].scrollTop = 0; fit(n); land(n);
      setTimeout(afterMove, DUR);
    };
    set(i); fit();

    // Wheel / trackpad
    // - the first few px are a dead zone, so a tiny accidental nudge does nothing
    // - after that the slide follows the scroll; once the scroll stops it settles to the nearer screen
    //   (past a third of the way, or a quick flick, finishes it)
    // - if it's sliding back and you swipe again, it catches the slide where it is and keeps following
    // - reaching the next screen ends the gesture: leftover trackpad momentum is swallowed, so it can't skip two
    // - a NEW swipe is recognised by a short pause, a change of direction, or the scroll speeding up again
    // - a classic mouse wheel click just moves one screen
    // - if a gesture scrolled the About page's own content, it stops at the edge; the next gesture moves on
    const WHEEL_MIN = 45, QUIET = 170, SPEEDUP_AFTER = 300, SETTLE = 150, DEAD = 6;
    let lastT = 0, swallow = false, moved = false, acc = 0, lastDir = 0, fireT = 0, lo = Infinity, pending = 0, peak = 0, settleT = null;
    els.forEach((el) => el.addEventListener("scroll", () => { if (!busy) moved = true; }, { passive: true }));
    const endGesture = (now) => { swallow = true; acc = 0; fireT = now; lo = Infinity; };
    const fire = (dir) => {
      endGesture(performance.now());
      if (busy) { pending = dir; return; }
      go(i + dir);
    };
    const settle = () => {
      settleT = null; if (!drag || anim) return;
      const c = (drag.damp || 1) < 1 ? drag.t > 0.5 : drag.t > 0.33 || (peak >= 30 && drag.t > 0.06);
      settleTo(c); if (c) endGesture(performance.now());
    };
    const follow = (e, dy, mag, now) => {
      e.preventDefault(); peak = Math.max(peak, mag);
      scrub(drag.t + (dy * drag.dir * (drag.damp || 1)) / SCRUB());
      clearTimeout(settleT); settleT = null;
      if (drag.t >= 1) { settleTo(true); endGesture(now); return; }
      settleT = setTimeout(settle, SETTLE);
    };
    const onWheel = (e) => {
      const now = performance.now(), gap = now - lastT; lastT = now;
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1);
      if (!dy) return;
      const dir = dy > 0 ? 1 : -1, mag = Math.abs(dy);
      if (drag && !anim) { lastDir = dir; follow(e, dy, mag, now); return; }
      if (drag && anim && anim.to === 0) { // sliding back: catch it and keep following
        anim = null; drag.t = drag.v; peak = mag; swallow = false; lastDir = dir; follow(e, dy, mag, now); return;
      }
      // is this the start of a new swipe?
      const sped = swallow && now - fireT > SPEEDUP_AFTER && mag > lo * 2 + 10;
      if (gap > QUIET || dir !== lastDir || sped) { swallow = false; moved = false; acc = 0; lo = Infinity; }
      lastDir = dir;
      if (swallow) { e.preventDefault(); if (now - fireT > 120) lo = Math.min(lo, mag); return; }
      if (busy) { // a screen is still arriving: count this swipe, run it right after (at most one)
        e.preventDefault();
        if (Math.sign(acc) !== dir) acc = 0;
        acc += dy; if (Math.abs(acc) >= WHEEL_MIN) fire(dir);
        return;
      }
      if (!edge(dir)) { acc = 0; return; } // let the page's own content scroll
      e.preventDefault();
      if (e.deltaMode !== 0 || (acc === 0 && gap > QUIET && mag >= 90)) { fire(dir); return; } // mouse wheel click
      if (Math.sign(acc) !== dir) acc = 0;
      acc += dy;
      if (Math.abs(acc) < DEAD) return;
      // a gesture that has just scrolled a long page (About, a tall Art & Making) to its edge carries straight on
      // into the slide like any other, but damped, so leftover momentum only peeks and a real push finishes it
      if (begin(dir)) { drag.damp = moved ? 0.3 : 1; peak = mag; scrub(((Math.abs(acc) - DEAD) * drag.damp) / SCRUB()); acc = 0; settleT = setTimeout(settle, SETTLE); }
    };

    // Touch: from the top/bottom edge of a screen's content, the next/previous screen follows the finger.
    // Let go past ~30% (or flick) and it finishes; otherwise it slides back (and can be caught again).
    let y0 = null, x0 = 0, okUp = false, okDown = false, ty = 0, tt = 0, tv = 0;
    const onStart = (e) => {
      const y = e.touches[0].clientY;
      y0 = ty = y; x0 = e.touches[0].clientX; tt = performance.now(); tv = 0;
      okDown = edge(1); okUp = edge(-1);
      if (drag && anim && anim.to === 0) { anim = null; drag.t = drag.v; y0 = y + drag.dir * (drag.v * innerHeight + 10); }
    };
    const onMove = (e) => {
      if (y0 == null) return;
      const y = e.touches[0].clientY, dy = y0 - y, dx = Math.abs(x0 - e.touches[0].clientX), now = performance.now();
      if (now > tt) { tv = 0.6 * tv + 0.4 * ((ty - y) / (now - tt)); ty = y; tt = now; }
      if (drag && anim) { e.preventDefault(); return; }
      if (!drag) {
        if (busy) return;
        const dir = dy > 0 ? 1 : -1;
        const ok = (dir > 0 && okDown && edge(1)) || (dir < 0 && okUp && edge(-1));
        if (!ok) return;
        e.preventDefault(); // at an edge, stop the page rubber-banding so the swipe reads as a screen change
        if (Math.abs(dy) < 10 || dx > Math.abs(dy)) return;
        if (!begin(dir)) return;
      }
      e.preventDefault();
      scrub((dy * drag.dir - 10) / innerHeight);
    };
    const onEnd = () => {
      if (y0 == null) return; y0 = null;
      if (performance.now() - tt > 100) tv = 0; // held still before letting go: not a flick
      if (drag && !anim) settleTo(drag.t > 0.3 || tv * drag.dir > 0.45);
    };
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key) && edge(1)) { e.preventDefault(); go(i + 1); }
      else if (["ArrowUp", "PageUp"].includes(e.key) && edge(-1)) { e.preventDefault(); go(i - 1); }
    };
    const onClick = (e) => {
      const a = e.target.closest("[data-go]"); if (!a || !root.contains(a)) return;
      e.preventDefault(); const n = +a.dataset.go; if (n === i) return;
      if (drag) return; busy = false; pending = 0; go(n);
    };
    addEventListener("wheel", onWheel, { passive: false });
    addEventListener("touchstart", onStart, { passive: true });
    addEventListener("touchmove", onMove, { passive: false });
    addEventListener("touchend", onEnd, { passive: true });
    addEventListener("touchcancel", onEnd, { passive: true });
    addEventListener("keydown", onKey);
    root.addEventListener("click", onClick);
    phasesOff = () => { removeEventListener("wheel", onWheel); removeEventListener("touchstart", onStart); removeEventListener("touchend", onEnd); removeEventListener("touchcancel", onEnd); removeEventListener("touchmove", onMove); removeEventListener("resize", onResize); removeEventListener("keydown", onKey); };
  }
  // the name in the top bar always starts home from the cover
  document.addEventListener("click", (e) => { if (e.target.closest?.('a.brand[data-home="0"]')) homePhase = 0; });

  function tabView(id) {
    const t = S.tabs[id];
    const cards = t.projects.filter((s) => PROJECTS[s]).map((s) => {
      const p = PROJECTS[s];
      if (p.locked) return `<div class="card locked" aria-disabled="true"><div class="lock-wrap">${media(p.cover, p.title + " cover")}<span class="lock-badge mono">In progress</span></div>
        <div class="card-meta"><h3><canvas class="seal" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas>${esc(p.title)}</h3><span class="mono muted">Coming soon</span></div>
        <span class="mono muted">${esc(p.kicker)}</span>${p.blurb ? `<p>${esc(p.blurb)}</p>` : ""}</div>`;
      return `<a class="card" href="#${p.slug}">${media(p.cover, p.title + " cover")}
        <div class="card-meta"><h3><canvas class="seal" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas>${esc(p.title)}</h3><span class="mono muted">${esc(p.year)}</span></div>
        <span class="mono muted">${esc(p.kicker)}</span><p>${esc(p.blurb || p.summary)}</p></a>`;
    }).join("");
    return header(id) + `<main class="view"><section class="wrap tab-head">
      <h1>${esc(t.label)}</h1><p>${esc(t.blurb)}</p>
      <canvas class="field strip" data-field="${id}" aria-hidden="true"></canvas></section>
      <section class="wrap grid">${cards}</section></main>` + footer();
  }

  function section(s) {
    switch (s.type) {
      case "text":
        return `<div class="s-text"><h2>${esc(s.heading || "")}</h2><p>${txt(s.body)}</p></div>`;
      case "image": {
        const fig = `<figure${s.maxWidth ? ` style="max-width:${esc(s.maxWidth)}${s.center ? ";margin-inline:auto;text-align:center" : ""}"` : ""}>${media(s, s.caption)}${s.caption ? `<figcaption class="mono">${esc(s.caption)}</figcaption>` : ""}</figure>`;
        return s.heading ? `<div class="s-block"><h2>${esc(s.heading)}</h2>${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}${fig}</div>` : fig;
      }
      case "pair":
        // two sections side by side (e.g. two images with their own headings)
        return `<div class="pair"${s.cols ? ` style="--pair-cols:${s.cols.split(" ").map((r) => { const [w, h] = r.split("/").map(Number); return (w / (h || 1)).toFixed(3) + "fr"; }).join(" ")}"` : ""}>${s.items.map((it) => `<div>${section(it)}</div>`).join("")}</div>`;
      case "gallery":
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}
          <div class="gallery ${s.justify ? "just" : "c" + (s.columns === 3 ? 3 : 2)}">${s.images.map((im) =>
            `<figure${s.justify ? ` style="flex:${(([a, b]) => (+a / (+b || 1)) || 1)(String(im.ratio || "1").split("/"))} 1 0"` : ""}>${media(im, im.caption)}${im.caption ? `<figcaption class="mono">${esc(im.caption)}</figcaption>` : ""}</figure>`).join("")}</div></div>`;
      case "stats":
        return `<div class="stats">${s.items.map((i) => `<div class="stat"><span class="mono muted">${esc(i.label)}</span><b>${esc(i.value)}</b></div>`).join("")}</div>`;
      case "rows":
        // text on the left, image on the right, one row per item, all in one section (Statler before/after plans)
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}
          <div class="rows">${s.items.map((it) => `<div class="row"><div class="row-txt">${it.label ? `<span class="mono muted">${esc(it.label)}</span>` : ""}${it.title ? `<h3>${esc(it.title)}</h3>` : ""}${it.body ? `<p>${txt(it.body)}</p>` : ""}${it.points ? `<ul class="row-pts">${it.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</div>
            <figure>${it.back
              // "back": click (or tap) the image to flip it over to a second image, e.g. the annotated version
              ? `<div class="plan-flip" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(it.flipLabel || "Flip image")}"><div class="pf-in"><div class="pf-front">${media(it, it.caption || it.title)}</div><div class="pf-back">${media(it.back, it.back.alt || it.title)}</div></div></div>
                <span class="pf-hint mono"><span class="pf-a">${esc(it.flipHint || "Click to flip")}</span><span class="pf-b">${esc(it.flipBackHint || "Click to flip back")}</span></span>`
              : media(it, it.caption || it.title)}${it.caption ? `<figcaption class="mono">${esc(it.caption)}</figcaption>` : ""}</figure></div>`).join("")}</div></div>`;
      case "split": {
        // one main image on the left, a column of small images (e.g. sketches) on the right
        const cap = (im) => im.caption ? `<figcaption class="mono">${esc(im.caption)}</figcaption>` : "";
        // sideFirst: one sketch on the left, main on the right, both full (uncropped) at the same height
        if (s.sideFirst && s.side?.length === 1) {
          const r = (x) => { const [w, h] = String(x || "4/3").split("/").map(Number); return w / (h || 1); };
          const sk = s.side[0];
          return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}
          <div class="split-pair" style="grid-template-columns: ${r(sk.ratio).toFixed(4)}fr ${r(s.main.ratio).toFixed(4)}fr"><figure>${media(sk, sk.caption)}${cap(sk)}</figure><figure>${media(s.main, s.main.caption)}${cap(s.main)}</figure></div></div>`;
        }
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}
          <div class="split"><figure class="split-main">${media(s.main, s.main.caption)}${cap(s.main)}</figure>
          <div class="split-side">${(s.side || []).map((im) => `<figure>${media(im, im.caption)}${cap(im)}</figure>`).join("")}</div></div></div>`;
      }
      case "embed":
        // a live page in a frame, e.g. the clickable prototype in proto/
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}
          <div class="embed"><iframe src="${esc(s.src)}" title="${esc(s.title || s.heading || "Prototype")}" loading="lazy"></iframe>${s.aside ? `<div class="embed-aside">${s.aside.map((a) => `<div><span class="mono muted">${esc(a.label)}</span><p>${txt(a.body)}</p></div>`).join("")}</div>` : ""}</div></div>`;
      case "screens": {
        // phone screens with their explanation beside each one
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}<div class="screens${s.wide ? " wide" : ""}">${s.items.map((it, i) => `<div class="screen-note">
          <figure>${media({ src: it.src, ratio: it.ratio || "390/844", alt: it.title }, it.title)}</figure>
          <div class="sn-text"><span class="sn-tag mono">${esc(it.label || String.fromCharCode(65 + i))}</span><h3>${esc(it.title)}</h3><p>${txt(it.body)}</p>
          ${it.points ? `<ul>${it.points.map((pt) => `<li>${txt(pt)}</li>`).join("")}</ul>` : ""}</div></div>`).join("")}</div></div>`;
      }
      case "collage": {
        // mood board: cut-out pieces placed by x/y/w (percent of the board), tilted by r degrees
        const pieces = s.items.map((it, i) => `<figure class="piece${it.kind ? " " + it.kind : ""}" style="--x:${it.x}%;--y:${it.y}%;--w:${it.w}%;--r:${it.r || 0}deg;z-index:${it.z || i + 1}">
          ${it.tape ? `<span class="tape" aria-hidden="true"></span>` : ""}<img src="${esc(it.src)}" alt="${esc(it.label)}" loading="lazy" decoding="async">
          <figcaption><b>${esc(it.label)}</b>${it.note ? `<span>${esc(it.note)}</span>` : ""}</figcaption></figure>`).join("");
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}<div class="collage" style="--ratio:${s.ratio || "16/10"}">${pieces}</div></div>`;
      }
      case "tiles": {
        // artwork as square pinned previews; click opens the full piece (see lightbox below)
        // per item: pos = which part stays in the square crop (CSS object-position), fit: "contain" = show the whole piece on a white mat
        const cols = Math.min(s.columns || s.items.length, 4);
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}<div class="art-tiles" style="--n:${cols}">${s.items.map((it, i) => {
          const tilt = [-1.6, 1.2, -0.8, 1.6, -1.2][i % 5];
          return `<figure class="art-tile" style="--r:${tilt}deg"><button class="art-btn" type="button" data-full="${esc(it.src)}" data-title="${esc(it.title || "")}" aria-label="View ${esc(it.title || "artwork")} full size">
            <img src="${esc(it.src)}" alt="${esc(it.alt || it.title || "")}" loading="lazy" style="object-fit:${it.fit === "contain" ? "contain" : "cover"};object-position:${esc(it.pos || "50% 50%")}${it.fit === "contain" ? ";padding:6%" : ""}"></button>
            ${it.title ? `<figcaption>${esc(it.title)}</figcaption>` : ""}</figure>`;
        }).join("")}</div></div>`;
      }
      case "cols":
        // short labeled lists side by side (e.g. lighting layers)
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}<div class="cols">${s.items.map((it) => `<div class="col"><h3>${esc(it.title)}</h3><ul>${it.points.map((pt) => `<li>${txt(pt)}</li>`).join("")}</ul></div>`).join("")}</div></div>`;
      case "brief":
        {
          const dl = `<dl class="brief">${s.items.map((i) => `<div><dt class="mono">${esc(i.label)}:</dt><dd${i.para ? ' class="brief-p"' : ""}>${i.points ? `<ul class="brief-pts">${i.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : esc(i.value)}</dd></div>`).join("")}</dl>`;
          return s.heading ? `<div class="s-block"><h2>${esc(s.heading)}</h2>${s.intro ? `<p class="s-intro">${txt(s.intro)}</p>` : ""}${dl}</div>` : dl;
        }
      case "figma": {
        const body = s.url
          ? `<iframe class="figma-frame" src="https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(s.url)}" allowfullscreen loading="lazy" title="Figma prototype"></iframe>
             <p class="mono"><a href="${esc(s.url)}" target="_blank" rel="noopener">Open in Figma ↗</a></p>`
          : ph("paste Figma share link into this project file", "16/10", "Figma prototype");
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}${body}</div>`;
      }
      case "video":
        return s.src
          ? `<figure><video src="${esc(s.src)}" controls playsinline style="width:100%"></video>${s.caption ? `<figcaption class="mono">${esc(s.caption)}</figcaption>` : ""}</figure>`
          : ph("", s.ratio || "16/9", "Video");
      default: return "";
    }
  }

  // Sections that share a "group" name are wrapped together and slide in as one chunk on scroll.
  function sectionsHTML(list) {
    const out = []; let n = 0;
    for (let i = 0; i < list.length; ) {
      const g = list[i].group;
      if (!g) { out.push(`<div class="grp solo">${section(list[i])}</div>`); i++; continue; }
      const items = []; while (i < list.length && list[i].group === g) items.push(list[i++]);
      n++;
      out.push(`<div class="grp"><div class="grp-head"><span class="mono">${String(n).padStart(2, "0")}</span><span class="grp-t">${esc(g)}</span></div>
        ${items.map((s, k) => `<div class="grp-item" style="--k:${k}">${section(s)}</div>`).join("")}</div>`);
    }
    return out.join("");
  }

  // stand-in poster for a film until a real poster image is added: title set in type on the film's colors
  function titleCard(im, ratio) {
    const m = /^(.*?)\s*\((\d{4})\)$/.exec(im.card || im.caption || "") || [0, im.card || im.caption || "", ""];
    const [c1, c2, ink] = im.tint;
    return `<div class="title-card" style="aspect-ratio:${esc(ratio)};--c1:${esc(c1)};--c2:${esc(c2)};--tc:${esc(ink || "#fff")}" role="img" aria-label="${esc(im.caption || "")}">
      <b>${esc(m[1])}</b>${m[2] ? `<span>${esc(m[2])}</span>` : ""}</div>`;
  }

  function project(p) {
    const list = S.tabs[p.tab].projects.filter((s) => PROJECTS[s] && (!PROJECTS[s].locked || s === p.slug));
    const next = PROJECTS[list[(list.indexOf(p.slug) + 1) % list.length]];
    const spec = [["Role", p.role], ["Tools", p.tools], ["Year", p.year]]
      .map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${txt(v)}</dd></div>`).join("");
    return header(p.tab) + `<main class="view project-view">
      <section class="wrap p-head">
        <a class="crumb mono muted" href="#${p.tab}">← ${esc(S.tabs[p.tab].label)}</a>
        <span class="mono muted">${esc(p.kicker)}</span>
        <div class="p-intro"><div class="p-title"><span class="dot p-dot" aria-hidden="true"></span><canvas class="seal big" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas><h1>${esc(p.title)}</h1></div><p class="summary">${txt(p.summary)}</p>${p.hint ? `<span class="p-hint mono muted">${esc(p.hint)}</span>` : ""}</div>
      </section>
      <section class="wrap"><dl class="spec">${spec}</dl>${p.heroVideo ? `<div class="media hero-video" style="aspect-ratio:${esc(p.heroVideo.ratio || "16/9")}"><video src="${esc(p.heroVideo.src)}"${p.heroVideo.poster ? ` poster="${esc(p.heroVideo.poster)}"` : ""} autoplay muted loop playsinline preload="auto" aria-label="${esc(p.heroVideo.alt || p.title + " video")}"></video></div>` : p.hideCover ? "" : p.sideBrief ? `<div class="cover-brief">${media(p.cover, "Cover image")}<div class="cb-txt">${section(p.sideBrief)}</div></div>` : media(p.cover, "Cover image")}</section>
      <section class="wrap sections">${sectionsHTML(p.sections || [])}</section>
      <section class="wrap proj-end">
        <a class="back-all" href="#${p.tab}"><span class="mono muted">Done with this one?</span><span class="t">← Back</span></a>
        ${next && next.slug !== p.slug ? `<a class="next-sm mono" href="#${next.slug}">Next project: ${esc(next.title)} →</a>` : ""}
      </section>
    </main>` + footer();
  }

  function aboutBody() {
    const emails = (S.emails || [{ label: "Email", address: S.email }]).map((e, i) => `<li><div class="row">
        <span class="k">${esc(e.label)}</span><span class="v" id="email-${i}">${esc(e.address)}</span>
        <button class="copy copy-ic" type="button" data-copy="${i}" aria-label="Copy ${esc(e.address)}" title="Copy"><svg class="ic-copy" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><rect x="8.5" y="8.5" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 5.5v-.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><svg class="ic-check" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></li>`).join("");
    const links = S.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">
        <span class="k">${esc(l.label)}</span><span class="v">${esc(l.handle || "")}</span><span>↗</span></a></li>`).join("");
    // "hidden: true" keeps a board saved in content/site.js without showing it
    const shown = (S.board || []).filter((b) => !b.hidden);
    const boards = shown.map((b, bi) => `<div class="pin-board${b.half ? " half" : ""}">
        <div class="pin-head"><span class="mono muted">${String(bi + 1).padStart(2, "0")}</span><h2>${esc(b.title)}</h2></div>
        <div class="pins${b.items.some((im) => im.back) ? " flips" : ""}" style="--n:${Math.min(b.items.length, 4)}">${b.items.map((im, i) => {
          const tilt = [-3, 2.2, -1.4, 3, -2.4, 1.6][(i + bi) % 6];
          const fix = (i + bi) % 2 ? `<span class="tape" aria-hidden="true"></span>` : `<canvas class="seal pin" data-seal="#${[237623, 245496, 110919, 142549][(i + bi) % 4]}" data-colors="${["1,1,1,3", "soft", "soft", "0,1"][(i + bi) % 4]}" aria-hidden="true"></canvas>`;
          return `<figure class="pinned ${b.shape || ""}${b.hand ? " hand" : ""}" style="--r:${tilt}deg">${fix}${(() => {
            const pic = !im.src && im.tint ? titleCard(im, im.ratio || b.ratio || "2/3") : media({ src: im.src, ratio: im.ratio || b.ratio || "4/5", alt: im.caption }, im.caption || b.title);
            // "back": the card flips on hover (tap on phones) to show this text
            if (im.review) {
              const m = String(im.caption || "").match(/^(.*?)\s*\((\d{4})\)$/) || [0, im.caption || "", ""];
              const stars = "★".repeat(Math.floor(im.stars || 0)) + (im.stars % 1 ? "½" : "");
              return `<div class="flip" tabindex="0" aria-label="${esc(m[1] + ": " + (im.stars || 0) + " stars. " + im.review)}"><div class="flip-in"><div class="flip-front">${pic}</div><div class="flip-back lb">
                <div class="lb-top"><span class="lb-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="lb-src">Letterboxd</span></div>
                <span class="lb-by">Review by Michelle</span>
                <b class="lb-title">${esc(m[1])} <span>${esc(m[2])}</span></b>
                <span class="lb-stars" aria-hidden="true">${stars}</span>
                <p>${txt(im.review)}</p>
                <span class="lb-foot">Imported from Letterboxd</span></div></div></div>`;
            }
            return im.back ? `<div class="flip" tabindex="0" aria-label="${esc((im.caption || "") + ": " + im.back)}"><div class="flip-in"><div class="flip-front">${pic}</div><div class="flip-back"><b>${esc(im.card || im.caption || "")}</b><p>${txt(im.back)}</p>${im.link ? `<a class="flip-link" href="${esc(im.link)}" target="_blank" rel="noopener">${esc(im.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))} ↗</a>` : ""}</div></div></div>` : pic;
          })()}${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ""}</figure>`;
        }).join("")}</div>${b.note ? `<span class="pin-note">${esc(b.note)}</span>` : ""}</div>`);
    // boards marked "half" sit two to a row (side by side) instead of each taking a full row
    let board = "";
    for (let i = 0; i < boards.length; i++) {
      const b = shown[i];
      if (b.half && shown[i + 1]?.half) { board += `<div class="pin-pair">${boards[i]}${boards[i + 1]}</div>`; i++; }
      else board += boards[i];
    }
    const snaps = (S.portrait || []).map((im, i) => `<figure class="snap snap-${i + 1}">${media({ src: im.src, ratio: im.ratio || "4/5", alt: im.label }, im.label)}</figure>`).join("");
    return `<section class="wrap about about-v3">
      <div class="about-text"><div class="about-dots" aria-hidden="true"><i></i><i></i><i></i></div><div class="about-marks" aria-hidden="true"><canvas class="seal mark" data-seal="michelle" data-colors="0,1"></canvas><canvas class="seal mark" data-seal="#237623" data-colors="1,1,1,3" data-scale="0.82"></canvas><canvas class="seal mark" data-seal="#245496" data-colors="soft" data-scale="0.62"></canvas></div><span class="mono muted">About</span><h1>Hi, I'm ${esc(S.name.split(" ")[0])}!</h1>
        ${String(S.about || "").split(/\n\s*\n/).map((para) => `<p>${txt(para)}</p>`).join("")}
        <ul class="links mono">${emails}${links}</ul>
        <div class="resume" id="resume-slot">
          <div><span class="mono muted">Resume</span><b>Michelle Choi · Resume</b><span class="muted small" id="resume-note">Coming soon</span></div>
          <a class="resume-btn mono" id="resume-btn" href="${esc(S.resume)}" target="_blank" rel="noopener" aria-disabled="true">View PDF ↗</a>
        </div></div>
      <div class="snaps">${snaps}</div>
    </section>
    ${board ? `<section class="wrap bulletin"><div class="b-title"><span class="mono muted">Off the clock</span><h2>Bulletin Board</h2></div>${board}</section>` : ""}`;
  }

  // ---------- router (plain #name hashes) ----------
  // home: as "Selected work" scrolls up, the cover recedes (moves up a little, shrinks, fades) underneath it
  let shiftOff = null;
  function coverShift() {
    if (shiftOff) { shiftOff(); shiftOff = null; }
    if (document.querySelector(".phases")) return;
    const home = document.querySelector(".home");
    if (!home || !matchMedia("(min-width: 901px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, scrollY / home.offsetHeight));
      const e = p * p * (3 - 2 * p);
      home.style.transform = `translateY(${-e * 8}vh) scale(${1 - e * 0.08})`;
      home.style.opacity = String(1 - e * 0.65);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", onScroll, { passive: true });
    update();
    shiftOff = () => removeEventListener("scroll", onScroll);
  }

  function render() {
    const h = decodeURIComponent(location.hash.slice(1));
    let html;
    const PH = { digital: 1, physical: 2, about: 3 };
    if (h in PH) { homePhase = PH[h]; html = home(); }
    else if (PROJECTS[h] && PROJECTS[h].locked) { location.replace("#" + PROJECTS[h].tab); return; }
    else if (PROJECTS[h]) html = project(PROJECTS[h]);
    else { if (!h) homePhase = 0; html = home(); }
    app.innerHTML = html;
    document.title = (PROJECTS[h]?.title ? PROJECTS[h].title + " · " : "") + S.name;
    window.scrollTo(0, 0);
    wire();
    phases();
    liveCovers();
    coverShift();
    fitIntro();
  }

  // animated covers play when at least ~40% is on screen, and reset once fully off screen so they replay
  let coverIO = null;
  function liveCovers() {
    if (coverIO) coverIO.disconnect();
    const els = [...document.querySelectorAll(".gfi-cover")].filter((e) => !e.closest(".phases")); if (!els.length) return; // home screens use the phase's play class
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("play")); return; }
    coverIO = new IntersectionObserver((list) => list.forEach((en) => {
      if (en.intersectionRatio >= 0.4) en.target.classList.add("play");
      else if (!en.isIntersecting) en.target.classList.remove("play");
    }), { threshold: [0, 0.4] });
    els.forEach((e) => coverIO.observe(e));
  }

  // project intro paragraph: right edge lines up with the end of the big title
  function fitIntro() {
    const intro = document.querySelector(".p-intro");
    if (!intro) return;
    const h1 = intro.querySelector("h1"), sum = intro.querySelector(".summary");
    if (!h1 || !sum) return;
    const set = () => {
      sum.style.maxWidth = "";
      const r = document.createRange(); r.selectNodeContents(h1);
      const right = r.getBoundingClientRect().right - intro.getBoundingClientRect().left;
      sum.style.maxWidth = Math.max(right, Math.min(560, intro.clientWidth)) + "px";
    };
    set();
    document.fonts?.ready.then(set);
  }
  window.addEventListener("resize", () => fitIntro());

  function reveal() {
    const items = document.querySelectorAll(".grp > *, .pin-board");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) return;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("reveal-on");
    items.forEach((el) => el.classList.add("rv"));
    // everything that enters in the same moment slides in one after another, top to bottom
    const io = new IntersectionObserver((es) => {
      es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((e, i) => { e.target.style.transitionDelay = (i * (rm ? 80 : 140)) + "ms"; e.target.classList.add("in"); io.unobserve(e.target); });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
    // fast scrolls can jump right past a section: show anything already above the screen
    const passed = () => items.forEach((el) => { if (!el.classList.contains("in") && el.getBoundingClientRect().bottom < 0) { el.style.transitionDelay = "0ms"; el.classList.add("in"); io.unobserve(el); } });
    addEventListener("scroll", passed, { passive: true });
  }

  function wire() {
    reveal();
    if (window.Glyphs) {
      document.querySelectorAll("canvas[data-seal]").forEach((c) => Glyphs.seal(c, c.dataset.seal, c.dataset.colors === "soft" ? "soft" : c.dataset.colors ? c.dataset.colors.split(",").map(Number) : null));
      const cfg = {
        left: { seed: 7, cell: 20, soft: true, edge: "left" }, right: { seed: 31, cell: 20, soft: true, edge: "right" },
        digital: { seed: 11, cell: 13, colors: [0, 1] }, physical: { seed: 23, cell: 13, colors: [1, 3] }, about: { seed: 5, cell: 13, colors: [1, 3] }
      };
      document.querySelectorAll("canvas[data-field]").forEach((c) => Glyphs.field(c, cfg[c.dataset.field] || { seed: 3 }));
      const bg = document.getElementById("home-bg");
      if (bg && matchMedia("(min-width: 901px)").matches) {
        const home = bg.parentElement;
        const rel = (el) => { const r = el.getBoundingClientRect(), o = home.getBoundingClientRect(); return { left: r.left - o.left, right: r.right - o.left, top: r.top - o.top, bottom: r.bottom - o.top }; };
        Glyphs.field(bg, { seed: 53, cell: 20, soft: true, corners: {
          reach: 110,
          side: () => home.querySelector(".side").getBoundingClientRect().width,
          avoid: () => [rel(home.querySelector(".stage")), rel(home.querySelector(".scroll-cue"))]
        } });
      }
      const st = document.getElementById("streams");
      if (st && Glyphs.streams) Glyphs.streams(st, { count: 3 }); // 3 columns of dots, not 4 (bob 2026-11-24)
      const pg = document.querySelector(".peek-girl[data-src]");
      if (pg) peekGirl(pg);
      const orb = document.getElementById("orb");
      if (orb) Glyphs.orb(orb);
    }
    document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => {
      const el = document.getElementById("email-" + b.dataset.copy);
      navigator.clipboard?.writeText(el.textContent).then(() => { b.classList.add("done"); b.title = "Copied"; setTimeout(() => { b.classList.remove("done"); b.title = "Copy"; }, 1600); }).catch(() => {
        const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      });
    }));
    const rb = document.getElementById("resume-btn");
    if (rb) fetch(S.resume, { method: "HEAD" }).then((r) => {
      if (r.ok) { rb.removeAttribute("aria-disabled"); document.getElementById("resume-slot").classList.add("ready"); document.getElementById("resume-note").textContent = "PDF · opens in a new tab"; }
    }).catch(() => {});
    const btn = document.getElementById("copy-email");
    if (btn) btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(S.email).then(() => { btn.textContent = "Copied"; }).catch(() => {
        const r = document.createRange(); r.selectNodeContents(document.getElementById("email"));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      });
    });
    // hover preview of the cover on the home index
    const peek = document.querySelector(".peek");
    if (!peek) return;
    document.querySelectorAll(".index a").forEach((a) => {
      a.addEventListener("mouseenter", () => { peek.innerHTML = media({ src: a.dataset.cover, ratio: a.dataset.ratio }, "Cover"); peek.classList.add("on"); });
      a.addEventListener("mouseleave", () => peek.classList.remove("on"));
      a.addEventListener("mousemove", (e) => { peek.style.left = e.clientX + 150 + "px"; peek.style.top = e.clientY + "px"; });
    });
  }

  function boot() {
    app = document.getElementById("app");
    window.addEventListener("hashchange", render);
    // intro animation plays once, on first open (see "intro" in style.css)
    document.documentElement.classList.add("intro");
    render();
    setTimeout(() => document.documentElement.classList.remove("intro"), 1400);
  }
})();
