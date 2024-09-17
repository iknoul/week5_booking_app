'use client'
import { useState } from 'react'
import SeatArrangement from '../components/SeatArrangment/SeatArrangement'
import styles from './booking.module.css'

const Booking:React.FC = ()=>{

    const [bookinStage, setBookingStage] = useState<string>('')

    return(
    <div className={styles.bookingPage}>
        {!bookinStage &&
           <>
             <select>
                <option value="">
                    ads
                </option>
                <option value="">
                    ads
                </option>
                <option value="">
                    ads
                </option>
            </select>
            <button onClick={()=>{setBookingStage('selectShow')}}>next</button>
           </>

        }
         {bookinStage == 'selectShow' &&
         <>
            <select>
                <option value="">
                    ads
                </option>
            </select>
            <input type="text" placeholder='enter the no of seats'/>
            <button onClick={()=>{setBookingStage('selectSeat')}}>next</button>
        </>
        }
        {bookinStage =='selectSeat' &&
            <SeatArrangement rows={5} columns={10}/>
        }
    </div>)
}

export default Booking