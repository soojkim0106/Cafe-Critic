import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { UserContext } from "../../context/UserContext";


const GoogleAuth = () => {
  const requestedUrl = "/googleauth";
  const navigate = useNavigate();
  const { user, login, logout } = useContext(UserContext);

  const handleGlogin = () => {
    fetch(requestedUrl);
  };
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

  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    // const userObject = jwtDecode(response.credential);
    // console.log(userObject)
    fetch('/googleauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_token: response.credential})
    })
    .then(response => {
      debugger
      response.json()})
    .then(user => {
      login(user)
      navigate(`/cafes`)
    })
    .catch(error => console.error(error))
    // document.getElementById("signInDiv").hidden = true;
  }

  // const handleSignOut = () => {
  //   document.getElementById("signInDiv").hidden = false;
  // }


  return (
    <div>
      <div id="signInDiv"></div>

    </div>
  );
};

export default GoogleAuth;