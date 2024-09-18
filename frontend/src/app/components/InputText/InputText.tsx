import { ChangeEvent, useState } from 'react';
import ButtonMain from '../Buttons/ButtonMain';
import styles from './inputText.module.css';

interface myProps {
  otpVerifyHandler: (phoneNumber: string, otp: string) => void;
  sendOtpHandler: (phoneNumber: string) => void;
}

const InputText: React.FC<myProps> = ({ otpVerifyHandler, sendOtpHandler }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Handler for phone number change
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  // Handler for OTP change
  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // Handler for sending OTP
  const handleSendOtp = () => {
    sendOtpHandler(phoneNumber);
  };

  // Handler for verifying OTP
  const handleVerifyOtp = () => {
    otpVerifyHandler(phoneNumber, otp);
  };

  return (
    <div className={styles.inputContainer}>
      {/* Input field to enter phone number */}
      <input
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter Phone Number"
        className={styles.inputField}
      />

      {/* Button to send OTP */}
      
      <ButtonMain bg='black' callbackFunction={handleSendOtp} disabled={!phoneNumber}>
            Verify OTP
      </ButtonMain>

      {/* Input field to enter OTP */}
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        className={styles.inputField}
        disabled={!phoneNumber}
      />

      {/* Button to verify OTP */}
      <ButtonMain bg='black' callbackFunction={handleVerifyOtp} disabled={!otp || !phoneNumber}>
        Verify OTP
      </ButtonMain>
    </div>
  );
};

export default InputText;
