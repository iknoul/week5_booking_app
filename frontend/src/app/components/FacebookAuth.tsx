import React from 'react';

function FacebookAuth() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8888/auth/google-auth'; // Redirect to your Node.js backend
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
}

export default FacebookAuth;
