

import styles from './inputText.module.css'


interface myProps{
    otpVerifyHandler: React.MouseEventHandler<HTMLButtonElement>;
}
const InputText:React.FC<myProps> = ({otpVerifyHandler})=>{

 

    return(
    <div>
        <input type="text" />
        <button onClick={otpVerifyHandler}>click here</button>
    </div>)
}

export default InputText