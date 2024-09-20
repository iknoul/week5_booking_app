'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

import { decodeToken } from '@/utils/decodeToken';
import { useAuth } from "@/app/hooks/useAuth";
import axios from '@/utils/axios'

import AuthComponent from '../components/AuthComponent/AuthComponent';
import OtpInput from '../components/OtpInput/OtpInput';

import styles from './login.module.css'


const LoginPage:React.FC = ()=>{


    const router = useRouter()
    const searchParams = useSearchParams();
    const temptoken = searchParams?.get('token') ?? '';  // Retrieve the token from query params

    const [otpSendStatus, setOtpSendStatus] = useState<number>(0)

    const {isAuthenticated, login, oAuthStatus, setOAuthStatus, setUserData, setRole, setToken, token} = useAuth()

    const storeToken = (token:string, type:'userDataToken'|'authToken')=>{
        const payload = decodeToken(token)
		console.log(payload, "called payload")
        if (payload) {
			
            try {
				sessionStorage.setItem(type, token)
				if(type == "userDataToken"){
					const user:any = (payload.user);
        			setUserData(user)
					setOAuthStatus(true)
				} else {
					setToken(token); 
					setRole(payload.role)
					login()
				}

            } catch (error) {
              	console.error(error)
            }            
        } 

    }
   	// Handler to send OTP
	const sendOtpHandler = async (mobile_number:string) => {
		console.log(temptoken, "token from useAuth")
		const token = sessionStorage.getItem('userDataToken')
		try {
			const result = await axios.post(`/auth/send-otp`, 
			{ mobile_number },
			{
				headers: {
					Authorization: `Bearer ${token}`, // Token from props
				},
		});
		setOtpSendStatus(1)
		console.log('OTP sent successfully:', result.data);
		} catch (error) {
		setOtpSendStatus(2)
		console.error('Error sending OTP:', error);
		}
	};

  	// Handler to verify OTP
	const otpVerifyHandler = async (mobile_number:string, otp: string) => {
		const token = sessionStorage.getItem('userDataToken')
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
			setOtpSendStatus(3)
			console.log('OTP verified successfully:', result.data);
			storeToken(result.data.loginToken, "authToken"); // Call verifyToken with the registrationToken

		} catch (error) {

			setOtpSendStatus(4)
			console.error('Error verifying OTP:', error);
		}
	};

    useEffect(() => {
        if (temptoken) {
			storeToken(temptoken, "userDataToken") 
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
		const authToken = sessionStorage.getItem('authToken')
		const userDataToken = sessionStorage.getItem('userDataToken')
		if(authToken){
			alert('called verified token from session storage')
			storeToken(authToken, "authToken")
		}
		if(userDataToken){
			storeToken(userDataToken, "userDataToken")
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
              	<OtpInput sendOtpHandler={sendOtpHandler} otpVerifyHandler={otpVerifyHandler} otpSendStatus={otpSendStatus}/>
            }
        </div>

    </div>
    )
}

export default LoginPage