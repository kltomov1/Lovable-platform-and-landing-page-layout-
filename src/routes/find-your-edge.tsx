import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Fingerprint, Grid2X2, Maximize, Minimize, Mic, Pause, Play, RotateCcw, StickyNote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EdgeSlide, deck } from "@/components/presentation/EdgeSlide";
import { SlideLayout } from "@/components/presentation/SlideLayout";
import sampleAudio from "@/assets/edge-sample-narration.mp3.asset.json";
import audioTiming from "@/components/presentation/audio-timing.json";

export const Route = createFileRoute("/find-your-edge")({
  validateSearch: (search: Record<string, unknown>) => ({ slide: Math.floor(Math.min(9, Math.max(1, Number(search["slide"]) || 1))), print: search["print"] === true || search["print"] === "true" }),
  head: () => ({ meta: [
    { title: "Find Your Edge — A narrated presentation" },
    { name: "description", content: "Discover, own, and express your unique strengths in this nine-slide Find Your Edge presentation." },
    { property: "og:title", content: "Find Your Edge — Discover your unique strengths" },
    { property: "og:description", content: "A presentation about authenticity, confidence, and genuine connection." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Presentation,
});

function Presentation() {
  const { slide, print } = Route.useSearch();
  const navigate = Route.useNavigate();
  const index = Math.floor(slide) - 1;
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [grid, setGrid] = useState(false);
  const [notes, setNotes] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const surface = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const audioIndex = useRef(index);
  const go = useCallback((next: number, seek = true) => {
    const target = Math.min(deck.length - 1, Math.max(0, next));
    audioIndex.current = target;
    if (seek && audio.current) audio.current.currentTime = audioTiming.starts[target] ?? 0;
    void navigate({ search: { slide: target + 1, print: false }, replace: true });
  }, [navigate]);
  const togglePlayback = useCallback(async () => {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    if (player.ended) go(0);
    setAudioError(false);
    try { await player.play(); } catch { setAudioError(true); setPlaying(false); }
  }, [go]);
  useEffect(() => {
    document.title = `${index + 1}/${deck.length} — ${deck[index]?.title ?? "Find Your Edge"}`;
  }, [index]);
  useEffect(() => {
    if (audioIndex.current === index) return;
    audioIndex.current = index;
    if (audio.current) audio.current.currentTime = audioTiming.starts[index] ?? 0;
  }, [index]);
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  async function toggleFullscreen() {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await surface.current?.requestFullscreen();
  }
  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "ArrowRight") go(index + 1);
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === " ") { event.preventDefault(); void togglePlayback(); }
      if (event.key.toLowerCase() === "g") setGrid(value => !value);
      if (event.key === "Escape") setGrid(false);
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [go, index, togglePlayback]);
  if (print) return <main className="deck-print">{deck.map((s, i) => <div className="print-slide" key={s.id}><EdgeSlide index={i}/></div>)}</main>;
  return <main className="presentation-app" ref={surface}>
    <audio ref={audio} src={sampleAudio.url} preload="auto" onLoadedMetadata={() => { if (audio.current) audio.current.currentTime = audioTiming.starts[index] ?? 0; }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => {setAudioError(true); setPlaying(false);}} onTimeUpdate={() => {
      const time = audio.current?.currentTime ?? 0;
      const current = audioTiming.starts.findLastIndex(start => time >= start);
      if (current >= 0 && current !== audioIndex.current) go(current, false);
    }}/>
    <header className="presentation-toolbar">
      <div className="presentation-wordmark"><Fingerprint size={23}/><span>Find Your Edge</span><span className="deck-label">PRESENTATION</span></div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Slide overview" aria-label="Slide overview" onClick={() => setGrid(value => !value)}><Grid2X2/></Button>
        <Button variant="ghost" size="icon" title="Presenter notes" aria-label="Presenter notes" onClick={() => setNotes(value => !value)}><StickyNote/></Button>
        <Button variant="outline" onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize/> : <Maximize/>}<span className="present-label">{fullscreen ? "Exit" : "Present"}</span></Button>
      </div>
    </header>
    <div className="presentation-workspace">
      <aside className="deck-sidebar" aria-label="Slides">{deck.map((s, i) => <Button key={s.id} variant="ghost" className={`thumbnail-button ${i === index ? "selected" : ""}`} onClick={() => { go(i); setGrid(false); }} aria-label={`Slide ${i+1}: ${s.title}`}><span className="thumbnail-number">{String(i+1).padStart(2,"0")}</span><div className="thumbnail-visual"><SlideLayout><EdgeSlide index={i}/></SlideLayout></div><span className="thumbnail-title">{s.title}</span></Button>)}</aside>
      <section className="presentation-center">
        <div className="deck-breadcrumb"><span>PERSONAL GROWTH</span><span>Chapter {String(index+1).padStart(2,"0")} <span className="text-muted-foreground">/ 09</span></span></div>
        {grid ? <div className="deck-grid">{deck.map((s, i) => <Button key={s.id} variant="ghost" className="grid-thumbnail" onClick={() => {go(i); setGrid(false);}}><div><SlideLayout><EdgeSlide index={i}/></SlideLayout></div><span>{i+1}. {s.title}</span></Button>)}</div> : <div className="deck-canvas" onTouchStart={e => {touchStart.current = e.touches[0]?.clientX ?? null;}} onTouchEnd={e => { const end=e.changedTouches[0]?.clientX; if(touchStart.current !== null && end !== undefined && Math.abs(end-touchStart.current)>50) go(index+(end<touchStart.current?1:-1)); touchStart.current=null; }}><SlideLayout><EdgeSlide index={index}/></SlideLayout></div>}
        <div className="deck-player">
          <div className="player-top"><div className="flex items-center gap-3"><Button aria-label={playing ? "Pause sample voiceover" : "Play sample voiceover"} title={playing ? "Pause sample voiceover" : "Play sample voiceover"} size="icon" onClick={() => void togglePlayback()}>{playing ? <Pause/> : <Play/>}</Button><div><p className="player-name">{playing ? "Playing sample voiceover" : "Sample voiceover"}</p><p className="player-detail"><Mic size={12}/> {audioError ? "Audio unavailable — try playing again" : "English · AI-generated placeholder"}</p></div></div><span className="player-time">{String(index+1).padStart(2,"0")} / 09</span><div className="flex items-center gap-1"><Button variant="ghost" size="icon" title="Restart presentation" aria-label="Restart presentation" onClick={() => {audio.current?.pause();go(0);setPlaying(false);}}><RotateCcw/></Button><Button variant="ghost" size="icon" aria-label="Previous slide" title="Previous slide" disabled={index === 0} onClick={() => go(index-1)}><ArrowLeft/></Button><Button variant="ghost" size="icon" aria-label="Next slide" title="Next slide" disabled={index === deck.length-1} onClick={() => go(index+1)}><ArrowRight/></Button></div></div>
          <div className="deck-progress" aria-label="Presentation progress">{deck.map((s,i) => <span key={s.id} className={i < index ? "complete" : i === index ? "current" : ""}/>)}</div>
        </div>
        {notes && <section className="deck-notes"><div className="flex items-center justify-between"><h2>Narration draft</h2><Button variant="ghost" size="icon" aria-label="Close notes" onClick={() => setNotes(false)}><X/></Button></div><p>{deck[index]?.narration}</p></section>}
        <footer className="deck-app-footer"><Link to="/">Back to course</Link><span>REFLECT. VALIDATE. EXPRESS.</span></footer>
      </section>
    </div>
  </main>;
}