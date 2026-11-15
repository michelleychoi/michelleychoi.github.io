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
    // Materials collage: x / y / w are percents of the board, r is tilt in degrees. kind "wide" spans both columns on phones.
    { group: "Lighting & Materials", type: "collage", heading: "Materials Palette", ratio: "16/10",
      intro: "Warm woods, marble, and soft upholstery, next to where they show up in the space.",
      items: [
        { src: "assets/digital/statler/mat/walnut.jpg", label: "Walnut wood veneer", note: "Bar millwork", x: 3, y: 5, w: 17, r: -3, tape: true },
        { src: "assets/digital/statler/mat/calacatta.jpg", label: "Calacatta marble", note: "Counter + stair", x: 18.5, y: 10, w: 16, r: 2.5 },
        { src: "assets/digital/statler/mat/leather.jpg", label: "Espresso brown leather", note: "Lounge chairs", x: 35.5, y: 4, w: 14, r: -2, tape: true },
        { src: "assets/digital/statler/mat/olive-velvet.jpg", label: "Olive green velvet", note: "Upholstery", x: 4, y: 42, w: 14, r: 2.5 },
        { src: "assets/digital/statler/mat/white-oak.jpg", label: "White oak veneer", note: "Slat walls", x: 21, y: 44, w: 14, r: -1.5, tape: true },
        { src: "assets/digital/statler/mat/carmen-velvet.jpg", label: "Carmen red velvet", note: "Accent seating", x: 37, y: 38, w: 14, r: 3 },
        { src: "assets/digital/statler/mat/boucle.jpg", label: "Cream bouclé", note: "Sofa + stools", x: 21, y: 68, w: 13, r: -2 },
        { src: "assets/digital/statler/mat/rug.jpg", label: "Antique Baktiary rug", note: "c. 1900 to 1920", x: 82, y: 5, w: 15, r: 2.5, kind: "photo" },
        { src: "assets/digital/statler/mat/lit-slat-wall.jpg", label: "Illuminated slat wall", x: 53, y: 7, w: 27, r: -1.5, kind: "wide", tape: true },
        { src: "assets/digital/statler/mat/stair-rail.jpg", label: "Integrated stair rail", x: 64, y: 33, w: 13, r: 2 },
        { src: "assets/digital/statler/mat/backlit-marble.jpg", label: "Backlit marble edge", x: 79, y: 57, w: 14, r: -2.5, tape: true },
        { src: "assets/digital/statler/mat/tread-light.jpg", label: "Stair tread lighting", x: 44, y: 63, w: 12.5, r: 3 }
      ]},
    { group: "Lighting & Materials", type: "image", heading: "Furniture",
      intro: "All from Restoration Hardware: the Belgian Track Arm sofa in linen, the Arno armless counter stool in whitewashed oak and brass, and an antique Baktiary rug (c. 1900 to 1920, 100% wool).",
      src: "assets/digital/statler/furniture.jpg", ratio: "1071/591" },

    { group: "Final Board", type: "image", heading: "Final Presentation Board",
      src: "assets/digital/statler/final-board.jpg", ratio: "3/4", caption: "The full board as presented" }
  ]
});
