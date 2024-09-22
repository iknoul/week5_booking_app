import Image from 'next/image'
import editIcon from '@/../public/icons/editIcon.svg'
import addIcon from '@/../public/icons/addIcon.svg'

import styles from './dashBoardCard.module.css'
import { KeyboardEvent } from 'react';

interface MyProps{

    text: string;
    callBackFunction: Function;
    purpose: string
}

const DashBoardCard:React.FC<MyProps> = ({text, callBackFunction, purpose})=>{

    const handleKeyDown = (e:KeyboardEvent) => {
        if (e.key === 'Enter') {
            callBackFunction()
        }
    };
    return(
    <div className={styles.dashBoardCard} onKeyDown={handleKeyDown} tabIndex={0} onClick={()=>{callBackFunction()}}>
        <Image 
            src={purpose === 'add'?addIcon:editIcon}
            alt={purpose === 'add'?'add icon':'edit icon'}
        />
        <p>{text}</p>
    </div>
    )
}

export default DashBoardCard