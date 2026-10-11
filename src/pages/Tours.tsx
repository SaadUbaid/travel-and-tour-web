import { useSearchParams } from "react-router-dom";
import { Search, X, Heart } from "lucide-react";
import { trips, destinations, regions } from "../data";
import { useTravel } from "../state";
import { PageIntro, TripCard, ClosingCTA } from "../components/UI";
import { validDate, validPeople, dateLabel } from "../booking";
const types = ["Sightseeing Tours", "Adventure", "Day trips"];
const lengths = [
  { value: "any", label: "Any length", min: 1, max: Infinity },
  { value: "1", label: "1 day", min: 1, max: 1 },
  { value: "2-3", label: "2–3 days", min: 2, max: 3 },
  { value: "4-6", label: "4–6 days", min: 4, max: 6 },
  { value: "7+", label: "7+ days", min: 7, max: Infinity },
];
const budgets = [
  { value: "any", label: "Any price", min: 0, max: Infinity },
  { value: "under-15000", label: "Under PKR 15,000", min: 0, max: 14999.99 },
  { value: "15000-30000", label: "PKR 15,000–30,000", min: 15000, max: 30000 },
  {
    value: "over-30000",
    label: "Over PKR 30,000",
    min: 30000.01,
    max: Infinity,
  },
  { value: "quote", label: "Price on request", min: 0, max: Infinity },
];
export default function Tours() {
  const [params, setParams] = useSearchParams();
  const { saved } = useTravel();
  const query = params.get("q") || "";
  const region = regions.includes(params.get("region") || "")
    ? params.get("region")!
    : "";
  const place = destinations.find(
    (item) => item.id === params.get("destination"),
  );
  const rawType = params.get("type") === "Scenic escapes" ? "Sightseeing Tours" : params.get("type") || "";
  const type = types.includes(rawType) ? rawType : "";
  const duration =
    lengths.find((item) => item.value === params.get("days")) || lengths[0];
  const budget =
    budgets.find((item) => item.value === params.get("price")) || budgets[0];
  const sort = ["shortest", "longest", "price-low"].includes(
    params.get("sort") || "",
  )
    ? params.get("sort")!
    : "recommended";
  const onlySaved = params.get("saved") === "true";
  const date = params.get("date") || "",
    people = params.get("people") || "";
  const update = (key: string, value: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (!value || value === "any" || value === "recommended")
          next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  const clear = () =>
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      [
        "q",
        "region",
        "destination",
        "type",
        "days",
        "price",
        "sort",
        "saved",
      ].forEach((key) => next.delete(key));
      return next;
    });
  const base = trips.filter(
    (tour) =>
      (!region || tour.region === region) &&
      (!place || place.tourIds.includes(tour.id)) &&
      (!type || tour.type === type) &&
      (!onlySaved || saved.includes(tour.id)) &&
      `${tour.name} ${tour.region} ${tour.highlights.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const matchesPrice = (
    tour: (typeof trips)[number],
    option: (typeof budgets)[number],
  ) =>
    option.value === "any" ||
    (option.value === "quote"
      ? tour.pricePerPerson == null
      : tour.pricePerPerson != null &&
        tour.pricePerPerson >= option.min &&
        tour.pricePerPerson <= option.max);
  const results = base.filter(
    (tour) =>
      tour.days >= duration.min &&
      tour.days <= duration.max &&
      matchesPrice(tour, budget),
  );
  if (sort === "shortest") results.sort((a, b) => a.days - b.days);
  if (sort === "longest") results.sort((a, b) => b.days - a.days);
  if (sort === "price-low")
    results.sort(
      (a, b) => (a.pricePerPerson ?? Infinity) - (b.pricePerPerson ?? Infinity),
    );
  const filters = [
    query ? ["q", `“${query}”`] : null,
    region ? ["region", region] : null,
    place ? ["destination", place.name] : null,
    type ? ["type", type] : null,
    duration.value !== "any" ? ["days", duration.label] : null,
    budget.value !== "any" ? ["price", budget.label] : null,
    onlySaved ? ["saved", "Saved tours"] : null,
  ].filter((item): item is string[] => !!item);
  return (
    <>
      <PageIntro
        kicker="Find your tour"
        title={place ? `Tours to ${place.name}` : "Tours"}
        description="Choose your destination, tour length, and style. Open a tour to see the itinerary and request your dates."
        compact={true}
      />
      <section className="catalog wrap">
        {params.get("booking") === "1" && (
          <div className="planning-note">
            <p>
              To book, choose a tour below and open its details. Your tour will
              be filled in when you start the enquiry.
            </p>
          </div>
        )}
        <form
          className="catalog-toolbar tour-search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search tours</span>
            <input
              value={query}
              placeholder="Search tours…"
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
          <label className="field-label catalog-select">
            Destination
            <select
              value={place?.id || ""}
              onChange={(event) => {
                const next = new URLSearchParams(params);
                next.delete("region");
                event.target.value
                  ? next.set("destination", event.target.value)
                  : next.delete("destination");
                setParams(next, { replace: true });
              }}
            >
              <option value="">All destinations</option>
              {destinations.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className={`shortlist-filter ${onlySaved ? "selected" : ""}`}
            aria-pressed={onlySaved}
            onClick={() => update("saved", onlySaved ? "" : "true")}
          >
            <Heart size={17} fill={onlySaved ? "currentColor" : "none"} /> Saved{" "}
            <span>{saved.length}</span>
          </button>
        </form>
        <div className="tour-filter-grid">
          <label className="field-label">
            Days
            <select
              value={duration.value}
              onChange={(event) => update("days", event.target.value)}
            >
              {lengths.map((option) => {
                const count = base.filter(
                  (tour) =>
                    matchesPrice(tour, budget) &&
                    tour.days >= option.min &&
                    tour.days <= option.max,
                ).length;
                return (
                  <option
                    value={option.value}
                    key={option.value}
                    disabled={
                      option.value !== "any" &&
                      !count &&
                      duration.value !== option.value
                    }
                  >
                    {option.label} ({count})
                  </option>
                );
              })}
            </select>
          </label>
          <label className="field-label">
            Price per person
            <select
              value={budget.value}
              onChange={(event) => update("price", event.target.value)}
            >
              {budgets.map((option) => {
                const count = base.filter(
                  (tour) =>
                    tour.days >= duration.min &&
                    tour.days <= duration.max &&
                    matchesPrice(tour, option),
                ).length;
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={
                      option.value !== "any" &&
                      !count &&
                      budget.value !== option.value
                    }
                  >
                    {option.label} ({count})
                  </option>
                );
              })}
            </select>
          </label>
          <label className="field-label">
            Tour type
            <select
              value={type}
              onChange={(event) => update("type", event.target.value)}
            >
              <option value="">All types</option>
              {types.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Sort by
            <select
              value={sort}
              onChange={(event) => update("sort", event.target.value)}
            >
              <option value="recommended">Featured</option>
              <option value="shortest">Fewest days</option>
              <option value="longest">Most days</option>
              <option value="price-low">Lowest published price</option>
            </select>
          </label>
        </div>
        <p className="small-note">
          Prices are currently quoted for your group. Date preferences are sent
          to Saadi for availability confirmation.
        </p>
        {(validDate(date) || validPeople(people)) && (
          <div className="planning-note search-preferences">
            <p>
              {validDate(date) ? `Preferred date: ${dateLabel(date)}. ` : ""}
              {validPeople(people) ? `${people} travelers. ` : ""}These details
              will carry into your enquiry.
            </p>
            <button
              className="text-link"
              onClick={() => {
                const next = new URLSearchParams(params);
                next.delete("date");
                next.delete("people");
                setParams(next, { replace: true });
              }}
            >
              Clear preferences
            </button>
          </div>
        )}
        <div className="filter-row">
          <span role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "tour" : "tours"} found
          </span>
          <div className="filter-pills active-filters">
            {filters.map(([key, label]) => (
              <button
                key={key}
                onClick={() => update(key, "")}
                aria-label={`Remove ${label} filter`}
              >
                {label} <X size={12} />
              </button>
            ))}
            {filters.length > 0 && (
              <button onClick={clear}>Clear filters</button>
            )}
          </div>
        </div>
        {results.length ? (
          <div className="catalog-grid">
            {results.map((tour, i) => (
              <TripCard key={tour.id} trip={tour} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>
              {onlySaved && !saved.length
                ? "No saved tours yet"
                : "No tours match these filters"}
            </h2>
            <p>
              {onlySaved && !saved.length
                ? "Tap the heart on a tour to save it here."
                : "Try a different number of days, destination, or price option."}
            </p>
            <button className="button" onClick={clear}>
              Show all tours
            </button>
          </div>
        )}
      </section>
      <ClosingCTA />
    </>
  );
}
