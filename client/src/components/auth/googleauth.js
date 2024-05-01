import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const GoogleAuth = () => {
  const requestedUrl = "/googleauth";
  
  const [ guser, setGuser ] = useState({});

  const handleGlogin = () => {
    fetch(requestedUrl);
  };
  
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject)
    setGuser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  const handleSignOut = () => {
    setGuser({})
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1043251127291-45mscbh11d51040eeinopn9be09qlg1k.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: 'outline', size: 'large'}
    )
    google.accounts.id.prompt()
  }, [])

  return (
    <div>
      <div id="signInDiv"></div>
      {
        Object.keys(guser).length !== 0 && 
      <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { guser && 
        <div>
          <img src={guser.picture} alt={guser.name} />
          <h3>{guser.name}</h3>
        </div>
      }
    </div>
  );
};

export default GoogleAuth;