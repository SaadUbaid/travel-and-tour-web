import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  destinations,
  trips,
  toursForDestination,
  photo,
  secondPhoto,
  captions,
} from "../data";
import ScrollStory from "../components/ScrollStory";
import { TripCard, Reveal } from "../components/UI";
import NotFound from "./NotFound";
export default function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = destinations.find((destination) => destination.id === id);
  const source = trips.find((tour) => tour.id === id);
  if (!place || !source) return <NotFound />;
  const tours = toursForDestination(place.id);
  const story = { ...source, name: place.name, description: place.description };
  return (
    <>
      <ScrollStory
        trip={story}
        tourCount={tours.length}
        backTo="/destinations"
        backLabel="All destinations"
        skipLabel="View tours"
        planLabel="Browse tours"
        onPlan={() => navigate(`/tours?destination=${place.id}`)}
      />
      <section className="wrap section-space">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">{place.region}</span>
            <h2>Explore {place.name}</h2>
          </div>
          <div>
            <p>{place.description}</p>
          </div>
        </Reveal>
        <div className="trip-photo-pair">
          <figure>
            <img
              src={photo(place.id)}
              alt={captions[place.id]}
              loading="lazy"
            />
            <figcaption>{captions[place.id]}</figcaption>
          </figure>
          <figure>
            <img
              src={secondPhoto(place.id)}
              alt={`Another view of ${captions[place.id]}`}
              loading="lazy"
            />
            <figcaption>Another view · {captions[place.id]}</figcaption>
          </figure>
        </div>
      </section>
      <section id="itinerary" className="wrap section-space">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">
              {tours.length}{" "}
              {tours.length === 1 ? "tour visits" : "tours visit"} this
              destination
            </span>
            <h2>Tours to {place.name}</h2>
          </div>
          <p>Choose a tour to see its full itinerary and request your dates.</p>
        </Reveal>
        <div className="catalog-grid">
          {tours.map((tour, i) => (
            <TripCard trip={tour} index={i} key={tour.id} />
          ))}
        </div>
      </section>
      <section className="closing-cta wrap">
        <Reveal>
          <span className="eyebrow">Your visit to {place.name}</span>
          <h2>Choose your tour.</h2>
          <Link className="button" to={`/tours?destination=${place.id}`}>
            View tours <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
