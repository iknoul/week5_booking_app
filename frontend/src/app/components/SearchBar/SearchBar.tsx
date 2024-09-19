import React, { useState } from 'react';

import Image from 'next/image';

import type { MenuProps } from 'antd';
import { Dropdown, Switch} from 'antd';

import filterIocn from '@/../public/icons/filterIcon.svg';

import ButtonMain from '../Buttons/ButtonMain';
import styles from './searchBar.module.css';

interface SetSearchParams {
    setUserInput: Function;
}

const SearchBar: React.FC<SetSearchParams> = ({ setUserInput }) => {
    // Define state variables for each input
    const [movieName, setMovieName] = useState('');
    const [theaterName, setTheaterName] = useState('');
    const [date, setDate] = useState('');
    const [show, setShow] = useState('');
    const [time, setTime] = useState(''); // New time state
    const [filterByRate, setFilterByRate] = useState(false);

    const items: MenuProps['items'] = [
        {
        key: '1',
        label: (
            <div className={styles.filter}>
            <p id="label">Rating</p>
            <Switch
                onChange={() => {
                    setFilterByRate((prevState) => !prevState);
                }}
                size="small"
            />
            </div>
        ),
        },
    ];

    // Handle input changes
    const handleMovieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieName(e.target.value);
    };
    const handleTheaterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheaterName(e.target.value);
    };
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };
    const handleTimeChange = (time: string) => {
        setTime(time);
    }; // New handleTimeChange function

    // Handle button click
    const handleClick = () => {
        const isMovieNameValid = movieName && movieName.trim() !== '';
        const isTheaterNameValid = theaterName && theaterName.trim() !== '';
        const isDateValid = date && date.trim() !== '';
        const isShowValid = show && show.trim() !== '';
        const isTimeValid = time && time.trim() !== ''; // New time validation

        if (isMovieNameValid || isTheaterNameValid || isDateValid || isShowValid || isTimeValid) {
            // Create userInput object only with valid inputs
            const userInput: Record<string, any> = {};
            if (isMovieNameValid) userInput.title = movieName;
            if (isTheaterNameValid) userInput.theater = theaterName;
            if (isDateValid) userInput.date = date;
            if (isTimeValid) userInput.time = time; // Include time if valid
            userInput.sortByRating = filterByRate;

            setUserInput(userInput);
        } else {
        // Handle case where all inputs are invalid (e.g., clear userInput)
            setUserInput({});
        }
    };

    return (
        <div className={styles.searchBar}>
           
            <div className={styles.movieName}>
                <input
                type="text"
                placeholder="Movie Name"
                value={movieName}
                onChange={handleMovieNameChange}
                />
            </div>
            <div className={styles.theater}>
                <input
                type="text"
                placeholder="Theater Name"
                value={theaterName}
                onChange={handleTheaterNameChange}
                />
            </div>
            <div className={styles.date}>
                <input type="date" value={date} onChange={handleDateChange} />
            </div>

            <Dropdown menu={{ items }}>
                <Image src={filterIocn} alt="filter icon" />
            </Dropdown>

            <div className={styles.book}>
                <ButtonMain bg="black" callbackFunction={handleClick}>
                    Search
                </ButtonMain>
            </div>

        </div>
    );
};

export default SearchBar;
