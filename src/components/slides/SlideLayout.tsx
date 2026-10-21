import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Renders a 1920x1080 slide scaled to fit its container.
 * The parent must have a defined size and position: relative.
 */
export function ScaledSlide({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / 1920, r.height / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="slide-wrapper" style={{ "--scale": scale } as CSSProperties}>
        <div className="slide-content">{children}</div>
      </div>
    </div>
  );
}
