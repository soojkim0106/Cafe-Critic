import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { UserContext } from "../../context/UserContext";


const GoogleAuth = () => {
  const requestedUrl = "/googleauth";
  const navigate = useNavigate();
  const { user, login, logout } = useContext(UserContext);


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
    // Load the Google API script and then initialize
    loadGoogleScript().then(() => {
      initializeGoogleSignIn(); //defined in the next block of code
    });
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: "1043251127291-45mscbh11d51040eeinopn9be09qlg1k.apps.googleusercontent.com",
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

  // const handleSignOut = () => {
  //   document.getElementById("signInDiv").hidden = false;
  // }

  useEffect(() => {
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: 'outline', size: 'large'}
    )

  }, [])


  return (
    <div>
      <div id="signInDiv"></div>

    </div>
  );
};

export default GoogleAuth;