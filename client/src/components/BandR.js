import BookSignup from './BookSignup'
import RecipeSignup from './RecipeSignup'
import { useState } from 'react'


function BandR({user}){

    const [bookForm, setBookForm] = useState(true)

    function changeForm(){
        setBookForm(!bookForm)
    }

    return (

        <>
            {bookForm? <button onClick={changeForm}>New Recipe Form</button> : <button onClick={changeForm}>New Book Form</button>}
            {bookForm ? <BookSignup /> : <RecipeSignup user={user}/>}
        </>
    )
}

export default BandR