import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const GoogleAuth = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  
  const clientId = "1043251127291-ond5m5bdur5vsdoq6vqvmqhvtu9iv9gb.apps.googleusercontent.com";


  useEffect(() => {
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
        {theme: 'outline', size: 'large', text: 'continue_with'}
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
      navigate(`/cafe`)
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