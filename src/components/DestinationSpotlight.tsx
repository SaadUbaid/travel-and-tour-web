import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, RotateCcw } from "lucide-react";
import { captions, photo, trips } from "../data";
import { useTravel } from "../state";

const places = ["hunza", "skardu", "swat", "kashmir"].map((id) =>
  trips.find((trip) => trip.id === id)!,
);

export default function DestinationSpotlight() {
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { paused } = useTravel();
  const section = useRef<HTMLElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const [filmReady, setFilmReady] = useState(false);
  const [mobileFilm] = useState(() => matchMedia("(max-width: 680px)").matches);
  const animations = useRef<Animation[]>([]);
  const replay = useRef<() => void>(() => {});
  const visited = useRef(false);
  const place = places[selected];

  useEffect(() => {
    const video = film.current;
    const root = section.current;
    if (
      !video ||
      !root ||
      paused ||
      selected !== 0 ||
      typeof IntersectionObserver === "undefined"
    ) {
      video?.pause();
      return;
    }
    let visible = false;
    let active = true;
    const sync = () => {
      if (visible && !document.hidden) {
        video.play().catch(() => {
          if (active) setFilmReady(false);
        });
      } else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.02 },
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [paused, selected]);

  useEffect(() => {
    const el = pill.current;
    const overlay = line.current;
    const root = section.current;
    if (
      !el ||
      !overlay ||
      !root ||
      !el.animate ||
      typeof IntersectionObserver === "undefined"
    )
      return;
    const cancel = () => {
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
    };
    const stop = () => {
      cancel();
      setAnimating(false);
    };
    const play = (reverse = false) => {
      cancel();
      if (paused) return;
      const mobile = matchMedia("(max-width: 720px)").matches;
      const { width, height } = el.getBoundingClientRect();
      const dimension = mobile ? "height" : "width";
      const end = mobile ? height : width;
      const circle = mobile ? height * 0.55 : height;
      const closedClip = mobile ? "inset(0 50%)" : "inset(50% 0)";
      const ease = "cubic-bezier(.4,0,.2,1)";
      const frames = [
        { [dimension]: "2px", clipPath: closedClip, offset: 0 },
        {
          [dimension]: "2px",
          clipPath: "inset(0)",
          offset: 0.14,
          easing: ease,
        },
        {
          [dimension]: `${end * 0.08}px`,
          clipPath: "inset(0)",
          offset: 0.3,
          easing: ease,
        },
        {
          [dimension]: `${circle}px`,
          clipPath: "inset(0)",
          offset: 0.58,
          easing: ease,
        },
        { [dimension]: `${end}px`, clipPath: "inset(0)", offset: 1 },
      ];
      const options: KeyframeAnimationOptions = {
        duration: reverse ? 800 : 2100,
        direction: reverse ? "reverse" : "normal",
        fill: "both",
      };
      setAnimating(true);
      const reveal = el.animate(frames, options);
      const hairline = overlay.animate(
        [
          { opacity: 1, offset: 0 },
          { opacity: 1, offset: 0.14 },
          { opacity: 0, offset: 0.3 },
          { opacity: 0, offset: 1 },
        ],
        options,
      );
      animations.current = [reveal, hairline];
      reveal.onfinish = () => {
        if (reverse) play();
        else stop();
      };
    };
    replay.current = () => play(true);
    if (!paused && !visited.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          visited.current = true;
          observer.disconnect();
          play();
        },
        { threshold: 0.25 },
      );
      observer.observe(root);
      window.addEventListener("resize", stop);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", stop);
        cancel();
      };
    }
    stop();
    window.addEventListener("resize", stop);
    return () => {
      window.removeEventListener("resize", stop);
      cancel();
    };
  }, [paused]);

  return (
    <section
      className="destination-spotlight"
      ref={section}
      aria-label="Find your next destination"
    >
      <svg
        className="spotlight-lines"
        viewBox="0 0 1440 740"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M ${-360 + i * 85} 780 C ${720 + i * 40} 680, ${280 + i * 65} 200, ${900 + i * 80} -70`}
          />
        ))}
      </svg>
      <div className="wrap spotlight-content">
        <div className="spotlight-topline">
          <p>A little inspiration for your next escape.</p>
          <button
            className="spotlight-replay"
            disabled={paused || animating}
            onClick={() => replay.current()}
          >
            <RotateCcw size={14} aria-hidden="true" />
            {animating ? "Opening the view…" : "Replay reveal"}
          </button>
        </div>
        <div className="spotlight-stage">
          <h2 className="spotlight-word">
            Go
            <span className="sr-only">
              {" "}
              north. Explore Pakistan's destinations.
            </span>
          </h2>
          <div className="spotlight-pill" ref={pill}>
            <div className="spotlight-images">
              {places.map((item, index) => (
                <img
                  key={item.id}
                  src={photo(item.id)}
                  alt={captions[item.id]}
                  loading="lazy"
                  className={selected === index ? "is-active" : ""}
                  aria-hidden={selected !== index}
                />
              ))}
              <video
                ref={film}
                className={`spotlight-video ${filmReady && !paused && selected === 0 ? "is-active" : ""}`}
                src={`${import.meta.env.BASE_URL}video/attabad${mobileFilm ? "-mobile" : ""}.mp4`}
                poster={`${import.meta.env.BASE_URL}video/attabad-poster.webp`}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                onPlaying={() => setFilmReady(true)}
                onError={() => setFilmReady(false)}
              />
            </div>
            <div className="spotlight-hairline" ref={line} />
          </div>
          <span className="spotlight-word spotlight-north" aria-hidden="true">
            north.
          </span>
        </div>
        <div
          className="spotlight-choices"
          role="group"
          aria-label="Preview a destination"
        >
          {places.map((item, index) => (
            <button
              key={item.id}
              aria-pressed={selected === index}
              aria-controls="spotlight-details"
              onClick={() => setSelected(index)}
            >
              <span className="choice-indicator" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </div>
        <div className="spotlight-details" id="spotlight-details">
          <div
            className="spotlight-place"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="spotlight-region">
              <MapPin size={14} aria-hidden="true" />
              {place.region}
            </span>
            <h3>{place.name}</h3>
            <p>{place.line}</p>
          </div>
          <div className="spotlight-actions">
            <Link to={`/destinations/${place.id}`} className="button">
              Explore {place.name}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link to={`/tours?destination=${place.id}`} className="text-link">
              View tours
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
