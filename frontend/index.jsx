import { createRoot } from "react-dom/client";

// used for babel polyfills.
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./public-path";
import "./config/i18n"; // Initialize i18n
import routes from "./router";
import "./index.scss";

if (typeof window !== "undefined") {
  const { document } = global;
  const app = document.getElementById("app");
  const root = createRoot(app);
  root.render(routes);
}
