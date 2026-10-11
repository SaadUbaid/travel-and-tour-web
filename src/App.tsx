import { useEffect, useRef, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Header,
  Footer,
  BookingHeader,
  BookingFooter,
} from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Experiences from "./pages/Experiences";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
const Tours = lazy(() => import("./pages/Tours"));
const Destination = lazy(() => import("./pages/Destination"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Terms = lazy(() => import("./pages/Terms"));
const Trip = lazy(() => import("./pages/Trip"));
const Plan = lazy(() => import("./pages/Plan"));
const Credits = lazy(() => import("./pages/Credits"));
export default function App() {
  const location = useLocation(),
    initial = useRef(true);
  const booking = ["/booking", "/plan", "/thank-you"].includes(
    location.pathname,
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!initial.current)
      document.getElementById("main")?.focus({ preventScroll: true });
    initial.current = false;
    document.title = "Travel With Saadi";
  }, [location.pathname]);
  return (
    <>
      {booking ? <BookingHeader /> : <Header />}
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="page-loading" role="status">
              Your next chapter is on its way…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<Destination />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<Trip />} />
            <Route path="/booking" element={<Plan key={location.search} />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Terms />} />
            <Route path="/trip/:id" element={<Trip />} />
            <Route path="/about" element={<About />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plan" element={<Plan key={location.search} />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {booking ? <BookingFooter /> : <Footer />}
    </>
  );
}
