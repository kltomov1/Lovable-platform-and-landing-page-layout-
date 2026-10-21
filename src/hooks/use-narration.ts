import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES } from "@/lib/narration";

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  return (
    en.find((v) => /google us english/i.test(v.name)) ??
    en.find((v) => /natural|neural|premium/i.test(v.name)) ??
    en.find((v) => v.lang === "en-US") ??
    en[0] ??
    null
  );
}

interface UseNarrationOptions {
  slideIndex: number;
  onAdvance: () => void;
}

/**
 * Speaks the narration for the current slide and advances when it ends,
 * giving a seamless read-through of the whole deck.
 */
export function useNarration({ slideIndex, onAdvance }: UseNarrationOptions) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Warm up the voice list (loads async in some browsers).
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      voiceRef.current = pickVoice();
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [supported]);

  useEffect(() => {
    if (!supported || !playing || muted) return;
    const slide = SLIDES[slideIndex];
    if (!slide) return;

    const utterance = new SpeechSynthesisUtterance(slide.narration);
    utterance.rate = 1;
    utterance.pitch = 1;
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.onend = () => {
      if (slideIndex < SLIDES.length - 1) {
        onAdvance();
      } else {
        setPlaying(false);
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => {
      utterance.onend = null;
      window.speechSynthesis.cancel();
    };
  }, [supported, playing, muted, slideIndex, onAdvance]);

  const play = useCallback(() => setPlaying(true), []);
  const pause = useCallback(() => {
    setPlaying(false);
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m && supported) window.speechSynthesis.cancel();
      return !m;
    });
  }, [supported]);

  return { supported, playing, muted, play, pause, toggleMute };
}
