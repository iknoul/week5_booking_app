// SeatArrangement.tsx
import React, { useState } from 'react';
import ButtonMain from '../Buttons/ButtonMain';
import styles from './seatArrangement.module.css' // Optional: For custom styling

interface SeatArrangementProps {
    notAvailble?: number[];
    rows: number;
    columns: number;
    seatsToBook?: number;
}

const SeatArrangement: React.FC<SeatArrangementProps> = ({ rows, columns, notAvailble=[12, 23, 34, 46, 20, 10], seatsToBook=5 }) => {

    const [selected, setSelected] = useState<number[]>([])

    // Function to handle clicks
  const handleClick = (seatNumber: number) => {
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

    return (
    <div className={styles.seatArrangement}>
        {seatGrid}
        {seatGrid.length>0 &&
            <div className={styles.screen}>

            </div>
        }
        
        <ButtonMain bg='red' disabled={!(selected.length == seatsToBook)}>Make Payement</ButtonMain>
        
    </div>);
};

export default SeatArrangement;
