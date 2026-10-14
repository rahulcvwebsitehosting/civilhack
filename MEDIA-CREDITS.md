# Character cinema assets

The site bundles short character excerpts locally so playback does not depend on a third-party iframe, login, or soundboard. The anime and characters belong to their respective Jujutsu Kaisen rights holders; these are fan-site excerpts, not original animation or licensed official promotional assets. The Gojo and Sukuna cinematics use 1920×1080 excerpts; the short technique loops retain their available source-native resolutions (320–640 pixels wide) without artificial upscaling. The original high-resolution illustrated posters remain as loading/error fallbacks.

| Character | Video source | Individual voice source |
| --- | --- | --- |
| Gojo / Unlimited Void | [Tenor](https://tenor.com/view/unlimited-void-jujutsu-kaisen-gojo-satoru-domain-expansion-gif-18311612088469828438) | [English dub excerpt](https://www.youtube.com/watch?v=2W5KS5-ZXWQ) |
| Megumi / Chimera Shadow Garden | [Tenor](https://tenor.com/view/megumi-jujutsu-kaisen-gif-21011126) | [English dub excerpt](https://www.youtube.com/watch?v=PybMM91VTC8) |
| Nobara / Resonance | [Tenor](https://tenor.com/view/nobara-nobara-kugisaki-kugisaki-resonance-straw-doll-technique-gif-7223643587760058076) | [English dub excerpt](https://www.youtube.com/watch?v=MQCz4Hg99S0) |
| Yuji / Black Flash | [Tenor](https://tenor.com/view/jujutsu-kaisen-black-flash-yuji-itadori-gif-20457368) | [English dub excerpt](https://www.youtube.com/watch?v=pUPd-bHWVUA) |
| Sukuna / Malevolent Shrine | [Crunchyroll Dubs: Domain Expansion!](https://www.youtube.com/watch?v=vmrBXvlUHb0) | [English dub excerpt](https://www.youtube.com/watch?v=vmrBXvlUHb0) |

The additional opening cinematic, `gojo-cinema.mp4`, is a [1080p Gojo excerpt, 00:00–00:13](https://www.youtube.com/watch?v=nmvkhLz8t7I).

Files live in `public/assets/jjk/media`. All five character voices now use English dub excerpts, with explicit `-en.mp3` filenames to avoid cached Japanese playback. Voices are trimmed to technique calls and normalized to -18 LUFS with a -2 dB true-peak target. Sukuna’s long pause is shortened while preserving the English delivery. Corrected source ranges: Gojo 0–8 s; Megumi 15.1–21.4 s; Nobara 0–7.5 s; Yuji 18.9–21.7 s; Sukuna 61.9–65.4 s + 70.8–75.2 s from the official Crunchyroll Dubs clip, using the same cut for video and audio. The complete technique names are retained. Audio completion controls the entrance duration; pausing visual motion does not disable speech. The main page includes a user-triggered intro voice button. Audio owners prevent arena cleanup from cancelling entrance playback. The 1080p Sukuna scene is shared by his hero, entrance, domain manifestation and technique stage. Nobara uses Resonance and Yuji uses the animated Black Flash technique; the interface does not invent Domain Expansion chants for them. Audio starts only after a release, domain selection, or entry button is pressed. The navigation and arena share one mute control. Video is always muted and pauses when offscreen, in a hidden browser tab, or when energy is paused.

Bangers and Rubik Glitch are self-hosted in `public/assets/fonts` under their accompanying SIL Open Font Licenses. Body and small navigation text keep their readable existing fonts.

## Verification

- TypeScript and production build.
- Browser playback state and changing video time for the opening scene and all five sorcerers.
- Individual audio playback, shared mute, character changes, and animation pause/resume.
- Desktop and phone layout; keyboard character tabs. Touch handlers receive horizontal swipe coordinates without cancelling native vertical scrolling.
