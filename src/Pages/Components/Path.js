import { useEffect } from "react";
import mapboxgl from 'mapbox-gl';
import axios from "axios";


const Path = ({ map, phone }) => {
    const calculateRoute = async (path) => {
        let origin = `${phone.origin[0]},${phone.origin[1]}`;
        let destination = `${phone.destination[0]},${phone.destination[1]}`;

        let { data: results } = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&access_token=${process.env.REACT_APP_BOX_API_KEY}`);

        let lineCoordinates = results.routes[0].geometry.coordinates;
        map.addSource(phone.name, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': lineCoordinates,
                }
            }
        });
        map.addLayer({
            'id': phone.id,
            'type': 'line',
            'source': phone.name,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': `rgb(${Math.random()*100 + 50},${Math.random()*100 + 50},${Math.random()*100 + 50})`,
                'line-width': 5
            }
        });
    }
    useEffect(() => {
        const originMarker = new mapboxgl.Marker({
            color: "green",
            draggable: true
        }).setLngLat([...phone.origin])
            .addTo(map);

        const destinationMarker = new mapboxgl.Marker({
            color: "red",
            draggable: true
        }).setLngLat([...phone.destination])
            .addTo(map);

        calculateRoute(phone);
    }, []);
    return (
        <>
        </>
    )
}

export default Path;