import { test } from "node:test";
import assert from "node:assert/strict";

class FakeAudio extends EventTarget {
  preload = ""; hidden = false; dataset: Record<string, string> = {}; volume = 1;
  currentTime = 0; paused = true; removed = false;
  constructor(public src: string) { super(); }
  load() {}
  play() { this.paused = false; return Promise.resolve(); }
  pause() { this.paused = true; }
  remove() { this.removed = true; }
}

Object.defineProperty(globalThis, "window", { value: new EventTarget(), configurable: true });
Object.defineProperty(globalThis, "Audio", { value: FakeAudio, configurable: true });
Object.defineProperty(globalThis, "document", { value: { body: { appendChild() {} } }, configurable: true });
const { playCharacterVoice, preloadCharacterVoice, stopCharacterVoice } = await import("./characterAudio");
const { toggleMute } = await import("./cyberSound");

test("voice completion waits for the entire audio, including the technique name", async () => {
  let complete = false;
  const promise = playCharacterVoice("gojo-void", "entry").then(() => { complete = true; });
  await Promise.resolve();
  assert.equal(complete, false);
  preloadCharacterVoice("gojo-void").dispatchEvent(new Event("ended"));
  await promise;
  assert.equal(complete, true);
});

test("arena cleanup cannot stop the main-page entry voice", async () => {
  const promise = playCharacterVoice("sukuna-shrine", "home-entry");
  const audio = preloadCharacterVoice("sukuna-shrine");
  stopCharacterVoice("arena");
  assert.equal(audio.paused, false);
  audio.dispatchEvent(new Event("ended"));
  await promise;
});

test("old voice events cannot cut off a new character", async () => {
  const first = playCharacterVoice("gojo-void", "first");
  const second = playCharacterVoice("sukuna-shrine", "second");
  await first;
  preloadCharacterVoice("gojo-void").dispatchEvent(new Event("ended"));
  assert.equal(preloadCharacterVoice("sukuna-shrine").paused, false);
  stopCharacterVoice("second");
  await second;
});

test("shared mute cancels a complete-line wait and stops playback", async () => {
  const promise = playCharacterVoice("gojo-void", "entry");
  toggleMute();
  await promise;
  assert.equal(preloadCharacterVoice("gojo-void").paused, true);
  toggleMute();
});
