/*
  PROJECT FILE: one per project.
  - Put images in assets/physical/ (or assets/digital/) and set "src" to that path.
  - Any image with src left empty, or a file that doesn't exist yet, shows a labeled placeholder box.
  - "ratio" is the shape of the box: "16/10", "4/3", "1/1", "3/4", "4/5" ...
  - Section types: "text", "image", "gallery", "figma", "video", "stats"
*/
addProject({
  slug: "bridge",
  tab: "physical",
  title: "Bridge",
  kicker: "Structural model",
  year: "2026",
  role: "Designer/Builder",
  tools: "1/16\" and 1/8\" wooden sticks",
  summary:
    "A 35 g stick bridge with a diamond base, built to hold a 25 lb brick.",
  cover: { src: "assets/physical/bridge-cover.jpg", ratio: "16/10", alt: "Finished balsa-stick bridge model on a black background" },

  sections: [
    { type: "stats", items: [
      { label: "Size", value: "29 × 8.7 in" },
      { label: "Weight", value: "35 g" },
      { label: "Load held", value: "25 lb" }
    ]},
    { type: "text", heading: "The Challenge",
      body: "Hold a 25 lb brick using only 1/16\" and 1/8\" wooden sticks. I also had to design a reachable \"shelter\", which I put at the top with white tissue paper, plus a ladder made from 1/16\" rods." },
    { type: "image", heading: "Process", src: "assets/physical/bridge-base.jpg", ratio: "2914/1080", caption: "1. Base construction: the diamond base, clamped flat" },
    { type: "gallery", columns: 2, images: [
      { src: "assets/physical/bridge-upper-chord.jpg", ratio: "4/3", caption: "2. Building up: asymmetrical supports in red" },
      { src: "assets/physical/bridge-form-study.jpg", ratio: "4/3", caption: "3. Form study: mapping the upper chord" }
    ]},
    { type: "text", heading: "Design & Testing",
      body: "I made a diamond base to set my bridge apart from a regular truss. The base needed thin 1/16\" tension rods, which was a challenge. I used 1/8\" rods to keep the center rigid, then built up entirely with 1/8\" rods to keep the structure stable. I also added asymmetrical support beams to the upper chord to reflect its asymmetry." },
    { type: "image", src: "assets/physical/bridge-test.jpg", ratio: "1299/481", caption: "4. Load test: holding the 25 lb brick" },
    { type: "text", heading: "Takeaway",
      body: "Building up the base won't do much. Building up is where you get the real structure." }
  ]
});
