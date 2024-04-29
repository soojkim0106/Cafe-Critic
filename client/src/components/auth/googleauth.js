import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {

    const requestedUrl = "/googleauth";

    const handleGlogin = () => {
        fetch(requestedUrl)
    }

  return (
    <div>
        <button onCLick={handleGlogin}>Login with Google</button>
    </div>
  )
}

export default GoogleAuth