import Hero from "../components/Hero";
import {
  Reveal,
  TripCard,
  ProminentLink,
  ClosingCTA,
} from "../components/UI";
import { trips, destinations } from "../data";
import {
  Car,
  Hotel,
  Compass,
  CalendarCheck,
  ShieldCheck,
  Coffee,
  Star,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function Home() {
  const reviews = trips.flatMap((tour) =>
    (tour.reviews || []).map((review) => ({ ...review, tour: tour.name })),
  );

  return (
    <>
      <Hero />
      <section id="journeys" className="section-space wrap">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">Choose a place</span>
            <h2>Popular destinations</h2>
          </div>
          <ProminentLink to="/destinations">All Destinations</ProminentLink>
        </Reveal>
        <div className="catalog-grid popular-grid">
          {destinations.slice(0, 4).map((place, i) => (
            <TripCard
              key={place.id}
              trip={trips.find((t) => t.id === place.id)!}
              place={place}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="featured-section section-space wrap">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">Handcrafted Journeys</span>
            <h2>Featured tours</h2>
          </div>
          <div className="section-heading-actions">
            <p>
              Complete private itineraries with transport, verified stays, and local guide.
            </p>
            <ProminentLink to="/tours">View All Tours</ProminentLink>
          </div>
        </Reveal>
        <div className="featured-grid">
          {trips.slice(0, 3).map((tour, i) => (
            <TripCard key={tour.id} trip={tour} index={i} />
          ))}
        </div>
      </section>

      {/* What We Offer / Our Inclusions */}
      {/* What We Offer / Our Inclusions */}
      <section className="offers-section section-space">
        <div className="wrap">
          <Reveal className="section-heading text-center">
            <div>
              <span className="eyebrow">The Saadi Standard</span>
              <h2>What We Offer & Guarantee</h2>
              <p className="section-subtitle">
                Everything you need for a safe, memorable, and hassle-free tour across Pakistan.
              </p>
            </div>
          </Reveal>
          <div className="offers-grid">
            {[
              {
                icon: Car,
                title: "Comfortable 4x4 & Luxury Transport",
                desc: "Dedicated Toyota Prado, Grand Cabin, or modern Coaster with experienced mountain drivers.",
              },
              {
                icon: Hotel,
                title: "Handpicked Clean Hotels & Resorts",
                desc: "Verified family-friendly stays with hot water, stunning mountain views, and quiet surroundings.",
              },
              {
                icon: Compass,
                title: "Experienced Native Local Guides",
                desc: "Friendly guides born and raised in the valleys who know secret viewpoints, trails, and local lore.",
              },
              {
                icon: CalendarCheck,
                title: "100% Customized Itineraries",
                desc: "Shape your travel dates, stops, and pace around your family or group without rushed schedules.",
              },
              {
                icon: ShieldCheck,
                title: "24/7 Road & On-Ground Support",
                desc: "Direct contact with Saadi throughout your journey with continuous weather and road updates.",
              },
              {
                icon: Coffee,
                title: "Authentic Meals & Evening Bonfires",
                desc: "Fresh local cuisine, roadside chai at scenic passes, and cozy bonfire nights under the stars.",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 60} className="offer-card">
                <div className="offer-icon-box">
                  <item.icon size={26} strokeWidth={1.75} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section wrap section-space">
        <Reveal>
          <span className="eyebrow">Travel With Saadi</span>
          <h2>Why travel with us?</h2>
        </Reveal>
        <div className="values-grid">
          {[
            [
              "Local point of contact in Haripur",
              "Speak directly with Saadi before booking to discuss vehicle, hotels, and custom route options.",
            ],
            [
              "Tailored for Pakistani families & friends",
              "We understand family travel needs, elderly comfort, safe driving speeds, and group budgets.",
            ],
            [
              "Clear, honest pricing with no surprises",
              "Receive a transparent quote with all fuel, tolls, stays, and guide costs clearly itemized.",
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

      {/* Floating Animated Pakistani Reviews */}
      <section className="reviews-section section-space">
        <div className="wrap">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">Real Travelers · Genuine Feedback</span>
              <h2>Guest Reviews</h2>
            </div>
            <ProminentLink to="/contact">Plan Your Tour With Saadi</ProminentLink>
          </Reveal>
          <div className="reviews-grid">
          {reviews.slice(0, 3).map((review, i) => (
            <Reveal key={i} delay={i * 90} className="review-floating-card">
              <div className="review-card-header">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className="review-tour-pill">
                  <MapPin size={11} /> {review.tour}
                </span>
              </div>
              <p className="review-text">“{review.text}”</p>
              <div className="review-author">
                <div className="author-avatar">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <strong>{review.name}</strong>
                  <small className="verified-badge">
                    <CheckCircle2 size={12} /> Verified Traveler
                  </small>
                </div>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
