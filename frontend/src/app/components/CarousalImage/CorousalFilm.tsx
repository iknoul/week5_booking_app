    'use client'

    import {getMoviesByFilter} from './../../Services/movieService'
    import { useEffect, useState } from 'react'
    // import { promotionCarData } from '@/lib/data'

    import Image from 'next/image'
    import styles from './CorousalFilm.module.css'

    const CorousalFilm = ()=>{

        const [slide, setSlide] = useState(0)
        const [promotionCarData, setPromotionCarData] = useState<{Poster:string, Title:string}[]>([])
     
        const slideLength = promotionCarData.length

        const getImages = async() =>{
            try {
                const response = await getMoviesByFilter({sortByRating:true, limit:3})
                setPromotionCarData(response)
            } catch (error) {
                console.error(error)

            }
        }

        const autoSlide = () => {
            setSlide((prevIndex) => (prevIndex + 1) % slideLength);
        };

        
        // setting interval and change the image
        useEffect(() => {
               
            getImages();
            const interval = setInterval(autoSlide, 3000);
        
            return () => clearInterval(interval);
        }, [slideLength]);


        return(
            <section className={styles.promotion} id="promotion">
                <div className={styles.getVoucher}>
                    <h3>Recieve guarnteed <span>GIFT VOUCHER</span> on a monthly hire or lease</h3>
                </div>

                <div className={styles.carImages}>
                {
                    promotionCarData.map((item, index)=>{
                        return(
                            <div key={index} className={slide === index ? styles.slide :styles.slideHide}>
                                {item.Poster && <Image
                                    src={item.Poster}
                                    alt={item.Title}
                                    width={100}
                                    height={100}
                                    quality={100}      
                                />}
                            </div>)
                        })
                }

                    <div className={styles.carouselIndicators}>
                    {
                        promotionCarData.map((item, index)=>{
                            return(
                                <span key={index} className={slide === index ? `${styles.indicator} ${styles.active}` :styles.indicator}>

                                </span>
                            )
                        })
                    }
                    </div> 
                </div>
            </section>)
    }

    export default CorousalFilm