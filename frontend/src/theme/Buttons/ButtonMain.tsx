import styles from './ButtonMain.module.css'


interface buttonProps{
    bg?: string;
    disabled?: boolean;
    callbackFunction?: Function
    children?: string
}

const ButtonMain:React.FC<buttonProps> = ({children, bg, callbackFunction=()=>{}, disabled = false})=>{

    return(
    <div 
        className={`${styles.buttonMain} ${bg ? styles[bg]:''} ${disabled ? styles.disabled:''}`}
        onClick={()=>{callbackFunction()}}
        onKeyDown={(e)=>{if(e.key == 'Enter'){callbackFunction()}}}
    >
        <p>{children}</p>
    </div>)
}

export default ButtonMain