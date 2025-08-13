import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom"; // IMPORTANTE

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Qui verranno caricate le nostre pagine (Home, About, ecc.) */}
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
