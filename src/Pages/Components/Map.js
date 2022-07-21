import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import ToolBar from './ToolBar';
import phones from '../../helpers/phones';
import Path from '../Components/Path.js';

const Map = () => {
    const [map, setMap] = useState(null);
    const v1 = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(-125.791110603, 10.91619),
        new mapboxgl.LngLat(-70.96466, 60.3577635769)
        );
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_BOX_API_KEY;
        const mapBox = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.002823, 40.712975], // starting position [lng, lat]
            // zoom: 1, // starting zoom
            projection: 'globe', // display the map as a 3D globe
            attributionControl: false,
            maxBounds: v1,
        });

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
                    <ToolBar></ToolBar>
                {map &&
                    phones.map((phone) => {
                        return (
                            <Path phone={phone} map={map}/>
                        )
                    })
            }

            </div>
        </>
    )
}

export default Map;