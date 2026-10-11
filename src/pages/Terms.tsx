import { Link } from "react-router-dom";
import { PageIntro } from "../components/UI";
import { contact } from "../data";
export default function Terms() {
  return (
    <>
      <PageIntro
        kicker="Before you book"
        title="Terms & privacy"
        description="How tour enquiries and your information work on this website."
      />
      <div className="wrap terms-content">
        <section>
          <h3>Tour enquiries</h3>
          <p>
            The itineraries on this website are suggested starting points.
            Sending an enquiry does not reserve a place or confirm a booking.
            Travel With Saadi will confirm availability, routes, departure
            details, inclusions, and the final price directly with you.
          </p>
        </section>
        <section>
          <h3>Prices and payment</h3>
          <p>
            Where a tour has no published price, request a quote for your group.
            Any displayed total is an estimate until confirmed by Saadi. This
            website does not collect payment. Ask for written payment,
            cancellation, and refund terms before making a commitment.
          </p>
        </section>
        <section>
          <h3>Travel plans</h3>
          <p>
            Access, activities, and timings may depend on the weather and local
            conditions. Confirm the itinerary and any special requirements
            directly with Saadi before departure.
          </p>
        </section>
        <section id="privacy">
          <h3>Your information</h3>
          <p>
            The enquiry form holds your name, email, phone number, and notes in
            browser memory while you use the website. The site has no booking
            database and does not automatically send this information to Saadi.
            It is shared when you send the prepared message through WhatsApp or
            your email app.
          </p>
          <p>
            Saved tour IDs and your motion preference are stored in this
            browser. Personal enquiry details are not saved to local storage.
            You can remove saved tours using their heart buttons and change
            motion preferences using the footer control.
          </p>
        </section>
        <section>
          <h3>External services</h3>
          <p>
            WhatsApp, email, Instagram, and map links open services outside this
            website. The embedded Google map loads only when you choose to load
            it. Those services handle information according to their own
            policies.
          </p>
        </section>
        <section>
          <h3>Questions or corrections</h3>
          <p>
            For questions about a tour or information you have already sent,
            contact Travel With Saadi at{" "}
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            or{" "}
            <a
              className="text-link"
              href={`tel:${contact.phone.replaceAll(" ", "")}`}
            >
              {contact.phone}
            </a>
            .
          </p>
          <Link className="text-link" to="/contact">
            Contact Saadi
          </Link>
        </section>
      </div>
    </>
  );
}
