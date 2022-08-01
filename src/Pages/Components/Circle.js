import React from 'react'
import * as turf from "@turf/turf";

const Circle = ({map}) => {
   

    map.on('load', function(){
        var center = turf.point([-75.50, 40,50]);
        var radius1 = 15;
        var radius2 = 25;
        var radius3 = 35;
        var radius4 = 45;
        var options = {
          steps: 80,
          units: 'kilometers'
        };

        
       
    
        var circle1 = turf.circle(center, radius1, options);
        var circle2 = turf.circle(center, radius2, options);
        var circle3 = turf.circle(center, radius3, options);
        var circle4 = turf.circle(center, radius4, options);
    
        map.addLayer({
            "id": "circle-fill",
            "type": "fill",
            "source": {
                "type": "geojson", 
                "data": circle1
            },
            "paint": {
                "fill-color": "#fa3737",
                "fill-opacity": 0.5
            }
        });
        map.addLayer({
            "id": "circle-fill2",
            "type": "fill",
            "source": {
                "type": "geojson", 
                "data": circle2
            },
            "paint": {
                "fill-color": "#fc9797",
                "fill-opacity": 0.5
            }
        });
        map.addLayer({
            "id": "circle-fill3",
            "type": "fill",
            "source": {
                "type": "geojson", 
                "data": circle3
            },
            "paint": {
                "fill-color": "#fabebe",
                "fill-opacity": 0.5
            }
        });
        map.addLayer({
            "id": "circle-fill4",
            "type": "fill",
            "source": {
                "type": "geojson", 
                "data": circle4
            },
            "paint": {
            
                "fill-color": "#fcd9d9",
                "fill-opacity": 0.5
            }
        });
       
    });

    

  return (
    <div>


      
    </div>
  )
}

export default Circle
