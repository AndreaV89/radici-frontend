import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import router from "./router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Projects from "./pages/Progetti";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import SinglePost from "./pages/SinglePost";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
} else {
  // Gestisci il caso in cui l'elemento non esiste
  console.error("Elemento root non trovato!");
}
