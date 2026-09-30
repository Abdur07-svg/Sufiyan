/**
 * ============================================================================
 * 🎂 BIRTHDAY SURPRISE CONFIGURATION FOR DIDI ❤️
 * ============================================================================
 * Easily edit sister's nickname, brother's name, and the letter below!
 * ============================================================================
 */

const SURPRISE_CONFIG = {
  // 1. SISTER & BROTHER NAMES
  sisterNickname: "Didi",              // What you call her (e.g. "Didi", "Api", "Sis")
  brotherName: "your brother",         // Your sign-off (e.g. "your brother" or "Abdur")

  // 2. SCENE 1 — OPENING
  opening: {
    heading: "Happy Birthday, Didi! ❤️",
    subtitle: "A special birthday surprise made just for you…",
    buttonText: "Open Your Surprise ✨"
  },

  // 3. SCENE 2 — POP THE BALLOON
  balloon: {
    prompt: "Let’s start the celebration… 🎈",
    hint: "Tap the balloon to pop it!",
    revealedText: "Yay! Happy Birthday! 🎉"
  },

  // 4. SCENE 3 — MAKE A WISH (CAKE & CANDLES)
  cakeWish: {
    prompt: "Make a wish for Didi… ✨",
    hint: "Tap the glowing candle to blow it out 🕯️",
    wishGrantedText: "May all your silent prayers, biggest dreams, and quiet wishes come true this year. 🌟",
    nextButtonText: "Next Surprise 🌸 →"
  },

  // 5. SCENE 4 — FLOWER BOUQUET
  bouquet: {
    quote: "For the sister who makes life a little more beautiful. 🌸",
    nextButtonText: "I have something for you… 💌 →"
  },

  // 6. SCENE 5 & 6 — THE ENVELOPE & TYPEWRITTEN LETTER
  letter: {
    envelopePrompt: "There’s something I wanted to tell you… 💌",
    envelopeHint: "Tap the envelope to open",
    letterHeading: "A little letter for my Didi 💗",
    // This text is revealed letter-by-letter like real handwriting/typing:
    text: "Happy Birthday, Didi ❤️\n\nYou are one of the most special people in my life. I may not say it every day, but I’m really grateful to have you as my sister.\n\nThank you for always being there, for guiding me, and for all the sweet childhood memories we share.\n\nMay you always stay happy, keep smiling, and get everything you wish for in life.\n\nLove you always. ❤️",
    nextButtonText: "One Last Thing 🎂 →"
  },

  // 7. SCENE 7 — FINAL BIRTHDAY SCENE (SISTER'S PHOTO)
  final: {
    photoUrl: "assets/SISTER PHOTO.jpg",
    heading: "Happy Birthday, Didi! ❤️",
    message: "Thank you for always being there. I’m truly lucky to have you as my sister.",
    signature: "Made with ❤️ by your brother",
    replayButtonText: "↺ Replay Surprise"
  },

  // 8. BACKGROUND MUSIC
  music: {
    enabled: true,
    audioUrl: "music/Birthday Song Piano cover (Happy birthday to me XD).mp3",
    startTime: 7, // starts from 7 seconds (00:07)
    endTime: 79,  // stops/ends at 1 minute 19 seconds (01:19)
    volume: 0.23  // soft 18% background volume
  }
};
