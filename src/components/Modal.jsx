import axios from 'axios'
import { useEffect, useState } from 'react'
import { options2 } from '../constant'
import { useDispatch } from 'react-redux'
import { setTrail } from '../redux/slices/flightSlice'
import moment from 'moment'
import "moment/locale/tr"


const Modal = ({ detailId, closeModal }) => {
  const [d, setData] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    setData(null)
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2,
      )
      .then((res) => {
        dispatch (setTrail(res.data.trail))
        setData(res.data)
      })
  }, [detailId])
  const formatDate = (time)=>{
    const date = new Date(time * 1000).toUTCString()
   return moment(date).calendar()
  }
  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={closeModal}>X</span>
        </p>
        {!d ? (
          <div class="follow-the-leader-line">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : !d.airport.origin || !d.airport.destination ? (<p>BU UÇUŞUN VERİLERİ GİZLİDİR.</p>): (
          <>
            <h3>{d.aircraft.model.text}</h3>
            <h3>{d.aircraft.model.code}</h3>
            <p>  
              <span>Kalkış Saati: </span>
              <span>
                {formatDate(d.time.scheduled.departure)}
                </span>
            </p>
            <p>  
              <span>Varış Saati: </span>
              <span>
                {formatDate(d.time.scheduled.arrival)}
                </span>
            </p>
            <img
              className="flight-img"
              src={d.aircraft.images.medium[0].src}
              alt=""
            />
            <p>
              <span>Şirket: </span>
              <span>{d.airline.name}</span>
            </p>
            <p>
              <span>Kalkış: </span>
              <a target='_blank' href={d.airport.origin.website}>
              {d.airport.origin.name}
              </a>
            </p>
            <p>
              <span>Hedef: </span>
              <a target='_blank' href={d.airport.destination.website}>
              {d.airport.destination.name}
              </a>
            </p>
         
            <p className={d.status.icon}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
