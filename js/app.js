/* Renders the whole site from content/site.js + content/projects/*.js.
   You shouldn't need to edit this file to add content. */
(function () {
  const PROJECTS = window.__PROJECTS || {};
  window.addProject = (p) => { PROJECTS[p.slug] = p; };

  const S = window.SITE;
  let app;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- load every project file listed in site.js ----------
  const slugs = [...S.tabs.physical.projects, ...S.tabs.digital.projects];
  let pending = slugs.length;
  if (window.__PROJECTS_INLINE) addEventListener("DOMContentLoaded", () => boot());
  else
  slugs.forEach((slug) => {
    const s = document.createElement("script");
    s.src = "content/projects/" + slug + ".js";
    s.onload = s.onerror = () => { if (--pending === 0) boot(); };
    document.head.appendChild(s);
  });

  // ---------- media: real image, or a labeled placeholder ----------
  function ph(src, ratio, label) {
    const r = (ratio || "16/10").replace("/", ":");
    return `<div class="ph" style="aspect-ratio:${esc(ratio || "16/10")}"><span><b>${esc(label || "Image")}</b>${esc(src || "add image path")} · ${esc(r)}</span></div>`;
  }
  function media(img, label) {
    if (!img) return ph("", "16/10", label);
    const ratio = img.ratio || "16/10";
    if (!img.src) return ph("", ratio, label);
    return `<div class="media" style="aspect-ratio:${esc(ratio)}"><img src="${esc(img.src)}" alt="${esc(img.alt || img.caption || "")}" loading="lazy"
      data-ratio="${esc(ratio)}" data-label="${esc(label || "Image")}" onerror="window.__ph(this)"></div>`;
  }
  window.__ph = (el) => {
    const box = el.parentElement;
    box.outerHTML = ph(el.getAttribute("src"), el.dataset.ratio, el.dataset.label);
  };
  const isPlaceholder = (t) => /^\[.*\]$/.test(String(t || "").trim());
  const txt = (t) => `<span${isPlaceholder(t) ? ' class="muted"' : ""}>${esc(t)}</span>`;

  // ---------- chrome ----------
  function header(active) {
    const tab = (id, label) => `<a href="#${id}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`;
    return `<header class="bar"><div class="wrap">
      <a class="brand" href="#">${esc(S.name)}</a>
      <nav class="tabs" aria-label="Sections">${tab("physical", "Physical")}${tab("digital", "Digital")}${tab("about", "About")}</nav>
      <div class="status mono"><span class="dot"></span>Open to internships</div>
    </div></header>`;
  }
  const footer = () => `<footer><div class="wrap mono muted">
    <span>${esc(S.name)} · ${esc(S.role)}</span><span>${esc(S.email)}</span></div></footer>`;

  // ---------- views ----------
  function indexList(tabId) {
    return S.tabs[tabId].projects.filter((s) => PROJECTS[s]).map((s) => {
      const p = PROJECTS[s];
      return `<li><a href="#${p.slug}" data-cover="${esc(p.cover?.src || "")}" data-ratio="${esc(p.cover?.ratio || "16/10")}">
        <span class="t"><canvas class="seal" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas>${esc(p.title)}</span><span class="k mono muted">${esc(p.kicker)}</span>
        <span class="y mono muted">${esc(p.year)}</span><span class="arrow">→</span></a></li>`;
    }).join("");
  }

  function home() {
    const parts = S.name.trim().split(" ");
    const last = parts.length > 1 ? parts.pop() : "";
    const count = (t) => S.tabs[t].projects.filter((s) => PROJECTS[s]).length;
    const tile = (href, n, label, sub, field) => `<a class="tile" href="#${href}">
        <span class="art glyph"><canvas class="seal" data-seal="${field.seal}" data-colors="${field.colors}" data-scale="${field.scale || 1}" aria-hidden="true"></canvas></span>
        <span class="lbl"><span class="mono muted">${n}</span><b>${label}</b><span class="mono muted">${sub} →</span></span></a>`;
    return `<main class="view">
      <section class="home">
        <canvas class="home-bg" id="home-bg" aria-hidden="true"></canvas>
        <canvas class="field side" data-field="left" aria-hidden="true"></canvas>
        <div class="stage">
          <span class="eyebrow">${esc(S.role)} · Portfolio</span>
          <div class="box">
            <div class="home-center">
              <h1 class="name"><span class="hi">Hi, I'm</span><span class="nm">${esc(parts.join(" "))}${last ? "<br>" : ""}${esc(last)}</span></h1>
              <p class="tagline">${txt(S.tagline)}</p>
            </div>
            <nav class="tiles" aria-label="Sections">
              ${tile("physical", "01", "Physical", count("physical") + " projects", { seal: "michelle", colors: "0,1" })}
              ${tile("digital", "02", "Digital", count("digital") + " projects", { seal: "#237623", colors: "soft", scale: 0.82 })}
              ${tile("about", "03", "About", "Contact + resume", { seal: "#245496", colors: "soft", scale: 0.62 })}
            </nav>
          </div>
          <div class="facts"><span class="dot"></span>${esc(S.school)}</div>
        </div>
        <canvas class="field side" data-field="right" aria-hidden="true"></canvas>
        <a class="scroll-cue mono muted" href="#" onclick="document.getElementById('work').scrollIntoView({behavior:'smooth'});return false;">Selected work ↓</a>
      </section>
      <div class="work-panel"><section class="wrap work" id="work">
        ${["physical", "digital"].map((t) => `
          <div class="index-head"><h2>${S.tabs[t].label}</h2><a class="mono" href="#${t}">View all →</a></div>
          <ul class="index">${indexList(t)}</ul>`).join("")}
      </section></div></main><div class="peek" aria-hidden="true"></div>` + footer();
  }

  function tabView(id) {
    const t = S.tabs[id];
    const cards = t.projects.filter((s) => PROJECTS[s]).map((s) => {
      const p = PROJECTS[s];
      return `<a class="card" href="#${p.slug}">${media(p.cover, p.title + " cover")}
        <div class="card-meta"><h3><canvas class="seal" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas>${esc(p.title)}</h3><span class="mono muted">${esc(p.year)}</span></div>
        <span class="mono muted">${esc(p.kicker)}</span><p>${esc(p.summary)}</p></a>`;
    }).join("");
    return header(id) + `<main class="view"><section class="wrap tab-head">
      <span class="mono muted">${t.projects.length} projects</span><h1>${esc(t.label)}</h1><p>${esc(t.blurb)}</p>
      <canvas class="field strip" data-field="${id}" aria-hidden="true"></canvas></section>
      <section class="wrap grid">${cards}</section></main>` + footer();
  }

  function section(s) {
    switch (s.type) {
      case "text":
        return `<div class="s-text"><h2>${esc(s.heading || "")}</h2><p>${txt(s.body)}</p></div>`;
      case "image":
        return `<figure>${media(s, s.caption)}${s.caption ? `<figcaption class="mono">${esc(s.caption)}</figcaption>` : ""}</figure>`;
      case "gallery":
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}
          <div class="gallery c${s.columns === 3 ? 3 : 2}">${s.images.map((im) =>
            `<figure>${media(im, im.caption)}${im.caption ? `<figcaption class="mono">${esc(im.caption)}</figcaption>` : ""}</figure>`).join("")}</div></div>`;
      case "stats":
        return `<div class="stats">${s.items.map((i) => `<div class="stat"><span class="mono muted">${esc(i.label)}</span><b>${esc(i.value)}</b></div>`).join("")}</div>`;
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

  function project(p) {
    const list = S.tabs[p.tab].projects.filter((s) => PROJECTS[s]);
    const next = PROJECTS[list[(list.indexOf(p.slug) + 1) % list.length]];
    const spec = [["Role", p.role], ["Tools", p.tools], ["Year", p.year], ["Duration", p.duration]]
      .map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${txt(v)}</dd></div>`).join("");
    return header(p.tab) + `<main class="view">
      <section class="wrap p-head">
        <a class="crumb mono muted" href="#${p.tab}">← ${esc(S.tabs[p.tab].label)}</a>
        <span class="mono muted">${esc(p.kicker)}</span>
        <div class="p-title"><canvas class="seal big" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas><h1>${esc(p.title)}</h1></div><p class="summary">${txt(p.summary)}</p>
      </section>
      <section class="wrap"><dl class="spec">${spec}</dl>${media(p.cover, "Cover image")}</section>
      <section class="wrap sections">${(p.sections || []).map(section).join("")}</section>
      ${next && next.slug !== p.slug ? `<section class="wrap"><a class="next" href="#${next.slug}">
        <span class="mono muted">Next project</span><span class="t">${esc(next.title)} →</span></a></section>` : ""}
    </main>` + footer();
  }

  function about() {
    const emails = (S.emails || [{ label: "Email", address: S.email }]).map((e, i) => `<li><div class="row">
        <span class="k">${esc(e.label)}</span><span class="v" id="email-${i}">${esc(e.address)}</span>
        <button class="copy mono" type="button" data-copy="${i}">Copy</button></div></li>`).join("");
    const links = S.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">
        <span class="k">${esc(l.label)}</span><span class="v">${esc(l.handle || "")}</span><span>↗</span></a></li>`).join("");
    return header("about") + `<main class="view"><section class="wrap about">
      <div>${media({ src: S.collage, ratio: "4/5", alt: "Photo collage" }, "Photo collage")}</div>
      <div><div class="about-marks" aria-hidden="true"><canvas class="seal mark" data-seal="michelle" data-colors="0,1"></canvas><canvas class="seal mark" data-seal="#237623" data-colors="soft" data-scale="0.82"></canvas><canvas class="seal mark" data-seal="#245496" data-colors="soft" data-scale="0.62"></canvas></div><span class="mono muted">About</span><h1>Hi, I'm ${esc(S.name.split(" ")[0])}.</h1>
        <p>${txt(S.about)}</p>
        <ul class="links mono">${emails}${links}</ul>
        <div class="resume" id="resume-slot">
          <div><span class="mono muted">Resume</span><b>Michelle Choi · Resume</b><span class="muted small" id="resume-note">Coming soon</span></div>
          <a class="resume-btn mono" id="resume-btn" href="${esc(S.resume)}" target="_blank" rel="noopener" aria-disabled="true">View PDF ↗</a>
        </div></div>
    </section></main>` + footer();
  }

  // ---------- router (plain #name hashes) ----------
  // home: as "Selected work" scrolls up, the cover recedes (moves up a little, shrinks, fades) underneath it
  let shiftOff = null;
  function coverShift() {
    if (shiftOff) { shiftOff(); shiftOff = null; }
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
    if (h === "physical" || h === "digital") html = tabView(h);
    else if (h === "about") html = about();
    else if (PROJECTS[h]) html = project(PROJECTS[h]);
    else html = home();
    app.innerHTML = html;
    document.title = (PROJECTS[h]?.title ? PROJECTS[h].title + " · " : "") + S.name;
    window.scrollTo(0, 0);
    wire();
    coverShift();
  }

  function wire() {
    if (window.Glyphs) {
      document.querySelectorAll("canvas[data-seal]").forEach((c) => Glyphs.seal(c, c.dataset.seal, c.dataset.colors === "soft" ? "soft" : c.dataset.colors ? c.dataset.colors.split(",").map(Number) : null));
      const cfg = {
        left: { seed: 7, cell: 20, soft: true, edge: "left" }, right: { seed: 31, cell: 20, soft: true, edge: "right" },
        physical: { seed: 11, cell: 13, colors: [0, 1] }, digital: { seed: 23, cell: 13, colors: [2, 3] }, about: { seed: 5, cell: 13, colors: [1, 3] }
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
      const orb = document.getElementById("orb");
      if (orb) Glyphs.orb(orb);
    }
    document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => {
      const el = document.getElementById("email-" + b.dataset.copy);
      navigator.clipboard?.writeText(el.textContent).then(() => { b.textContent = "Copied"; }).catch(() => {
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
