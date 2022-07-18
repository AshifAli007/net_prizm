import { useEffect, useState } from "react";
import mapboxgl from 'mapbox-gl';
import axios from "axios";
import * as turf from '@turf/turf';
import carImage from '../../Assets/car.png';
import phoneImage from '../../Assets/phone.png';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Path = ({ map, phone }) => {
    let [i, setI] = useState(0);
    const calculateRoute = async () => {
        let origin = `${phone.origin[0]},${phone.origin[1]}`;
        let destination = `${phone.destination[0]},${phone.destination[1]}`;

        let { data: results } = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${phone.mode}/${origin};${destination}?geometries=geojson&access_token=${process.env.REACT_APP_BOX_API_KEY}`);

        let lineCoordinates = results.routes[0].geometry.coordinates;

        origin = [-122.414, 37.776];

        // Washington DC
        destination = [-77.032, 38.913];
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

        const speedFactor = 10; // number of frames per longitude degree
        let animation; // to store and cancel the animation
        let startTime = 0;
        let resetTime = false; 
        let progress = 0; // progress = timestamp - startTime
        map.addSource(`animated_line${phone.id}`, {
            'type': 'geojson',
            'data': geojson
        });

        // add the line which will be modified in the animation
        map.addLayer({
            'id': `animated_line${phone.id}`,
            'type': 'line',
            'source': `animated_line${phone.id}`,
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#ed6498',
                'line-width': 10,
                'line-opacity': 0.8
            }
        });

        startTime = performance.now();

        animateLine();
        function animateLine(timestamp) {

            if (resetTime) {
                // resume previous progress
                startTime = performance.now() - progress;
                resetTime = false;
            } else {
                i++;
                progress = timestamp - startTime;
            }




            if (i> lineCoordinates.length -1) {
                i=0;
                startTime = timestamp;
                geojson.features[0].geometry.coordinates = [];
            } else {
                geojson.features[0].geometry.coordinates.push(lineCoordinates[i]);
                // then update the map
                map.getSource(`animated_line${phone.id}`).setData(geojson);
            }
            // Request the next frame of the animation.
            animation = requestAnimationFrame(animateLine);
        }
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
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': origin
                    }
                }
            ]
        };

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
                'line-color': `rgb(${Math.random() * 100 + 50},${Math.random() * 100 + 50},${Math.random() * 100 + 50})`,
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

            // Calculate the bearing to ensure the icon is rotated to match the route arc
            // The bearing is calculated between the current point and the next point, except
            // at the end of the arc, which uses the previous point and the current point
            point.features[0].properties.bearing = turf.bearing(
                turf.point(start),
                turf.point(end)
            );

            // Update the source with this new data
            map.getSource(`point${phone.id}`).setData(point);

            // Request the next frame of animation as long as the end has not been reached
            if (counter < steps) {
                requestAnimationFrame(animate);
            }

            counter = counter + 1;
        }
        animate(counter);
        // let i = 0;
        // let interval = setInterval(() => {
        //     console.log('hii there', lineCoordinates);
        //     if (i < lineCoordinates.length) {
        //         // let obj = {
        //         //     lat: lineCoordinates[i][],
        //         //     lng: lineCoordinates[i],
        //         // }
        //         ue.setLngLat([...lineCoordinates[i]]);
        //         console.log(lineCoordinates[i], 'linesss');
        //         // setCurrentLocation(obj);
        //         i++;
        //     }
        // }, 1000);
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

    }
    useEffect(() => {
        console.log(phone);
        const originMarker = new mapboxgl.Marker({
            color: "green",
        }).setLngLat([...phone.origin])
            .addTo(map);

        const destinationMarker = new mapboxgl.Marker({
            color: "red",
        }).setLngLat([...phone.destination])
            .addTo(map);
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