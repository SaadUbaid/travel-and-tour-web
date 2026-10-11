import { Window } from "happy-dom";
const window = new Window({ url: "http://localhost/" });
for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "Element",
  "HTMLInputElement",
  "HTMLSelectElement",
  "HTMLFormElement",
  "HTMLVideoElement",
  "Node",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "PointerEvent",
  "FocusEvent",
  "CustomEvent",
  "MutationObserver",
  "localStorage",
  "sessionStorage",
])
  Object.defineProperty(globalThis, key, {
    value: key === "window" ? window : window[key as keyof Window],
    configurable: true,
    writable: true,
  });
Object.assign(globalThis, {
  IS_REACT_ACT_ENVIRONMENT: true,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: (cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16),
  cancelAnimationFrame: clearTimeout,
  matchMedia: () => ({
    matches: true,
    addEventListener() {},
    removeEventListener() {},
  }),
  IntersectionObserver: class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
});
window.matchMedia = globalThis.matchMedia;
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};
await import("./dom-suite");
await window.happyDOM.abort();
process.exit(0);
