import { ArrowUpRight, Fingerprint, Sparkles, Users, ArrowRight } from "lucide-react";
import cover from "@/assets/edge-cover.jpg";
import deck from "./deck.json";

export { deck };

export function EdgeSlide({ index }: { index: number }) {
  const slide = deck[index] ?? deck[0];
  if (!slide) return null;
  const hero = index === 0;
  const statement = index === 1 || index === 5;
  const icons = [Fingerprint, Users, Sparkles, ArrowUpRight];
  return <article className={`slide-content ${hero ? "slide-cover" : ""} ${statement ? "slide-statement" : ""}`}>
    {hero && <img src={cover} alt="A confident woman in a blue shirt beside a sunlit wall" className="slide-cover-photo" width={1920} height={1088} />}
    <div className="slide-brand"><Fingerprint size={30} /><span>FIND YOUR EDGE</span></div>
    <div className={hero ? "slide-cover-copy" : "slide-main-copy"}>
      <p className="slide-kicker">{slide.kicker}</p>
      <h1 className={hero ? "slide-title-lg" : "slide-title"}>{hero ? <>Find<br />Your <em>Edge.</em></> : slide.title}</h1>
      <p className={statement ? "slide-body-lg" : "slide-subtitle"}>{slide.subtitle}</p>
      {hero && <div className="slide-cover-rule"><span>REFLECT</span><span>VALIDATE</span><span>EXPRESS <ArrowUpRight size={26}/></span></div>}
      {slide.items && <div className={`slide-items ${slide.items.length === 4 ? "slide-items-four" : ""} ${index === 7 ? "slide-loop" : ""}`}>
        {slide.items.map(([title, text], i) => {
          const Icon = icons[i % icons.length] ?? Fingerprint;
          return <div className="slide-item" key={title}><div className="slide-item-icon">{index === 3 || index === 4 || index === 8 ? <span>0{i + 1}</span> : <Icon size={42}/>}</div><h2 className="slide-item-title">{title}</h2><p className="slide-body">{text}</p>{index === 7 && i < 2 && <ArrowRight className="loop-arrow" size={44}/>}</div>;
        })}
      </div>}
      {statement && <div className="statement-mark"><ArrowUpRight size={160} strokeWidth={1}/></div>}
    </div>
    <footer className="slide-footer"><span>YOUR DIFFERENCE. YOUR STRENGTH.</span><span>{String(index + 1).padStart(2,"0")} / 09</span></footer>
  </article>;
}