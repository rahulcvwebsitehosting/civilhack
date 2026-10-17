# Playback and website checks

Reviewed on **17 October 2026** for Inno360's Jujutsu Chapter update.

## What changed

- Unlimited Void now lasts about **16 seconds**, covering the domain call and reveal. The extended fight and aftermath are removed.
- Deadly Sentencing uses a new excerpt with **original Japanese dialogue**. The previous excerpt had no dialogue during the domain opening.
- The other techniques have focused cuts, including Nobara's actual Resonance call.
- Every active clip contains video and audio in the same MP4. There is no separate voice track to drift while video buffers.
- Pause, replay, sound and close controls work above the cinematic layers. Manual pause survives visibility updates.
- Mobile cinematics no longer show duplicate stage copy over the reveal. User-requested playback also works with decorative animations paused.

## Automated checks

| Check | Result |
| --- | --- |
| TypeScript (`npm run lint`) | Passed |
| Playback ownership and audio utility tests (`npm test`) | 7 passed |
| Production build (`npm run build`) | Passed |
| Asset audit (`npm run media:check`) | All 10 passed |
| Whitespace and patch checks (`git diff --check`) | Passed |

The asset audit fully decodes each clip, checks H.264 video and AAC audio, stream alignment, non-silent audio levels, duration limits and fast-start MP4 layout. Dialogue and visual cuts were reviewed separately, using source frames and local transcription to locate the calls.

| Technique | Duration | Audio |
| --- | --- | --- |
| Unlimited Void | 15.62 s | English |
| Malevolent Shrine | 14.64 s | English |
| Chimera Shadow Garden | 9.80 s | English |
| Coffin of the Iron Mountain | 11.31 s | English |
| Self-Embodiment of Perfection | 5.84 s | English |
| Horizon of the Captivating Skandha | 8.12 s | Japanese |
| Deadly Sentencing | 11.90 s | Japanese |
| Idle Death Gamble | 11.13 s | Japanese, fan animation |
| Resonance | 7.40 s | English |
| Black Flash | 4.40 s | English |

## Browser checks

Tested in the Chromium-based in-app browser, including a **390 × 844** phone viewport:

- All ten arena techniques loaded and played with exactly one audible video and no separate audio element.
- Pause, resume, replay, sound toggle and close changed the actual player state.
- Keyboard navigation selected the expected character tab.
- Domain selection closed its selector, displayed the cinematic and persisted the theme after reload without automatically playing sound.
- Hero preview opened a full cinematic; Escape dismissed it.
- The 15.62-second Unlimited Void entrance completed naturally and opened `/portal`.
- Explicit domain playback remained available with decorative animations paused.
- A deliberately blocked media request showed the unavailable message. Removing the block and retrying recovered playback.
- A simulated slow connection displayed the loading state without a separate soundtrack running ahead.
- Phone layout stayed within the viewport; playback buttons measured at least 44 pixels high.
- Direct visits to `/portal`, `/event`, `/register`, `/status`, `/review` and `/reviews` displayed their expected pages.
- Transport search found route 26 and its departure/contact details.

These checks cover the tested browser and simulated conditions. Physical iOS/Safari devices and every possible network or browser combination were not tested.
