import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../src/Layout";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import News from "../src/pages/News";
import Projects from "../src/pages/Progetti";
import Support from "../src/pages/Support";
import Contact from "../src/pages/Contact";
import SinglePost from "../src/pages/SinglePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Il Layout è l'elemento genitore
    children: [
      // Le pagine figlie vengono caricate nell'Outlet del Layout
      { index: true, element: <Home /> },
      { path: "news", element: <News /> },
      { path: "news/:postSlug", element: <SinglePost postType="posts" /> },
      { path: "chi-siamo", element: <About /> },
      { path: "progetti", element: <Projects /> },
      {
        path: "progetti/:postSlug",
        element: <SinglePost postType="progetto" />,
      },
      { path: "sostienici", element: <Support /> },
      { path: "contatti", element: <Contact /> },
    ],
  },
]);

export default router;
