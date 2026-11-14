// See bridge.js for notes on every field.
addProject({
  slug: "dcc-date-challenge",
  tab: "digital",
  title: "DCC Date Challenge",
  kicker: "App concept · Figma",
  year: "[2026]",
  role: "[UX/UI designer]",
  tools: "Figma",
  duration: "[Challenge length]",
  summary: "[The challenge prompt in one line, and what your design does for the user.]",
  cover: { src: "assets/digital/dcc-cover.png", ratio: "16/10", alt: "DCC app screens" },

  sections: [
    { type: "text", heading: "The challenge",
      body: "[Who is the user? What problem around dates are you solving? Any constraints from the DCC prompt?]" },
    { type: "gallery", heading: "From lo-fi to hi-fi", columns: 2, images: [
      { src: "assets/digital/dcc-lofi.png", ratio: "4/3", caption: "[Lo-fi wireframes]" },
      { src: "assets/digital/dcc-hifi.png", ratio: "4/3", caption: "[Hi-fi screens]" }
    ]},
    { type: "gallery", heading: "Key screens", columns: 3, images: [
      { src: "assets/digital/dcc-screen-1.png", ratio: "9/19", caption: "[Onboarding]" },
      { src: "assets/digital/dcc-screen-2.png", ratio: "9/19", caption: "[Main flow]" },
      { src: "assets/digital/dcc-screen-3.png", ratio: "9/19", caption: "[Confirmation]" }
    ]},
    // Paste the Figma share link (File > Share > Copy link). Leave "" to show a placeholder.
    { type: "figma", heading: "Interactive prototype", url: "" },
    { type: "text", heading: "Decisions & outcome",
      body: "[2–3 design decisions and why. Feedback from judges or users, if any.]" }
  ]
});
