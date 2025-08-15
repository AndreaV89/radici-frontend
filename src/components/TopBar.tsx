import React from "react";
import {
  Box,
  Container,
  Link as MuiLink,
  IconButton,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Icona meteo di esempio

const TopBar: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "rgba(0,0,0,0.1)", py: 0.5 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/webcam"
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "flex",
              alignItems: "center",
              mr: 3,
            }}
          >
            <VideocamIcon sx={{ mr: 0.5, fontSize: "1rem" }} />
            Webcam
          </MuiLink>

          <IconButton
            component={RouterLink}
            to="/meteo"
            aria-label="meteo"
            size="small"
            sx={{ mr: 3 }}
          >
            <WbSunnyIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              18°C
            </Typography>
          </IconButton>

          <Typography variant="body2" sx={{ cursor: "pointer" }}>
            IT / <b>EN</b>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TopBar;
