import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  Edit3,
} from "lucide-react";
import { trips, contact, photo } from "../data";
import { useTravel } from "../state";
import { WhatsAppIcon } from "../components/UI";
import {
  today,
  validDate,
  validPeople,
  dateLabel,
  totalLabel,
  referenceNumber,
} from "../booking";
import type { BookingDraft } from "../booking";

export default function Plan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const requested = params.get("tour") || params.get("destination") || "hunza";
  const initialTrip =
    trips.find((t) => t.id === requested || t.name.toLowerCase() === requested.toLowerCase()) ||
    trips[0];

  const { paused, bookingDraft, setBookingDraft, setEnquiry } = useTravel();
  const [step, setStep] = useState(0);
  const [reference] = useState(referenceNumber);

  const [selectedTourId, setSelectedTourId] = useState(
    bookingDraft?.tourId || initialTrip.id,
  );
  const currentTrip = trips.find((t) => t.id === selectedTourId) || initialTrip;

  const [dateMode, setDateMode] = useState<"date" | "flexible">(() => {
    const d = params.get("date") || bookingDraft?.date || "";
    return d === "Flexible" ? "flexible" : "date";
  });

  const [details, setDetails] = useState<BookingDraft>(() => {
    const prev = bookingDraft;
    const dateParam = params.get("date") || "";
    const peopleParam = params.get("people") || "";
    return {
      tourId: currentTrip.id,
      date: dateParam === "Flexible" ? "Flexible" : validDate(dateParam) ? dateParam : prev?.date || "",
      people: validPeople(peopleParam) ? peopleParam : prev?.people || "2",
      name: prev?.name || "",
      email: prev?.email || "",
      phone: prev?.phone || "",
      city: prev?.city || "",
      notes: prev?.notes || "",
    };
  });

  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const stage = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    setBookingDraft({ ...details, tourId: currentTrip.id });
  }, [details, currentTrip.id, setBookingDraft]);

  useEffect(() => {
    if (started.current) {
      stage.current
        ?.querySelector<HTMLElement>("h2")
        ?.focus({ preventScroll: true });
      stage.current?.scrollIntoView({
        block: "start",
        behavior: paused ? "instant" : "smooth",
      });
    }
    started.current = true;
  }, [step, paused]);

  const change = (key: keyof BookingDraft, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const handleStep0Submit = (e: FormEvent) => {
    e.preventDefault();
    if (dateMode === "date" && !validDate(details.date)) {
      setTouched((prev) => ({ ...prev, date: true }));
      return;
    }
    setStep(1);
  };

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validPeople(details.people) || !details.city?.trim()) {
      setTouched((prev) => ({ ...prev, people: true, city: true }));
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: FormEvent) => {
    e.preventDefault();
    if (
      details.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())
    ) {
      setTouched((prev) => ({ ...prev, name: true, email: true, phone: true }));
      return;
    }
    setStep(3);
  };

  const departureText = details.date === "Flexible" ? "Flexible" : dateLabel(details.date);
  const whatsappMessage = `Hello Saadi, I would like to book a tour with Travel With Saadi.\n\nTour: ${currentTrip.name} (${currentTrip.days} Days)\nFrom: ${details.city || "Haripur"}\nTravellers: ${details.people}\nDeparture: ${departureText}\nEstimated Total: ${totalLabel(currentTrip, details.people)}\n\nName: ${details.name.trim()}\nEmail: ${details.email.trim()}\nPhone: ${details.phone.trim()}${details.notes?.trim() ? "\nNotes: " + details.notes.trim() : ""}\nReference: ${reference}\n\nPlease confirm availability and vehicle/hotel options. Thank you!`;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(`Tour Booking Enquiry: ${currentTrip.name} (${reference})`)}&body=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="planner-page booking-page">
      <div className="planner-top wrap">
        <Link to={`/tours/${currentTrip.id}`} className="back-to-tour-link">
          <ArrowLeft size={16} /> Back to {currentTrip.name}
        </Link>
        <span className="booking-badge-status">
          <CheckCircle2 size={15} /> Direct Booking · No Online Payment Required
        </span>
      </div>

      <div className="planner-layout wrap">
        {/* Left Side: Selected Tour Summary Card */}
        <aside className="planner-trip-card">
          <div className="planner-trip-image">
            <img src={photo(currentTrip.id)} alt={currentTrip.name} />
            <div className="planner-trip-shade" />
            <div className="planner-trip-info">
              <span className="eyebrow">{currentTrip.region}</span>
              <h3>{currentTrip.name}</h3>
              <p>{currentTrip.days} Days · {currentTrip.type}</p>
            </div>
          </div>
          <div className="planner-trip-highlights">
            <h4>Tour Highlights</h4>
            <ul>
              {currentTrip.highlights.map((h) => (
                <li key={h}>
                  <CheckCircle2 size={15} /> {h}
                </li>
              ))}
            </ul>
            <div className="planner-trip-price-row">
              <small>Estimated Price</small>
              <strong>{totalLabel(currentTrip, details.people)}</strong>
            </div>
          </div>
        </aside>

        {/* Right Side: 4-Step Planner Form */}
        <div className="planner-form-shell" ref={stage}>
          {/* Step Indicators */}
          <div className="planner-steps-bar" role="tablist">
            {[
              "1. Destination & Date",
              "2. Your People",
              "3. Contact Info",
              "4. Final Plan",
            ].map((label, idx) => (
              <button
                key={label}
                type="button"
                className={`step-pill ${step === idx ? "active" : step > idx ? "completed" : ""}`}
                onClick={() => {
                  if (idx < step) setStep(idx);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* STEP 0: Destination & Dates */}
          {step === 0 && (
            <form onSubmit={handleStep0Submit} className="planner-step-form">
              <span className="eyebrow form-kicker">Step 1 of 4 · Destination & Timing</span>
              <h2>Choose your destination</h2>
              <p className="form-description">
                Select your preferred tour and when you would like to travel. You can pick exact dates or choose flexible timing.
              </p>

              <label className="field-label" htmlFor="booking-destination">
                Tour / Destination
                <select
                  id="booking-destination"
                  value={selectedTourId}
                  onChange={(e) => {
                    setSelectedTourId(e.target.value);
                    change("tourId", e.target.value);
                  }}
                  required
                >
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.days} Days · {t.region})
                    </option>
                  ))}
                </select>
              </label>

              <div className="date-selection-box">
                <span className="field-label-text">When would you like to travel?</span>
                <div className="date-mode-toggle">
                  <button
                    type="button"
                    className={`date-tab-button ${dateMode === "date" ? "active" : ""}`}
                    onClick={() => {
                      setDateMode("date");
                      if (details.date === "Flexible") change("date", "");
                    }}
                  >
                    I have a date
                  </button>
                  <button
                    type="button"
                    className={`date-tab-button ${dateMode === "flexible" ? "active" : ""}`}
                    onClick={() => {
                      setDateMode("flexible");
                      change("date", "Flexible");
                    }}
                  >
                    I’m flexible
                  </button>
                </div>

                {dateMode === "date" ? (
                  <label className="field-label" htmlFor="booking-date">
                    Departure Date
                    <input
                      id="booking-date"
                      type="date"
                      min={today()}
                      required
                      value={details.date === "Flexible" ? "" : details.date}
                      onChange={(e) => change("date", e.target.value)}
                    />
                    {touched.date && !validDate(details.date) && (
                      <small className="field-error">Please select a valid upcoming date.</small>
                    )}
                  </label>
                ) : (
                  <div className="flexible-notice">
                    <Calendar size={18} />
                    <span>Flexible dates — Saadi will help coordinate the best travel window and weather forecast.</span>
                    <input type="hidden" name="date" value="Flexible" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button className="button btn-prominent" type="submit">
                  Continue to group size <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 1: Your People */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="planner-step-form">
              <span className="eyebrow form-kicker">Step 2 of 4 · Group & Departure</span>
              <h2>Your people & departure</h2>
              <p className="form-description">
                Tell us where you will be departing from and how many people are in your group so we can arrange the ideal vehicle.
              </p>

              <label className="field-label" htmlFor="booking-city">
                Departing City / Location
                <input
                  id="booking-city"
                  autoComplete="address-level2"
                  placeholder="e.g. Haripur, Islamabad, Lahore, Karachi, Peshawar"
                  required
                  value={details.city || ""}
                  onChange={(e) => change("city", e.target.value)}
                />
              </label>

              <label className="field-label" htmlFor="booking-people">
                Number of Travelers
                <input
                  id="booking-people"
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={details.people}
                  onChange={(e) => change("people", e.target.value)}
                />
                <small className="field-hint">Includes adults and children. We arrange Prado, Grand Cabin, or Coaster accordingly.</small>
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => setStep(0)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button className="button btn-prominent" type="submit">
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Contact Details */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="planner-step-form">
              <span className="eyebrow form-kicker">Step 3 of 4 · Contact Details</span>
              <h2>Nice to meet you</h2>
              <p className="form-description">
                Where should Saadi send your customized itinerary, vehicle details, and quotation?
              </p>

              <label className="field-label" htmlFor="booking-name">
                Full Name
                <input
                  id="booking-name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  value={details.name}
                  onChange={(e) => change("name", e.target.value)}
                />
              </label>

              <label className="field-label" htmlFor="booking-email">
                Email Address
                <input
                  id="booking-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={details.email}
                  onChange={(e) => change("email", e.target.value)}
                />
              </label>

              <label className="field-label" htmlFor="booking-phone">
                Phone / WhatsApp Number
                <input
                  id="booking-phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={details.phone}
                  onChange={(e) => change("phone", e.target.value)}
                />
                <small className="field-hint">We will connect with you directly on WhatsApp for instant confirmation.</small>
              </label>

              <label className="field-label" htmlFor="booking-notes">
                Special Requests or Notes (Optional)
                <textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="e.g. Need hotel with elevator, traveling with infants, Prado required, prefer scenic photo stops..."
                  value={details.notes}
                  onChange={(e) => change("notes", e.target.value)}
                />
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button className="button btn-prominent" type="submit">
                  Review your plan <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review & WhatsApp Booking */}
          {step === 3 && (
            <div className="planner-step-form confirmation-step">
              <span className="eyebrow form-kicker">Step 4 of 4 · Review & Direct Booking</span>
              <h2>A beautiful plan</h2>
              <p className="form-description">
                Your tour request is ready! You can send it directly to Saadi on WhatsApp for instant availability and pricing, or send it by email.
              </p>

              <div className="plan-summary-card">
                <div className="summary-row">
                  <span>Tour Destination</span>
                  <strong>{currentTrip.name} · {currentTrip.days} Days ({currentTrip.region})</strong>
                </div>
                <div className="summary-row">
                  <span>Travel Date</span>
                  <strong>{details.date === "Flexible" ? "Flexible dates" : dateLabel(details.date)}</strong>
                </div>
                <div className="summary-row">
                  <span>Travelers & Departure</span>
                  <strong>Travellers: {details.people} (from {details.city || "Haripur"})</strong>
                </div>
                <div className="summary-row">
                  <span>Contact Details</span>
                  <strong>{details.name} · {details.phone} · {details.email}</strong>
                </div>
                {details.notes && (
                  <div className="summary-row">
                    <span>Notes</span>
                    <p>{details.notes}</p>
                  </div>
                )}
                <div className="summary-row price-row">
                  <span>Estimated Total</span>
                  <strong className="summary-price">{totalLabel(currentTrip, details.people)}</strong>
                </div>
              </div>

              <div className="booking-cta-group">
                <a
                  className="button btn-whatsapp btn-large"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={24} /> Book directly on WhatsApp
                </a>

                <a
                  className="button button-outline"
                  href={emailUrl}
                >
                  <Mail size={18} /> Send via Email
                </a>
              </div>

              <div className="booking-notice-box">
                <CheckCircle2 size={18} />
                <div>
                  <strong>Direct Confirmation · No Online Payment</strong>
                  <p>
                    This is an enquiry, not a confirmed booking. Saadi will directly confirm vehicle availability, hotel options, and finalize everything with you personally.
                  </p>
                </div>
              </div>

              <div className="form-actions space-between">
                <button
                  type="button"
                  className="text-link edit-plan-btn"
                  onClick={() => setStep(2)}
                >
                  <Edit3 size={15} /> Edit your details
                </button>
                <Link to="/contact" className="text-link">
                  Have questions? Contact Saadi <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="planner-help wrap">
        <span>Prefer to talk directly?</span>
        <a href={`tel:${contact.phone.replaceAll(" ", "")}`} className="phone-cta-link">
          <Phone size={16} /> {contact.phone}
        </a>
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-cta-link"
        >
          <WhatsAppIcon size={16} /> WhatsApp: {contact.phone}
        </a>
      </div>
    </section>
  );
}
