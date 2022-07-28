import mapboxgl from 'mapbox-gl';
import { useEffect, useState, useRef } from 'react';
import ReactMapboxGl, { MapContext } from "react-mapbox-gl";
import MapboxCompare from "mapbox-gl-compare";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-compare/dist/mapbox-gl-compare.css";
// import "./styles.css";
import ToolBar from './ToolBar';
import phones from '../../helpers/phones';
import Path from '../Components/Path.js';

const Map = () => {
    const [map, setMap] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      });
      const containerRef = useRef();
      const beforeRef = useRef(null);
      const afterRef = useRef();
      const style = {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0
      };


    const v1 = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(-125.791110603, 10.91619),
        new mapboxgl.LngLat(-70.96466, 60.3577635769)
        );
        const Mapbox = ReactMapboxGl({
            accessToken: process.env.REACT_APP_BOX_API_KEY
          });
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_BOX_API_KEY;
        const mapBox = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.002823, 40.712975], // starting position [lng, lat]
            // zoom: 1, // starting zoom
           // projection: 'globe', // display the map as a 3D globe
            attributionControl: false,
            maxBounds: v1,
        });

         mapBox.setStyle('mapbox://styles/ashifali/cl5jdjuq5007414nvo412eb6r');
        mapBox.on('style.load', () => {
            mapBox.setFog({}); // Set the default atmosphere style
            // Set marker optio
            setMap(mapBox);

         });
    }, [])

    // useEffect(() => {
    //     if (!beforeRef.current) return;
    //     const beforeMap = beforeRef.current;
    //     const afterMap = afterRef.current;
    //     console.log(beforeMap);
    //     // const map = new MapboxCompare(beforeMap, afterMap, "#comparison-container");
    
    //     // return () => map.remove();
    //   }, [beforeRef, afterRef]);

    return (
        <>
        
        <div
        id='map'
        style={{
            width: '50%',
            height: '100vh',
            float: 'left'
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
    <Mapbox
    id='map'
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: "100vh",
    }}
    >
    </Mapbox>
        </>
    )
}

export default Map;