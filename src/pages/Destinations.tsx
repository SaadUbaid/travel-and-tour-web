import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Search, MapPin, X } from "lucide-react";
import { destinations, trips, regions } from "../data";
import { PageIntro, TripCard, ClosingCTA } from "../components/UI";
export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const region = regions.includes(params.get("region") || "")
    ? params.get("region")!
    : "";
  // Preserve older saved/style/duration links when the catalog moves to Tours.
  if (["type", "saved", "days", "sort"].some((key) => params.has(key)))
    return <Navigate to={`/tours?${params}`} replace />;
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        value ? next.set(key, value) : next.delete(key);
        return next;
      },
      { replace: true },
    );
  const results = destinations.filter(
    (place) =>
      (!region || place.region === region) &&
      `${place.name} ${place.region}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <PageIntro
        kicker="Choose a place"
        title="Destinations"
        description="Explore a place, then see the tours that visit it. Already know what you want? Browse all tours."
        compact={true}
      />
      <section className="catalog wrap">
        <form
          className="catalog-toolbar destination-toolbar"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search destinations</span>
            <input
              value={query}
              placeholder="Search a destination…"
              onChange={(event) => update("q", event.target.value)}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => update("q", "")}
              >
                <X size={16} />
              </button>
            )}
          </label>
          <label className="region-select">
            <MapPin size={17} />
            <select
              value={region}
              aria-label="Filter destinations by region"
              onChange={(event) => update("region", event.target.value)}
            >
              <option value="">All regions</option>
              {regions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </form>
        <div className="filter-row">
          <span role="status">
            {results.length}{" "}
            {results.length === 1 ? "destination" : "destinations"}
          </span>
          <Link className="text-link" to="/tours">
            View all tours
          </Link>
          {(query || region) && (
            <button className="text-link" onClick={() => setParams({})}>
              Clear filters <X size={14} />
            </button>
          )}
        </div>
        {results.length ? (
          <div className="catalog-grid">
            {results.map((place, i) => (
              <TripCard
                key={place.id}
                trip={trips.find((tour) => tour.id === place.id)!}
                place={place}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No destinations found</h2>
            <p>Try another name or choose a different region.</p>
            <button className="button" onClick={() => setParams({})}>
              Show all destinations
            </button>
          </div>
        )}
      </section>
      <ClosingCTA />
    </>
  );
}
