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
  cover: { src: "assets/physical/sketchbook/marker-interior.jpg", ratio: "16/10", alt: "Black and white marker rendering of an interior" },

  sections: [
    { group: "Broken Violin", type: "image", src: "assets/physical/sketchbook/broken-violin.jpg", ratio: "1526/1181", alt: "Broken violin with a medal and sheet music" },

    { group: "Marker Renderings", type: "gallery", columns: 2, images: [
      { src: "assets/physical/sketchbook/marker-interior.jpg", ratio: "578/775", caption: "Interior, black and white" },
      { src: "assets/physical/sketchbook/marker-street.jpg", ratio: "593/775", caption: "Street perspective" }
    ]},

    { group: "Napkin Sketches", type: "gallery", justify: true, images: [
      { src: "assets/physical/sketchbook/napkin-ceremony.jpg", ratio: "1200/1600", caption: "Ceremony Cafe" },
      { src: "assets/physical/sketchbook/napkin-tamper.jpg", ratio: "1024/768", caption: "Tamper" },
      { src: "assets/physical/sketchbook/napkin-frame-nyc.jpg", ratio: "603/1304", caption: "Frame NYC" }
    ]},

    { group: "Google Doodle", type: "image", src: "assets/physical/sketchbook/google-doodle.jpg", ratio: "1600/938", alt: "Google doodle sketch" },

    { group: "Ink Doodles", type: "gallery", columns: 3, images: [
      { src: "assets/physical/sketchbook/ink-hawk.jpg", ratio: "3/4", caption: "Hawk" },
      { src: "assets/physical/sketchbook/ink-tiger.jpg", ratio: "3/4", caption: "Tiger" },
      { src: "assets/physical/sketchbook/ink-map.jpg", ratio: "1201/1600", caption: "Illustrated map" }
    ]}
  ]
});
