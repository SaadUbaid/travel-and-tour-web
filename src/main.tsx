import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { TravelProvider } from "./state";
import "./styles.css";
import "./flow.css";

const initial = document.body.dataset.initialRoute;
if (!location.hash && initial && initial !== "/") {
  const id = new URLSearchParams(location.search).get("id");
  location.hash =
    initial.startsWith("/trip/") && id
      ? `/trip/${encodeURIComponent(id)}`
      : initial;
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <TravelProvider>
        <App />
      </TravelProvider>
    </HashRouter>
  </React.StrictMode>,
);
