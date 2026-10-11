import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { trips } from "./data";
import { bookingHref } from "./booking";
import type { BookingDraft, Enquiry } from "./booking";
function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
function store(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage may be unavailable in private browsing. */
  }
}
type State = {
  bookingDraft: BookingDraft | null;
  setBookingDraft: (draft: BookingDraft | null) => void;
  enquiry: Enquiry | null;
  setEnquiry: (enquiry: Enquiry | null) => void;
  saved: string[];
  toggleSave: (id: string) => void;
  openPlanner: (destination?: string) => void;
  paused: boolean;
  toggleMotion: () => void;
  notice: string;
  notify: (s: string) => void;
};
const Context = createContext<State | null>(null);
export function TravelProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [saved, setSaved] = useState<string[]>(() => {
    const v = read<unknown>("saadi-saved-trips", []);
    return Array.isArray(v)
      ? v.filter((id) => trips.some((t) => t.id === id))
      : [];
  });
  const [paused, setPaused] = useState(
    () =>
      read("saadi-motion-paused", false) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [notice, notify] = useState("");
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
  }, [paused]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => notify(""), 3200);
    return () => clearTimeout(id);
  }, [notice]);
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => {
      if (q.matches) setPaused(true);
    };
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  const toggleSave = (id: string) => {
    const exists = saved.includes(id);
    const next = exists ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    store("saadi-saved-trips", next);
    notify(
      `${trips.find((t) => t.id === id)?.name} ${exists ? "removed from" : "added to"} your saved tours.`,
    );
  };
  const openPlanner = useCallback(
    (destination = "") =>
      navigate(
        destination
          ? bookingHref(destination, location.search)
          : "/tours?booking=1",
      ),
    [navigate, location.search],
  );
  return (
    <Context.Provider
      value={{
        bookingDraft,
        setBookingDraft,
        enquiry,
        setEnquiry,
        saved,
        toggleSave,
        paused,
        openPlanner,
        notice,
        notify,
        toggleMotion: () =>
          setPaused((p) => {
            store("saadi-motion-paused", !p);
            return !p;
          }),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useTravel() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing TravelProvider");
  return context;
}
