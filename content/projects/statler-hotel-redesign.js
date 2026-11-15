// Statler Hotel Redesign (Track B: "Social Threshold"). See bridge.js for notes on every field.
// Images live in assets/digital/statler/. final-board.jpg is the full presentation board.
addProject({
  slug: "statler-hotel-redesign",
  tab: "digital",
  title: "Statler Hotel Redesign",
  kicker: "Interior design · Hospitality",
  year: "[2025]",
  role: "[Interior designer]",
  tools: "[3D modeling, rendering, ...]",
  summary:
    "Social Threshold: turning the Statler Hotel's underused Regent Lounge into a warm social anchor that draws guests toward Banfi's, using rich materials, layered lighting, and a clear visual path.",
  cover: { src: "assets/digital/statler/cover.jpg", ratio: "16/10", alt: "Rendered lounge with leather chairs and a wood-slat café counter" },

  sections: [
    { group: "The Brief", type: "brief", heading: "Final Project Brief", items: [
      { label: "Project", value: "The Statler Hotel, Track B." },
      { label: "Site", value: "The Regent Lounge, an underused space on the way to Banfi's." },
      { label: "Goal", value: "Make it a warm social anchor that pulls guests toward Banfi's." },
      { label: "Concept", value: "Social Threshold: material richness, lighting, and visual hierarchy." }
    ]},

    { group: "The Spaces", type: "image", heading: "The Floorplan",
      intro: "Guests come in from the elevator and retail entrance, pass the café, and are led by the grand stair toward the bar.",
      src: "assets/digital/statler/floorplan.jpg", ratio: "1476/798", caption: "Circulation from the entrance, past the café and stairs, to the bar" },
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
    // Materials collage: x / y / w are percents of the board, r is tilt in degrees, later items sit on top.
    // cut: "torn" (ripped top + bottom), "torn-all", "torn-sides". kind: "photo", "wide", "hero", "note" (+ "ink" / "script").
    { group: "Lighting & Materials", type: "collage", heading: "Materials Palette", ratio: "16/10",
      intro: "Warm woods, marble, and soft upholstery, layered with the places they show up.",
      items: [
        { src: "assets/digital/statler/bar.jpg", x: 0.5, y: -3, w: 39, r: -3, cut: "torn-all", kind: "hero" },
        { src: "assets/digital/statler/staircase.jpg", x: 60, y: 55, w: 42, r: 3, cut: "torn", kind: "hero" },
        { src: "assets/digital/statler/mat/rug.jpg", label: "Antique Baktiary rug", note: "c. 1900 to 1920", x: 80, y: 2, w: 17, r: 6, kind: "photo", tape: true },
        { src: "assets/digital/statler/mat/lit-slat-wall.jpg", x: 38, y: 4, w: 36, r: 2, cut: "torn-sides", kind: "wide" },
        { text: "Social Threshold", x: 42, y: 30, w: 14, r: -4, kind: "note", tape: true },
        { src: "assets/digital/statler/mat/walnut.jpg", label: "Walnut veneer", note: "Bar millwork", x: 3, y: 30, w: 19, r: -7, cut: "torn" },
        { src: "assets/digital/statler/mat/calacatta.jpg", label: "Calacatta marble", note: "Counter + stair", x: 23, y: 20, w: 17, r: 5, tape: true },
        { src: "assets/digital/statler/mat/leather.jpg", label: "Espresso leather", note: "Lounge chairs", x: 63, y: 20, w: 14, r: -5, cut: "torn-all" },
        { src: "assets/digital/statler/mat/stair-rail.jpg", x: 76, y: 31, w: 13, r: 7, kind: "photo" },
        { src: "assets/digital/statler/mat/olive-velvet.jpg", label: "Olive velvet", note: "Upholstery", x: 1, y: 62, w: 16, r: 4, cut: "torn-all" },
        { src: "assets/digital/statler/mat/white-oak.jpg", label: "White oak veneer", note: "Slat walls", x: 16, y: 52, w: 16, r: -4, tape: "side" },
        { src: "assets/digital/statler/mat/carmen-velvet.jpg", label: "Carmen red velvet", note: "Accent seating", x: 29, y: 62, w: 15, r: 7, cut: "torn" },
        { src: "assets/digital/statler/mat/tread-light.jpg", x: 47, y: 50, w: 13, r: -6, kind: "photo" },
        { src: "assets/digital/statler/mat/boucle.jpg", label: "Cream bouclé", note: "Sofa + stools", x: 43, y: 68, w: 15, r: -3, tape: true },
        { src: "assets/digital/statler/mat/backlit-marble.jpg", label: "Backlit marble", x: 86, y: 50, w: 13, r: -4, cut: "torn-sides" },
        { text: "warm · rich · layered", x: 6, y: 89, w: 17, r: -2, kind: "note script" }
      ]},
    { group: "Lighting & Materials", type: "image", heading: "Furniture",
      intro: "All from Restoration Hardware: the Belgian Track Arm sofa in linen, the Arno armless counter stool in whitewashed oak and brass, and an antique Baktiary rug (c. 1900 to 1920, 100% wool).",
      src: "assets/digital/statler/furniture.jpg", ratio: "1071/591" },

    { group: "Final Board", type: "image", heading: "Final Presentation Board",
      src: "assets/digital/statler/final-board.jpg", ratio: "3/4", caption: "The full board as presented" }
  ]
});
