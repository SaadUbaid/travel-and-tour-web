import { useRef } from "react";
import { Check, CalendarDays, Users, Plane } from "lucide-react";
import { useTravel } from "../state";
import { photo, captions } from "../data";
import type { Trip } from "../data";
import { dateLabel } from "../booking";
import type { BookingDraft } from "../booking";
export default function BookingTicket({
  trip,
  details,
}: {
  trip: Trip;
  details: BookingDraft;
}) {
  const ticket = useRef<HTMLDivElement>(null);
  const { paused } = useTravel();
  const key = trip.id;
  return (
    <div className="planner-visual">
      <span className="eyebrow">Your chosen tour</span>
      <h1>
        Your tour.
        <br />
        <span className="text-accent">Your people.</span>
      </h1>
      <p>
        Choose your dates. Share your details.
        <br />
        We’ll help you plan the rest.
      </p>
      <div
        className="ticket-space"
        onPointerMove={(e) => {
          if (paused || e.pointerType !== "mouse" || !ticket.current) return;
          const r = e.currentTarget.getBoundingClientRect();
          ticket.current.style.setProperty(
            "--tilt-x",
            `${(-(e.clientY - r.top - r.height / 2) / r.height) * 10}deg`,
          );
          ticket.current.style.setProperty(
            "--tilt-y",
            `${((e.clientX - r.left - r.width / 2) / r.width) * 13}deg`,
          );
        }}
        onPointerLeave={() => {
          ticket.current?.style.setProperty("--tilt-x", "0deg");
          ticket.current?.style.setProperty("--tilt-y", "0deg");
        }}
      >
        <div className="ticket-float">
          <div className="ticket-stack-back" aria-hidden="true" />
          <div className="journey-ticket" ref={ticket}>
            <div className="ticket-photo">
              <img key={key} src={photo(key, true)} alt={captions[key]} />
              <span>YOUR NEXT GREAT ESCAPE</span>
              <div>
                <small>{trip?.region || "Somewhere in Pakistan"}</small>
                <strong>{trip?.name || "Somewhere wonderful"}</strong>
              </div>
            </div>
            <div className="ticket-tear">
              <i />
              <span />
              <i />
            </div>
            <div className="ticket-details">
              <span className="eyebrow">A little closer to going</span>
              <div>
                <span>
                  <CalendarDays size={15} />
                  <small>WHEN</small>
                  <strong>{dateLabel(details.date)}</strong>
                </span>
                <span>
                  <Users size={15} />
                  <small>WHO</small>
                  <strong>
                    {details.people || "—"}{" "}
                    {details.people === "1" ? "traveller" : "travellers"}
                  </strong>
                </span>
              </div>
              <div className="ticket-route">
                <span>Your departure</span>
                <div>
                  <span />
                  <Plane size={17} />
                  <span />
                </div>
                <span>{trip?.name || "Your escape"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="planner-promise">
        <span>
          <Check size={15} /> Personally planned
        </span>
        <span>
          <Check size={15} /> No payment now
        </span>
      </div>
    </div>
  );
}
