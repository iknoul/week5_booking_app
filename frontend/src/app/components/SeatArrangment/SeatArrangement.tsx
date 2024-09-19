// SeatArrangement.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {Alert} from 'antd'

import payment from '@/app/Services/PaymentService'

import { useAuth } from "../../hooks/useAuth";
import {fetchSeatNumbers } from './../../Services/theaterService'; // Assuming getShowtimesByTheaterAndDate exists

import ButtonMain from '../Buttons/ButtonMain';


import styles from './seatArrangement.module.css' // Optional: For custom styling

interface SeatArrangementProps {
    bookedSeats?: string[];
    rows: number;
    columns: number;
    seatsToBook?: number;
    amountTobePaid?: number;
    showtimeId?:string;
    showTimeData?: object;
    theaterName?:string;
    theaterLocation?: string;
    movieName?: string;
}

const SeatArrangement: React.FC<SeatArrangementProps> = ({ rows, columns, seatsToBook=1, amountTobePaid=0, bookedSeats= [], showtimeId='', showTimeData={}, theaterName='', theaterLocation='', movieName=''}) => {


		const router = useRouter()

		const [selected, setSelected] = useState<number[]>([])
		const [notAvailble, setNotAvailable] = useState<number[]>([])
		const [success, setSuccess] = useState(false)
		const [fail, setFail] = useState(false)

		const { token, user } = useAuth() 


	const handleBook = async()=>{
	
		try {
			const result = await payment({
				amountToBePaid: amountTobePaid, // amount in smallest currency unit (e.g., paise for INR)
				seatDetails: selected, // selected seat details
				showtimeId, // showtime ID from the system,
				setSuccess,
				setFail,
				showTimeData,
				theaterName,
				theaterLocation,
				movieName,
				userName: user?.name,
				token
			});
			// setSuccess(true)
			// setTimeout(()=>{
			//   setSuccess(false)
			//   router.push('/')
			// }, 5000)

		} catch (error) {
			setFail(true)
			setTimeout(()=>{setFail(false)}, 2500)
		}
	}

    // Function to handle clicks
	const handleClick = (seatNumber: number) => {
			if(!notAvailble.includes(seatNumber)){
			setSelected((prevSelected) => {
				// Check if the item is already selected
				if (prevSelected.includes(seatNumber)) {
					// Remove item from the array
					return prevSelected.filter(item => item !== seatNumber);
				} else if(seatsToBook>selected.length){
					// Add item to the array
					return [...prevSelected, seatNumber];
				}
				else{
					return [...prevSelected]
				}
			});
		}
	};

    const getUpperCaseLetters = (): string[] => {
        const letters: string[] = [];
        for (let i = 65; i <= 90; i++) { // 65 is 'A' and 90 is 'Z'
        	letters.push(String.fromCharCode(i));
        }
        return letters;
    };
    
    const uppercaseLetters = getUpperCaseLetters();
    const seatGrid: JSX.Element[] = [];


    for (let row = 0; row < rows; row++) {
        const seatRow: JSX.Element[] = [];
        for (let col = 0; col < columns; col++) {
			seatRow.push(
				<div className={`
					${styles.seat} 
					${notAvailble.includes(row * columns + col + 1)?styles.notAvailble:''} 
					${selected.includes(row * columns + col + 1)?styles.selectedSeat:''}`} 
					onClick={()=>{handleClick(row * columns + col + 1)}}
					key={`${row}-${col}`}
				>
				{/* {row * columns + col + 1} Seat numbering */}
				{uppercaseLetters[row]}{col+1}
				</div>
			);
        }
        seatGrid.push(
			<div className={styles.row} key={row}>
				{seatRow}
			</div>
        );
    }

    useEffect(()=>{
		const FetchSeatNumbers = async (bookedSeats: string[]) => {
			if(bookedSeats.length>0){
				try {
					console.log(bookedSeats, 'boo kss ')
					const seatNumbers = await fetchSeatNumbers(bookedSeats);
					console.log('Seat Numbers:', seatNumbers);
					// Process and use the seat numbers as needed
					setNotAvailable(seatNumbers)
				} catch (error) {
					console.error(error)
				}
			}
		}; 
      	FetchSeatNumbers(bookedSeats);
    }, [bookedSeats])

    useEffect(()=>{
		setTimeout(()=>{
			if(success){
				router.push('/')
			}
		}, 5000)
    }, [success])

    return (
    <div className={styles.seatArrangement}>

        {success &&
            <Alert message="Booking Success" type="success" showIcon className={styles.alert}/>
        }
        {fail&&
            <Alert message="Booking Failed" type="error" showIcon />
        }
        {seatGrid}
        {seatGrid.length>0 &&
            <div className={styles.screen}>

            </div>
        }
        
        <ButtonMain bg='red' callbackFunction={handleBook} disabled={!(selected.length == seatsToBook)}>Make Payement</ButtonMain>
        
    </div>);
};

export default SeatArrangement;
