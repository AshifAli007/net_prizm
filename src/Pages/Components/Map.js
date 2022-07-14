import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';

const Map = () => {
    const [map, setMap] = useState(null);
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_BOX_API_KEY;
        const mapBox = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
            projection: 'globe', // display the map as a 3D globe
            attributionControl: false
        });
        const marker = new mapboxgl.Marker({
            color: "green",
            draggable: true
        }).setLngLat([-74.5, 40])
            .addTo(mapBox);

        console.log(marker, 'marker');
        mapBox.setStyle('mapbox://styles/ashifali/cl5jdjuq5007414nvo412eb6r');
        mapBox.on('style.load', () => {
            mapBox.setFog({}); // Set the default atmosphere style
            // Set marker options.
            setMap(mapBox);

        });
    }, [])

    return (
        <>
            <div
                id='map'
                style={{
                    width: '100%',
                    height: '100%',
                }}>
                {map && <></>}
            </div>
        </>
    )
}

export default Map;