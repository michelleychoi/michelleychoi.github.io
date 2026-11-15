// See bridge.js for notes on every field.
addProject({
  slug: "sketches",
  tab: "physical",
  title: "My Sketchbook",
  kicker: "Drawing practice",
  year: "[2024–now]",
  role: "[Self-directed]",
  tools: "[Pencil, fineliner, markers]",
  summary: "[What you sketch and why: ideation, observation, product studies.]",
  cover: { src: "assets/physical/sketches-cover.jpg", ratio: "4/3", alt: "Sketchbook spread" },

  sections: [
    { type: "text", heading: "How I Sketch",
      body: "[A short note on your process: quick thumbnails, perspective studies, exploded views...]" },
    { type: "gallery", columns: 2, images: [
      { src: "assets/physical/sketch-01.jpg", ratio: "3/4", caption: "[Caption]" },
      { src: "assets/physical/sketch-02.jpg", ratio: "3/4", caption: "[Caption]" },
      { src: "assets/physical/sketch-03.jpg", ratio: "3/4", caption: "[Caption]" },
      { src: "assets/physical/sketch-04.jpg", ratio: "3/4", caption: "[Caption]" }
    ]},
    { type: "gallery", columns: 3, images: [
      { src: "assets/physical/sketch-05.jpg", ratio: "1/1", caption: "[Caption]" },
      { src: "assets/physical/sketch-06.jpg", ratio: "1/1", caption: "[Caption]" },
      { src: "assets/physical/sketch-07.jpg", ratio: "1/1", caption: "[Caption]" }
    ]}
  ]
});
