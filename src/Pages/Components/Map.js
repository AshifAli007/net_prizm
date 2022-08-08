import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import GlobalVariable from './GlobalVariable';
import DragDrop from './DragDrop';
import ToolBar from "../Components/ToolBar";
import phones from '../../helpers/phones';
import Path from '../Components/Path.js';
import Circle from './Circle.js';

const Map = () => {
//    function zoomLevel(){}
//     <button onClick={zoomLevel}></button>
    const [map, setMap] = useState(null);
    // const [zoomvalue, setZoom] = useState(15);

    // function abc(){
    //     global.mapBox.setZoom(1);
    // };

    
    const v1 = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(-125.791110603, 10.91619),
        new mapboxgl.LngLat(-70.96466, 60.3577635769)
        );
    useEffect(() => {
        
        mapboxgl.accessToken = process.env.REACT_APP_BOX_API_KEY;
         global.mapBox = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.002823, 40.712975], // starting position [lng, lat]
            // zoom: 11.15, // starting zoom,
            // zoom:zoomvalue,
            zoom:8,
            projection: 'globe', // display the map as a 3D globe
            attributionControl: false,

            maxBounds: v1,
        });

    

    //    mapBox.setZoom(zoomvalue);
        global.mapBox.setStyle('mapbox://styles/ashifali/cl5jdjuq5007414nvo412eb6r');
        global.mapBox.on('style.load', () => {
            global.mapBox.setFog({}); // Set the default atmosphere style
            // Set marker options.
            setMap(global.mapBox);

        });
 }, [])

    useEffect(()=>{
        localStorage.setItem("ueData", JSON.stringify(phones));

    },[]);

    return (
        <>
       

            <div
                id='map'
                style={{
                    width: '100%',
                    height: '100%',
                }}>
                    {map && <DragDrop map={map}/>}
                    <ToolBar></ToolBar>
                    {map && <Circle map={map}/>}
                {map &&
                    phones.map((phone) => {
                        return (
                            <Path phone={phone} map={map}/>
                        )
                    })
            }

            </div>
            {/* <button
        typeof='button'
        onClick={() => abc()}
      >zoom</button> */}
        </>
    )
    }
        

export default Map;