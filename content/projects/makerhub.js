// CU MakerHub: group proposal for the Cornell MakerHub in Beebe Hall (DEA 1150). See bridge.js for notes on every field.
// Images live in assets/digital/makerhub/. Wayfinding is left out on purpose.
addProject({
  slug: "makerhub",
  tab: "digital",
  title: "CU MakerHub",
  kicker: "Construction Commission · Group Project",
  year: "2026",
  role: "Designer (team of 4)",
  tools: "SketchUp, Enscape, Animation Software, Canva",
  // blurb: short line on the Digital/Physical overview cards (summary shows on the project page)
  blurb: "A redesign proposal for the Cornell MakerHub in Beebe Hall.",
  summary:
    "A redesign proposal for the Cornell MakerHub in Beebe Hall: a wordmark, a moodboard, and AI mockups of a space where students collaborate, connect, and create.",
  cover: { src: "assets/digital/makerhub/cover.jpg", ratio: "2200/1238", alt: "Red CU MakerHub Beebe Hall title slide" },

  sections: [
    { group: "The Brief", type: "brief", heading: "Project Brief", items: [
      { label: "Project", value: "A design proposal for the Cornell MakerHub construction commission." },
      { label: "Site", value: "Beebe Hall, a hard to find building tucked below the surrounding terrain." },
      { label: "Goal", value: "A space where students feel empowered to collaborate, connect, and create." }
    ]},

    { group: "Before & After", type: "gallery", heading: "Second Floor Entrance", justify: true, images: [
      { src: "assets/digital/makerhub/second-floor-before.jpg", ratio: "1600/1200", caption: "Before" },
      { src: "assets/digital/makerhub/second-floor-after.jpg", ratio: "1344/768", caption: "After: a re-centered door and an outdoor collaboration zone" }
    ]},
    { group: "Before & After", type: "gallery", heading: "Terrace Seating & Garage", justify: true, images: [
      { src: "assets/digital/makerhub/terrace-before.jpg", ratio: "1600/1200", caption: "Before" },
      { src: "assets/digital/makerhub/terrace-after.jpg", ratio: "1362/784", caption: "After: a terrace for group work and a garage to show off student projects" }
    ]},

    { group: "Branding & Materials", type: "pair", items: [
      { type: "image", heading: "Materials",
        intro: "Inspired by Ithaca's natural landscape: sage green, cream, and brown, with Cornell carnelian as the accent.",
        src: "assets/digital/makerhub/materials.jpg", ratio: "1425/1300" },
      { type: "image", heading: "Wordmark",
        intro: "Focusing on minimalism and simplicity, inspired by digitalism and modeling software, in metallic and flat versions.",
        src: "assets/digital/makerhub/wordmark-logos.jpg", ratio: "1450/945" }
    ]},

    { group: "Moodboard", type: "image", heading: "Moodboard",
      src: "assets/digital/makerhub/moodboard.jpg", ratio: "2200/1238", caption: "Creative studio moodboard" }
  ]
});
