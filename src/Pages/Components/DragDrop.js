import React from "react";
import mapboxgl from "mapbox-gl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../Assets/css/dragDrop.css";
import { useState } from "react";

const DragDrop = ({ map }) => {
  const [open, setOpen] = React.useState(false);
  const [marker, setMarker] = useState();
  const [lnglat, setLnglat] = useState({ lng: -74.2, lat: 40 });
  const [destinationPath, setDestinationPath] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const start = [lnglat.lng, lnglat.lat];

  const style = {
    position: "absolute",
    top: "20%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  [...document.getElementsByClassName("icons")].forEach((iconElement) => {
    iconElement.addEventListener("dragend", displayMarker);
  });

  const el = document.createElement("div");
  el.id = "marker";

  function displayMarker() {
    const marker = new mapboxgl.Marker(el, {
      draggable: true,
    })
      .setLngLat([-74.2, 40])
      .addTo(map);
    setMarker(marker);
  }

  marker && marker.on("dragend", onDragEnd);
  marker && marker.getElement().addEventListener("click", handleOpen);

  function onDragEnd() {
    const lngLat = marker.getLngLat();
    setLnglat(lngLat);
  }

  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_BOX_API_KEY}`,
      { method: "GET" }
    );
    const json = await query.json();

    const data = json.routes[0];

    const route = data.geometry.coordinates;
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // add turn instructions here at the end
  }

  function drawDestinationCircle() {
    const coords = [
      parseFloat(destinationPath[0]),
      parseFloat(destinationPath[1]),
    ];
    const end = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coords,
          },
        },
      ],
    };
    if (map.getLayer("end")) {
      map.getSource("end").setData(end);
    } else {
      map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f30",
        },
      });
    }
    getRoute(coords);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2> UE Name</h2>

          <Typography>
            <i class="fa-light fa-circle-dot"></i>
            <input
              type="text"
              placeholder="Enter Destination"
              value={`${lnglat && lnglat.lng}, ${lnglat && lnglat.lat}`}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <input
              type="text"
              placeholder="Enter Destination"
              onChange={(e) => {
                setDestinationPath(e.target.value.split(","));
              }}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <button onClick={drawDestinationCircle}> Draw Path</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DragDrop;
