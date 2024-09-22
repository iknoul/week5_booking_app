'use client'
import googleIocn from '@/../public/icons/googleIcon.svg'
import facebookIcon from '@/../public/icons/faceBookIcon.svg'

import Image from 'next/image'

import styles from './authComponent.module.css'

const AuthComponent = ()=>{

    const onloginhandler = () => {
        window.location.href = 'http://localhost:8888/auth/google-auth'; // Redirect to your Node.js backend
    };

    return(
    <>

        <div 
            className={styles.googleAuth} 
            onKeyDown={(e)=>{if(e.key == "Enter"){onloginhandler()}}}  
            onClick={onloginhandler}
            tabIndex={1}
        >
            <Image 
                src={googleIocn}
                alt='google icon'
            />
            Login via google
        </div>

        <div className={styles.faceBookAuth} tabIndex={1}>
            <Image 
                src={facebookIcon}
                alt='facebook icon'
            />
            Login via facebook
        </div>
        
           
    </>)
}

export default AuthComponent