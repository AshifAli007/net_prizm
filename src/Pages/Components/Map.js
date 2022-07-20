import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
 import * as THREE from "three";
//  import GLTFLoader from 'three-gltf-loader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import phones from '../../helpers/phones';
import ModelLayer from "./ModelLayer";
import Path from '../Components/Path.js';

const Map = () => {
    const [map, setMap] = useState(null);
    const[zoom, setZoom] = useState(9);
    const [center, setCenter] = useState([-74.002823, 40.712975]);
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_BOX_API_KEY;
        const mapBox = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/light-v10",
            zoom: zoom,
            center: center,
            pitch: 60,
            scrollZoom: true,
            projection: 'globe',
            antialias: false
        });

        mapBox.on("load", () => {
            mapBox.addLayer(
                new ModelLayer({
                  id: "layer-3d",
                  url: "./Windmill.glb",
                  origin: [30.519895423204, 50.429234595753],
                  altitude: 22,
                  rotateY: 1,
                  scale: 34.8
                })
              );
            })
        // mapBox.addControl(new mapboxgl.NavigationControl());
        mapBox.setStyle('mapbox://styles/ashifali/cl5jdjuq5007414nvo412eb6r');
        mapBox.on('style.load', () => {
            mapBox.setFog({}); // Set the default atmosphere style
            // Set marker options.
            setMap(mapBox);

        });
    }, [zoom, center])

    return (
        <>
            <div
                id='map'
                style={{
                    width: '100%',
                    height: '100%',
                }}>
               
                {map &&
                    phones.map((phone) => {
                        return (
                            <Path phone={phone} map={map}/>
                        )
                    })
            }
            <ul id="buttons">
            <li onClick= {() =>  
                setZoom(16)
                
            } className="button">Building</li>
            <li  onClick= {() =>  {setCenter([30.519895423204, 50.429234595753])
                setZoom(15)
            }} className="button">Tower</li>
            </ul>
            </div>
        </>
    )
}

export default Map;