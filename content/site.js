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
  tagline: "I'm a curious artist who makes complex spaces easy to move through, finding my way into product design one prototype at a time :)",
  school: "Cornell University · Design & Environmental Analysis · Class of 2029",
  status: "Looking for Summer 2027 product design internships",
  email: "mychoi1881@gmail.com",
  emails: [
    { label: "Personal", address: "mychoi1881@gmail.com" },
    { label: "School", address: "myc54@cornell.edu" }
  ],
  links: [
    { label: "LinkedIn", handle: "mychoi1881", url: "https://www.linkedin.com/in/mychoi1881" }
  ],
  // Drop the PDF at this path and the Resume button on the About page turns on by itself.
  resume: "assets/resume.pdf",
  about:
    "I grew up in South Jersey and started out in urban planning before falling into the magical world of tech and design as a sophomore at Cornell! You can usually find me doodling to Fleetwood Mac or Oasis, or out with friends hunting down good eats.\n\nAlways happy to chat! I love a good conversation :)",
  // Photo collage beside "Hi, I'm Michelle" on the About page. Empty src = placeholder box.
  portrait: [
    { src: "assets/about/selfie.jpg", ratio: "3/4", label: "Selfie" },
    { src: "assets/about/friends/alps.jpg", ratio: "3/4", label: "In the Alps" },
    { src: "assets/about/friends/festival.jpg", ratio: "1024/768", label: "Peace sign" }
  ],
  // Bulletin board on the About page. Drop photos in assets/board/ and set "src" (empty src = placeholder).
  // "ratio" is the photo's shape; "caption" is the handwritten-style label under it (optional).
  board: [
    // Until a photo is added (set "src"), each one shows as a colored card ("tint": [bottom, top, text color]).
    { title: "My Communities", note: "(flip the cards!)", ratio: "4/5", items: [
      { src: "assets/about/communities/cusd.jpg?v=202611161917", card: "CUSD", caption: "Cornell University Sustainable Design", link: "https://www.cusd.cornell.edu/",
        back: "I'm on the Sustainable Cities project team, where we partner with the Ithaca Commons to build an online presence for local storefronts and bring in more student business from Cornell and Ithaca College. The work connects my passion for urban design with my love for art and design, and it's so grounding to work alongside local Ithaca businesses.", tint: ["#3d2fd6", "#8f7dff"] },
      { src: "assets/about/communities/mediocre-melodies-stage3.jpg", caption: "Mediocre Melodies", link: "https://mediocremelodies.com/",
        back: "Bad singers for a good cause! The name means exactly what we are: a comedic a cappella group of (questionable) singers with personality, making people laugh at our concerts while raising money for local charities, like Challenge Contract Staffing. Truly a family of personable and hilarious people, and I'm so honored to be a part of it :)" },
      { src: "assets/about/communities/teaching-kindergarten.jpg", caption: "Teaching Kindergarten",
        back: "I taught preschoolers and kindergarteners art and Korean language for four years in high school, and it's definitely something I will always carry with me. My love for teaching will always be one of my passions, and I still volunteer at local preschools even in college!" },
      { src: "assets/about/communities/orchestra.jpg", caption: "Orchestra",
        back: "I begged my mom for three years to start violin in the second grade. I've never stopped playing since, and orchestra is my home, powered by my love of string instruments. You'll always find me nerding out over an orchestral film score." }
    ]},
    // "hand": captions in black handwriting on a polaroid-style bottom
    { title: "Some Fun Photography :)", ratio: "4/3", hand: true, items: [
      { src: "assets/about/photos/switzerland.jpg", caption: "Iseltwald, Switzerland. Swam here for hours, taken on my Sony Cybershot!" },
      { src: "assets/about/photos/snow-sunset.jpg", caption: "A snowy sunny day on the Cornell Libe Slope" },
      { src: "assets/about/photos/fair.jpg", caption: "A popup carnival in May post covid" },
      { src: "assets/about/photos/ocean-rocks.jpg", caption: "Southern Maine, motorcyclist on a cliff" }
    ]},
    { title: "Cinephilia Collection", ratio: "2/3", shape: "poster", items: [
      // "review" + "stars": the poster flips on hover (tap on phones) to my Letterboxd review
      { src: "assets/about/films/interstellar.jpg", caption: "Interstellar (2014)", stars: 5,
        review: "Never getting over this movie, watching it in IMAX for the sixth time on its 10 year anniversary and hearing Hans Zimmer blasting on speakers right above my head was full full circle." },
      { src: "assets/about/films/truman-show.jpg", caption: "The Truman Show (1998)", stars: 5,
        review: "Need to watch all of the YouTube analyses videos again, love this movie" },
      { src: "assets/about/films/walter-mitty.jpg", caption: "The Secret Life of Walter Mitty (2013)", stars: 5,
        review: "Wow I wish I was Ben Stiller watching Sean Penn take photos of an active volcano standing on a flying plane." },
      { src: "assets/about/films/dead-poets-society.jpg", caption: "Dead Poets Society (1989)", stars: 5,
        review: "wow ethan hawke wow carpe diem wow robin williams" }
    ]}
  ],

  // The two tabs. Order here = order on the site.
  tabs: {
    digital: {
      label: "Digital",
      blurb: "Interfaces, flows, and prototypes.",
      projects: ["gamify-the-mundane", "statler-hotel-redesign", "makerhub"]
    },
    physical: {
      label: "Physical",
      blurb: "Things built at full scale: models, sketches, and studio work.",
      projects: ["sketches", "bridge", "1101"]
    }
  }
};
