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
  year: "[2025]",
  role: "[Designer + builder]",
  tools: "[Basswood, laser cutter, CA glue]",
  duration: "[6 weeks]",
  summary:
    "[One or two sentences: what the bridge had to do (span, load, material limits) and the result, e.g. held 42 lb at 18 g.]",
  cover: { src: "assets/physical/bridge-cover.jpg", ratio: "16/10", alt: "Finished bridge model" },

  sections: [
    { type: "stats", items: [
      { label: "Span", value: "[24 in]" },
      { label: "Weight", value: "[18 g]" },
      { label: "Max load", value: "[42 lb]" }
    ]},
    { type: "text", heading: "The brief",
      body: "[What were the constraints? Who set them? What made it hard?]" },
    { type: "gallery", heading: "Process", columns: 3, images: [
      { src: "assets/physical/bridge-sketch.jpg", ratio: "4/5", caption: "[Early truss sketches]" },
      { src: "assets/physical/bridge-cut.jpg", ratio: "4/5", caption: "[Cutting members]" },
      { src: "assets/physical/bridge-glue.jpg", ratio: "4/5", caption: "[Assembly jig]" }
    ]},
    { type: "text", heading: "Testing",
      body: "[How it was tested, where it failed, what you changed.]" },
    { type: "image", src: "assets/physical/bridge-test.jpg", ratio: "16/9", caption: "[Load test]" },
    { type: "text", heading: "What I learned",
      body: "[One takeaway you'd bring to a product team.]" }
  ]
});
