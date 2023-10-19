import React, { useState } from "react";
import UserForm from "./UserForm";

function Profile({ currUser, setCurrUser, xurl }) {
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
        setShowForm((showForm) => !showForm);
    }

    const handleProf = (updProf) => {
        console.log(updProf)
        console.log(currUser)
        fetch(xurl + "/users/" + currUser.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(updProf)
        })
            .then(r => {
                if (r.ok) {
                    const updatesUseee = {
                        ...updProf, favorites: currUser.favorites, adoptions: currUser.adoptions, id: currUser.id
                    }
                    setCurrUser(updatesUseee)
                }
            })
    }

    const deleteUsr = () => {
        fetch(xurl + "/users/" + currUser.id, {
            method: "DELETE",

        })
            .then(r => {
                if (r.ok) {
                    setCurrUser('')
                }

            })

    }





    return (
        <>
            {showForm ? <UserForm handleProf={handleProf} currUser={currUser} deleteUsr={deleteUsr} /> : <> </>}
            <div className="buttonContainer">
                <button onClick={handleClick}>User Settings</button>
            </div>

        </>

    )
}

export default Profile;