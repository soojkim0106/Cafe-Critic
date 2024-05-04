import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const GoogleAuth = () => {
  const requestedUrl = "/googleauth";
  const navigate = useNavigate();
  const { user, login, logout } = useContext(UserContext);
  
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


  useEffect(() => {
    /* global google */
    const loadGoogleScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };
    loadGoogleScript().then(() => {
      initializeGoogleSignIn(); 
    }).then(() => {
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: 'outline', size: 'large'}
      )
    });
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCallbackResponse,
      });
    } else {
      setTimeout(initializeGoogleSignIn, 100);
    }
  };



  const handleCallbackResponse = (response) => {
    fetch('/googleauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_token: response.credential})
    })
    .then(response => response.json())
    .then(user => {
      login(user)
      navigate(`/cafes`)
    })
    .catch(error => console.error(error))
  }


  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
};

export default GoogleAuth;