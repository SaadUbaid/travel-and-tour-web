import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { useTravel } from "../state";
export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const region = useRef<HTMLElement>(null);
  const { paused } = useTravel();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobileFilm] = useState(() => matchMedia("(max-width: 680px)").matches);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    let frame = 0;
    let restart: ReturnType<typeof setTimeout> | undefined;
    let inView = true;
    let active = true;
    const monitor = () => {
      if (!active || v.paused || !inView || document.hidden) {
        frame = 0;
        return;
      }
      if (v.duration && Number.isFinite(v.duration)) {
        const opacity = Math.min(
          1,
          v.currentTime / 0.5,
          (v.duration - v.currentTime) / 0.5,
        );
        v.style.opacity = String(Math.max(0, opacity));
      }
      frame = requestAnimationFrame(monitor);
    };
    const play = () => {
      if (!paused && !document.hidden && inView) {
        v.play()
          .then(() => {
            if (active && !frame) frame = requestAnimationFrame(monitor);
          })
          .catch(() => {
            if (active) setReady(false);
          });
      } else {
        v.pause();
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const ended = () => {
      v.style.opacity = "0";
      restart = setTimeout(() => {
        v.currentTime = 0;
        play();
      }, 100);
    };
    const visibility = () => play();
    v.addEventListener("ended", ended);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        play();
      },
      { threshold: 0.02 },
    );
    if (region.current) observer.observe(region.current);
    if (!paused) {
      play();
    } else {
      v.pause();
      v.style.opacity = "1";
    }
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      clearTimeout(restart);
      v.removeEventListener("ended", ended);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      v.pause();
    };
  }, [paused]);
  return (
    <section className="home-hero" ref={region}>
      <div className="hero-film" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}video/attabad-poster.webp`}
          alt=""
          fetchPriority="high"
        />
        {!failed && (
          <video
            ref={video}
            src={`${import.meta.env.BASE_URL}video/attabad${mobileFilm ? "-mobile" : ""}.mp4`}
            poster={`${import.meta.env.BASE_URL}video/attabad-poster.webp`}
            muted
            playsInline
            autoPlay={!paused}
            preload="metadata"
            onPlaying={() => setReady(true)}
            onError={() => {
              setFailed(true);
              setReady(false);
            }}
          />
        )}
        <div className="film-fade" />
      </div>
      <div className="hero-copy">
        <h1 className="hero-reveal">
          Discover Pakistan.
          <br />
          Unforgettable <span className="text-accent">Northern Tours.</span>
        </h1>
        <p className="hero-reveal">
          Customized family and group tours across Hunza, Skardu, Swat, Naran & Kashmir. Planned personally with Saadi.
        </p>
      </div>
      <div className="hero-bottom">
        <div className="film-caption">
          <MapPin size={15} />
          <span>
            Attabad Lake, Hunza
            <small>
              {failed
                ? "A view from the north"
                : ready
                  ? "A moment from the north"
                  : "Gilgit-Baltistan, Pakistan"}
            </small>
          </span>
        </div>
        <button
          className="scroll-cue"
          onClick={() =>
            document
              .getElementById("journeys")
              ?.scrollIntoView({ behavior: paused ? "instant" : "smooth" })
          }
        >
          <span>Explore destinations</span>
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
}
