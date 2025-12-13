import { createRoot } from "react-dom/client";

// used for babel polyfills.
import "core-js/stable";
import "regenerator-runtime/runtime";

// Initialize i18n before rendering the app
import "./i18n/config";

import "./public-path";
import routes from "./router";
import "./index.scss";

if (typeof window !== "undefined") {
  const { document } = global;
  const app = document.getElementById("app");
  const root = createRoot(app);
  root.render(routes);
}
