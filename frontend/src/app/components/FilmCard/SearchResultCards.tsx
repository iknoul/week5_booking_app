import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getMoviesByFilter } from '../../Services/movieService'; // Adjust import according to your project structure

import FilmCard from '@/theme/FilmCard/FlimCard';

import styles from './FilmCards.module.css'

interface SearchCardsProps {
    title?: string;
    theater?: string;
    date?: string;
    sortByRating?: boolean;
    // show?: string;
}

// Define the component with the correct props type
const SearchResultCards: React.FC<SearchCardsProps> = (props) => {

    const router = useRouter();

    const [results, setResults] = useState<object[]>([]);

    const handleOnClick = (item: object, theaterName?:string,  date?: string) => {


        console.log(props, "here the date")
        // alert((typeof date))
        // alert(date)

         // Use encodeURIComponent for the stringified movie object
         const movieData = encodeURIComponent(JSON.stringify(item));
         router.push(`/Booking?movie=${movieData}&theater=${theaterName}&date=${date}`);
    }

    // Function to fetch images based on the search parameters
    const getMovies = async () => {
        try {
            console.log(props, 'hdgefe egfw ei7')
            const response = await getMoviesByFilter(props);
            setResults(response);
            console.log(response, 'sdhfv hvv')
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Check if any of the props are defined
        console.log(props, "it has the props")
        const hasParams = Object.keys(props).some(key => (props as any)[key] !== undefined && (props as any)[key] !== null);

        if (hasParams) {
            getMovies();
        }
        else{
            setResults([])
        }
    }, [props]);

    return (
        <div className={styles.cardContainer}>    
            { results.length>0 &&
                results.map((item, index)=>{
                    return(<FilmCard key={index} item={item} callBackFunction={()=>{handleOnClick(item, props.theater, props.date)}}/>)
                })
            }          
        </div>
    );
};

export default SearchResultCards;
