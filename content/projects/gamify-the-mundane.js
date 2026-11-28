// Gamify the Mundane Challenge (formerly "DCC Date Challenge"). See bridge.js for notes on every field.
// Images live in assets/digital/gamify/. To add sketches, drop files in that folder and set "src" in the
// "Sketches & extra process" gallery below (empty src = labeled placeholder box).
addProject({
  slug: "gamify-the-mundane",
  tab: "digital",
  title: "Gamify the Mundane Challenge",
  kicker: "Design challenge · App concept · Figma",
  year: "2026",
  tags: "App concept · Figma", // short details shown on the home Design screen
  role: "Designer",
  tools: "Figma",
  // blurb: short line on the Digital/Physical overview cards (summary shows on the project page)
  blurb: "A game that dares you to go meet someone new.",
  summary:
    "The prompt: gamify something you find mundane or boring. I picked dating apps, and designed Go For It, a game where friends get surprise dares to meet new people, race a timer, and compete on a weekly leaderboard.",
  // play: "Jump to the prototype" button under the summary (scrolls to the prototype).
  // A floating pill while reading was tried and removed (2026-11-27); to bring it back add:
  //   pill: "Try the prototype", time: "1 min", thumb: "assets/digital/gamify/proto-thumb.jpg"
  play: { label: "Jump to the prototype ↓" },
  cover: { src: "assets/digital/gamify/cover-violet.jpg?v=202611192042", ratio: "16/10", alt: "Go For It: three hi-fi app screens on violet", live: "gfi" },

  sections: [
    // "brief": labeled lines (label: answer), shown in a bold display font
    { type: "brief", items: [
      { label: "Case", value: "Gamify something you find boring or mundane." },
      { label: "Identified challenge", value: "Dating apps." },
      { label: "Pain point", para: true, value: "Getting into dating is hard, and young adults and college students end up mindlessly swiping through profiles. My friends and I downloaded Hinge as a joke, and I kept thinking there had to be a more fun way to meet people. Inspired by BeReal's surprise notification and timer, I designed around \"just going for it.\"" }
    ]},
    // Early sketch on the left, pitch board on the right (sideFirst)
    { group: "Early Exploration", type: "split", sideFirst: true, heading: "Pitch Board & Sketches", intro: "My first lo-fi flow, annotated with notes and open questions from the pitch, next to an early sketch.",
      main: { src: "assets/digital/gamify/pitch-board.jpg", ratio: "16/9", caption: "Lo-fi flow with handwritten notes" },
      side: [
        { src: "assets/digital/gamify/sketch-1.jpg?v=202611161855", ratio: "1500/2000", caption: "Early sketch" }
      ],
      // outro: short paragraph under the images
      outro: "Starting off, I knew I wanted an app centered around quick, thrilling tasks under timer pressure. A \"now or never\" push. I wanted it to feel less like dating and more like a dare between friends: a little scary, a little silly, and over before you can back out. My pitch board mapped out that first rush: a surprise alert, a dare you can't predict, and 15 minutes to go for it." },
    { group: "Early Exploration", type: "image", heading: "User Flow", intro: "One round, from the surprise task alert to the winner writing next week's cards.",
      src: "assets/digital/gamify/user-flow.jpg", ratio: "3200/1562", caption: "Accept, race the timer, snap proof, climb the leaderboard" },
    // Research: why endless swiping falls short (sources verified 2026-11-28; see mockups/gfi-research/)
    { group: "Early Exploration", type: "research", heading: "Why Not Just Swipe?",
      intro: "I wanted to know if the burnt-out swiping feeling was just me. It wasn't. The problem isn't the swipe itself (my dare cards use one!). It's an endless pile of people you never actually meet.",
      leftTag: "Dating apps", leftCap: "An endless pile of profiles",
      rightTag: "Go For It", rightCap: "One dare, one person, right now",
      dare: { level: "Hard · 400 pts", text: "Ask someone cute to go on a spontaneous 10-minute date.", timer: "15:00" },
      items: [
        { stat: "−27%", short: "The more profiles people saw, the less likely they were to say yes.", cite: "Pronk & Denissen, 2020" },
        { stat: "24 vs 6", short: "People who picked from 24 profiles were less satisfied a week later than people who picked from 6.", cite: "D'Angelo & Toma, 2017" },
        { stat: "46%", short: "of U.S. adults who've used dating apps say it's been a negative experience.", cite: "Pew Research Center, 2023" }
      ]},
    { group: "Designing the Game", type: "text", heading: "Making It a Game", wide: true,
      body: "Here's where I hit a wall: why would anyone keep coming back to do something this nerve-racking? My solution was a leaderboard with friends — join with a group and compete for points. The points depend on the task's difficulty, how fast you finish, and how many cards you accept versus pass. The \"Winner of the Week\" then unlocks the Task Generator and writes the dares for everyone else's next round, so passing has a real cost: you might get stuck with whatever the winner dreams up." },
    { group: "Designing the Game", type: "image", heading: "Points by Difficulty", src: "assets/digital/gamify/difficulty-cards.jpg", ratio: "3200/1440", caption: "Example dares at each level (point values are illustrative)" },
    { group: "Designing the Game", type: "text", heading: "The Profile",
      body: "The profile tab keeps a history of every card: completion status, the photo proof, points earned, and the fun extras, like whether you got their name and number, whether you'll actually go on a date, and a 1–10 rating. It becomes a little portfolio of the people you met by taking a chance." },
    { group: "From Lo-fi to Hi-fi", type: "image", heading: "Lo-fi Wireframes", src: "assets/digital/gamify/lofi-wireframes.png", ratio: "1500/952", caption: "Task alert → task card → countdown, and the three tabs" },
    { group: "From Lo-fi to Hi-fi", type: "image", heading: "Lo-fi to Hi-fi", src: "assets/digital/gamify/lofi-to-hifi.jpg?v=202611161851", ratio: "3200/2050" },
    { group: "From Lo-fi to Hi-fi", type: "screens", heading: "Details", items: [
      { label: "A · Locked state", title: "Task Generator", src: "assets/digital/gamify/screen-generator-locked.png?v=202611161905",
        body: "The tab everyone wants. It stays locked unless you're Winner of the Week.",
        points: ["Blurred form hints at what you're missing", "Progress bar shows how far behind first place you are", "Gives a reason to accept harder cards instead of passing"] },
      { label: "B · Profile sheet", title: "Card Detail", src: "assets/digital/gamify/screen-proof.png?v=202611161905",
        body: "Tap any past card on your profile to open its record.",
        points: ["Photo proof with the time it was taken and points earned", "Their name and number, how fast you finished, and the difficulty", "Going on a date? Yes or no, plus a 1–10 rating"] }
    ]},
    // Clickable prototype (proto/gamify.html). To use a Figma link instead, swap this for:
    // { type: "figma", heading: "Interactive Prototype", url: "https://www.figma.com/..." },
    // live: tag on the phone; tapNote: handwritten hint; shift: page background fades to light lilac here
    { group: "Try It", type: "embed", heading: "Try the Prototype", src: "proto/gamify.html", title: "Go For It clickable prototype",
      live: "Live · tap to play", tapNote: "start here! tap the notification", shift: true, titleBeside: true,
      aside: [
        { label: "01 · Alert", body: "Tap the notification to open your card." },
        { label: "02 · Card", body: "Drag the card left to pass or right to go for it, or use the buttons. Passing costs points and deals the next dare." },
        { label: "03 · Countdown", body: "The 15-minute timer runs for real. Snap a photo, then submit your proof." },
        { label: "04 · Tabs", body: "Watch the leaderboard update. Skip to Sunday on the Task Generator to unlock it as Winner of the Week, then open a past card on your profile to rate the date." }
      ]},
    { group: "Try It", type: "text", heading: "Takeaway",
      body: "Rather than judging success by whether someone finds a relationship, the app rewards taking chances, trying something new, and actually putting yourself out there. It's built for groups of friends who want dating to feel more spontaneous, social, and playful." }
  ]
});
