import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightAction";
import Modal from "./components/Modal";


function App() {
  const [IsMapView, setIsMapView]=useState(true)
  const [IsOpen,setIsOpen] =useState(false)
  const [detailId, setDetailId]=useState(null)
  const dispatch = useDispatch()

  //açılır pencere

  const openModal=(id)=>{
    setDetailId(id)//hangi uçak için açıldığının state
    setIsOpen(true)//modal ı açtığımız state
  }
const closeModal=()=>{
  setDetailId(null)
  setIsOpen(false)
}
  useEffect(()=>{
    setInterval(()=>{
      dispatch(getFlights())
    },5000)
    
  },[])
  

  return (
    <>
     <Header/>
     <div className="view-buttons">
      <button 
      className={IsMapView? "active":""}
      onClick={()=>setIsMapView(true)}>Harita Görünümü</button>
      <button 
      className={!IsMapView? "active":""}
      onClick={()=>setIsMapView(false)}>Liste Görünümü</button>

     </div>

     {/*hangi bileşenin ekrana gelecegini belirleme*/ }

     {IsMapView ? <MapView openModal={openModal}/> : <ListView openModal={openModal} />}

     {IsOpen && <Modal detailId={detailId}
      closeModal={closeModal}/>}
  </>
 
    )
}

export default App
