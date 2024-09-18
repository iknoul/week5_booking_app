'use client'


import { useRouter, useParams, useSearchParams } from 'next/navigation'

import AuthComponent from '../components/AuthComponent/AuthComponent';
import InputText from '../components/InputText/InputText';


import { decodeToken } from '@/utils/decodeToken';
import { useAuth } from "@/app/hooks/useAuth";
import axios from './../../utils/axios'

import styles from './login.module.css'
import { useEffect, useState } from "react";



const LoginPage:React.FC = ()=>{


    const router = useRouter()
    const searchParams = useSearchParams();
    const temptoken = searchParams?.get('token') ?? '';  // Retrieve the token from query params

    const {isAuthenticated, login, oAuthStatus, setOAuthStatus, setUserData, setRole, setToken, token} = useAuth()




    const verifyToken = (token:string)=>{
        const payload = decodeToken(token)
        if (payload) {
            try {
				sessionStorage.setItem('token', token)
				console.log(token, 'token from tempy token')
				console.log(payload, 'payload of token')
				setToken(token); 
				setUserData(payload.user);
				setRole(payload.role)
				setOAuthStatus(true)
            } catch (error) {
              	console.error(error)
            }            
        } 

    }
   // Handler to send OTP
  const sendOtpHandler = async (mobile_number:string) => {
	console.log(token, "token from useAuth")
    try {
      	const result = await axios.post(`/auth/send-otp`, 
		{ mobile_number },
		{
			headers: {
				Authorization: `Bearer ${token}`, // Token from props
			},
		});
      console.log('OTP sent successfully:', result.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Handler to verify OTP
  const otpVerifyHandler = async (mobile_number:string, otp: string) => {
    try {
      const result = await axios.post(
        `/auth/verify-otp`, // The endpoint
        { mobile_number, OTP:otp }, // Request body (otp passed here)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token from props
          },
        }
      );
      console.log('OTP verified successfully:', result.data);
      verifyToken(result.data.registrationToken); // Call verifyToken with the registrationToken
	  login()
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

    useEffect(() => {
        if (temptoken) {
			verifyToken(temptoken) 
		  // Set the token in the state
          console.log(token)
	        // Call your login function if temptoken exists
        }
    }, [temptoken]); // Only re-run this effect when temptoken changes

    useEffect (()=>{
        if(isAuthenticated){
          router.push('/')
        }
    }, [isAuthenticated])

    useEffect(()=>{
      const tokenFromStorage = sessionStorage.getItem('token')
      if(tokenFromStorage){
        verifyToken(tokenFromStorage)
      }
    },[])


    return(

    <div className={styles.loginPage}>

        
        <div className={styles.loginBanner}>
    
            
        </div>

        <div className={styles.logInContainer}>

            {!oAuthStatus &&
            
              <AuthComponent />
            }

            {
              oAuthStatus && !isAuthenticated &&
              <InputText sendOtpHandler={sendOtpHandler} otpVerifyHandler={otpVerifyHandler}/>
            }

        </div>

    </div>
    )
}

export default LoginPage