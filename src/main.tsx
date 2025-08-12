import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Projects from "./pages/Progetti";
import Support from "./pages/Support";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Il Layout è l'elemento genitore
    children: [
      // Le pagine figlie vengono caricate nell'Outlet del Layout
      { index: true, element: <Home /> },
      { path: "news", element: <News /> },
      { path: "chi-siamo", element: <About /> },
      { path: "progetti", element: <Projects /> },
      { path: "sostienici", element: <Support /> },
      { path: "contatti", element: <Contact /> },
    ],
  },
]);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  // Gestisci il caso in cui l'elemento non esiste
  console.error("Elemento root non trovato!");
}
