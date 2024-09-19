'use client'
import { useRouter } from 'next/navigation'
import ButtonMain from '../Buttons/ButtonMain'
import { useAuth } from '@/app/hooks/useAuth'

import styles from './navBar.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const NavBar = ()=>{

    const router = useRouter()
    const { isAuthenticated, logout, user, oAuthStatus, role } = useAuth()
    console.log(role, 'role in navBaar ===')
    
    return(
    <div className={styles.navBar}>

        <h3 className={styles.title}><i>Book my Ticket</i></h3>
        <span className={styles.authDetails}>
            {isAuthenticated &&
                <>
                        { user?.profile_pic &&
                            <Image 
                            src={user.profile_pic.value}
                            alt="use profile image"
                            width={100}
                            height={100}
                        />
                        }
                    
                        <p className={styles.profile_name}>{user?user.name:''}</p>

                        {(role==='admin') &&
                            <ButtonMain bg='white' callbackFunction={()=>{router.push('/AdminDashBoard')}}>Dashboard</ButtonMain> 
                        }
                </>

            }

            {!isAuthenticated ? 
            <ButtonMain bg='white' callbackFunction={()=>{router.push('/Login')}}>Sign in</ButtonMain>
            :
            <>
                <ButtonMain bg='white' callbackFunction={()=>{logout()}}>Log out</ButtonMain>
            </>
            }
        </span>

    </div>)
}

export default NavBar