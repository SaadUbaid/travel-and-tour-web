import { money } from "./data";
import type { Trip } from "./data";
export type BookingDraft = {
  tourId: string;
  date: string;
  people: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  notes: string;
};
export type Enquiry = {
  reference: string;
  tourId: string;
  date: string;
  people: string;
  message: string;
  channel: "whatsapp" | "email";
};
export function today() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value &&
    value >= today()
  );
}
export function validPeople(value: string) {
  return /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 100;
}
export function validPhone(value: string) {
  return (
    /^\+?[\d ()-]+$/.test(value.trim()) &&
    /^\d{7,15}$/.test(value.replace(/\D/g, ""))
  );
}
export function dateLabel(value: string) {
  return value
    ? new Date(value + "T12:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Choose a date";
}
export function carryPreferences(search: string) {
  const source = new URLSearchParams(search),
    result = new URLSearchParams();
  const date = source.get("date") || "",
    people = source.get("people") || "";
  if (validDate(date)) result.set("date", date);
  if (validPeople(people)) result.set("people", people);
  return result;
}
export function tourHref(id: string, search = "") {
  const params = carryPreferences(search).toString();
  return `/tours/${encodeURIComponent(id)}${params ? "?" + params : ""}`;
}
export function bookingHref(id: string, search = "") {
  const params = carryPreferences(search);
  params.set("tour", id);
  return `/booking?${params}`;
}
export function totalLabel(tour: Trip, people: string) {
  if (tour.pricePerPerson == null) return "Quote on request";
  return validPeople(people)
    ? money(tour.pricePerPerson * Number(people))
    : "Choose travelers";
}
export function referenceNumber() {
  const random = new Uint8Array(4);
  crypto.getRandomValues(random);
  return `TWS-${today().replaceAll("-", "")}-${Array.from(random, (b) =>
    b.toString(16).padStart(2, "0"),
  )
    .join("")
    .toUpperCase()}`;
}
