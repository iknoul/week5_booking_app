'use client'
import { useEffect, useState } from 'react';
import { getTheaterById, getShowtimes} from './../Services/theaterService'; // Assuming getShowtimesByTheaterAndDate exists
import SeatArrangement from '../components/SeatArrangment/SeatArrangement';
import Image from 'next/image';
import ButtonMain from '../components/Buttons/ButtonMain';
import { useSearchParams } from 'next/navigation';
import styles from './booking.module.css';
import DatePicker from 'react-datepicker'; // Add react-datepicker for date selection
import 'react-datepicker/dist/react-datepicker.css'; // Datepicker styles
import PrivateRoute from '../components/PrivateRouter';

interface Theater {
  _id?: string;
  name?: string;
  location?: string;
  seatPrice?: number;
}

interface showtime {
	_id ?: string;
	time ?: string;
	date ?: string;
	bookedSeats ?: string[];
}

interface Movie {
  _id: string;
  Title: string;
  Genre: string;
  Poster: string;
  imdbRating: number;
  Runtime: string;
  Language: string;
  Plot: string;
  Actors: string;
  Director?: string;
  Writer?: string;
  Theater?: Array<string>;
}

const Booking: React.FC = () => {
  const [bookingStage, setBookingStage] = useState<string>('theaterSelection');
  const [selectedTheater, setSelectedTheater] = useState<Theater>({});
  const [selectedShowtime, setSelectedShowtime] = useState<showtime>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);; // Date for showtime selection
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const [theaters, setTheaters] = useState<Array<Array<Theater>>>([]);;
  const [showtimes, setShowtimes] = useState<showtime[]>([]); // Now will contain fetched showtimes
  const [actorsArray, setActorsArray] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);

 // Handle select change
	const handleTheaterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedIndex = Number(e.target.value); // Convert value to number
		if (selectedIndex >= 0 && selectedIndex < theaters.length) {
			setSelectedTheater(theaters[selectedIndex][0]);
		} else {
			setSelectedTheater({});
		}
	};
  	const handleShowtimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

		console.log(showtimes)
		const selectedIndex = Number(e.target.value); // Convert value to number
		if (selectedIndex >= 0 && selectedIndex < theaters.length) {
			setSelectedShowtime(showtimes[selectedIndex]);
		} else {
			setSelectedShowtime({});
		}
		console.log(showtimes[selectedIndex], 'here i print show time')
	};

  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfSeats(Number(e.target.value) || 1);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Convert the Date object to a string in the format 'YYYY-MM-DD' if needed
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      console.log('Selected Date (formatted):', formattedDate);
    }
  };

  const handleNextStage = () => {
	alert(bookingStage)
    if (bookingStage === 'theaterSelection' && !selectedTheater) return;
    if (bookingStage === 'selectDate' && (!selectedDate)) return;

    setBookingStage(prevStage => {
      switch (prevStage) {
        case 'theaterSelection':
          	return 'selectDate';
        case 'selectDate':
          	return 'selectShow';
		case 'selectShow':
			return 'selectSeat';
        default:
          return prevStage;
      }
    });
  };

  useEffect(() => {
    if (searchParams) {
      const movieData = searchParams.get('movie');
      if (movieData) {
        try {
          const decodedMovieData = decodeURIComponent(movieData);
          const movieObj: Movie = JSON.parse(decodedMovieData);
          const actorsArray: string[] = movieObj.Actors.split(',');
          setActorsArray(actorsArray);
          setMovie(movieObj);
        } catch (error) {
          console.error('Error parsing movie data:', error);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchTheaters = async () => {
      if (movie?.Theater) {
        try {
          const results = await Promise.all(
            movie.Theater.map(async theaterId => {
              const response = await getTheaterById({ theaterId });
			  console.log(response)
              return response.data;
            })
          );
          setTheaters(results);
        } catch (error) {
          console.error('Error fetching theater data:', error);
        }
      }
    };
    fetchTheaters();
  }, [movie]);

  // Fetch showtimes after selecting a theater and date
  useEffect(() => {
    const fetchShowtimes = async () => {
      if (selectedTheater && selectedDate) {
        try {
          const response = await getShowtimes({
            theaterId: selectedTheater._id,
            date: selectedDate,
			movieId: movie?._id
          });
		  console.log(response)
          setShowtimes(response.data); // Assuming response contains showtimes
        } catch (error) {
          console.error('Error fetching showtimes:', error);
        }
      }
    };
    fetchShowtimes();
	console.log(showtimes)
  }, [selectedDate]);

  return (
    <PrivateRoute>
       <div className={styles.bookingPage}>
      {bookingStage !== 'selectSeat' && (
        <div className={styles.book}>
          <div className={styles.imageContainer}>
            {movie && (
              <Image
                src={movie.Poster}
                alt="movie image"
                width={100}
                height={100}
              />
            )}
          </div>
          <div className={styles.rightContainer}>
            <h1>{movie?.Title}</h1>
            <span className={styles.rating}>{movie?.imdbRating}</span>
            <h3>Director: {movie?.Director}</h3>
            <h3>Writer: {movie?.Writer}</h3>
            <h3>Language: {movie?.Language}</h3>
            <ul className={styles.genreData}>
              <li>{movie?.Runtime}</li>
              <li>{movie?.Genre}</li>
            </ul>
            {bookingStage === 'theaterSelection' && (
              <>
                <select onChange={handleTheaterChange} value={selectedTheater.name}>
                  <option value="">Select a theater</option>
                  {theaters.map((theater, index) => (
                    <option key={index} value={index}>
                      {`${theater[0]?.name}`}
                    </option>
                  ))}
                </select>

                <ButtonMain
                  bg="border"
                  disabled={!selectedTheater}
                  callbackFunction={handleNextStage}
                >
                  Next
                </ButtonMain>
              </>
            )}

            {bookingStage === 'selectDate' && (
              <>
                <DatePicker
                  selected={selectedDate}  // Make sure selectedDate is a Date object or null
				  onChange={handleDateChange}  // onChange will provide a Date object
				  dateFormat="yyyy-MM-dd" // Define the display format for the DatePicker
				  placeholderText="Select a date" 
                />

				<ButtonMain
                  bg="border"
                  disabled={!selectedDate}
                  callbackFunction={handleNextStage}
                >
                  Next
                </ButtonMain>
              </>
            )}

			{bookingStage === 'selectShow' && (
				<>
				<select onChange={handleShowtimeChange} value={selectedShowtime.time}>
                  <option value="">Select a showtime</option>
                  {showtimes.map((showtime, index) => (
                    <option key={index} value={index}>
                      {showtime.time}
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
                  bg="border"
                  disabled={!selectedShowtime || (numberOfSeats ? numberOfSeats < 1 : false)}
                  callbackFunction={handleNextStage}
                >
                  Next
                </ButtonMain>
				</>
			)}
          </div>
        </div>
      )}

      {bookingStage === 'selectSeat' && (
        <>
          <h2>Select Seats</h2>
          <SeatArrangement 
		  	rows={5} 
			columns={10} 
			seatsToBook={numberOfSeats}  
			amountTobePaid={
				selectedTheater.seatPrice 
				? numberOfSeats * (selectedTheater.seatPrice) 
				: undefined
			}
			bookedSeats={selectedShowtime.bookedSeats}
			showtimeId={selectedShowtime._id}
			showTimeData={selectedShowtime}
			theaterName={selectedTheater.name}
			theaterLocation={selectedTheater.location}
			movieName={movie?.Title}	
			/>
        </>
      )}

      <div className={styles.movieDetails}>
        <h3>About the movie</h3>
        <p className={styles.details}>{movie?.Plot}</p>
        <h2>Cast</h2>
        <div className={styles.cast}>
          {actorsArray.map((item, index) => (
            <span key={index}>
              <p>{item}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
};

export default Booking;
