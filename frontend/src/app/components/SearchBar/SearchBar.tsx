import React, { useState } from 'react';
import ButtonMain from '../Buttons/ButtonMain';
import styles from './searchBar.module.css';

interface SetSearchParams {
    setUserInput: Function
}

const SearchBar: React.FC<SetSearchParams> = ({ setUserInput }) => {
    // Define state variables for each input
    const [movieName, setMovieName] = useState('');
    const [theaterName, setTheaterName] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState('');

    // Handle input changes
    const handleMovieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('workinh,', movieName)
        setMovieName(e.target.value)
    };
    const handleTheaterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setTheaterName(e.target.value);
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
    const handleShowChange = (e: React.ChangeEvent<HTMLInputElement>) => setShow(e.target.value);

    // Handle button click
    const handleClick = () => {

        const isMovieNameValid = movieName && movieName.trim() !== '';
        const isTheaterNameValid = theaterName && theaterName.trim() !== '';
        const isDateValid = date && date.trim() !== '';
        const isShowValid = show && show.trim() !== '';
    
        if (isMovieNameValid || isTheaterNameValid || isDateValid || isShowValid) {
            // Create userInput object only with valid inputs
            const userInput: Record<string, string> = {};
            if (isMovieNameValid) userInput.title = movieName;
            if (isTheaterNameValid) userInput.theater = theaterName;
            if (isDateValid) userInput.date = date;
            if (isShowValid) userInput.show = show;
    
            setUserInput(userInput);
        } else {
            // Handle case where all inputs are invalid (e.g., clear userInput)
            setUserInput({});
        }
       
    };

    return (
        <div className={styles.searchBar}>
            <div className={styles.movieName}>
                <input type="text" placeholder="Movie Name" value={movieName} onChange={handleMovieNameChange} />
            </div>
            <div className={styles.theater}>
                <input type="text" placeholder="Theater Name" value={theaterName} onChange={handleTheaterNameChange} />
            </div>
            {/* <div className={styles.date}>
                <input type="date" value={date} onChange={handleDateChange} />
            </div> */}
            <div className={styles.show}>
                <input type="text" placeholder="Show Time" value={show} onChange={handleShowChange} />
            </div>
            <div className={styles.book}>
                <ButtonMain bg='black' callbackFunction={handleClick}>Search</ButtonMain>
            </div>
        </div>
    );
};

export default SearchBar;
