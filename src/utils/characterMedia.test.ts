import { test } from "node:test";
import assert from "node:assert/strict";
import { claimCharacterMedia, releaseCharacterMedia, stopCharacterMedia } from "./characterMedia";

function video() {
  const media = { muted: false, paused: false, pause: () => { media.paused = true; } };
  return media as unknown as HTMLVideoElement;
}

test("a new cinematic stops and mutes the previous character", () => {
  const first = video();
  const second = video();
  let interruptions = 0;
  claimCharacterMedia(first, () => interruptions++);
  claimCharacterMedia(second, () => {});
  assert.equal(first.paused, true);
  assert.equal(first.muted, true);
  assert.equal(interruptions, 1);
  assert.equal(second.paused, false);
  stopCharacterMedia();
});

test("cleanup from an old scene cannot cancel the current scene", () => {
  const first = video();
  const second = video();
  let interrupted = false;
  claimCharacterMedia(first, () => {});
  claimCharacterMedia(second, () => { interrupted = true; });
  releaseCharacterMedia(first);
  assert.equal(second.paused, false);
  stopCharacterMedia();
  assert.equal(interrupted, true);
});

test("the same video does not interrupt itself and release is silent", () => {
  const current = video();
  let interrupted = false;
  claimCharacterMedia(current, () => { interrupted = true; });
  claimCharacterMedia(current, () => {});
  releaseCharacterMedia(current);
  stopCharacterMedia();
  assert.equal(interrupted, false);
  assert.equal(current.muted, true);
});
