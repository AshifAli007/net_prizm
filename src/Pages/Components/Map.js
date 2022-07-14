import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';

const Map = () => {
    // eslint-disable-next-line no-undef
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoaWZhbGkiLCJhIjoiY2w1amFnNXpiMDByaDNjcGY2OWdlZjV1aSJ9.K6DLXl1Jtbufpb0IIV0Y6g';
        const map = new mapboxgl.Map({
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
            .addTo(map);

        console.log(marker, 'marker');
        map.setStyle('mapbox://styles/ashifali/cl5jdjuq5007414nvo412eb6r');
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
            // Set marker options.

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
            </div>
        </>
    )
}

export default Map;