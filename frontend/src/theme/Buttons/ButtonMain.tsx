import React,{MouseEventHandler} from 'react'
import styles from './ButtonMain.module.css'


interface buttonProps{
    bg?: string;
    disabled?: boolean;
    callbackFunction?: MouseEventHandler<HTMLDivElement>
    children?: string
}

const ButtonMain:React.FC<buttonProps> = ({children, bg, callbackFunction=()=>{}, disabled = false})=>{

    return(
    <div 
        className={`${styles.buttonMain} ${bg ? styles[bg]:''} ${disabled ? styles.disabled:''}`}
        onClick={callbackFunction}
    >
        <p>{children}</p>
    </div>)
}

export default ButtonMain