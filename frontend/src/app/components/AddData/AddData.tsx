import React, { useState, ChangeEvent } from 'react';

import axiosO from 'axios';
import axios from '@/utils/axios';

import FilmCard from '../FilmCard/FlimCard';

import { Empty, Spin } from 'antd';
import styles from './AddData.module.css';

interface AddDataProps {
	item: string;
	purpose: string;
	visible?: boolean;
	callbackFunction?: (theater?: object, item?: string, purpose?: string) => {};
	isSearchedMovie?: boolean; 
}

interface searchedTheater{
	_id?:string;
	name?:string;
	location?: string;
}
interface searchedMovie{
		_id?: string;
        Title?: string;
        Runtime?: string; // Assuming Runtime is a string, e.g., '120 min'
        Genre?: string[]; // Array of genre strings
        Language?: string;
        Actors?: string[]; // Array of actor names
        Poster?: string; // URL or path to the poster image
        Plot?: string;
        imdbRating?:  string;
}

const AddData: React.FC<AddDataProps> = ({ item, purpose, visible = false, callbackFunction=()=>{}, isSearchedMovie }) => {

	const [theaterData, setTheaterData] = useState<{ name: string; location: string; seatPrice: string }>({ name: '', location: '', seatPrice:'' });
	const [searchName, setSearchName] = useState<string>('')
	const [searchedMovie, setSearchedMovie] = useState<searchedMovie>({})
	const [searchedTheater, setSearchedTheater] = useState<searchedTheater>({name:'sfasd', location:"nbvjv"});
	const [theater, setTheater] = useState('');
    const [date, setDate] = useState(''); // For date
    const [time, setTime] = useState(''); // For time
	const [isLoading, setIsLoading] = useState<boolean>(false)
	
	const [error, setError] = useState<string | null>(null);
		

	function isEmpty(obj:object) {
		return Object.keys(obj).length === 0;
	}

	const onSearchMovieChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
		setSearchName(e.target.value)
	}
	const onSearchTheaterChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
		setTheater(e.target.value)
	}
	const searchNewMovie = async(isNew?: boolean)=>{

		setIsLoading(true)
		try {
		console.log('heree true')
		let result;
		if(isNew){
			const response = await axiosO.get(`http://www.omdbapi.com/?t=${searchName}&apikey=f19a5e9c`)
			result = response.data
		}
		else{
			const response = await axios.post(`/movie/getMovie`,{title:searchName})
			result = response.data.data[0]
			console.log(response, result, "here olddd")
		}
		// console.log(result?.Response, 'sf')
		
		if(result?.Response == "True" || (!isNew&&result))
		{    
			setSearchedMovie(result)
			console.log(result

			)
		}
		else
		{
			setSearchedMovie({})
			console.log('no such film kn')
		}

		
		} catch (error) {
			console.log('error baby')
		}
		setIsLoading(false)
	}

	const searchNewTheater = async () => {
		setIsLoading(true)
        try {
            const response = await axios.get(`/theater/getTheater`, { params: { name: theater } });
            setSearchedTheater({...response.data.data[0]});
			console.log(!isEmpty(searchedTheater), 'old')
        } catch (error) {
            console.error('Error fetching theater:', error);
        }
		setIsLoading(false)
    };


	// Define the onChange handler
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { id, value } = e.target;
			setTheaterData(prevData => ({
			...prevData,
			[id]: value
		}));
	};

	// Handle submit action
	const onSubmit = () => {
		// Check if required fields are not empty
		switch(item)
		{
		case "Theater":
			if (theaterData.name.trim() === '' || theaterData.location.trim() === '') {
			setError('*all fields are required.');
			return; // Prevent further execution
			}
			// Clear previous error if any
			setError(null);
			// Proceed with submission logic
			callbackFunction(theaterData, item, purpose);
			break;

		case "Movie":
			if (searchName && !isEmpty(searchedMovie))
			{
			// Clear previous error if any
			setError(null);
			// Proceed with submission logic
			callbackFunction(searchedMovie, item, purpose)
			}
			else
			{
			setError('*movie required');
			return; // Prevent further execution
			}
			break;
		case "Show time":
			if (theater && searchedMovie && time && date)
			{
			// Clear previous error if any
			setError(null);
			// Proceed with submission logic
			callbackFunction({
				theaterId: searchedTheater._id,
				movieId: searchedMovie._id ? searchedMovie._id : undefined,
				date, 
				time }, item, purpose)
			}
			else
			{
			setError('*all data required');
			return; // Prevent further execution
			}
			break;
	};

		}
	

	// Handle cancel action
	const onCancel = () => {
		callbackFunction();
	};

	return (    
		<div className={styles.addData}>
			<h3>Add {item}</h3>

			{isLoading &&
				<Spin />
			}

			{/*JSX for inputs if item is theater */}
			{item === 'Theater' && 
			<>
				<div className={styles.item}>
					<label htmlFor="name">Name:</label>
					<input
					id="name"
					type="text"
					value={theaterData.name}
					onChange={onChangeHandler}
					/>
				</div>

				<div className={styles.item}>
					<label htmlFor="location">City:</label>
					<input
					id="location"
					type="text"
					value={theaterData.location}
					onChange={onChangeHandler}
				/>
				</div>

				<div className={styles.item}>
					<label htmlFor="seatPrice">Ticket Charge:</label>
					<input
					id="seatPrice"
					type="Number"
					value={theaterData.seatPrice}
					onChange={onChangeHandler}
						/>
				</div>
			</>
			}

			{(item==='Movie') &&
			<>
				<div className={styles.movieSearch}>
					<label htmlFor="search-movie"></label>
					<input type="text" id='search-movie' placeholder='search-movie' onChange={onSearchMovieChange} />
					<button onClick={()=>{searchNewMovie(true)}}>search</button>
				</div>

				{!isEmpty(searchedMovie) ?
					<FilmCard item={searchedMovie} isButtonVisible={false}/>
					:
					<Empty />      
				}
			</>
			}
			{(item ==='Show time') &&
			<>
				<div className={styles.movieSearch}>
					<label htmlFor="search-movie"></label>
					<input type="text" id='search-movie' placeholder='search-movie' onChange={onSearchMovieChange} />
					<button onClick={()=>{searchNewMovie()}}>search</button>
				</div>

				{!isEmpty(searchedMovie) ?
					<FilmCard item={searchedMovie} isButtonVisible={false}/>
					:
					<Empty />      
				}

				<div className={styles.theaterSearch}>
					<input
						type="text"
						id="search-theater"
						placeholder="search theater"
						value={theater}
						onChange={onSearchTheaterChange}
					/>
					<button onClick={searchNewTheater}>search theater</button>
				</div>

				{!isEmpty(searchedTheater) ? (
					<div className={styles.theaterCard}>
						{/* Replace with your TheaterCard component */}
						<h4>{searchedTheater.name}</h4>
						
						<p>{searchedTheater.location}</p>
					</div>
				) : (
					<Empty />
				)}
			</>

			}
			<span className={styles.dateInput}>
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
				<input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
			</span>          

			{error && <div className={styles.error}>{error}</div>}

			<div className={styles.buttonGroup}>
				<button onClick={onCancel}>Cancel</button>
				<button onClick={onSubmit}>Submit</button>
			</div>
		</div>
	);
};

export default AddData;
