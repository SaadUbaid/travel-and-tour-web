import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "../components/UI";
export default function NotFound() {
  return (
    <section className="not-found">
      <PageIntro
        kicker="404 / A little off the trail"
        title="Let’s find"
        accent="your way back."
        description="This page isn’t on our route. There are plenty of beautiful places still waiting to be explored."
      />
      <Link className="button" to="/destinations">
        Explore the destinations <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
