// Gamify the Mundane Challenge (formerly "DCC Date Challenge"). See bridge.js for notes on every field.
// Images live in assets/digital/gamify/. To add sketches, drop files in that folder and set "src" in the
// "Sketches & extra process" gallery below (empty src = labeled placeholder box).
addProject({
  slug: "gamify-the-mundane",
  tab: "digital",
  title: "Gamify the Mundane Challenge",
  kicker: "Design challenge · App concept · Figma",
  year: "[2026]",
  role: "[Solo designer]",
  tools: "Figma",
  duration: "[Challenge length]",
  summary:
    "The prompt: gamify something you find mundane or boring. I picked dating apps, and designed Go For It, a game where friends get surprise dares to meet new people, race a timer, and compete on a weekly leaderboard.",
  cover: { src: "assets/digital/gamify/cover.jpg", ratio: "16/10", alt: "Go For It hi-fi screens" },

  sections: [
    { type: "stats", items: [
      { label: "Prompt", value: "Gamify the mundane" },
      { label: "Mundane thing", value: "Dating apps" },
      { label: "Hi-fi screens", value: "8" }
    ]},
    { type: "text", heading: "The pain point",
      body: "Getting into dating is hard. Over time, the excitement of meeting new people fades, and looking for prospects becomes repetitive and predictable. Dating apps make it easy to look for connections, but harder to actually take action and put yourself out there." },
    { type: "text", heading: "Who it's for",
      body: "Young adults and college students on dating apps who catch themselves mindlessly swiping through profiles, overthinking what to text, waiting for conversations to go somewhere, and repeating the same dating routines." },
    { type: "image", src: "assets/digital/gamify/pitch-board.jpg", ratio: "16/9", caption: "Pitch board: lo-fi flow with my notes and open questions" },
    { type: "text", heading: "The idea",
      body: "My friends and I downloaded Hinge as a joke, and I kept thinking there had to be a more fun way to meet people than swiping. Inspired by BeReal's surprise notification and timer, I designed around \"just going for it\": a card arrives at a random time with a dare (like \"stop someone on the street and get their number\"), you swipe to accept or pass, a 15-minute timer starts, and you snap a photo as proof." },
    { type: "image", src: "assets/digital/gamify/user-flow.jpg", ratio: "16/9", caption: "User flow: one round, from the task alert to the next week's cards" },
    { type: "text", heading: "Making it a game",
      body: "A leaderboard is what turns it into a game. You join with a group of friends and compete for points. Points depend on the task's difficulty, how fast you finish, and how many cards you accept versus pass. The Winner of the Week unlocks the Task Generator and writes the dares for everyone else's next round, so passing has a real cost: you might get stuck with whatever the winner dreams up." },
    { type: "image", src: "assets/digital/gamify/difficulty-cards.jpg", ratio: "3200/1672", caption: "Task deck: example dares at each difficulty (point values are illustrative)" },
    { type: "text", heading: "The profile",
      body: "The profile tab keeps a history of every card: completion status, the photo proof, points earned, and the fun extras, like whether you got their name and number, whether you'll actually go on a date, and a 1–10 rating. It becomes a little portfolio of the people you met by taking a chance." },
    { type: "image", src: "assets/digital/gamify/lofi-wireframes.png", ratio: "1500/952", caption: "Lo-fi wireframes: task alert → task card → countdown, and the three tabs" },
    { type: "image", src: "assets/digital/gamify/lofi-to-hifi.jpg", ratio: "3200/2302", caption: "Lo-fi to hi-fi: same structure, new visual system" },
    { type: "gallery", heading: "Hi-fi screens", columns: 3, images: [
      { src: "assets/digital/gamify/screen-lock.png", ratio: "390/844", caption: "Task alert on the lock screen" },
      { src: "assets/digital/gamify/screen-task.png", ratio: "390/844", caption: "Task card: difficulty, points, swipe to pass or go" },
      { src: "assets/digital/gamify/screen-countdown.png", ratio: "390/844", caption: "Countdown + camera for proof" },
      { src: "assets/digital/gamify/screen-leaderboard.png", ratio: "390/844", caption: "Leaderboard (home)" },
      { src: "assets/digital/gamify/screen-generator.png", ratio: "390/844", caption: "Task Generator, unlocked for the winner" },
      { src: "assets/digital/gamify/screen-profile.png", ratio: "390/844", caption: "Profile and card history" }
    ]},
    { type: "gallery", heading: "Details", columns: 3, images: [
      { src: "assets/digital/gamify/screen-generator-locked.png", ratio: "390/844", caption: "Task Generator, locked for everyone but the winner" },
      { src: "assets/digital/gamify/screen-proof.png", ratio: "390/844", caption: "Card detail: proof, name, number, date? rate 1–10" }
    ]},
    { type: "gallery", heading: "Sketches & extra process", columns: 3, images: [
      { src: "", ratio: "4/5", caption: "[Sketch]" },
      { src: "", ratio: "4/5", caption: "[Sketch]" },
      { src: "", ratio: "4/5", caption: "[Sketch]" }
    ]},
    // Paste the Figma share link (File > Share > Copy link). Leave "" to show a placeholder.
    { type: "figma", heading: "Interactive prototype", url: "" },
    { type: "text", heading: "Takeaway",
      body: "Rather than judging success by whether someone finds a relationship, the app rewards taking chances, trying something new, and actually putting yourself out there. It's built for groups of friends who want dating to feel more spontaneous, social, and playful." }
  ]
});
