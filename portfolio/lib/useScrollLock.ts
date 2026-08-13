"use client";

import { useEffect } from "react";

let lockCount = 0;
let savedScrollY = 0;

function applyLock() {
  savedScrollY = window.scrollY;
  const { style } = document.body;
  style.position = "fixed";
  style.top = `-${savedScrollY}px`;
  style.left = "0";
  style.right = "0";
  style.overflow = "hidden";
  style.width = "100%";
}

function clearLockStyles() {
  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.overflow = "";
  style.width = "";
}

function lockBodyScroll() {
  if (lockCount === 0) {
    applyLock();
  }
  lockCount++;
}

function unlockBodyScroll(restoreScroll = true) {
  if (lockCount <= 0) return;
  lockCount--;
  if (lockCount > 0) return;

  const y = savedScrollY;
  clearLockStyles();
  if (restoreScroll) {
    window.scrollTo(0, y);
  }
}

/**
 * Unlock body scroll without restoring the pre-menu position.
 * Call before scrolling to a nav target while the mobile menu was open.
 */
export function releaseScrollLockForNavigation() {
  if (lockCount <= 0) return false;

  lockCount = 0;
  clearLockStyles();
  window.scrollTo(0, savedScrollY);
  return true;
}

export function isBodyScrollLocked() {
  return lockCount > 0 || document.body.style.position === "fixed";
}

/** Locks body scroll — preserves position on iOS when unlocking. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockBodyScroll();
    return () => unlockBodyScroll(true);
  }, [locked]);
}
