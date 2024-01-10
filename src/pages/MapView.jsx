import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useDispatch, useSelector } from 'react-redux'
import {icon, polyline} from "leaflet"
import Modal from '../components/Modal'
import { clear } from '../redux/slices/flightSlice'
polyline


const MapView =({openModal})=>{
    const state = useSelector((store)=>store)
    const dispatch = useDispatch()
    

    const planeIcon = icon({
         iconUrl: "/icons8-flight-30.png",
         
    })
   

    return (
        <MapContainer
         center={[39.397800, 35.340982]}
          zoom={6} 
          scrollWheelZoom={true}>
            
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {state.flights.map((flight)=>(
  <Marker icon={planeIcon} position={[flight.lat, flight.lng]}>
  <Popup>
    <div className='Popup'>
        <span>Code: {flight.code}</span>
        <button onClick={()=>openModal(flight.id)}> Detay</button>
        {state.trail.length >0 && 
        <button onClick={()=>dispatch(clear())}>Rotayı Temizle</button>}
        
    </div>
  </Popup>
</Marker>
  ))}

<Polyline positions={state.trail} />
</MapContainer>
    )
}
export default MapView