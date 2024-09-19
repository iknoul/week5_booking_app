'use client';
import { useState } from "react";

import FilmCards from "./components/FilmCard/FilmCards";
import CorousalFilm from "./components/CarousalImage/CorousalFilm";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResultCards from "./components/FilmCard/SearchResultCards";

import styles from './page.module.css'

interface userinput{
  title?: string;
  theaterName?: string;
  sortByRating?:boolean;
  date?:string;
}
const Home = () =>{

  const [userInput, setUserInput] = useState<userinput>({});
  
  return(
  <>
    <main className={styles.main}>

        <SearchBar setUserInput={setUserInput}/>
        <SearchResultCards {...userInput}/>
        <CorousalFilm />
        <FilmCards />  

    </main>
  </>)
}

export default Home
