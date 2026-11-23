// Statler Hotel Redesign (Track B: "Social Threshold"). See bridge.js for notes on every field.
// Images live in assets/digital/statler/. final-board.jpg is the full presentation board.
addProject({
  slug: "statler-hotel-redesign",
  tab: "digital",
  title: "Statler Hotel Redesign",
  kicker: "Interior Design Challenge · Hospitality",
  year: "2025",
  tags: "Interior design · Hospitality", // short details shown on the home Design screen
  role: "Interior Designer",
  tools: "SketchUp, Enscape, Adobe Illustrator",
  // blurb: short line on the Digital/Physical overview cards (summary shows on the project page)
  blurb: "Social Threshold: turning the Statler Hotel's underused Regent Lounge into a warm social anchor.",
  summary:
    "Social Threshold: turning the Statler Hotel's underused Regent Lounge into a warm social anchor that draws guests toward Banfi's, using rich materials, layered lighting, and a clear visual path.",
  cover: { src: "assets/digital/statler/cover.jpg", ratio: "16/10", alt: "Rendered lounge with leather chairs and a wood-slat café counter" },

  sections: [
    { group: "The Brief", type: "brief", heading: "Final Project Brief", items: [
      { label: "Project", value: "The Statler Hotel, Regent Lounge" },
      // "points": a bulleted list instead of one line
      { label: "Pain points", points: [
        "The bar was too small, with little bar seating, and got packed on alumni weekends",
        "The grand stair was hidden and didn't feel grand",
        "The entrance was easy to miss for first-timers",
        "No clear path for servers and staff, so guests got food from the other side",
        "Awkward long tables only worked for big parties",
        "Too much lounge seating that went unused"
      ]},
      { label: "Goal", value: "Make it a warm social anchor guests can actually utilize and wayfind easily." }
    ]},

    // before/after plans in one section: text on the left, plans stacked on the right ("rows" type, 2026-11-23)
    { group: "The Spaces", type: "rows", heading: "The Floorplan", items: [
      { label: "Before", title: "The Original Floorplan", body: "The original layout, marked up with the problems I found.",
        src: "assets/digital/statler/floorplan-before.jpg?v=202611230413", ratio: "1263/863" },
      { label: "After", title: "The New Floorplan", body: "Guests come in from the elevator and retail entrance, pass the café, and are led by the grand stair toward the bar.",
        src: "assets/digital/statler/floorplan-hd.jpg", ratio: "2952/1596", caption: "Circulation from the entrance, past the café and stairs, to the bar" }
    ]},
    { group: "The Spaces", type: "gallery", heading: "Three Zones", columns: 3, images: [
      { src: "assets/digital/statler/cafe.jpg", ratio: "1152/639", caption: "Café" },
      { src: "assets/digital/statler/bar.jpg", ratio: "1152/639", caption: "Bar" },
      { src: "assets/digital/statler/staircase.jpg", ratio: "1152/654", caption: "Staircase" }
    ]},

    { group: "Key Details", type: "screens", wide: true, heading: "Millwork & Stair", items: [
      { label: "A", title: "Wine Bar", src: "assets/digital/statler/wine-bar.jpg", ratio: "1030/555",
        body: "The bar is the destination, so it gets the richest finishes.",
        points: ["Walnut millwork with built-in wine display shelving", "Marble service counter and backsplash", "Ambient backlighting for warmth and to show off the bottles"] },
      { label: "B", title: "Grand Stair", src: "assets/digital/statler/grand-stair.jpg", ratio: "1025/576",
        body: "The stair is the threshold that draws guests upward.",
        points: ["Marble stair with an integrated railing", "Vertical wood slats with hidden ambient tread lighting", "A visual threshold that pulls guests toward upper-level dining"] }
    ]},

    { group: "Lighting & Materials", type: "cols", heading: "Lighting Strategy",
      intro: "Three layers of light: one to set the mood, one to highlight features, and one for the work at the counters.",
      items: [
        { title: "Ambience", points: ["Warm recessed downlighting", "General hospitality illumination"] },
        { title: "Accent", points: ["Backlit wine shelving", "Illuminated wood slat feature wall", "Stair tread lighting"] },
        { title: "Task", points: ["Bar prep illumination", "Counter service lighting", "Lighting that draws visitors to the stairs"] }
      ]},
    { group: "Lighting & Materials", type: "pair", items: [
        { type: "image", heading: "Materials Palette",
        intro: "Walnut and white oak veneers, Calacatta marble, espresso brown leather, olive green and carmen red velvet, and cream bouclé.",
        src: "assets/digital/statler/materials-v2.jpg", ratio: "926/452" },
        { type: "image", heading: "Furniture",
        intro: "All from Restoration Hardware: the Belgian Track Arm sofa, the Arno counter stool, and an antique Baktiary rug.",
        src: "assets/digital/statler/furniture.jpg", ratio: "1071/591" }
    ]},

    { group: "Final Board", type: "image", heading: "Final Presentation Board",
      src: "assets/digital/statler/final-board.jpg", ratio: "3/4", caption: "The full board as presented" }
  ]
});
