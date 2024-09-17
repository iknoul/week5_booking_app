import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Appq() {
  const responseGoogle = (response: any) => {
    console.log(response);
    // Handle the response (e.g., store user info, redirect, etc.)
    
  };

  return (
    <>
     <GoogleOAuthProvider clientId="93368005434-ktag062d902ure0hh6q7rpen0rkkja2i.apps.googleusercontent.com">
       <div>
         <h2>React Google Login</h2>
         <GoogleLogin
           onSuccess={responseGoogle}
           onError={() => {
             console.log('Login Failed');
           }}
         />
       </div>
     </GoogleOAuthProvider>
    </>
    
  );
}

export default Appq;