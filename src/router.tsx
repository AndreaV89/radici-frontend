import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../src/Layout";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import News from "../src/pages/News";
import Projects from "../src/pages/Progetti";
import Support from "../src/pages/Support";
import Contact from "../src/pages/Contact";
import SinglePost from "../src/pages/SinglePost";
import Events from "./pages/Events";
import Partners from "./pages/Partners";
import Tours from "./pages/Tours";
import Webcam from "./pages/Webcam";
import Weather from "./pages/Weather";
import Activities from "./pages/Activities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "news", element: <News /> },
      { path: "news/:postSlug", element: <SinglePost postType="posts" /> },
      { path: "eventi", element: <Events /> }, // <-- Rotta per la lista eventi
      { path: "eventi/:postSlug", element: <SinglePost postType="evento" /> },
      { path: "chi-siamo", element: <About /> },
      { path: "progetti", element: <Projects /> },
      {
        path: "progetti/:postSlug",
        element: <SinglePost postType="progetto" />,
      },
      { path: "partners", element: <Partners /> },
      { path: "attivita", element: <Activities /> },
      {
        path: "attivita/:postSlug",
        element: <SinglePost postType="attivita" />,
      },
      { path: "sostienici", element: <Support /> },
      { path: "contatti", element: <Contact /> },
      { path: "escursioni", element: <Tours /> },
      {
        path: "escursioni/:postSlug",
        element: <SinglePost postType="escursione" />,
      },
      { path: "webcam", element: <Webcam /> },
      { path: "meteo", element: <Weather /> },
    ],
  },
]);

export default router;
