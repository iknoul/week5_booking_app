import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

import { getMoviesByFilter } from './../../Services/movieService'; // Adjust import according to your project structure

import FilmCard from './FlimCard';

import styles from './styles/FilmCards.module.css'

interface SearchCardsProps {
    title?: string;
    theaterName?: string;
    // date?: string;
    // show?: string;
}

// Define the component with the correct props type
const SearchResultCards: React.FC<SearchCardsProps> = (props) => {
    const [results, setResults] = useState<object[]>([]);

    const {isAuthenticated} = useAuth()
    const router = useRouter();

    const handleOnClick = (item: object) => {
        if (!isAuthenticated) {
            router.push('/Login');
        } else {
            // Use encodeURIComponent for the stringified movie object
            const movieData = encodeURIComponent(JSON.stringify(item));
            router.push(`/Booking?movie=${movieData}`);
        }
    }

    // Function to fetch images based on the search parameters
    const getImages = async () => {
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
            getImages();
        }
        else{
            setResults([])
        }
    }, [props]);

    return (
        <div className={styles.cardContainer}>    
            { 
            results.map((item, index)=>{
                return(<FilmCard key={index} item={item} callBackFunction={()=>{handleOnClick(item)}}/>)
            })
            }          
        </div>
    );
};

export default SearchResultCards;
