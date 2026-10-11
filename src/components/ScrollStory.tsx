import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTravel } from "../state";
import { photo, secondPhoto, captions } from "../data";
import type { Trip } from "../data";
gsap.registerPlugin(ScrollTrigger);
export default function ScrollStory({
  trip,
  onPlan,
  planLabel = "Book this tour",
  backTo = "/tours",
  backLabel = "All tours",
  skipLabel = "View itinerary",
  tourCount,
}: {
  trip: Trip;
  onPlan?: () => void;
  planLabel?: string;
  tourCount?: number;
  backTo?: string;
  backLabel?: string;
  skipLabel?: string;
}) {
  const rig = useRef<HTMLElement>(null),
    stage = useRef<HTMLDivElement>(null),
    cards = useRef<HTMLDivElement>(null);
  const { paused, openPlanner } = useTravel();
  const plan = onPlan || (() => openPlanner(trip.id));
  const [chapter, setChapter] = useState(0);
  const [slide, setSlide] = useState(0);
  const secondaryCaption =
    trip.id === "northern-loop" ? captions.skardu : captions[trip.id];
  const skip = () =>
    document
      .getElementById("itinerary")
      ?.scrollIntoView({ behavior: paused ? "instant" : "smooth" });
  useLayoutEffect(() => {
    if (paused || !rig.current) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rig.current,
          start: "top top+=80",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (s) =>
            setChapter(s.progress < 0.27 ? 0 : s.progress < 0.68 ? 1 : 2),
        },
      });
      timeline
        .to(
          ".story-title",
          { y: -180, scale: 0.92, opacity: 0, duration: 0.25 },
          0,
        )
        .to(".story-welcome", { y: 60, opacity: 0, duration: 0.19 }, 0)
        .to(
          ".scene-left",
          {
            xPercent: -70,
            rotateY: -16,
            scale: 1.12,
            duration: 0.42,
            ease: "power1.inOut",
          },
          0.03,
        )
        .to(
          ".scene-right",
          {
            xPercent: 70,
            rotateY: 16,
            scale: 1.12,
            duration: 0.42,
            ease: "power1.inOut",
          },
          0.03,
        )
        .to(".scene-base", { scale: 1.02, duration: 1, ease: "none" }, 0)
        .fromTo(
          ".story-chapter",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.16 },
          0.27,
        )
        .fromTo(
          ".story-postcard",
          { y: 100, rotate: -8, opacity: 0 },
          { y: 0, rotate: 3, opacity: 1, duration: 0.2 },
          0.29,
        )
        .to(".story-chapter", { y: -60, opacity: 0, duration: 0.13 }, 0.61)
        .to(
          ".story-postcard",
          { y: -110, rotate: 8, opacity: 0, duration: 0.15 },
          0.59,
        )
        .fromTo(
          ".story-sights",
          { xPercent: 35, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.22 },
          0.68,
        )
        .to(".scene-base", { scale: 1.07, duration: 0.15 }, 0.85);
    }, rig);
    return () => ctx.revert();
  }, [trip.id, paused]);
  const shift = (amount: number) => {
    const row = cards.current;
    if (!row) return;
    const item = row.firstElementChild as HTMLElement;
    row.scrollBy({
      left: (item.offsetWidth + 20) * amount,
      behavior: paused ? "instant" : "smooth",
    });
  };
  if (paused)
    return (
      <section className="static-story">
        <div className="static-story-hero">
          <img src={photo(trip.id)} alt={captions[trip.id]} />
          <div className="story-vignette" />
          <div className="static-title">
            <span className="eyebrow">{trip.region} · Pakistan</span>
            <h1>{trip.name}</h1>
            <p>{trip.line}</p>
            <button className="button button-light" onClick={skip}>
              {skipLabel} <ArrowDown size={18} />
            </button>
          </div>
          <span className="scene-caption">
            <MapPin size={13} />
            {captions[trip.id]}
          </span>
        </div>
      </section>
    );
  return (
    <section
      className="story-rig"
      ref={rig}
      aria-label={`${trip.name} destination story`}
    >
      <div
        className="story-stage"
        ref={stage}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !stage.current) return;
          const r = stage.current.getBoundingClientRect();
          stage.current.style.setProperty(
            "--pointer-x",
            `${((e.clientX - r.left - r.width / 2) / r.width) * 10}px`,
          );
          stage.current.style.setProperty(
            "--pointer-y",
            `${((e.clientY - r.top - r.height / 2) / r.height) * 6}px`,
          );
        }}
        onPointerLeave={() => {
          stage.current?.style.setProperty("--pointer-x", "0px");
          stage.current?.style.setProperty("--pointer-y", "0px");
        }}
      >
        <div className="scene-parallax" aria-hidden="true">
          <img className="scene-base" src={secondPhoto(trip.id)} alt="" />
          <div className="scene-shutter scene-left">
            <img src={photo(trip.id)} alt="" fetchPriority="high" />
          </div>
          <div className="scene-shutter scene-right">
            <img src={photo(trip.id)} alt="" />
          </div>
        </div>
        <div className="story-vignette" />
        <div className="story-top">
          <Link to={backTo}>
            <ArrowLeft size={15} /> {backLabel}
          </Link>
          <button onClick={skip}>
            {skipLabel} <ArrowDown size={15} />
          </button>
        </div>
        <div className="story-title" aria-hidden={chapter !== 0}>
          <span className="eyebrow">{trip.region} · Pakistan</span>
          <h1>{trip.name}</h1>
          <span className="story-subtitle">
            A place to feel a little more alive.
          </span>
        </div>
        <div className="story-welcome" inert={chapter !== 0}>
          <p>{trip.line}</p>
          <div className="story-pills">
            <span>
              {tourCount != null
                ? `${tourCount} ${tourCount === 1 ? "tour" : "tours"} to this destination`
                : `${trip.days} ${trip.days === 1 ? "day" : "days"} of discovery`}
            </span>
            <span>{trip.type}</span>
          </div>
          <div className="destination-actions">
            <button className="button button-light" onClick={skip}>
              {skipLabel} <ArrowDown size={16} />
            </button>
            {tourCount == null && (
              <button className="button button-light" onClick={plan}>
                {planLabel} <ArrowUpRight size={16} />
              </button>
            )}
          </div>
          <span className="story-scroll">
            <span /> Scroll to explore <ArrowDown size={15} />
          </span>
        </div>
        <div
          className="story-chapter"
          inert={chapter !== 1}
          aria-hidden={chapter !== 1}
        >
          <span className="eyebrow">01 / A closer look</span>
          <h2>{trip.line}</h2>
          <p>{trip.description}</p>
          <div className="chapter-stats">
            <span>
              <strong>{String(tourCount ?? trip.days).padStart(2, "0")}</strong>
              <small>
                {tourCount != null
                  ? tourCount === 1
                    ? "Tour available"
                    : "Tour options"
                  : trip.days === 1
                    ? "Day away"
                    : "Days to explore"}
              </small>
            </span>
            <span>
              <strong>Your pace</strong>
              <small>A journey shaped around you</small>
            </span>
          </div>
        </div>
        <figure className="story-postcard" aria-hidden="true">
          <img src={photo(trip.id)} alt="" />
          <figcaption>
            {captions[trip.id]}
            <span>FIELD NOTES / PAKISTAN</span>
          </figcaption>
        </figure>
        <div
          className="story-sights"
          inert={chapter !== 2}
          aria-hidden={chapter !== 2}
        >
          <div className="sights-heading">
            <div>
              <span className="eyebrow">02 / Moments to make your own</span>
              <h2>
                A few things <span className="text-accent">to stay for.</span>
              </h2>
            </div>
            <button className="button button-light" onClick={plan}>
              {planLabel} <ArrowUpRight size={17} />
            </button>
          </div>
          <div
            className="sights-cards"
            ref={cards}
            onScroll={() => {
              const row = cards.current;
              if (row) {
                const child = row.firstElementChild as HTMLElement;
                setSlide(Math.round(row.scrollLeft / (child.offsetWidth + 20)));
              }
            }}
          >
            {trip.highlights.map((h, i) => (
              <article className="sight-card" key={h}>
                <div>
                  <span className="eyebrow">
                    0{i + 1} /{" "}
                    {["Take it in", "Explore a little", "Stay a while"][i]}
                  </span>
                  <MapPin size={20} strokeWidth={1.2} />
                </div>
                <h3>{h}</h3>
                <p>
                  {
                    [
                      "Make time for the views that brought you here.",
                      "Leave room in your route for a different perspective.",
                      "Slow down and enjoy being somewhere new.",
                    ][i]
                  }
                </p>
              </article>
            ))}
          </div>
          <div className="sights-controls">
            <span>0{Math.min(slide + 1, 3)} — 03</span>
            <div>
              <button
                className="icon-button"
                aria-label="Previous highlight"
                onClick={() => shift(-1)}
              >
                <ArrowLeft size={17} />
              </button>
              <button
                className="icon-button"
                aria-label="Next highlight"
                onClick={() => shift(1)}
              >
                <ArrowRight size={17} />
              </button>
              <button className="story-itinerary" onClick={skip}>
                {skipLabel} <ArrowDown size={15} />
              </button>
            </div>
          </div>
        </div>
        <div className="story-bottom">
          <span className="scene-caption">
            <MapPin size={13} />
            {chapter === 0 ? captions[trip.id] : secondaryCaption}
          </span>
          <div
            className="chapter-dots"
            aria-label={`Story chapter ${chapter + 1} of 3`}
          >
            {[0, 1, 2].map((n) => (
              <span key={n} className={chapter === n ? "active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
