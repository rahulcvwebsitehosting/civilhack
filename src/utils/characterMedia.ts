/** One foreground media element owns both picture and sound. */
let active: { video: HTMLVideoElement; interrupt: () => void } | null = null;

export function stopCharacterMedia() {
  const previous = active;
  active = null;
  if (!previous) return;
  previous.video.pause();
  previous.video.muted = true;
  previous.interrupt();
}

export function claimCharacterMedia(video: HTMLVideoElement, interrupt: () => void) {
  if (active?.video === video) return;
  stopCharacterMedia();
  active = { video, interrupt };
}

export function releaseCharacterMedia(video: HTMLVideoElement) {
  video.pause();
  video.muted = true;
  if (active?.video === video) active = null;
}
