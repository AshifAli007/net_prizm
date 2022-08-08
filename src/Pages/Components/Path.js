import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import * as turf from '@turf/turf';
import carImage from '../../Assets/car.png';
import phoneImage from '../../Assets/phone.png';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Descriptions } from "antd";




const Path = ({ map, phone }) => {

    // const [UEData, setUEData] = useState({
    //     UEName: '',
    //     Speed: "50m/h",
    //     Video: '30%',
    //     WebBrowsing: '40%',
    //     VideoConferencing: '30%'
    // });


    
    const [currentLatLng, setCurrentLatLng] = useState(phone.origin);
    const ue_popup = new mapboxgl.Popup();

    const calculateRoute = async () => {
        let origin = `${phone.origin[0]},${phone.origin[1]}`;
        let destination = `${phone.destination[0]},${phone.destination[1]}`;

        let { data: results } = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${phone.mode}/${origin};${destination}?geometries=geojson&access_token=${process.env.REACT_APP_BOX_API_KEY}`);

        let lineCoordinates = results.routes[0].geometry.coordinates;

        origin = [-122.414, 37.776];

        // Washington DC
        destination = [-77.032, 38.913];

        const route = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': lineCoordinates,
                    }
                }
            ]
        };
        const point = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            `<strong>UE Details</strong><br/>
                            UE ID: ${phone.id}<br />
                            Current Speed: ${phone.speed}<br/>
                            Current Location: ${currentLatLng} -hii<br/>
                            Mode: ${phone.mode}<br />
                            Origin: ${phone.origin}<br />
                            Destination: ${phone.destination}<br />
                            

                            
                            `,
                        'icon': 'theatre-15',
                        'currentLatLng': currentLatLng,
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': origin
                    }
                }
            ]
        };
        const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                    }
                }
            ]
        };

        map.addSource(`animated_line${phone.id}`, {
            'type': 'geojson',
            'data': geojson
        });

        // add the line which will be modified in the animation


        let iconToUse = phone.mode === 'walking' ? 'phone1' : 'car1';
        let sizeToUse = phone.mode === 'walking' ? 1 : 0.07;
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
        let counter = 0;

        map.loadImage(
            carImage,
            (error, image) => {
                if (error) throw error;
                map.addImage('car1', image);
            }
        );
        map.loadImage(
            phoneImage,
            (error, image) => {
                if (error) throw error;
                map.addImage('phone1', image);
            }
        );
        map.addSource(`route${phone.id}`, {
            'type': 'geojson',
            'lineMetrics': true,
            'data': route
        });

        map.addSource(`point${phone.id}`, {
            'type': 'geojson',
            'data': point
        });

        map.addLayer({
            'id': `route${phone.id}`,
            'source': `route${phone.id}`,
            'type': 'line',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': `rgb(${Math.random() * 200 + 50},${Math.random() * 200 + 50},${Math.random() * 200 + 50})`,
                'line-width': 5
            }
        });
        map.addLayer({
            'id': `point${phone.id}`,
            'source': `point${phone.id}`,
            'type': 'symbol',
            'layout': {
                // This icon is a part of the Mapbox Streets style.
                // To view all images available in a Mapbox style, open
                // the style in Mapbox Studio and click the "Images" tab.
                // To add a new image to the style at runtime see
                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                'icon-image': iconToUse,
                'icon-size': sizeToUse,
                'icon-rotate': ['get', 'bearing'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            }
        });
        map.on('click', `point${phone.id}`, (e) => {
            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.currentLatLng;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            ue_popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });

        map.addLayer({
            'id': `animated_line${phone.id}`,
            'type': 'line',
            'source': `animated_line${phone.id}`,
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': 'grey',
                'line-width': 5,
                'line-opacity': 0.8
            },

        });
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


            // if (counter < lineCoordinates.length - 1) {

            geojson.features[0].geometry.coordinates.push(route.features[0].geometry.coordinates[counter]);
            // setCurrentLatLng(route.features[0].geometry.coordinates[counter]);
            // console.log(route.features[0].geometry.coordinates[counter]);
            // }

            // Calculate the bearing to ensure the icon is rotated to match the route arc
            // The bearing is calculated between the current point and the next point, except
            // at the end of the arc, which uses the previous point and the current point
            point.features[0].properties.bearing = turf.bearing(
                turf.point(start),
                turf.point(end)
            );
            point.features[0].properties.currentLatLng = route.features[0].geometry.coordinates[counter];
            ue_popup.setHTML(point.features[0].properties.description + route.features[0].geometry.coordinates[counter]);
            
            // Update the source with this new data
            map.getSource(`point${phone.id}`).setData(point);
            map.getSource(`animated_line${phone.id}`).setData(geojson);

            // Request the next frame of animation as long as the end has not been reached
            if (counter < steps) {
                requestAnimationFrame(animate);
            }

            counter = counter + 1;
        }
        animate(counter);

    }
    const addModel = () => {
        const modelOrigin = [-74.046063, 40.721909];
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, 0, 0];

        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
            modelOrigin,
            modelAltitude
        );
        const modelTransform = {
            translateX: modelAsMercatorCoordinate.x,
            translateY: modelAsMercatorCoordinate.y,
            translateZ: modelAsMercatorCoordinate.z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            /* Since the 3D model is in real world meters, a scale transform needs to be
            * applied since the CustomLayerInterface expects units in MercatorCoordinates.
            */
            scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
        };
        const customLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, gl) {
                this.camera = new THREE.Camera();
                this.scene = new THREE.Scene();

                // create two three.js lights to illuminate the model
                const directionalLight = new THREE.DirectionalLight(0xffffff);
                directionalLight.position.set(0, -70, 100).normalize();
                this.scene.add(directionalLight);

                const directionalLight2 = new THREE.DirectionalLight(0xffffff);
                directionalLight2.position.set(0, 70, 100).normalize();
                this.scene.add(directionalLight2);

                // use the three.js GLTF loader to add the 3D model to the three.js scene
                const loader = new GLTFLoader();
                loader.load(
                    'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                    (gltf) => {
                        this.scene.add(gltf.scene);
                    }
                );
                this.map = map;

                // use the Mapbox GL JS map canvas for three.js
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true
                });

                this.renderer.autoClear = false;
            },
            render: function (gl, matrix) {
                const rotationX = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(1, 0, 0),
                    modelTransform.rotateX
                );
                const rotationY = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 1, 0),
                    modelTransform.rotateY
                );
                const rotationZ = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 0, 1),
                    modelTransform.rotateZ
                );

                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4()
                    .makeTranslation(
                        modelTransform.translateX,
                        modelTransform.translateY,
                        modelTransform.translateZ
                    )
                    .scale(
                        new THREE.Vector3(
                            modelTransform.scale,
                            -modelTransform.scale,
                            modelTransform.scale
                        )
                    )
                    .multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ);

                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.resetState();
                this.renderer.render(this.scene, this.camera);
                this.map.triggerRepaint();

            }
        };
        map.on('style.load', () => {
            map.addLayer(customLayer, 'waterway-label');
        });

        // map.on('load', () => {
        //     map.addSource('customLayer', {
        //         'type': 'geojson',
        //         'data': {
        //             'type': 'FeatureCollection',
        //             'features': [
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                             `<h5><strong>Zone Name-1</strong>${UEData.UEName}</h5>
            
        //                             <h5>Speed: ${UEData.Speed}</h5>
                                    
        //                             <h5>Video: ${UEData.Video}</h5>
                                    
        //                             <h5>Web Browsing: ${UEData.WebBrowsing}</h5>
                                    
        //                             <h5>Video Conferencing: ${UEData.VideoConferencing}</h5>`
                                    
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-74.046063, 40.721909]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5>My name is akash<h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-73.699612, 40.660913]
        //                     }
        //                 },
                        // {
                        //     'type': 'Feature',
                        //     'properties': {
                        //         'description':
                        //              `<h5>UE Name</h5>
                        //             <h5>Video:25%</h5>
                        //             <h5>Speed:40%</h5>
                        //             <h5>Web Browsing:30%</h5>`
                        //     },
                        //     'geometry': {
                        //         'type': 'Point',
                        //         'coordinates': [-77.090372, 38.881189]
                        //     }
                        // },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5><strong>Zone Name-2</strong>${UEData.UEName}</h5>
            
        //                              <h5>Speed: ${UEData.Speed}</h5>
                                     
        //                              <h5>Video: ${UEData.Video}</h5>
                                     
        //                              <h5>Web Browsing: ${UEData.WebBrowsing}</h5>
                                     
        // //                              <h5>Video Conferencing: ${UEData.VideoConferencing}</h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-73.699612, 40.660913]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5><strong>ZONE Name-3<strong></h5>
        //                             <h5>Video:25%</h5>
        //                             <h5>Speed:40%</h5>
        //                             <h5>Web Browsing:30%</h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.052477, 38.943951]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5>ZONE Name-4</h5>
        //                             <h5>Video:25%</h5>
        //                             <h5>Speed:40%</h5>
        //                             <h5>Web Browsing:30%</h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.043444, 38.909664]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5>ZONE Name-5</h5>
        //                             <h5>Video:25%</h5>
        //                             <h5>Speed:40%</h5>
        //                             <h5>Web Browsing:30%</h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.031706, 38.914581]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                              `<h5>ZONE Name-6</h5>
        //                             <h5>Video:25%</h5>
        //                             <h5>Speed:40%</h5>
        //                             <h5>Web Browsing:30%</h5>`
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.020945, 38.878241]
        //                     }
        //                 },
        //                 {
        //                     'type': 'Feature',
        //                     'properties': {
        //                         'description':
        //                             '<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>'
        //                     },
        //                     'geometry': {
        //                         'type': 'Point',
        //                         'coordinates': [-77.007481, 38.876516]
        //                     }
        //                 }
        //             ]
        //         }
        //     });
        //     // Add a layer showing the places.
        //     // map.addLayer({
        //     //     'id': 'customLayer',
        //     //     'type': 'circle',
        //     //     'source': 'customLayer',
        //     //     'paint': {
        //     //         'circle-color': '#4264fb',
        //     //         // 'circle-radius': {
        //     //         //     'base': 0.5,
        //     //         //     'stops': [
        //     //         //     [11, 2],
        //     //         //     [22, 360]
        //     //         //     ]
        //     //         //     },

        //     //         'circle-radius':150,
                    
                    
                    
                  
        //     //         "circle-opacity": 0.3,
        //     //         'circle-stroke-width': 1,
        //     //         'circle-stroke-color': 'purple'
        //     //     }
        //     // });

           
    
            // Create a popup, but don't add it to the map yet.
            // const popup = new mapboxgl.Popup({
            //     closeButton: false,
            //     closeOnClick: false
            // });
    
        //     map.on('mouseenter', 'circle-fill-0', (e) => {
        //         // Change the cursor style as a UI indicator.
        //         map.getCanvas().style.cursor = 'pointer';

        //         // Copy coordinates array.
        //         const coordinates = e.features[0].geometry.coordinates.slice();
        //         const description = e.features[0].properties.description;

    
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
            //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            //     }
    
            //     // Populate the popup and set its coordinates
            //     // based on the feature found.
            //     popup.setLngLat(coordinates).setHTML(description).addTo(map);
                
            // });
    
        //     map.on('mouseleave', 'circle-fill-0', () => {
        //         map.getCanvas().style.cursor = '';
        //         popup.remove();
        //     });
        // });
    

    }
    useEffect(() => {
        const originPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        }).setHTML(`UE ID: ${phone.id} <br/> Location: ${phone.origin}`);
        const destinationPopup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        }).setHTML(`UE ID: ${phone.id} <br/> Location: ${phone.destination}`);

        const originMarker = new mapboxgl.Marker({
            color: "green",
        }).setLngLat([...phone.origin])
            .setPopup(originPopup)
            .addTo(map);

        const destinationMarker = new mapboxgl.Marker({
            color: "red",
        }).setLngLat([...phone.destination])
            .setPopup(destinationPopup)
            .addTo(map);

        const originDiv = originMarker.getElement();
        originDiv.addEventListener('mouseenter', () => originMarker.togglePopup());
        originDiv.addEventListener('mouseleave', () => originMarker.togglePopup());

        const destinationDiv = destinationMarker.getElement();
        destinationDiv.addEventListener('mouseenter', () => destinationMarker.togglePopup());
        destinationDiv.addEventListener('mouseleave', () => destinationMarker.togglePopup());


        const el = document.createElement('div');
        el.className = 'car';


        calculateRoute();
        addModel();
    }, []);
    return (
        <>
        </>
    )
}

export default Path;