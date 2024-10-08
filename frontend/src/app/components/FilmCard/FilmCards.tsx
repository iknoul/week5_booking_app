import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getMoviesByFilter } from '../../Services/movieService'

import FilmCard from '@/theme/FilmCard/FlimCard'

import styles from './FilmCards.module.css'


const FilmCards = () =>{

    const router = useRouter();
    
    const [dramas, setDramas] = useState<object[]>([])
    const [actions, setActions] = useState<object[]>([])
    const [romances, setRomances] = useState<object[]>([])

    const handleOnClick = (item: object) => {

        // Use encodeURIComponent for the stringified movie object
        const movieData = encodeURIComponent(JSON.stringify(item));
        router.push(`/Booking?movie=${movieData}`);
    }
  
    useEffect(()=>{
        const fetchMovies = async () => {
            try {
                // Await the results of the async functions
                const dramasTemp = await getMoviesByFilter({genre:"drama"});
                const actionsTemp = await getMoviesByFilter({genre:"action"});
                const romancesTemp = await getMoviesByFilter({genre:"romance"});

                // Update state with the fetched data
                setDramas(dramasTemp);
                setActions(actionsTemp);
                setRomances(romancesTemp);
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };

        fetchMovies();

    }, [])

    return(
    <>
        {dramas.length>0 &&
        <>   
            <p className={styles.category}>Drama</p>

            <div className={styles.cardContainer}>    
                { 
                dramas.map((item, index)=>{
                    return(<FilmCard key={index} item={item} callBackFunction={()=>{handleOnClick(item)}}/>)
                })
                }          
            </div>
        </>
        }

        {actions.length>0 &&
        <>   
            <p className={styles.category}>Action</p>

            <div className={styles.cardContainer}>    
                { 
                actions.map((item, index)=>{
                    return(<FilmCard key={index} item={item} callBackFunction={()=>{handleOnClick(item)}}/>)
                })
                }          
            </div>
        </>
        }

        {romances.length>0 &&
        <>   
            <p className={styles.category}>Romance</p>

            <div className={styles.cardContainer}>    
                { 
                romances.map((item, index)=>{
                    return(<FilmCard key={index} item={item} callBackFunction={()=>{handleOnClick(item)}}/>)
                })
                }          
            </div>
        </>
        }
    </>
    )
}

export default FilmCards