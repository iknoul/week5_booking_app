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
    const [oAuthStatus, setOAuthStatus] = useState(false)
    const searchParams = useSearchParams();
    const temptoken = searchParams?.get('token') ?? '';  // Retrieve the token from query params

    const {isAuthenticated, login, isOtpDone, otpVerified, setUserData, user, setUser, setRole} = useAuth()
    const [token, setToken] = useState('')



    const verifyToken = (token:string)=>{
        const payload = decodeToken(token)
        if (payload) {
			try {
				sessionStorage.setItem('token', token)
				setUserData(payload.user);
				setUser(payload.user)
				setRole(payload.role)
				otpVerified()

			} catch (error) {
				console.error(error)
			}            
        } 

    }
    const otpVerifyHandler = async()=>{
		try {
			const result = await axios.post(
				`/auth/verify-otp`, // The endpoint
				{}, // Request body (if you need to pass data, include it here)
				{
				headers: {
					Authorization: `Bearer ${token}`,
				}
				}
			);
			
			verifyToken(result.data.registrationToken)
			
		} catch (error) {
       }
        // console.log(response.data, response.data? response.data.user:'')
    }

    useEffect(() => {
        if (temptoken) {
          setToken(temptoken); // Set the token in the state
          console.log(token)
          login();           // Call your login function if temptoken exists
        }
    }, [temptoken]); // Only re-run this effect when temptoken changes

    useEffect (()=>{
        if(isOtpDone){
          router.push('/')
        }
    }, [isOtpDone])

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

            {!isAuthenticated &&
            
              <AuthComponent />
            }

            {
              isAuthenticated && !isOtpDone &&
              <InputText otpVerifyHandler={otpVerifyHandler}/>
            }

        </div>

    </div>
    )
}

export default LoginPage