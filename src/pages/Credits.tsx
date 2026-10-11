import { useEffect, useState } from "react";
import { PageIntro } from "../components/UI";
import { photo } from "../data";
type Credit = {
  id: string;
  caption: string;
  source: string;
  artist: string;
  license: string;
  licenseUrl: string;
  changes: string;
};
export default function Credits() {
  const [credits, setCredits] = useState<Credit[]>([]),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    const c = new AbortController();
    fetch(`${import.meta.env.BASE_URL}photos/credits.json`, {
      signal: c.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unavailable");
        return r.json();
      })
      .then(setCredits)
      .catch((e) => {
        if (e.name !== "AbortError") setFailed(true);
      });
    return () => c.abort();
  }, []);
  return (
    <>
      <PageIntro
        kicker="Through their lens"
        title="Real places."
        accent="Generous perspectives."
        description="Our thanks to the photographers and filmmakers who make it possible to see these places before we get there."
      />
      <section className="credits wrap">
        <article className="video-credit">
          <h2>The view from above.</h2>
          <p>
            Attabad Lake aerial footage by{" "}
            <a
              href="https://www.pexels.com/video/aerial-footage-of-a-valley-7748528/"
              target="_blank"
              rel="noreferrer"
            >
              Abdul Ahad / Pexels
            </a>
            . Used under the{" "}
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noreferrer"
            >
              Pexels licence
            </a>
            . Excerpted, resized, and encoded for this website.
          </p>
        </article>
        {failed ? (
          <p>
            Photo credits could not load.{" "}
            <a href={`${import.meta.env.BASE_URL}photos/credits.json`}>
              Open the photography credits file.
            </a>
          </p>
        ) : (
          <div className="credit-grid">
            {credits.map((c) => (
              <article key={c.id}>
                <img src={photo(c.id, true)} alt={c.caption} loading="lazy" />
                <h3>{c.caption}</h3>
                <p>Photo: {c.artist}</p>
                <a href={c.source} target="_blank" rel="noreferrer">
                  View original on Wikimedia Commons
                </a>
                <a
                  href={c.licenseUrl || c.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.license}
                </a>
                <small>
                  {c.changes} Adaptations retain the source licence.
                </small>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
