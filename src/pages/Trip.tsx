import { Link, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  Check,
  CalendarDays,
  Users,
  Compass,
} from "lucide-react";
import {
  trips,
  captions,
  photo,
  secondPhoto,
  startingPrice,
  ratingLabel,
} from "../data";
import { useTravel } from "../state";
import ScrollStory from "../components/ScrollStory";
import { Reveal } from "../components/UI";
import NotFound from "./NotFound";
export default function TripPage() {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id);
  const { openPlanner, saved, toggleSave } = useTravel();
  if (!trip) return <NotFound />;
  return (
    <div className="tour-detail-page">
      <ScrollStory key={trip.id} trip={trip} />
      <section className="trip-overview wrap section-space" id="itinerary">
        <div>
          <Reveal>
            <span className="eyebrow">Your tour, at a glance</span>
            <h2>
              {trip.name}.<br />
              <span className="text-accent">Make it your own.</span>
            </h2>
            <p className="lead-copy">{trip.description}</p>
            <div className="trip-facts">
              <span>
                <CalendarDays size={21} />
                <strong>
                  {trip.days} {trip.days === 1 ? "day" : "days"}
                </strong>
                <small>Suggested duration</small>
              </span>
              <span>
                <Compass size={21} />
                <strong>{trip.type}</strong>
                <small>Your kind of getaway</small>
              </span>
              <span>
                <Users size={21} />
                <strong>Your group</strong>
                <small>Plan your own pace</small>
              </span>
            </div>
          </Reveal>
          <div className="itinerary-heading">
            <h3>Your suggested itinerary</h3>
            <p>
              A day-by-day starting point for your trip. We’ll confirm the
              route, timings, stays, and transport together.
            </p>
          </div>
          <div className="itinerary-list">
            {trip.plan.map((p, i) => (
              <details key={p} open={i === 0}>
                <summary>
                  <span className="day-number">
                    DAY {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{p}</strong>
                  <span className="detail-plus">+</span>
                </summary>
                <p>
                  {i === 0
                    ? "Start the journey from your agreed departure point. Your travel plan will include pickup details, the route, and time for stops."
                    : i === trip.plan.length - 1
                      ? "Enjoy the final part of your journey before returning to your agreed drop-off point. Exact timings will be confirmed with your plan."
                      : "We’ll build this day around your group, with time to explore and enjoy the surroundings. Your confirmed plan will set out the stops, activities, and any local transfers."}
                </p>
              </details>
            ))}
          </div>
          <section
            className="tour-information"
            aria-labelledby="included-heading"
          >
            <h3 id="included-heading">What’s included</h3>
            {trip.includes?.length ? (
              <ul>
                {trip.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>
                Your written quote will confirm transport, accommodation, meals,
                guides, and entry fees. These are not included or priced until
                Saadi confirms your plan.
              </p>
            )}
          </section>
          <section className="tour-information" aria-labelledby="dates-heading">
            <h3 id="dates-heading">Available dates</h3>
            {trip.departures?.length ? (
              <ul>
                {trip.departures.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            ) : (
              <p>
                Departure dates are arranged for your group. Choose your
                preferred date in the enquiry; Saadi will confirm availability
                before you book.
              </p>
            )}
          </section>
          <section
            className="tour-information"
            aria-labelledby="reviews-heading"
          >
            <h3 id="reviews-heading">Traveler reviews</h3>
            {trip.reviews?.length ? (
              trip.reviews.map((review, i) => (
                <div className="planning-note" key={i}>
                  <p>
                    <strong>
                      {review.name} · {review.rating} / 5
                    </strong>
                    <br />
                    {review.text}
                  </p>
                </div>
              ))
            ) : (
              <p>
                No reviews have been published for this tour yet.{" "}
                <Link className="text-link" to="/contact">
                  Ask Saadi about this tour
                </Link>
              </p>
            )}
          </section>
          <div className="planning-note">
            <Check size={19} />
            <p>
              Access, activities, and timings can change with weather and local
              conditions. Saadi will confirm a suitable plan for your travel
              dates.
            </p>
          </div>
        </div>
        <aside className="trip-inquiry">
          <img src={photo(trip.id, true)} alt={captions[trip.id]} />
          <div>
            <span className="eyebrow">
              {trip.days}-day tour · {trip.name}
            </span>
            <h3>
              Your tour.
              <br />
              <span className="text-accent">Your dates.</span>
            </h3>
            <p>
              <strong>{startingPrice(trip)}</strong>
              <br />
              {ratingLabel(trip)}
            </p>
            <p>
              Share your dates and your ideas. We’ll work out the details and a
              quote for your group.
            </p>
            <button className="button" onClick={() => openPlanner(trip.id)}>
              Book this tour <ArrowUpRight size={18} />
            </button>
            <button
              className="button button-outline"
              aria-pressed={saved.includes(trip.id)}
              onClick={() => toggleSave(trip.id)}
            >
              <Heart
                size={17}
                fill={saved.includes(trip.id) ? "currentColor" : "none"}
              />
              {saved.includes(trip.id)
                ? "Saved to your tours"
                : "Save this tour"}
            </button>
            <span className="inquiry-note">
              A conversation first. No payment at this stage.
            </span>
          </div>
        </aside>
      </section>
      <section className="trip-photo-pair wrap">
        <figure>
          <img src={photo(trip.id)} alt={captions[trip.id]} loading="lazy" />
          <figcaption>{captions[trip.id]}</figcaption>
        </figure>
        <figure>
          <img
            src={secondPhoto(trip.id)}
            alt={
              trip.id === "northern-loop" ? captions.skardu : captions[trip.id]
            }
            loading="lazy"
          />
          <figcaption>
            {trip.id === "northern-loop"
              ? captions.skardu
              : "Another perspective · " + captions[trip.id]}
          </figcaption>
        </figure>
      </section>
      <section className="closing-cta destination-closing wrap">
        <span className="eyebrow">Your trip to {trip.name}</span>
        <h2>Ready to explore {trip.name}?</h2>
        <p>
          Choose your dates and tell us who’s coming. We’ll help with the rest.
        </p>
        <button className="button" onClick={() => openPlanner(trip.id)}>
          Book this tour <ArrowUpRight size={18} />
        </button>
      </section>
      <aside className="tour-booking-bar" aria-label="Book this tour">
        <div className="wrap">
          <div>
            <strong>{trip.name}</strong>
            <span>
              {trip.days} days · {startingPrice(trip)}
            </span>
          </div>
          <button className="button" onClick={() => openPlanner(trip.id)}>
            Book this tour <ArrowUpRight size={17} />
          </button>
        </div>
      </aside>
    </div>
  );
}
