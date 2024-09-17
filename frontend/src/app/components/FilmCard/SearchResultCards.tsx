import React, { useEffect, useState } from 'react';
import FilmCard from './FlimCard';

import { getMoviesByFilter } from './../../Services/movieService'; // Adjust import according to your project structure

import styles from './FilmCards.module.css'
interface SearchCardsProps {
    title?: string;
    // theaterName?: string;
    // date?: string;
    // show?: string;
}

// Define the component with the correct props type
const SearchResultCards: React.FC<SearchCardsProps> = (props) => {
    const [results, setResults] = useState<object[]>([]);

    // Function to fetch images based on the search parameters
    const getImages = async () => {
        try {
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
                return(<FilmCard key={index} item={item}/>)
            })
            }          
        </div>
    );
};

export default SearchResultCards;
