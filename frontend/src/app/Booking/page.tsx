'use client'
import { useEffect, useState } from 'react'
import SeatArrangement from '../components/SeatArrangment/SeatArrangement'
import Image from 'next/image'
import ButtonMain from '../components/Buttons/ButtonMain'
import styles from './booking.module.css'
import { useSearchParams } from 'next/navigation'


interface Movie {
  id: string;
  Title: string;
  Genre: string;
  Poster: string;
  imdbRating: number;
  Runtime: string;
  Language: string;
  Plot: string;
  Actors: string;
  // Add other relevant fields
}

const Booking: React.FC = () => {
  const [bookingStage, setBookingStage] = useState<string>('theaterSelection')
  const [selectedTheater, setSelectedTheater] = useState<string>('')
  const [selectedShowtime, setSelectedShowtime] = useState<string>('')
  const [numberOfSeats, setNumberOfSeats] = useState<number>()

  const [actorsArray, setActorsArray] = useState<string[]>([])

  const searchParams = useSearchParams();
    const [movie, setMovie] = useState<Movie | null>(null);

  // Sample data
  const theaters = ['Theater 1', 'Theater 2', 'Theater 3']
  const showtimes = ['12:00 PM', '3:00 PM', '6:00 PM']

  const handleTheaterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheater(e.target.value)
  }

  const handleShowtimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShowtime(e.target.value)
  }

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfSeats(Number(e.target.value) || 1)
  }

  const handleNextStage = () => {
    if (bookingStage === 'theaterSelection' && !selectedTheater) return
    if (bookingStage === 'selectShow' && !selectedShowtime) return

    setBookingStage(prevStage => {
      switch (prevStage) {
        case 'theaterSelection':
          return 'selectShow'
        case 'selectShow':
          return 'selectSeat'
        default:
          return prevStage
      }
    })
  }

  useEffect(() => {
     // Even though searchParams will never be null, let's handle the edge case safely
     if (searchParams) {
      const movieData = searchParams.get('movie');
      if (movieData) {
          try {
              const decodedMovieData = decodeURIComponent(movieData);
              const movieObj: Movie = JSON.parse(decodedMovieData);
			  const actorsArray: string[] = movieObj.Actors.split(",");
			  setActorsArray(actorsArray)
              setMovie(movieObj);
          } catch (error) {
              console.error('Error parsing movie data:', error);
          }
      }
  }
}, [searchParams]);

	return (
	<div className={styles.bookingPage}>
        
		{bookingStage !=='selectSeat' &&
			<div className={styles.book}>
				<div className={styles.imageContainer}>
					{movie && 
						<Image 
						src={movie.Poster}
						alt='movie image'
						width={100}
						height={100}
					/>
					}
				</div>
				<div className={styles.rightContainer}>

				<h1>{movie?.Title}</h1>
				<h3>Director: acsa</h3>
				<h3>Writer: sdbb</h3>
				<h3>{movie?.Language}</h3>
				<ul className={styles.genreData}>
					<li>{movie?.Runtime}</li>
					<li>{movie?.Genre}</li>
					<li>{movie?.imdbRating}</li>
				</ul>
				{bookingStage === 'theaterSelection' && (
				<>
					{/* <h2>Select Theater</h2> */}
					<select onChange={handleTheaterChange} value={selectedTheater}>
						<option value="">Select a theater</option>
						{theaters.map((theater, index) => (
							<option key={index} value={theater}>
							{theater}
							</option>
						))}
					</select>
				
					<ButtonMain 
						bg='border' 
						disabled={!selectedTheater}
						callbackFunction={handleNextStage}>
						Next
					</ButtonMain> 
				</>
				)}
		
				{bookingStage === 'selectShow' && (
				<>
					{/* <h2>Select Showtime</h2> */}
					<select onChange={handleShowtimeChange} value={selectedShowtime}>
					<option value="">Select a showtime</option>
					{showtimes.map((showtime, index) => (
						<option key={index} value={showtime}>
						{showtime}
						</option>
					))}
					</select>
					<input
					type="number"
					min="1"
					value={numberOfSeats}
					onChange={handleSeatsChange}
					placeholder="Enter number of seats"
					/>
				
					<ButtonMain 
						bg='border' 
						disabled={!selectedShowtime || (numberOfSeats? numberOfSeats< 1 : false)}
						callbackFunction={handleNextStage}>
						Next
					</ButtonMain> 
				</>
				)} 
				</div>
			</div>

		}
		  
          	{bookingStage === 'selectSeat' && (
				<>
				<h2>Select Seats</h2>
				<SeatArrangement rows={5} columns={10} seatsToBook={numberOfSeats}/>
				{/* You might want to pass numberOfSeats as a prop or use it for additional logic */}
				</>
			)}

        <div className={styles.movieDetails}>
          <h3>About the movie</h3>
          <p className={styles.details}>{movie?.Plot}</p>
          <h2>Cast</h2>
          <div className={styles.cast}>
            {actorsArray.map((item, index)=>{
				return(
				<span key={index}>
					<img src="" alt="" />
					<p>{item}</p>
				</span>)
			})}
          </div>
        
        </div>
    </div>
  )
}

export default Booking
