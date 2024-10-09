'use client'
import { useRef, MouseEventHandler} from "react";
import Image from "next/image";

import useImageColorExtractor from "@/app/hooks/useImageColorExtractor";

import ButtonMain from "../../theme/Buttons/ButtonMain";

import styles from './FilmCard.module.css';


interface Showtime {
	_id ?: string;
	time ?: string;
	date ?: string;
	bookedSeats ?: string[];
	movieId ?:string;
	theaterId?: string;
}

interface FilmCardProps {
    item: {
        Title?: string;
        Runtime?: string; // Assuming Runtime is a string, e.g., '120 min'
        Genre?: string[]; // Array of genre strings
        Language?: string;
        Actors?: string; // Array of actor names
        Poster?: string; // URL or path to the poster image
        Plot?: string;
        imdbRating?:  string;
        showtimes?: Showtime[]
    };
    callBackFunction?: MouseEventHandler<HTMLDivElement>;
    isButtonVisible?:boolean;
}
const FilmCard:React.FC<FilmCardProps> = ({item, callBackFunction=()=>{}, isButtonVisible=true}) => 
{

    const imgRef = useRef<HTMLImageElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    const img = item.Poster
    console.log(img)
    console.log(item)
    // Pass the image URL to the custom hook
    // Assuming useImageColorExtractor returns an object with `colors` property
    // const { colors } = useImageColorExtractor(item?.Poster || '');
    // console.log(colors)
    // Update background color when colors are available

    // useEffect(() => {
    //    if (divRef.current) {
    //        divRef.current.style.backgroundColor = colors?.length > 0 ? colors[0] : 'whitesmoke';
    //    }
    // }, [colors]);

    return (
        <div ref={divRef} className={styles.filmCard}>

            {item.Poster && (
                <Image
                    src={item.Poster}
                    alt={`${item.Title} poster`}
                    width={100}
                    height={100}
                />
            )}
            
            <span className={styles.title}>
                <h2>{item.Title} &nbsp;</h2>
                <h3>{item.imdbRating}</h3>
            </span> 
            <h3 className={styles.actors}>{item.Actors}</h3>
     
            <h3 className={styles.lang}>{item.Language}</h3>

            {isButtonVisible &&
                <ButtonMain callbackFunction={callBackFunction}>
                    Book now
                </ButtonMain>
            }
        </div>
    );
};

export default FilmCard;
