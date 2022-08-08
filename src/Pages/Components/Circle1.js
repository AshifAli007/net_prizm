import React from 'react'
import *as turf from '@turf/turf';
import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { FlareSharp } from '@material-ui/icons';

const Circle1 = ({ map }) => {

    const [UEData, setUEData] = useState({
        UEName: '',
        Speed: '50m/h',
        Video: '30%',
        WebBrowsing: '40%',
        VideoConferencing: '30%'
    })

    const description = `<h5><strong>Zone Name-1</strong>${UEData.UEName}</h5>
                         <h5>UE Name:${UEData.UEName}</h5>

                        <h5>Speed: ${UEData.Speed}</h5>

                        <h5>Video: ${UEData.Video}</h5>

                        <h5>Web Browsing: ${UEData.WebBrowsing}</h5>

                        <h5>Video Conferencing: ${UEData.VideoConferencing}</h5>`

    const popup = new mapboxgl.Popup(
        {
            closeOnClick: false,
            closeButton: false
        })
        popup.setLngLat([-74.50, 40.721909])
            .setHTML(description)
            .addTo(map);
    // map.on('mouseenter', () => {
    //     map.getCanvas().style.cursor = 'pointer';

        
    // })

    // map.on('mouseleave', () => {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // })

    var center = turf.point([-74.50, 40.721909]);

    map.on('load', function () {

        var radius = 25;
        var options = {
            steps: 80,
            units: 'kilometers',

        };

        var circle = turf.circle(center, radius, options);
        map.addLayer({
            "id": "circle-fill-0",
            "type": "fill",
            "source": {
                "type": "geojson",
                "data": circle
            },
            "paint": {
                "fill-color": '#4264fb',
                "fill-opacity": 0.3,
            }
        });

        map.addLayer({
            "id": "circle-outline",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": circle
            },
            "paint": {
                "line-color": "blue",
                "line-opacity": 0.3,
                "line-width": 10,
                "line-color": 'purple',
                "line-offset": 5,
            },
            "layout": {

            }
        });
    });

    // const popup = new mapboxgl.Popup({
    //     closeButton:false,
    //     closeOnClick:false
    // });

    // map.on('mouseenter','circle-fill-0',(e) => {
    //     map.getCanvas().style.cursor = 'pointer';

    //     const coordinates = e.features[0].geometry.coordinates.slice();
    //     const description = e.features[0].properties.description;

    //     while(Math.abs(e.lngLat.lng - coordinates[0]) > 180){
    //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }

    //     popup.setLngLat(center).setHTML(description).addTo(map);
    // });

    // map.on('mouseleave','circle-fill-0', () => {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // })



    return (
        <>
        </>

    )
}

export default Circle1