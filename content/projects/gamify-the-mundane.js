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
  cover: { src: "assets/digital/gamify/cover-violet.jpg?v=202611192042", ratio: "16/10", alt: "Go For It: three hi-fi app screens on violet", live: "gfi" },

  sections: [
    // "brief": labeled lines (label: answer), shown in a bold display font
    { type: "brief", items: [
      { label: "Case", value: "Gamify something you find boring or mundane." },
      { label: "Identified challenge", value: "Dating apps." }
    ]},
    { group: "Understanding the Problem", type: "text", heading: "The Pain Point",
      body: "Getting into dating is hard. Over time, the excitement of meeting new people fades, and looking for prospects becomes repetitive and predictable. Dating apps make it easy to look for connections, but harder to actually take action and put yourself out there." },
    { group: "Understanding the Problem", type: "text", heading: "Who It's For",
      body: "Young adults and college students on dating apps who catch themselves mindlessly swiping through profiles, overthinking what to text, waiting for conversations to go somewhere, and repeating the same dating routines." },
    { group: "Understanding the Problem", type: "text", heading: "The Idea",
      body: "My friends and I downloaded Hinge as a joke, and I kept thinking there had to be a more fun way to meet people than swiping. Inspired by BeReal's surprise notification and timer, I designed around \"just going for it\": a card arrives at a random time with a dare (like \"stop someone on the street and get their number\"), you swipe to accept or pass, a 15-minute timer starts, and you snap a photo as proof." },
    // Early sketch on the left, pitch board on the right (sideFirst)
    { group: "Early Exploration", type: "split", sideFirst: true, heading: "Pitch Board & Sketches", intro: "My first lo-fi flow, annotated with notes and open questions from the pitch, next to an early sketch.",
      main: { src: "assets/digital/gamify/pitch-board.jpg", ratio: "16/9", caption: "Lo-fi flow with handwritten notes" },
      side: [
        { src: "assets/digital/gamify/sketch-1.jpg?v=202611161855", ratio: "1500/2000", caption: "Early sketch" }
      ]},
    { group: "Early Exploration", type: "image", heading: "User Flow", intro: "One round, from the surprise task alert to the winner writing next week's cards.",
      src: "assets/digital/gamify/user-flow.jpg", ratio: "3200/1562", caption: "Accept, race the timer, snap proof, climb the leaderboard" },
    { group: "Designing the Game", type: "text", heading: "Making It a Game",
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
    { group: "Try It", type: "embed", heading: "Interactive Prototype", src: "proto/gamify.html", title: "Go For It clickable prototype",
      intro: "Click through one full round. Everything here works.",
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
