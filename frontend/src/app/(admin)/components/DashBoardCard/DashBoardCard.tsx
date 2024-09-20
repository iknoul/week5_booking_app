import Image from 'next/image'
import editIcon from '@/../public/icons/editIcon.svg'
import addIcon from '@/../public/icons/addIcon.svg'

import styles from './dashBoardCard.module.css'
import { MouseEventHandler } from 'react';

interface myProps{

    text: string;
    callBackFunction?: MouseEventHandler<HTMLDivElement>;
    purpose: string
}

const DashBoardCard:React.FC<myProps> = ({text, callBackFunction, purpose})=>{

    return(
    <div className={styles.dashBoardCard} onClick={callBackFunction}>
        <Image 
            src={purpose === 'add'?addIcon:editIcon}
            alt={purpose === 'add'?'add icon':'edit icon'}
        />
        <p>{text?text:''}</p>
    </div>
    )
}

export default DashBoardCard