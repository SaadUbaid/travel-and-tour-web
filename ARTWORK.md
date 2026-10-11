# Photography and motion

The v3 redesign replaces the former generated landscapes and WebGL portals with source-labelled photographs of real destinations and real drone footage of Attabad Lake. No generated landscape or added desert/forest cutout is used in the active application.

See [PHOTOGRAPHY.md](PHOTOGRAPHY.md) for source and licensing details. The complete machine-readable credit list ships at `public/photos/credits.json` and is displayed at `/#/credits`.

Motion is implemented with GSAP ScrollTrigger and CSS perspective transforms. Photographs remain whole documentary images; splitting image planes is a transition between views, not a fabricated scene. The booking card has layered, floating paper surfaces and pointer-responsive 3D rotation.
