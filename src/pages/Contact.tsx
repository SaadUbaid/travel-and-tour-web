import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTravel } from "../state";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import {
  PageIntro,
  Reveal,
  LocationLabel,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
} from "../components/UI";
import { photo, contact } from "../data";

export default function Contact() {
  const [params] = useSearchParams();
  const { paused } = useTravel();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    params.get("subject") === "planning-call"
      ? "I would like to arrange a planning call. "
      : "",
  );
  const [ready, setReady] = useState(false),
    [showMap, setShowMap] = useState(false);
  const enquiry = `Hello Saadi,\n\n${message.trim()}\n\nName: ${name.trim()}\nEmail: ${email.trim()}`;
  return (
    <>
      <PageIntro
        kicker="Direct Point of Contact in Haripur"
        title="Contact"
        accent="Saadi"
        description="Have questions about itineraries, customized dates, or vehicle options? Speak directly with Saadi."
        compact={true}
      />
      <section className="contact-layout wrap">
        <Reveal className="contact-photo">
          <img src={photo("swat")} alt="The river in Kalam, Swat Valley" />
          <LocationLabel id="swat" />
          <div>
            <h2>
              Discover Pakistan
              <br />
              with <span className="text-accent">Saadi.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal className="contact-details">
          <span className="eyebrow">Speak directly with Saadi</span>
          <h2>
            Let's plan your
            <br />
            <span className="text-accent">custom tour.</span>
          </h2>
          <p>
            Share your dates, group size, and destinations. We'll arrange your vehicle, hotels, and detailed route plan.
          </p>

          {/* Prominent WhatsApp Action Card */}
          <a
            className="contact-whatsapp-action"
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Saadi! I have a question about booking a tour.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="whatsapp-icon-badge">
              <WhatsAppIcon size={24} />
            </div>
            <span>
              <small>Instant Response</small>
              Chat on WhatsApp: {contact.phone}
            </span>
            <ArrowUpRight size={18} />
          </a>

          <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>
            <Phone size={20} />
            <span>
              <small>Call Saadi directly</small>
              {contact.phone}
            </span>
            <ArrowUpRight size={18} />
          </a>

          <a href={`mailto:${contact.email}`}>
            <Mail size={20} />
            <span>
              <small>Official Email</small>
              {contact.email}
            </span>
            <ArrowUpRight size={18} />
          </a>

          <div className="contact-address">
            <MapPin size={20} />
            <span>
              <small>Office Location</small>
              {contact.address}
            </span>
          </div>

          {/* Social Media Links */}
          <div className="contact-social-row">
            <span className="social-label">Connect:</span>
            <a
              href="https://www.instagram.com/travelwithsaadi.pk/"
              target="_blank"
              rel="noreferrer"
              className="social-btn instagram-btn"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hello Saadi! I would like to inquire about a tour.")}`}
              target="_blank"
              rel="noreferrer"
              className="social-btn whatsapp-btn"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>

          <button
            className="button btn-prominent"
            type="button"
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: paused ? "instant" : "smooth" })
            }
          >
            Send a message below <ArrowUpRight size={18} />
          </button>
        </Reveal>
      </section>
      <section className="wrap section-space contact-support">
        <div className="planner-form-shell" id="contact-form">
          <span className="eyebrow">A quick question</span>
          <h2>Send a message</h2>
          <p className="form-description">
            Ask about a tour, a planning call, or anything you need before you
            book.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setReady(true);
            }}
          >
            <label className="field-label">
              Name
              <input
                required
                pattern=".*\S.*"
                autoComplete="name"
                maxLength={100}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setReady(false);
                }}
              />
            </label>
            <label className="field-label">
              Email
              <input
                type="email"
                required
                autoComplete="email"
                maxLength={120}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setReady(false);
                }}
              />
            </label>
            <label className="field-label">
              Message
              <textarea
                required
                rows={4}
                minLength={5}
                maxLength={1000}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setReady(false);
                }}
              />
            </label>
            <button className="button" type="submit">
              Prepare message <ArrowUpRight size={17} />
            </button>
          </form>
          {ready && (
            <div className="review-card contact-message" role="status">
              <p>
                Your message is ready. Open WhatsApp or email, then press Send
                there.
              </p>
              <a
                className="button"
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(enquiry)}`}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp <ArrowUpRight size={16} />
              </a>
              <div className="review-alternatives">
                <a
                  href={`mailto:${contact.email}?subject=Tour%20question&body=${encodeURIComponent(enquiry)}`}
                >
                  Use email instead
                </a>
              </div>
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">Before your tour</span>
          <h2>Common questions</h2>
          <div className="itinerary-list">
            {[
              [
                "How do I book a tour?",
                "Choose a tour, open its details, and select Book this tour. Share your date and traveler details, then send the prepared enquiry to Saadi.",
              ],
              [
                "Can I pay on this website?",
                "No. Saadi will confirm the price and payment arrangements directly after discussing your tour.",
              ],
              [
                "Can I choose my own date?",
                "Yes, you can request a preferred date. Saadi will confirm availability and a suitable itinerary.",
              ],
              [
                "What does the tour include?",
                "Inclusions depend on the agreed plan. Ask for a written quote listing transport, stays, meals, guides, and any entry fees before you confirm.",
              ],
              [
                "Can I arrange a call?",
                "Yes. Send a message with a suitable time in Pakistan time, or call the number above. Saadi will confirm the appointment.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  <strong>{question}</strong>
                  <span className="detail-plus">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section-space">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Find us</span>
            <h2>Haripur, Pakistan</h2>
          </div>
          <p>
            GT Road, Haripur. The map shows the area; contact Saadi for an exact
            meeting point.
          </p>
        </div>
        <div className="map-panel">
          {showMap ? (
            <iframe
              title="Map of the Haripur area"
              src="https://maps.google.com/maps?q=GT%20Road%20Haripur%20Pakistan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="empty-state">
              <MapPin size={28} />
              <h3>Haripur area map</h3>
              <p>Load the map from Google, or open it in a new tab.</p>
              <button className="button" onClick={() => setShowMap(true)}>
                Load map
              </button>
            </div>
          )}
        </div>
        <a
          className="text-link"
          href="https://www.google.com/maps/search/?api=1&query=GT+Road+Haripur+Pakistan"
          target="_blank"
          rel="noreferrer"
        >
          Open in Google Maps <ArrowUpRight size={16} />
        </a>
      </section>
    </>
  );
}
