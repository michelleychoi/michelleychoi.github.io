// See bridge.js for notes on every field.
addProject({
  slug: "sketches",
  tab: "physical",
  title: "My Sketchbook",
  kicker: "Drawing practice",
  year: "2023–Current",
  role: "Self-directed",
  tools: "Ink, Alcohol markers, Procreate, Napkins",
  summary: "An amalgamation of random art projects over the years!",
  hint: "Click any piece to see it in full ↗",
  hideCover: true, // the cover only shows on the Physical tab card, not at the top of this page
  cover: { src: "assets/physical/sketchbook/marker-interior-clean.jpg", ratio: "16/10", alt: "Black and white marker rendering of an interior" },

  // Each piece is a square pinned print; click opens it full size. "pos" picks what stays in the square crop.
  sections: [
    { group: "Featured Works", type: "tiles", items: [
      { src: "assets/physical/sketchbook/broken-violin.jpg", title: "The Losing Winner", pos: "55% 50%" },
      { src: "assets/physical/sketchbook/marker-interior-clean.jpg", title: "Blue Atrium", pos: "50% 45%" },
      { src: "assets/physical/sketchbook/marker-street-clean.jpg", title: "Concord", pos: "50% 60%" }
    ]},

    { group: "Napkin Sketches", type: "tiles", intro: "A series of napkin sketches I did in high school and left at the cafes I drew them in. Fun fact: the owners of Frame Cafe found my napkin and posted it!!", items: [
      { src: "assets/physical/sketchbook/napkin-ceremony.jpg", title: "Ceremony Cafe", pos: "50% 42%" },
      { src: "assets/physical/sketchbook/napkin-tamper.jpg", title: "Tamper", pos: "50% 50%" },
      { src: "assets/physical/sketchbook/napkin-frame-nyc.jpg", title: "Frame NYC", pos: "50% 40%" }
    ]},

    { group: "Fun Ink Doodles", type: "tiles", items: [
      { src: "assets/physical/sketchbook/google-doodle.jpg", title: "Google Doodle", fit: "contain" },
      { src: "assets/physical/sketchbook/ink-hawk.jpg", title: "Hawk", pos: "50% 28%" },
      { src: "assets/physical/sketchbook/ink-map.jpg", title: "A History Of...", fit: "contain" },
      { src: "assets/physical/sketchbook/ink-tiger-crop.jpg", title: "Tiger", pos: "50% 40%" }
    ]}
  ]
});
