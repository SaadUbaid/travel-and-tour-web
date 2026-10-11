import { useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Heart, MapPin } from "lucide-react";
import { useTravel } from "../state";
import { photo, captions, startingPrice, ratingLabel } from "../data";
import { tourHref } from "../booking";
import type { Trip, Destination } from "../data";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useTravel();
  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    const o = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("revealed");
            o.unobserve(el);
          }
        }),
      { threshold: 0.08 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [paused]);
  return (
    <div
      ref={ref}
      className={`reveal ${paused ? "revealed" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
export function WhatsAppIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function InstagramIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function GithubIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.65 2.2 3.14 1.56.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.65 10.65 0 0 1 5.57 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.5.4.34.75 1 .75 2.02v3c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export function FacebookIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`text-link ${className}`} to={to}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}

export function ProminentLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link className={`button btn-prominent ${className}`} to={to}>
      <span className="text">{children}</span>
      <span className="svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 38 15"
          fill="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
          />
        </svg>
      </span>
    </Link>
  );
}
export function TripCard({
  trip,
  index = 0,
  place,
}: {
  trip: Trip;
  index?: number;
  place?: Destination;
}) {
  const location = useLocation();
  const href = place
    ? `/destinations/${place.id}`
    : tourHref(trip.id, location.search);
  const name = place?.name || trip.name;
  const { saved, toggleSave } = useTravel();
  return (
    <Reveal delay={(index % 3) * 75} className="trip-card">
      <div className="trip-card-image">
        <Link
          to={href}
          aria-label={`${place ? "View destination" : "View tour"}: ${name}`}
        >
          <img
            src={photo(trip.id, true)}
            alt={captions[trip.id]}
            loading="lazy"
          />
          <span className="image-shade" />
          <span className="card-discover">
            {place ? "View destination" : "View tour"}{" "}
            <ArrowUpRight size={18} />
          </span>
        </Link>
        {saved.includes(trip.id) && !place && (
          <span className="saved-badge">
            <Heart size={11} fill="currentColor" /> Favorited
          </span>
        )}
        <span className="day-pill">
          {place
            ? `${place.tourIds.length} ${place.tourIds.length === 1 ? "tour" : "tours"}`
            : `${trip.days} ${trip.days === 1 ? "day" : "days"}`}
        </span>
        {!place && (
          <button
            className={`save-button ${saved.includes(trip.id) ? "is-saved" : ""}`}
            onClick={() => toggleSave(trip.id)}
            aria-pressed={saved.includes(trip.id)}
            aria-label={`${saved.includes(trip.id) ? "Unsave" : "Save"} ${trip.name}`}
            title={saved.includes(trip.id) ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart
              size={18}
              fill={saved.includes(trip.id) ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>
      <div className="card-meta">
        <span>{trip.region}</span>
        <span className={`type-tag ${place ? "destination-tag" : trip.type.toLowerCase().includes("adventure") ? "adventure-tag" : "sightseeing-tag"}`}>
          {place ? "Destination" : trip.type}
        </span>
      </div>
      <Link to={href} className="card-title">
        <h3>{name}</h3>
        <ArrowUpRight size={22} />
      </Link>
      {!place && (
        <div className="card-meta tour-card-facts">
          <span className="price-tag">{startingPrice(trip)}</span>
          <span className="rating-tag">{ratingLabel(trip)}</span>
        </div>
      )}
    </Reveal>
  );
}
export function LocationLabel({ id }: { id: string }) {
  return (
    <span className="location-label">
      <MapPin size={13} />
      {captions[id]}
    </span>
  );
}
export function PageIntro({
  kicker,
  title,
  accent,
  description,
  compact = false,
}: {
  kicker: string;
  title: string;
  accent?: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={`page-intro wrap ${compact ? "page-intro-compact" : ""}`}>
      <span className="eyebrow">{kicker}</span>
      <h1>
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h1>
      <p>{description}</p>
    </div>
  );
}
export function ClosingCTA() {
  return (
    <section className="closing-cta wrap">
      <Reveal>
        <span className="eyebrow">Explore Pakistan With Saadi</span>
        <h2>
          Ready to experience
          <br />
          the beauty of <span className="text-accent">Pakistan?</span>
        </h2>
        <ProminentLink to="/booking">
          Book now
        </ProminentLink>
        <span className="cta-note">
          Customized private & group tours · Direct WhatsApp confirmation · No advance payment needed online.
        </span>
      </Reveal>
    </section>
  );
}
