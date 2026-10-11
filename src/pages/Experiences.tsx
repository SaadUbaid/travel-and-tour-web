import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Reveal, ClosingCTA, LocationLabel } from "../components/UI";
import {
  IntroStrip,
  NeelumFeature,
  TravelStyles,
  NorthernBanner,
} from "../components/JourneyStories";
import { photo } from "../data";
export default function Experiences() {
  return (
    <>
      <PageIntro
        kicker="Travel stories"
        title="Make it feel"
        accent="like you."
        description="An open trail, a peaceful lake, or a day away with your favourite people. Choose the kind of journey you’re craving."
      />
      <div className="experience-list wrap">
        {[
          {
            id: "fairy-meadows",
            name: "Follow the trail.",
            accent: "Find a different view.",
            type: "Adventure",
            copy: "For the days you want to move, explore, and come home with a story. Discover mountain trails and journeys further into the valleys.",
            tags: ["Active days", "Mountain walks", "A sense of discovery"],
          },
          {
            id: "skardu",
            name: "Take your time.",
            accent: "Take it all in.",
            type: "Sightseeing Tours",
            copy: "A little less rushing, a little more looking around. Lakes, valley roads, and time together, with a route shaped around your group.",
            tags: ["Scenic valleys", "Relaxed pacing", "Family time"],
          },
          {
            id: "shogran",
            name: "A day away.",
            accent: "A whole new feeling.",
            type: "Day trips",
            copy: "You don’t always need a long holiday. Head for fresh air and a change of pace with a day in the hills.",
            tags: ["Short escapes", "Fresh air", "Easy to start planning"],
          },
        ].map((s, i) => (
          <Reveal key={s.id} className="experience-row">
            <div className="experience-photo">
              <img
                src={photo(s.id)}
                alt={
                  s.id === "skardu"
                    ? "Lower Kachura Lake, Skardu"
                    : s.id === "shogran"
                      ? "Shogran, Kaghan Valley"
                      : "Nanga Parbat from Fairy Meadows"
                }
                loading="lazy"
              />
              <LocationLabel id={s.id} />
            </div>
            <div>
              <span className="eyebrow">
                0{i + 1} / {s.type}
              </span>
              <h2>
                {s.name}
                <br />
                <span className="text-accent">{s.accent}</span>
              </h2>
              <p>{s.copy}</p>
              <div className="tag-list">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <Link
                className="text-link"
                to={`/tours?type=${encodeURIComponent(s.type)}`}
              >
                View {s.type.toLowerCase()} tours <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
      <IntroStrip />
      <NeelumFeature />
      <TravelStyles />
      <NorthernBanner />
      <ClosingCTA />
    </>
  );
}
