import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Reveal, ClosingCTA, LocationLabel } from "../components/UI";
import { PlanningStory } from "../components/JourneyStories";
import { photo, imageUrl } from "../data";
export default function About() {
  return (
    <>
      <PageIntro
        kicker="The person behind the journey"
        title="About"
        accent="Travel With Saadi"
        description="Travel With Saadi brings a personal touch to exploring Pakistan, from a day in the hills to a longer journey through the north."
      />
      <div className="about-landscape wrap">
        <img
          src={photo("basho")}
          alt="Green meadows, trees and mountains in Basho Valley"
        />
        <LocationLabel id="basho" />
        <span>
          Go somewhere.
          <br />
          <span className="text-accent">Feel something.</span>
        </span>
      </div>
      <section className="about-story wrap section-space">
        <Reveal className="founder-portrait">
          <img
            src={imageUrl("saadi")}
            alt="Saadi, your travel contact"
            loading="lazy"
          />
          <span>SAADI / YOUR TRAVEL CONTACT</span>
        </Reveal>
        <Reveal>
          <span className="eyebrow">
            Based in Haripur. Drawn to the mountains.
          </span>
          <h2>
            Good company makes
            <br />a place <span className="text-accent">unforgettable.</span>
          </h2>
          <p>
            Travel starts long before you reach the destination. It starts with
            a conversation about what you want to see, who you want to bring,
            and how you want to spend your time.
          </p>
          <p>
            That’s why we keep planning personal. Explore the journeys, gather a
            few ideas, and get in touch with Saadi to shape the route, stays,
            transport, and pace around your group.
          </p>
          <Link className="text-link" to="/contact">
            Say hello to Saadi <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <section className="values-section wrap">
        <Reveal>
          <span className="eyebrow">The way we travel</span>
          <h2>
            Thoughtful by <span className="text-accent">nature.</span>
          </h2>
        </Reveal>
        <div className="values-grid">
          {[
            [
              "A personal plan",
              "Start with your interests, then work out the route and details together.",
            ],
            [
              "Time to be there",
              "Leave space between the sights for a walk, a conversation, or a quiet morning.",
            ],
            [
              "Care for the places",
              "Take your litter home, respect local communities, and leave the view as you found it.",
            ],
          ].map(([title, copy], i) => (
            <Reveal key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <PlanningStory />
      <ClosingCTA />
    </>
  );
}
