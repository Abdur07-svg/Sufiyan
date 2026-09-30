# 🎂 REALISTIC INTERACTIVE BIRTHDAY SURPRISE FOR DIDI ❤️

A mobile-first, full-screen interactive birthday surprise experience created specially for your elder sister ("Didi").

Built with **pure Vanilla HTML, CSS, and JavaScript** — zero scrolling, no box/card containers, real-time typewriter letter reveal, sister photo frame reveal, authentic PNG visual assets, and zero clutter.

---

## 🎨 ASSETS INCLUDED & USED
The website uses the high-quality assets located in `assets/`:
- `birthday_cake.png` $\rightarrow$ Rendered in Scene 1 (Opening) and Scene 3 (Wish & Candle).
- `flower_bouquet.png` $\rightarrow$ Rendered in Scene 4 (Bouquet Reveal).
- `sealed_envelope.png` $\rightarrow$ Rendered in Scene 5 before opening.
- `opened_envelope.png` $\rightarrow$ Rendered during the envelope-opening animation in Scene 5.
- `letter_card.png` $\rightarrow$ Rendered as a delicate stationery accent in Scene 6 (The Letter).
- `petals_confetti.png` $\rightarrow$ Rendered in the falling celebration cascade on canvas.
- `SISTER PHOTO.jpg` $\rightarrow$ Rendered inside an elegant, soft cream floral photo frame in Scene 7 (The Final Scene).

---

## 🚀 HOW TO RUN
1. Double-click [index.html](file:///c:/Users/ABDUR/Downloads/HBD/index.html) to open it in any web browser on your phone or computer.
2. Host it for free on **GitHub Pages**, **Vercel**, or **Netlify** to send her the link!

---

## 📱 MOBILE-FIRST ZERO-SCROLL ARCHITECTURE
- Strictly fixed at `100vw × 100dvh`.
- **NO vertical scrolling**: Each moment is its own full-screen interactive scene.
- **NO card boxes/dashboard containers**: Objects float naturally on the full-screen pastel background.
- Transitions play between scenes (curtain blur/wipe, petal physics, and sparkle bursts).
- Tactile, realistic buttons with physical press feedback.
- **Background Music**: Plays the authentic piano birthday song from `music/`, strictly between **00:07** and **01:19** (loops back to 00:07 if it reaches 01:19), starting on the first user interaction with soft background volume (18%) and continuous playback across all scenes.

---

## 🛠️ HOW TO CUSTOMIZE

Open [config.js](file:///c:/Users/ABDUR/Downloads/HBD/config.js) in any text editor:

### 1. Sister's Nickname & Brother's Signature
```javascript
sisterNickname: "Didi",              // What you call her (e.g. "Didi", "Api", "Sis")
brotherName: "your brother",         // Your sign-off (e.g. "your brother" or "Abdur")
```

### 2. Music Configuration
```javascript
music: {
  enabled: true,
  audioUrl: "music/Birthday Song Piano cover (Happy birthday to me XD).mp3",
  startTime: 7, // starts at 7 seconds (00:07)
  endTime: 79,  // stops/loops at 79 seconds (01:19)
  volume: 0.18  // soft 18% background volume
}
```

### 3. The Final Photo
Place your sister's photo in `assets/` and reference it in [config.js](file:///c:/Users/ABDUR/Downloads/HBD/config.js):
```javascript
final: {
  photoUrl: "assets/SISTER PHOTO.jpg",
  heading: "Happy Birthday, Didi! ❤️",
  message: "Thank you for always being there. I’m truly lucky to have you as my sister.",
  signature: "Made with ❤️ by your brother",
  replayButtonText: "↺ Replay Surprise"
}
```

### 4. The Letter (Real-time Typewriter Reveal)
In [config.js](file:///c:/Users/ABDUR/Downloads/HBD/config.js) under `letter: { text: "..." }`:
- Edit the letter text. It is typed out letter-by-letter in real time with a blinking writing cursor!
- Tapping the stationery card during typing will instantly complete the text.

---

## ✨ THE 7-SCENE INTERACTIVE EXPERIENCE FLOW

1. **Scene 1 — Birthday Opening**:
   - `assets/birthday_cake.png` with gentle floating animation + Calligraphy: *"Happy Birthday, Didi! ❤️"*
   - Tactile button: **“Open Your Surprise ✨”** $\rightarrow$ cinematic wipe transition $\rightarrow$ Scene 2.
2. **Scene 2 — Pop the Balloon**:
   - Realistic 3D glossy floating balloon: *"Let’s start the celebration… 🎈"*
   - Tap balloon $\rightarrow$ pops with pop sound and confetti burst $\rightarrow$ reveals *"Yay! 🎉"* $\rightarrow$ transitions to Scene 3.
3. **Scene 3 — Make a Wish (Cake & Candle)**:
   - `assets/birthday_cake.png` with an animated flickering candle flame: *"Make a wish for Didi… ✨"*
   - Tap candle $\rightarrow$ flame blows out $\rightarrow$ smoke puff rises with sparkle chime $\rightarrow$ reveals:
     *"May all your silent prayers, biggest dreams, and quiet wishes come true this year. 🌟"* $\rightarrow$ **“Next Surprise 🌸 →”** button.
4. **Scene 4 — Flower / Bouquet Reveal**:
   - `assets/flower_bouquet.png` with blooming animation: *"For the sister who makes life a little more beautiful. 🌸"* $\rightarrow$ **“I have something for you… 💌 →”** button.
5. **Scene 5 — Realistic Envelope Opening**:
   - Shows `assets/sealed_envelope.png` $\rightarrow$ tap envelope $\rightarrow$ animates and transitions smoothly to `assets/opened_envelope.png` $\rightarrow$ smoothly transitions into the stationery letter.
6. **Scene 6 — Physical Stationery Letter & Typewriter Reveal**:
   - Beautiful physical stationery card with `assets/letter_card.png` accent and calligraphy heading.
   - Message is revealed **character-by-character** in real time with a blinking writing cursor.
   - Realistic flower petals and confetti (`assets/petals_confetti.png`) cascade down the screen on the canvas.
   - **“One Last Thing 🎂 →”** button appears once writing completes.
7. **Scene 7 — Final Birthday Scene (The Emotional Reveal)**:
   - Floating petals drift down softly.
   - The **Sister's Photo** inside a soft cream/white frame with subtle depth and delicate pastel floral accents gently fades in and scales from 95% $\rightarrow$ 100%.
   - Heading reveal: *"Happy Birthday, Didi! ❤️"*
   - Message: *"Thank you for always being there. I’m truly lucky to have you as my sister."*
   - Sign-off: *"Made with ❤️ by your brother"*.
   - **“↺ Replay Surprise”** button.
