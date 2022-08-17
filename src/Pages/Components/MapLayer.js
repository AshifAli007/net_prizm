import React from 'react';

const MapLayer = ({map}) => {

    map.on('load',() => {
        map.Source('radar',{
            'type' : 'image',
            'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
            'coordinates':[
                [-74.50, 40.721909],
                [-71.516,46.437],
                [-71.516,37.936],
                [-80.425,37.936]

            ]
        });
        map.addLayer({
            id:'radar-layer',
            'type':'raster',
            'source':'radar',
            'paint':{
                'raster-fade-duration':0
            }
        });
    });
  return (
    <>
    </>
  )
}

export default MapLayer