import { useEffect } from "react";
import mapboxgl from 'mapbox-gl';

const Path = ({ map, phone }) => {
    const calculateRoute = async(path)=>{
        
    }
    useEffect(() => {
        console.log(phone);
        const originMarker = new mapboxgl.Marker({
            color: "green",
            draggable: true
        }).setLngLat([...phone.origin])
            .addTo(map);

        const destinationMarker = new mapboxgl.Marker({
            color: "red",
            draggable: true
        }).setLngLat([...phone.destination])
            .addTo(map);
    }, []);
    return (
        <>
        </>
    )
}

export default Path;