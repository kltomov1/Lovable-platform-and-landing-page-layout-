import { useEffect, useRef, useState, type ReactNode } from "react";

export function SlideLayout({ children, className = "" }: { children: ReactNode; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(Math.min(entry.contentRect.width / 1920, entry.contentRect.height / 1080));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className={`scaled-slide ${className}`}><div className="slide-wrapper" style={{ transform: `scale(${scale})` }}>{children}</div></div>;
}