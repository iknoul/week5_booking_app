'use client';

import styles from "./page.module.css";
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Appq from "./components/auth";
import CustomPrompt from "./components/customPrompt";
import FacebookAuth from "./components/FacebookAuth";
import { it } from "node:test";


export default function Home() {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [verifyStatus, setVerifyStatus] = useState(false);

  // Function to extract token from query string
  const getTokenFromUrl = (item:string) => {
    const params = new URLSearchParams(window.location.search);
    params && console.log(params)
    return params.get(item);
  };

  const token = getTokenFromUrl('token'); // Get the token from URL
  const user = getTokenFromUrl('user')

  console.log(user, token)

  const handleOpenPrompt = () => {
    setIsPromptOpen(true);
  };

  const handleConfirm = (input: string) => {
    setUserInput(input);
    setIsPromptOpen(false);
  };

  const handleCancel = () => {
    setIsPromptOpen(false);
  };

  const logIn = async (token: string) => {
    try {
      const result = await axios.post('http://localhost:8888/google-auth', { token });
      console.log(result)
      return result.status === 200;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      if (token) {
        console.log(token)
        const success = await logIn(token); // Await the login result
        if (success) {
          sessionStorage.setItem('token', token);
          setVerifyStatus(true); // Set the verification status if needed
          alert("Login successful");
        } else {
          alert('Login failed');
        }
      }
    };
    console.log(sessionStorage, 'session storage')
    handleLogin();
    
    const sf = sessionStorage.getItem('token')
    console.log(sf)// Call the async function inside useEffect
  }, [token]); // Run when the token changes

  return (
    <main className={styles.main}>
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
      </div>
    </main>
  );
}
