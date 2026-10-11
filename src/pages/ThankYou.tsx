import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { useTravel } from "../state";
import { trips, contact } from "../data";
import { dateLabel, totalLabel, bookingHref } from "../booking";
import { PageIntro } from "../components/UI";
import BookingProgress from "../components/BookingProgress";
export default function ThankYou() {
  const { enquiry, setEnquiry, setBookingDraft } = useTravel();
  const tour = trips.find((item) => item.id === enquiry?.tourId);
  if (!enquiry || !tour)
    return (
      <>
        <PageIntro
          kicker="Tour enquiries"
          title="Continue your conversation"
          description="Enquiry details are kept only while you use this site. If you already opened WhatsApp or email, finish sending your message there. Saadi will confirm the next steps."
        />
        <section className="closing-cta wrap">
          <a
            className="button"
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp <Send size={17} />
          </a>
          <p>
            <Link className="text-link" to="/tours">
              Browse tours
            </Link>
          </p>
        </section>
      </>
    );
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(enquiry.message)}`;
  const email = `mailto:${contact.email}?subject=${encodeURIComponent(`Tour enquiry ${enquiry.reference} — ${tour.name}`)}&body=${encodeURIComponent(enquiry.message)}`;
  return (
    <section className="planner-page confirmation-page">
      <div className="wrap confirmation-shell">
        <div className="planner-form-shell">
          <BookingProgress step={3} />
          <div className="form-stage">
            <span className="eyebrow form-kicker">Your next step</span>
            <h1>Your enquiry is ready.</h1>
            <p className="form-description">
              Thank you for choosing {tour.name}. Finish sending your message in{" "}
              {enquiry.channel === "whatsapp" ? "WhatsApp" : "your email app"}{" "}
              so Saadi can reply.
            </p>
            <div className="review-card">
              <div>
                <span>
                  <small>Enquiry reference · not a booking number</small>
                  <strong className="enquiry-reference">
                    {enquiry.reference}
                  </strong>
                </span>
              </div>
              <dl>
                <div>
                  <dt>Tour</dt>
                  <dd>{tour.name}</dd>
                </div>
                <div>
                  <dt>Preferred date</dt>
                  <dd>{dateLabel(enquiry.date)}</dd>
                </div>
                <div>
                  <dt>Travelers</dt>
                  <dd>{enquiry.people}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd>{totalLabel(tour, enquiry.people)}</dd>
                </div>
              </dl>
            </div>
            <div className="itinerary-list confirmation-next">
              {[
                [
                  "Send your message",
                  "Press Send in WhatsApp or email. Opening the app alone does not send your enquiry.",
                ],
                [
                  "Get your quote",
                  "Saadi will discuss availability, the itinerary, inclusions, and the final price with you.",
                ],
                [
                  "Confirm with Saadi",
                  "Agree the payment and cancellation terms directly before confirming your tour.",
                ],
              ].map(([title, text], i) => (
                <details key={title} open={i === 0}>
                  <summary>
                    <span className="day-number">0{i + 1}</span>
                    <strong>{title}</strong>
                    <span className="detail-plus">+</span>
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
            <a
              className="button send-enquiry"
              href={enquiry.channel === "whatsapp" ? whatsapp : email}
              target={enquiry.channel === "whatsapp" ? "_blank" : undefined}
              rel="noreferrer"
            >
              {enquiry.channel === "whatsapp"
                ? "Open WhatsApp again"
                : "Open email again"}
              {enquiry.channel === "whatsapp" ? (
                <Send size={17} />
              ) : (
                <Mail size={17} />
              )}
            </a>
            <p className="form-footnote">
              This site cannot verify whether your message was sent. No seats
              have been reserved and no payment has been taken.
            </p>
            <div className="review-alternatives">
              <Link to={bookingHref(tour.id)}>Edit enquiry</Link>
              <Link
                to="/tours"
                onClick={() => {
                  setEnquiry(null);
                  setBookingDraft(null);
                }}
              >
                Explore more tours <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
