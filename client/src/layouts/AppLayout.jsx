import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// components
import NavbarComponent from "../components/helper/NavbarComponent";
import SidebarComponent from "../components/helper/SidebarComponent";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Navbar */}
      <NavbarComponent />
      <SidebarComponent />
      {children}
    </Box>
  );
};

export default AppLayout;
