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
  function media(img, label) {
    if (!img) return ph("", "16/10", label);
    const ratio = img.ratio || "16/10";
    if (!img.src) return ph("", ratio, label);
    return `<div class="media" style="aspect-ratio:${esc(ratio)}"><img src="${esc(img.src)}" alt="${esc(img.alt || img.caption || "")}" loading="lazy"
      data-ratio="${esc(ratio)}" data-label="${esc(label || "Image")}" onerror="window.__ph(this)"></div>`;
  }
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
  function header(active) {
    const tab = (id, label) => `<a href="#${id}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`;
    return `<header class="bar"><div class="wrap">
      <a class="brand" href="#">${esc(S.name)}</a>
      <nav class="tabs" aria-label="Sections">${tab("digital", "Digital")}${tab("physical", "Physical")}${tab("about", "About")}</nav>
      <div class="status mono"><span class="dot"></span>Open to internships</div>
    </div></header>`;
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

  function home() {
    const parts = S.name.trim().split(" ");
    const last = parts.length > 1 ? parts.pop() : "";
    const count = (t) => S.tabs[t].projects.filter((s) => PROJECTS[s]).length;
    const tile = (href, n, label, sub, field) => `<a class="tile" href="#${href}">
        <span class="art glyph"><canvas class="seal" data-seal="${field.seal}" data-colors="${field.colors}" data-scale="${field.scale || 1}" aria-hidden="true"></canvas></span>
        <span class="lbl"><b>${label}</b>${sub ? `<span class="mono muted">${sub} →</span>` : ""}</span></a>`;
    return `<main class="view">
      <section class="home">
        <canvas class="home-bg" id="home-bg" aria-hidden="true"></canvas>
        <canvas class="field side" data-field="left" aria-hidden="true"></canvas>
        <div class="stage">
          <div class="box">
            <div class="home-center">
              <h1 class="name"><span class="hi">Hi, I'm</span><span class="nm">${esc(parts.join(" "))}${last ? "<br>" : ""}${esc(last)}</span></h1>
              <p class="tagline">${txt(S.tagline)}</p>
            </div>
            <nav class="tiles" aria-label="Sections">
              ${tile("digital", "01", "Digital", "", { seal: "michelle", colors: "0,1" })}
              ${tile("physical", "02", "Physical", "", { seal: "#237623", colors: "1,1,1,3", scale: 0.82 })}
              ${tile("about", "03", "About", "", { seal: "#245496", colors: "soft", scale: 0.62 })}
            </nav>
          </div>
          <div class="facts"><span class="dot"></span>${esc(S.school)}</div>
        </div>
        <canvas class="field side" data-field="right" aria-hidden="true"></canvas>
        <a class="scroll-cue mono muted" href="#" onclick="document.getElementById('work').scrollIntoView({behavior:'smooth'});return false;">Selected Work ↓</a>
      </section>
      <div class="work-panel"><section class="wrap work" id="work">
        ${["digital", "physical"].map((t) => `
          <div class="index-head"><h2>${S.tabs[t].label}</h2><a class="mono" href="#${t}">View All →</a></div>
          <ul class="index">${indexList(t)}</ul>`).join("")}
      </section></div></main><div class="peek" aria-hidden="true"></div>` + footer();
  }

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
        return `<div class="pair">${s.items.map((it) => `<div>${section(it)}</div>`).join("")}</div>`;
      case "gallery":
        return `<div class="s-block">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ""}
          <div class="gallery ${s.justify ? "just" : "c" + (s.columns === 3 ? 3 : 2)}">${s.images.map((im) =>
            `<figure${s.justify ? ` style="flex:${(([a, b]) => (+a / (+b || 1)) || 1)(String(im.ratio || "1").split("/"))} 1 0"` : ""}>${media(im, im.caption)}${im.caption ? `<figcaption class="mono">${esc(im.caption)}</figcaption>` : ""}</figure>`).join("")}</div></div>`;
      case "stats":
        return `<div class="stats">${s.items.map((i) => `<div class="stat"><span class="mono muted">${esc(i.label)}</span><b>${esc(i.value)}</b></div>`).join("")}</div>`;
      case "split": {
        // one main image on the left, a column of small images (e.g. sketches) on the right
        const cap = (im) => im.caption ? `<figcaption class="mono">${esc(im.caption)}</figcaption>` : "";
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
          const dl = `<dl class="brief">${s.items.map((i) => `<div><dt class="mono">${esc(i.label)}:</dt><dd>${esc(i.value)}</dd></div>`).join("")}</dl>`;
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
        <div class="p-title"><canvas class="seal big" data-seal="${esc(p.slug)}" aria-hidden="true"></canvas><h1>${esc(p.title)}</h1></div><p class="summary">${txt(p.summary)}</p>
      </section>
      <section class="wrap"><dl class="spec">${spec}</dl>${p.heroVideo ? `<div class="media hero-video" style="aspect-ratio:${esc(p.heroVideo.ratio || "16/9")}"><video src="${esc(p.heroVideo.src)}"${p.heroVideo.poster ? ` poster="${esc(p.heroVideo.poster)}"` : ""} autoplay muted loop playsinline preload="auto" aria-label="${esc(p.heroVideo.alt || p.title + " video")}"></video></div>` : p.hideCover ? "" : media(p.cover, "Cover image")}</section>
      <section class="wrap sections">${sectionsHTML(p.sections || [])}</section>
      ${next && next.slug !== p.slug ? `<section class="wrap"><a class="next" href="#${next.slug}">
        <span class="mono muted">Next Project</span><span class="t">${esc(next.title)} →</span></a></section>` : ""}
    </main>` + footer();
  }

  function about() {
    const emails = (S.emails || [{ label: "Email", address: S.email }]).map((e, i) => `<li><div class="row">
        <span class="k">${esc(e.label)}</span><span class="v" id="email-${i}">${esc(e.address)}</span>
        <button class="copy copy-ic" type="button" data-copy="${i}" aria-label="Copy ${esc(e.address)}" title="Copy"><svg class="ic-copy" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><rect x="8.5" y="8.5" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 5.5v-.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><svg class="ic-check" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></li>`).join("");
    const links = S.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">
        <span class="k">${esc(l.label)}</span><span class="v">${esc(l.handle || "")}</span><span>↗</span></a></li>`).join("");
    const board = (S.board || []).map((b, bi) => `<div class="pin-board">
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
        }).join("")}</div>${b.note ? `<span class="pin-note">${esc(b.note)}</span>` : ""}</div>`).join("");
    const snaps = (S.portrait || []).map((im, i) => `<figure class="snap snap-${i + 1}">${media({ src: im.src, ratio: im.ratio || "4/5", alt: im.label }, im.label)}</figure>`).join("");
    return header("about") + `<main class="view"><section class="wrap about about-v3">
      <div class="about-text"><div class="about-marks" aria-hidden="true"><canvas class="seal mark" data-seal="michelle" data-colors="0,1"></canvas><canvas class="seal mark" data-seal="#237623" data-colors="1,1,1,3" data-scale="0.82"></canvas><canvas class="seal mark" data-seal="#245496" data-colors="soft" data-scale="0.62"></canvas></div><span class="mono muted">About</span><h1>Hi, I'm ${esc(S.name.split(" ")[0])}!</h1>
        ${String(S.about || "").split(/\n\s*\n/).map((para) => `<p>${txt(para)}</p>`).join("")}
        <ul class="links mono">${emails}${links}</ul>
        <div class="resume" id="resume-slot">
          <div><span class="mono muted">Resume</span><b>Michelle Choi · Resume</b><span class="muted small" id="resume-note">Coming soon</span></div>
          <a class="resume-btn mono" id="resume-btn" href="${esc(S.resume)}" target="_blank" rel="noopener" aria-disabled="true">View PDF ↗</a>
        </div></div>
      <div class="snaps">${snaps}</div>
    </section>
    ${board ? `<section class="wrap bulletin"><div class="b-title"><span class="mono muted">Off the clock</span><h2>Bulletin Board</h2></div>${board}</section>` : ""}
    </main>` + footer();
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
    else if (PROJECTS[h] && PROJECTS[h].locked) { location.replace("#" + PROJECTS[h].tab); return; }
    else if (PROJECTS[h]) html = project(PROJECTS[h]);
    else html = home();
    app.innerHTML = html;
    document.title = (PROJECTS[h]?.title ? PROJECTS[h].title + " · " : "") + S.name;
    window.scrollTo(0, 0);
    wire();
    coverShift();
  }

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
