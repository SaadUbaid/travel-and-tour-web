import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mountain,
  Compass,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Reveal, ArrowLink, LocationLabel } from "./UI";
import { photo } from "../data";
export function IntroStrip() {
  return (
    <section className="intro-strip wrap">
      <span className="eyebrow">A slower pace. A deeper connection.</span>
      <p>
        Less everyday.
        <br />
        <span className="text-accent">More extraordinary.</span>
      </p>
      <div>
        From the first mountain road to the last cup of chai, discover Pakistan
        through journeys shaped around you.
      </div>
    </section>
  );
}

export function NeelumFeature() {
  return (
    <section className="editorial-feature">
      <div className="editorial-photo">
        <img
          src={photo("neelum")}
          alt="Wooden houses below pine-covered slopes in Arang Kel, Neelum Valley"
          loading="lazy"
        />
        <LocationLabel id="neelum" />
      </div>
      <div className="editorial-copy">
        <Reveal>
          <span className="eyebrow">Take the scenic route</span>
          <h2>
            Leave room
            <br />
            for <span className="text-accent">wonder.</span>
          </h2>
          <p>
            The unplanned stop. The longer way home. The morning you decide to
            do absolutely nothing.
          </p>
          <p>
            That’s our kind of travel. Beautiful places, thoughtful plans, and
            time to enjoy being there.
          </p>
          <ArrowLink to="/tours/neelum">View Neelum tour</ArrowLink>
        </Reveal>
        <span className="editorial-index">FIELD NOTES — 01 / THE VALLEY</span>
      </div>
    </section>
  );
}

export function TravelStyles() {
  return (
    <section className="ways-section section-space wrap">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">Your people. Your pace.</span>
          <h2>
            There’s no one way
            <br />
            to <span className="text-accent">get away.</span>
          </h2>
        </div>
        <ArrowLink to="/tours">View all tours</ArrowLink>
      </Reveal>
      <div className="ways-grid">
        {[
          {
            icon: Mountain,
            title: "For the trail seekers",
            copy: "A little effort. A different perspective. Mountain walks and days spent outside.",
            filter: "Adventure",
            id: "fairy-meadows",
          },
          {
            icon: Heart,
            title: "For the memory makers",
            copy: "Bring your favourite people. Build a trip around the moments you want to share.",
            filter: "Sightseeing Tours",
            id: "skardu",
          },
          {
            icon: Compass,
            title: "For the weekend wanderers",
            copy: "A change of scenery is closer than you think. Make a day feel like a real escape.",
            filter: "Day trips",
            id: "shogran",
          },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <Link
              className="way-card"
              to={`/tours?type=${encodeURIComponent(item.filter)}`}
            >
              <item.icon size={29} strokeWidth={1.1} />
              <span className="way-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <span className="way-action">
                View tours <ArrowRight size={18} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function NorthernBanner() {
  return (
    <section className="north-banner">
      <img
        src={photo("passu")}
        alt="The jagged peaks of Passu Cones, Upper Hunza"
        loading="lazy"
      />
      <div className="banner-shade" />
      <Reveal>
        <span className="eyebrow">The great northern journey · 8 days</span>
        <h2>
          Some roads
          <br />
          lead <span className="text-accent">to more.</span>
        </h2>
        <Link className="button button-light" to="/tours/northern-loop">
          View Hunza & Skardu tour <ArrowUpRight size={18} />
        </Link>
      </Reveal>
      <LocationLabel id="northern-loop" />
    </section>
  );
}

export function PlanningStory() {
  return (
    <section className="personal-section wrap section-space">
      <Reveal>
        <span className="eyebrow">
          Travel with a person, not a booking number
        </span>
        <h2>
          A good journey
          <br />
          starts with <span className="text-accent">a conversation.</span>
        </h2>
      </Reveal>
      <Reveal>
        <p>
          Tell us what a great getaway looks like to you. We’ll help turn a
          collection of ideas into a journey that feels like yours.
        </p>
        <div className="personal-points">
          <span>
            01 <strong>Share your wish list</strong>
          </span>
          <span>
            02 <strong>Shape the details together</strong>
          </span>
          <span>
            03 <strong>Make room for the memories</strong>
          </span>
        </div>
        <ArrowLink to="/tours?booking=1">Book now</ArrowLink>
      </Reveal>
    </section>
  );
}
