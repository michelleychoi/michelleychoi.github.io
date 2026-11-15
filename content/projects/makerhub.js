// See bridge.js for notes on every field.
addProject({
  slug: "makerhub",
  tab: "digital",
  title: "MakerHub",
  kicker: "Web platform",
  year: "[2026]",
  role: "[Product designer]",
  tools: "[Figma, ...]",
  summary: "[What MakerHub is, who uses it, and what you designed.]",
  cover: { src: "assets/digital/makerhub-cover.png", ratio: "16/10", alt: "MakerHub interface" },

  sections: [
    { type: "stats", items: [
      { label: "Users", value: "[Students + staff]" },
      { label: "Screens", value: "[12]" },
      { label: "Team", value: "[3]" }
    ]},
    { type: "text", heading: "Problem",
      body: "[What was broken or missing before MakerHub?]" },
    { type: "image", src: "assets/digital/makerhub-flow.png", ratio: "16/9", caption: "[User flow]" },
    { type: "text", heading: "Design",
      body: "[Walk through the main screens and the reasoning behind them.]" },
    { type: "gallery", columns: 2, images: [
      { src: "assets/digital/makerhub-1.png", ratio: "16/10", caption: "[Screen]" },
      { src: "assets/digital/makerhub-2.png", ratio: "16/10", caption: "[Screen]" }
    ]},
    { type: "figma", heading: "Prototype", url: "" },
    { type: "text", heading: "Reflection",
      body: "[What you'd change with more time.]" }
  ]
});
