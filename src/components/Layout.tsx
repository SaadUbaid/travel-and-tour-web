import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { trips, photo, regions, contact } from "../data";
import { useTravel } from "../state";
import { WhatsAppIcon, InstagramIcon } from "./UI";
type Panel = "Destinations" | "Tours";
const names: Panel[] = ["Destinations", "Tours"];
export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Travel With Saadi home">
      <img
        className="brand-mark"
        src={`${import.meta.env.BASE_URL}brand/saadi-mark.svg`}
        alt=""
        width="48"
        height="48"
      />
      <span className="brand-wordmark">
        <small>TRAVEL WITH</small>
        <strong>SAADI</strong>
      </span>
    </Link>
  );
}
export function Header() {
  const [active, setActive] = useState<Panel | null>(null);
  const [previous, setPrevious] = useState<Panel | null>(null);
  const [direction, setDirection] = useState(1);
  const [preview, setPreview] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [box, setBox] = useState({ left: 0, width: 664, height: 350 });
  const header = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { saved } = useTravel();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const close = () => {
    setActive(null);
    setPrevious(null);
  };
  const open = (name: Panel) => {
    cancel();
    if (name === active) return;
    setDirection(
      active ? Math.sign(names.indexOf(name) - names.indexOf(active)) : 1,
    );
    setPrevious(active);
    setActive(name);
    if (previousTimer.current) clearTimeout(previousTimer.current);
    previousTimer.current = setTimeout(() => setPrevious(null), 300);
  };
  useLayoutEffect(() => {
    if (!active) return;
    const reposition = () => {
      const h = header.current?.getBoundingClientRect(),
        t = triggers.current[names.indexOf(active)]?.getBoundingClientRect();
      if (!h || !t) return;
      const width =
        active === "Destinations" ? 664 : active === "Tours" ? 494 : 280;
      setBox({
        left: Math.max(
          12,
          Math.min(t.left - h.left - 20, h.width - width - 12),
        ),
        width,
        height:
          active === "Destinations" ? 350 : active === "Tours" ? 326 : 248,
      });
    };
    reposition();
    window.addEventListener("resize", reposition);
    return () => window.removeEventListener("resize", reposition);
  }, [active]);
  useEffect(() => {
    close();
    setMobile(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (active) triggers.current[names.indexOf(active)]?.focus();
        if (mobile) mobileButton.current?.focus();
        close();
        setMobile(false);
      }
    };
    const click = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) {
        close();
        setMobile(false);
      }
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", click);
    };
  }, [active, mobile]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (previousTimer.current) clearTimeout(previousTimer.current);
    },
    [],
  );
  const panel = (name: Panel) =>
    name === "Destinations" ? (
      <div className="discover-panel">
        <div className="menu-list">
          <span className="menu-kicker">Explore destinations</span>
          {trips.slice(0, 4).map((t, i) => (
            <Link
              key={t.id}
              to={`/destinations/${t.id}`}
              onMouseEnter={() => setPreview(i)}
              onFocus={() => setPreview(i)}
              className={i === preview ? "preview-active" : ""}
            >
              <span>
                <strong>{t.name}</strong>
                <small>{t.label}</small>
              </span>
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <Link className="menu-all" to="/destinations">
            All destinations{" "}
            <span>
              12 <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
        <div className="menu-preview">
          {trips.slice(0, 4).map((t, i) => (
            <img
              key={t.id}
              src={photo(t.id, true)}
              alt=""
              className={preview === i ? "visible" : ""}
            />
          ))}
          <div>
            <small>A little further from ordinary</small>
            <strong>{trips[preview].name}</strong>
          </div>
        </div>
      </div>
    ) : name === "Tours" ? (
      <div className="journeys-panel">
        <span className="menu-kicker">Choose your tour type</span>
        <div>
          {[
            {
              id: "basho",
              title: "Sightseeing Tours",
              desc: "Relaxed scenic valleys",
              filter: "Sightseeing Tours",
            },
            {
              id: "fairy-meadows",
              title: "Adventure",
              desc: "Follow the trail",
              filter: "Adventure",
            },
          ].map((t) => (
            <Link key={t.id} to={`/tours?type=${encodeURIComponent(t.filter)}`}>
              <img src={photo(t.id, true)} alt="" />
              <span>
                <strong>{t.title}</strong>
                <small>
                  {t.desc} <ArrowUpRight size={15} />
                </small>
              </span>
            </Link>
          ))}
        </div>
        <Link className="menu-all" to="/tours">
          All tours <ArrowUpRight size={15} />
        </Link>
      </div>
    ) : (
      <div className="regions-panel">
        <span className="menu-kicker">Explore Pakistan</span>
        {regions.map((r, i) => (
          <Link key={r} to={`/destinations?region=${encodeURIComponent(r)}`}>
            <small>0{i + 1}</small>
            <span>{r}</span>
            <ArrowUpRight size={15} />
          </Link>
        ))}
        <Link className="menu-all" to="/destinations">
          View all destinations <ArrowUpRight size={15} />
        </Link>
      </div>
    );
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header
        className={`site-header ${isHome ? "header-home" : ""} ${isHome && !scrolled ? "header-transparent" : "header-solid"}`}
        ref={header}
        onPointerEnter={cancel}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") timer.current = setTimeout(close, 140);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
        }}
      >
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              to="/"
              onPointerEnter={close}
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
            {names.map((name, i) => (
              <button
                key={name}
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                aria-expanded={active === name}
                aria-controls="atlas-menu"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") open(name);
                }}
                onClick={() =>
                  navigate(name === "Destinations" ? "/destinations" : "/tours")
                }
                aria-current={
                  location.pathname.startsWith(
                    name === "Destinations" ? "/destinations" : "/tours",
                  )
                    ? "page"
                    : undefined
                }
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    open(name);
                    setTimeout(
                      () =>
                        header.current
                          ?.querySelector<HTMLElement>(".panel-current a")
                          ?.focus(),
                      40,
                    );
                  }
                }}
                className={active === name ? "active" : ""}
              >
                {name}
                <ChevronDown size={13} />
              </button>
            ))}
            <Link to="/about" onPointerEnter={close}>
              About
            </Link>
            <Link to="/contact" onPointerEnter={close}>
              Contact
            </Link>
          </nav>
          <div className="header-actions">
            <Link
              className="shortlist-link"
              to="/tours?saved=true"
              aria-label={`Saved tours, ${saved.length}`}
            >
              <Heart size={18} />
              {saved.length > 0 && <span>{saved.length}</span>}
            </Link>
            <Link
              className="button button-small header-cta"
              to="/tours?booking=1"
            >
              Book now <ArrowUpRight size={16} />
            </Link>
            <button
              ref={mobileButton}
              className="mobile-toggle icon-button"
              aria-label={mobile ? "Close navigation" : "Open navigation"}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile((p) => !p)}
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          id="atlas-menu"
          className={`atlas-menu ${active ? "open" : ""}`}
          style={{ left: box.left, width: box.width, height: box.height }}
          aria-hidden={!active}
          inert={!active}
        >
          {previous && (
            <div
              className="panel-content panel-previous"
              key={`old-${previous}`}
              inert
              style={{ "--direction": direction } as React.CSSProperties}
            >
              {panel(previous)}
            </div>
          )}
          {active && (
            <div
              className="panel-content panel-current"
              key={active}
              style={{ "--direction": direction } as React.CSSProperties}
            >
              {panel(active)}
            </div>
          )}
        </div>
        {mobile && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
          >
            <span className="eyebrow">Explore Pakistan</span>
            <Link to="/">
              Home <ArrowUpRight />
            </Link>
            <Link to="/destinations">
              Destinations <ArrowUpRight />
            </Link>
            <Link to="/tours">
              Tours <ArrowUpRight />
            </Link>
            <Link to="/about">
              About <ArrowUpRight />
            </Link>
            <Link to="/contact">
              Contact <ArrowUpRight />
            </Link>
            <Link className="button" to="/tours?booking=1">
              Book now <ArrowUpRight size={18} />
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  const { notice } = useTravel();
  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-top">
          <div className="footer-brand-col">
            <Brand />
            <p>
              Authentic journeys through the breathtaking valleys of Pakistan. Planned with local care from Haripur.
            </p>
            <div className="footer-social-row">
              <a
                className="social-icon-btn instagram"
                href="https://www.instagram.com/travelwithsaadi.pk/"
                target="_blank"
                rel="noreferrer"
                title="Follow Travel With Saadi on Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                className="social-icon-btn whatsapp"
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Saadi! I would like to ask about a tour.")}`}
                target="_blank"
                rel="noreferrer"
                title="Chat with Saadi on WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="eyebrow">Explore</span>
            <nav className="footer-links-list">
              <Link to="/">Home</Link>
              <Link to="/destinations">Destinations</Link>
              <Link to="/tours">All Tours</Link>
              <Link to="/about">About Saadi</Link>
            </nav>
          </div>

          <div className="footer-contact-col">
            <span className="eyebrow">Contact & Booking</span>
            <div className="footer-contact-items">
              <Link to="/booking" className="footer-cta-link">
                <span>Book a tour</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/contact" className="footer-cta-link">
                <span>Contact page</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="footer-contact-item"
              >
                <WhatsAppIcon size={16} />
                <span>+92 335 0910377</span>
              </a>
              <a href={`mailto:${contact.email}`} className="footer-contact-item">
                <Mail size={16} />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>

          <div className="footer-office-col">
            <span className="eyebrow">Head Office · Haripur</span>
            <p className="office-quote">
              Pakistan is full of wonder.
              <br />
              Let’s explore it together.
            </p>
            <span className="office-address">
              <MapPin size={14} />
              {contact.address}
            </span>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <small>© {new Date().getFullYear()} Travel With Saadi. All rights reserved.</small>
          <span className="footer-tagline">Crafted for memorable journeys across Pakistan</span>
        </div>
      </footer>

      <div className={`toast ${notice ? "show" : ""}`} role="status">
        {notice}
      </div>
    </>
  );
}

export function BookingHeader() {
  const location = useLocation();
  const { bookingDraft, enquiry } = useTravel();
  const params = new URLSearchParams(location.search);
  const requested = params.get("tour") || params.get("destination");
  const trip =
    trips.find((tour) => tour.id === requested || tour.name === requested) ||
    trips.find((tour) => tour.id === (bookingDraft?.tourId || enquiry?.tourId));
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <Link className="text-link" to={trip ? `/tours/${trip.id}` : "/tours"}>
          {trip ? "Back to tour" : "Choose a tour"} <ArrowUpRight size={16} />
        </Link>
      </div>
    </header>
  );
}
export function BookingFooter() {
  return (
    <footer className="wrap footer-bottom booking-footer">
      <small>Travel With Saadi</small>
      <Link to="/terms">Terms & privacy</Link>
      <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>{contact.phone}</a>
    </footer>
  );
}
