import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../Assets/CSS/dragDrop.css";
import * as turf from "@turf/turf";
import phoneImage from "../../Assets/phone.png";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import Button from "@mui/material/Button";

const DragDrop = ({ map }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [mobileIcon, setMobileIcon] = useState();
  const [dMarker, setDMarker] = useState();
  const [ueData, setUeData] = useState();
  const [originPath, setOriginPath] = useState([-74.19977, 40.000069]);
  const [destination, setDestination] = useState("");
  const [mobileActive, setMobileActive] = useState(false);
  const [ueSpeed, setUeSpeed] = useState();

  const mode = "cycling";
  const ue_popup = new mapboxgl.Popup();
  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");

  useEffect(() => {
    document.addEventListener("dragend", function (event) {
      const UeIcon = event.target.closest(".icons");
      if (UeIcon !== null) {
        const el = document.createElement("div");
        el.id = "mobileIcon";

        const mobile = new mapboxgl.Marker(el, {
          draggable: true,
        })
          .setLngLat([-74.19977, 40.000069])
          .addTo(map);

        if (originPath || destination || mobileActive) {
          setOriginPath([-74.19977, 40.000069]);
          setDestination("");
          setMobileActive(false);
        }
        setMobileIcon(mobile);
      }
    });
  }, []);

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

  const styles = {
    color: "black",
    border: "1px solid black",
    backgroundColor: "white",
  };

  mobileIcon && mobileIcon.getElement().addEventListener("click", handleOpen);
  mobileIcon &&
    mobileIcon.on("dragend", () => {
      const originLngLat = mobileIcon.getLngLat();
      mobileActive
        ? setOriginPath([ueData.destinationPath[0], ueData.destinationPath[1]])
        : setOriginPath([originLngLat.lng, originLngLat.lat]);
    });

  useEffect(() => {
    const desMarker = new mapboxgl.Marker({
      color: "black",
      draggable: "true",
    });
    setDMarker(desMarker);
  }, [mobileIcon]);

  // store in local storage
  const OnDragTrajectory = () => {
    let destinationLngFloat = parseFloat(destination[0]);
    let destinationLatFloat = parseFloat(destination[1]);
    const destinationPath = [destinationLngFloat, destinationLatFloat];
    let Id = Math.random();
    let dataEntries = { originPath, destinationPath, Id, mode, ueSpeed };
    setUeData(dataEntries);
    var array = JSON.parse(localStorage.getItem("ueData") || "[]");
    array.push(dataEntries);
    localStorage.setItem("ueData", JSON.stringify(array));
    const oMarker =
      !mobileActive &&
      new mapboxgl.Marker({
        color: "yellow",
      })
        .setLngLat(dataEntries.originPath)
        .addTo(map);
    dMarker.setLngLat(dataEntries.destinationPath).addTo(map);

    getRoute(dataEntries);
    setMobileActive(true);
  };

  async function getRoute(trackData) {
    const { mode, destinationPath, originPath, Id, ueSpeed } = trackData;
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${mode}/${originPath[0]},${originPath[1]};${destinationPath[0]},${destinationPath[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_BOX_API_KEY}`,
      { method: "GET" }
    );
    const json = await query.json();

    const lineCoordinates = json.routes[0].geometry.coordinates;

    const route = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: lineCoordinates,
          },
        },
      ],
    };
    let trackId = Id.toString();

    // A single point that animates along the route.
    // Coordinates are initially set to origin.

    const point = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description: `<strong>UE Details</strong><br/>
                UE ID: ${trackId}<br />
                Mode: ${mode}<br />
                Speed: ${ueSpeed}<br />
                Origin: ${originPath}<br />
                Destination: ${destination}<br />
                `,
          },
          geometry: {
            type: "Point",
            coordinates: originPath,
          },
        },
      ],
    };

    let iconToUse = mode === "cycling" ? "phone1" : "car1";
    let sizeToUse = mode === "cycling" ? 1 : 0.07;

    // Calculate the distance in kilometers between route start/end point.

    const lineDistance = turf.length(route.features[0]);

    const arc = [];

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const steps = 2000;

    // Draw an arc between the `origin` & `destination` of the two points
    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }
    // Update the route with calculated arc coordinates
    route.features[0].geometry.coordinates = arc;

    // Used to increment the value of the point measurement against the route.
    let counter = 0;

    map.loadImage(phoneImage, (error, image) => {
      if (error) throw error;
      map.addImage("phone1", image);
    });

    // Add a source and layer displaying a point which will be animated in a circle.
    map.addSource(`route${trackId}`, {
      type: "geojson",
      lineMetrics: true,
      data: route,
    });

    map.addSource(`point${trackId}`, {
      type: "geojson",
      data: point,
    });
    map.addLayer({
      id: trackId,
      type: "line",
      source: `route${trackId}`,
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

    map.addLayer({
      id: `point${trackId}`,
      source: `point${trackId}`,
      type: "symbol",
      layout: {
        // This icon is a part of the Mapbox Streets style.
        // To view all images available in a Mapbox style, open
        // the style in Mapbox Studio and click the "Images" tab.
        // To add a new image to the style at runtime see
        // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
        "icon-image": iconToUse,
        "icon-size": sizeToUse,
        "icon-rotate": ["get", "bearing"],
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });

    map.on("click", `point${trackId}`, (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      ue_popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    dMarker.setDraggable(false);

    let animation;
    //
    function animate() {
      const start =
        route.features[0].geometry.coordinates[
          counter >= steps ? counter - 1 : counter
        ];
      const end =
        route.features[0].geometry.coordinates[
          counter >= steps ? counter : counter + 1
        ];
      if (!start || !end) return;

      // Update point geometry to a new position based on counter denoting
      // the index to access the arc
      point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[counter];

      let num1 = point.features[0].geometry.coordinates[0];
      num1 = num1.toFixed(2);
      let num2 = destinationPath[0];
      num2 = num2.toFixed(2);
      if (num1 == num2) {
        dMarker.setDraggable(true);
      }

      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculated between the current point and the next point, except
      // at the end of the arc, which uses the previous point and the current point
      point.features[0].properties.bearing = turf.bearing(
        turf.point(start),
        turf.point(end)
      );

      // Update the source with this new data
      map.getSource(`point${trackId}`).setData(point);

      // Request the next frame of animation as long as the end has not been reached
      if (counter < steps) {
        animation = requestAnimationFrame(animate);
      }

      counter = counter + 1;
    }

    playButton.addEventListener("click", () => {
      animate(counter);
      document.getElementById("play").disabled = true;
    });
    pauseButton.addEventListener("click", () => {
      cancelAnimationFrame(animation);
      document.getElementById("play").removeAttribute("disabled");
    });

    dMarker.on("dragend", () => {
      handleOpen();
      document.getElementById("play").removeAttribute("disabled");

      if (map.getLayer(`point${trackId}`)) {
        map.removeLayer(`point${trackId}`);
      }
      const markerCurrentLngLat = dMarker.getLngLat();
      setOriginPath(destination);
      setDestination([markerCurrentLngLat.lng, markerCurrentLngLat.lat]);
    });
  }

  return (
    <div>
      <div id="uebtn">
        <Button sx={styles} variant="outlined" id="play">
          <PlayArrowIcon />
        </Button>
        <Button sx={styles} variant="outlined" id="pause">
          <StopIcon />
        </Button>
      </div>

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
            <input type="text" value={`${originPath}`} />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <input
              type="text"
              placeholder="Enter Ue Destination"
              value={`${destination}` || ""}
              onChange={(e) => {
                setDestination(e.target.value.split(","));
              }}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <input
              type="number"
              placeholder="Enter Ue Speed"
              onChange={(e) => {
                setUeSpeed(e.target.value);
              }}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <button
              onClick={() => {
                OnDragTrajectory();
                mobileIcon.remove();
                handleClose();  
                document.getElementById("play").removeAttribute("disabled");
              }}
            >
              Draw Path
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DragDrop;
