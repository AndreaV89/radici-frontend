import { useState } from "react";
import { useMap } from "react-leaflet";
import { Button, Box } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const GeoLocation = () => {
  const map = useMap();
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const handleLocate = () => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14); // Vola alla posizione dell'utente con uno zoom adeguato
    });
  };

  return (
    <>
      <Box sx={{ position: "absolute", top: 10, left: 46, zIndex: 1000 }}>
        <Button
          variant="contained"
          onClick={handleLocate}
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": { backgroundColor: "#f2f2f2" },
          }}
          title="Mostra la mia posizione"
        >
          <MyLocationIcon />
        </Button>
      </Box>

      {position && (
        <Marker position={position}>
          <Popup>Sei qui!</Popup>
        </Marker>
      )}
    </>
  );
};

export default GeoLocation;
