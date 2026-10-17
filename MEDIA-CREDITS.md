# Character media credits

## Current shipped clips

The active player uses only `*-synced.mp4` files. Each file contains H.264 video and its matching AAC soundtrack, cut together from the same source. The focused cuts include the call, formation and reveal; extended commentary and fight aftermath are excluded.

| Character technique | Source | Source interval | Audio |
| --- | --- | --- | --- |
| Unlimited Void | [Source excerpt](https://www.youtube.com/watch?v=WR8CG04EPKM) | 139.2–154.8s | English |
| Malevolent Shrine | [Source excerpt](https://www.youtube.com/watch?v=vmrBXvlUHb0) | 61.7–76.3s | English |
| Chimera Shadow Garden | [Source excerpt](https://www.youtube.com/watch?v=PybMM91VTC8) | 15.8–25.6s | English |
| Coffin of the Iron Mountain | [Source excerpt](https://www.youtube.com/watch?v=WR8CG04EPKM) | 104.7–116.0s | English |
| Self-Embodiment of Perfection | [Source excerpt](https://www.youtube.com/watch?v=CkdkJA483Bg) | 4.7–10.5s | English |
| Horizon of the Captivating Skandha | [Source excerpt](https://www.youtube.com/watch?v=0vMyzf7O-Kw) | 0.2–8.3s | Japanese |
| Deadly Sentencing | [Source excerpt](https://www.youtube.com/watch?v=LsNH0n5tpdI) | 25.6–37.5s | Japanese |
| Idle Death Gamble | [Source excerpt](https://www.youtube.com/watch?v=nGErCvPx3QQ) | 0.0–11.1s | Japanese (fan animation) |
| Resonance | [Source excerpt](https://www.youtube.com/watch?v=3LURkU25248) | 216.0–223.4s | English |
| Black Flash | [Source excerpt](https://www.youtube.com/watch?v=pUPd-bHWVUA) | 18.4–22.8s | English |

Deadly Sentencing uses the original Japanese domain call from a replacement source. The previous source had a dialogue-free opening. Nobara now uses the actual Straw Doll Technique / Resonance sequence rather than an unrelated earlier fight passage. Hakari is fan animation by Roy Animeshon, not an official anime scene. The language and fan-animation labels are shown in the interface.

## Playback

- All tracks are encoded together; there is no separately timed MP3 in the current interface.
- A single foreground clip owns sound. Ambient loops remain muted.
- Explicit playback offers pause, replay, shared mute and close; Escape also closes a cinematic.
- Buffering shows a loading state, and browser autoplay restrictions offer a user-gesture retry.
- Decorative motion can be paused separately; user-requested cinematics remain controllable.
- Audio is normalized to a -16 LUFS target and -1.5 dB true peak target before AAC encoding.
- File URLs use a revision query to avoid reusing previous long or quiet clips.

## Quality checks

Reviewed source boundaries and expected duration limits live in `src/data/character-media.json`. Run `npm run media:check` for decode, codec, audio level, stream alignment, duration and fast-start checks. Media decoding and nonzero levels do not, by themselves, prove the dialogue is correct: cuts were also reviewed with source frames and local speech transcription.

## Other assets

Original illustrated posters and extracted source stills provide loading/error fallbacks. Historical short MP4 and MP3 assets remain in the repository but are not requested by the active player. Artwork history is documented in `ARTWORK.md` and `TECHNIQUE-ARTWORK.md`.

Bangers and Rubik Glitch are self-hosted with their accompanying SIL Open Font Licences. The Sukuna-inspired vector favicon is a custom illustration with PNG/ICO fallbacks.

Jujutsu Kaisen footage, characters and names belong to their respective rights holders. This unofficial themed college-event project does not claim ownership, official affiliation or a licence to redistribute third-party media. Source links provide attribution, not reuse permission.
