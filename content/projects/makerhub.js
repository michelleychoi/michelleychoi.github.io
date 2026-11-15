// CU MakerHub: group proposal for the Cornell MakerHub in Beebe Hall (DEA 1150). See bridge.js for notes on every field.
// Images live in assets/digital/makerhub/. Wayfinding is left out on purpose.
addProject({
  slug: "makerhub",
  tab: "digital",
  title: "CU MakerHub",
  kicker: "Construction Commission · Group Project",
  year: "2026",
  role: "Designer (team of 4)",
  tools: "AI image generation, Canva",
  summary:
    "A redesign proposal for the Cornell MakerHub in Beebe Hall: branding, moodboards, and AI mockups of a space where students collaborate, connect, and create.",
  cover: { src: "assets/digital/makerhub/cover.jpg", ratio: "2200/1238", alt: "Red CU MakerHub Beebe Hall title slide" },

  sections: [
    { group: "The Brief", type: "brief", heading: "Project Brief", items: [
      { label: "Project", value: "A design proposal for the Cornell MakerHub construction commission." },
      { label: "Site", value: "Beebe Hall, a hard to find building tucked below the surrounding terrain." },
      { label: "Goal", value: "A space where students feel empowered to collaborate, connect, and create." },
      { label: "Team", value: "Emma Hogan, Michelle Choi, Annabel Jung, and Kate Chiellino." }
    ]},

    { group: "Before & After", type: "gallery", heading: "Main Entrance", justify: true, images: [
      { src: "assets/digital/makerhub/entrance-before.jpg", ratio: "900/600", caption: "Before" },
      { src: "assets/digital/makerhub/entrance-after.jpg", ratio: "1600/842", caption: "After: entrance shield, landscaping, mural, lighting, and benches" }
    ]},
    { group: "Before & After", type: "gallery", heading: "Second Floor Entrance", justify: true, images: [
      { src: "assets/digital/makerhub/second-floor-before.jpg", ratio: "1600/1200", caption: "Before" },
      { src: "assets/digital/makerhub/second-floor-after.jpg", ratio: "1344/768", caption: "After: a re-centered door and an outdoor collaboration zone" }
    ]},
    { group: "Before & After", type: "gallery", heading: "Terrace Seating & Garage", justify: true, images: [
      { src: "assets/digital/makerhub/terrace-before.jpg", ratio: "1600/1200", caption: "Before" },
      { src: "assets/digital/makerhub/terrace-after.jpg", ratio: "1362/784", caption: "After: a terrace for group work and a garage to show off student projects" }
    ]},

    { group: "Branding", type: "gallery", heading: "Logo & Wordmark", columns: 2, images: [
      { src: "assets/digital/makerhub/logo.jpg", ratio: "2200/1238", caption: "Logo design" },
      { src: "assets/digital/makerhub/wordmark.jpg", ratio: "2200/1238", caption: "Wordmark design" }
    ]},
    { group: "Branding", type: "image", heading: "Materials",
      intro: "Inspired by Ithaca's natural landscape: sage green, cream, and brown, with Cornell carnelian as the accent.",
      src: "assets/digital/makerhub/materials.jpg", ratio: "1425/1300", maxWidth: "640px", caption: "Fabric awnings, Beebe Hall's brick, wood furniture, and MakerHub hardware" },

    { group: "Moodboards & Mockups", type: "gallery", heading: "Moodboards", columns: 2, images: [
      { src: "assets/digital/makerhub/moodboard.jpg", ratio: "2200/1238", caption: "Creative studio moodboard" },
      { src: "assets/digital/makerhub/moodboard-2.jpg", ratio: "2200/1238", caption: "Clean, minimalistic, modern" }
    ]},
    { group: "Moodboards & Mockups", type: "image", heading: "Interior Concept",
      src: "assets/digital/makerhub/interior-concept.jpg", ratio: "2200/1238", caption: "AI mockup of the interior: natural light, open space, and student work on the walls" }
  ]
});
