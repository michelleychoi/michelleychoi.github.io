// See bridge.js for notes on every field.
addProject({
  slug: "1101",
  tab: "physical",
  title: "Hexchange",
  kicker: "Studio coursework",
  year: "[2025]",
  role: "[Designer]",
  tools: "[Cardboard, foam core, 3D printing, SolidWorks]",
  summary: "[What 1101 is, and the 2–3 projects you're showing from it.]",
  cover: { src: "assets/physical/hexchange-cover.jpg", ratio: "16/10", alt: "Hexchange prototype on a wood stump beside the Hexchange wordmark" },

  sections: [
    { type: "text", heading: "[Project A]",
      body: "[Prompt, what you made, and one decision you're proud of.]" },
    { type: "image", src: "assets/physical/1101-a.jpg", ratio: "16/9", caption: "[Project A, final]" },
    { type: "text", heading: "[Project B]",
      body: "[Prompt, what you made, and one decision you're proud of.]" },
    { type: "gallery", columns: 2, images: [
      { src: "assets/physical/1101-b1.jpg", ratio: "4/3", caption: "[Prototype]" },
      { src: "assets/physical/1101-b2.jpg", ratio: "4/3", caption: "[Final]" }
    ]},
    { type: "text", heading: "[Project C]",
      body: "[Prompt, what you made, and one decision you're proud of.]" },
    { type: "image", src: "assets/physical/1101-c.jpg", ratio: "4/3", caption: "[Project C]" }
  ]
});
