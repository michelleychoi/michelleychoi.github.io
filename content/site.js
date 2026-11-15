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
  email: "mychoi1881@gmail.com",
  emails: [
    { label: "Personal", address: "mychoi1881@gmail.com" },
    { label: "School", address: "myc54@cornell.edu" }
  ],
  links: [
    { label: "LinkedIn", handle: "michelle-choi-0817b6277", url: "https://www.linkedin.com/in/michelle-choi-0817b6277" },
    { label: "Instagram", handle: "@michelle.__c", url: "https://www.instagram.com/michelle.__c/" }
  ],
  // Drop the PDF at this path and the Resume button on the About page turns on by itself.
  resume: "assets/resume.pdf",
  about:
    "[2–4 sentences about you. What draws you to product design, what you like to make with your hands vs. on screen, and what kind of team you want to learn from.]",
  // Bulletin board on the About page. Drop photos in assets/board/ and set "src" (empty src = placeholder).
  // "ratio" is the photo's shape; "caption" is the handwritten-style label under it (optional).
  board: [
    { title: "Me & Friends", ratio: "4/5", items: [
      { src: "", caption: "" }, { src: "", caption: "" }, { src: "", caption: "" }, { src: "", caption: "" }
    ]},
    // Until a photo is added (set "src"), each one shows as a colored card ("tint": [bottom, top, text color]).
    { title: "My Communities", ratio: "4/5", items: [
      { src: "", card: "CUSD", caption: "Cornell Undergraduate Sustainable Design (Cities Design Subteam)", tint: ["#3d2fd6", "#8f7dff"] },
      { src: "assets/about/communities/mediocre-melodies-stage3.jpg", caption: "Mediocre Melodies" },
      { src: "", caption: "Teaching Kindergarten", tint: ["#e0a100", "#ffe27a", "#2a2017"] },
      { src: "", caption: "Orchestra", tint: ["#0f5c63", "#7fd3cf"] }
    ]},
    { title: "Some Fun Photography :)", ratio: "4/5", items: [
      { src: "", caption: "", ratio: "3/2" }, { src: "", caption: "" }, { src: "", caption: "", ratio: "3/2" }, { src: "", caption: "" }
    ]},
    { title: "Cinephilia Collection", ratio: "2/3", shape: "poster", items: [
      { src: "assets/about/films/interstellar.jpg", caption: "Interstellar (2014)" }, { src: "assets/about/films/truman-show.jpg", caption: "The Truman Show (1998)" },
      { src: "assets/about/films/walter-mitty.jpg", caption: "The Secret Life of Walter Mitty (2013)" }, { src: "assets/about/films/dead-poets-society.jpg", caption: "Dead Poets Society (1989)" }
    ]}
  ],

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
      projects: ["gamify-the-mundane", "statler-hotel-redesign", "makerhub"]
    }
  }
};
