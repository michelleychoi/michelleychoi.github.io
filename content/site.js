/*
  SITE SETTINGS
  Edit the text below. Anything in [BRACKETS] is a placeholder to replace.

  To add a project:
    1. Copy any file in content/projects/ and rename it (e.g. content/projects/lamp.js)
    2. Add its file name (without .js) to the right list below, in the order you want.
*/
window.SITE = {
  name: "Michelle Choi",
  role: "Product designer",
  tagline: "I'm a curious artist learning how people move through the spaces I create, finding my way into product design one prototype at a time :)",
  school: "Cornell University · Design & Environmental Analysis, minor in Information Science · Class of 2029",
  status: "Looking for Summer 2027 product design internships",
  email: "[you@email.com]",
  links: [
    { label: "Instagram", url: "https://instagram.com/[handle]" },
    { label: "LinkedIn", url: "https://linkedin.com/in/[handle]" },
    { label: "Resume (PDF)", url: "assets/resume.pdf" }
  ],
  about:
    "[2–4 sentences about you. What draws you to product design, what you like to make with your hands vs. on screen, and what kind of team you want to learn from.]",
  portrait: "assets/portrait.jpg",

  // The two tabs. Order here = order on the site.
  tabs: {
    physical: {
      label: "Physical",
      blurb: "Things built at full scale: models, sketches, and studio work.",
      projects: ["bridge", "sketches", "1101"]
    },
    digital: {
      label: "Digital",
      blurb: "Interfaces, flows, and prototypes.",
      projects: ["dcc-date-challenge", "makerhub"]
    }
  }
};
