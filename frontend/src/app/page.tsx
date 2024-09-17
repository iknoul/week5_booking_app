'use client';
import AuthProvider from "./Context/AuthProviders";
import FilmCards from "./components/FilmCard/FilmCards";
import CorousalFilm from "./components/CarousalImage/CorousalFilm";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResultCards from "./components/FilmCard/SearchResultCards";
import CustomPrompt from "./components/customPrompt";
import Appq from "./components/auth";
import FacebookAuth from "./components/FacebookAuth";

import { useAuth } from "./hooks/useAuth";

import styles from './page.module.css'
import { use, useEffect, useState } from "react";

interface userinput{
  title?: string;
}
const Home = () =>{

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [userInput, setUserInput] = useState<userinput>({});
  const { isAuthenticated, login, logout, user, isOtpDone } = useAuth()



  const handleOpenPrompt = () => {
    setIsPromptOpen(true);
  };

  // const handleConfirm = (input: string) => {
  //   setUserInput(setUserInput);
  //   setIsPromptOpen(false);
  // };

  const handleCancel = () => {
    setIsPromptOpen(false);
  };
 


  return(
  <>
    <main className={styles.main}>
   

        {/* <NavBar isAuthenticated={isAuthenticated} isOtpDone={isOtpDone} login={login} logout={logout} user={user}/> */}
        <SearchBar setUserInput={setUserInput}/>
        <SearchResultCards {...userInput}/>
        <CorousalFilm />
        <FilmCards />   
        {/* <CustomPrompt
              message="Please enter something:"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
        <div className="App">
        <h1>Custom Prompt Example</h1>
        <button onClick={handleOpenPrompt}>Open Custom Prompt</button>
        {userInput && <p>You entered: {userInput}</p>}
        {isPromptOpen && (
          <>
            <CustomPrompt
              message="Please enter something:"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            <Appq />
            <FacebookAuth />
          </>
        )}
      </div> */}

    </main>
  </>)
}

export default Home
