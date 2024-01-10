import { useSelector } from "react-redux"

const Header =()=>{
   const state = useSelector((store)=>store)
   
    return (
        <header>
            <div>
                <img src="/plane.png" alt="" />
                <h3>UÇUŞ RADARI</h3>
            </div>
            <p>
                {state.isLoading ? "UÇUŞLAR HESAPLANIYOR..."
                : state.isError ? "Üzgünüz Sorun Oluştu :("
                : state.flights.length + " UÇUŞ BULUNDU"}
                </p>
        </header>
    )
}
 export default Header