import React, { useState, useEffect, useRef} from 'react';

function YourComponent({user}) {

    const [form, setform] = useState({
        name: "",
        image: "",
        ingredients: "",
        description: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5555/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            // if (response.ok){
            //     console.log("Success")
            //     setform({
            //         name: "",
            //         ingredients: "",
            //         description: ""
            //     })
            // }else {
            //     const data = await response.json()
            //     alert(`Error: ${data.message}`)
            // }
        }catch (error){
            console.error('Error during submit', error);
        }
    }

    function uploadImage (files){
        useEffect
        setform({...form, image: files[0]})
    }

function YourComponent() {
    return (
        <div>
            <header>
                <h1>New Recipes</h1>
            </header>
            <div className="container">
                <h2>Add a New Recipe</h2>
                <form className="recipe-form" onSubmit={handleSubmit}>
                    <label htmlFor="recipe-name">Recipe Name:</label>
                    <input 
                        id="recipe-name" 
                        name="recipe-name" required 
                        onChange={handleChange}/>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" rows="4" required></textarea>
                    <label htmlFor="Directions">Directions:</label>
                    <textarea id="Directions" name="Directions" rows="6" required></textarea>
                    <button type="submit">Write your own recipe!</button>
                </form>
            </div>
        </div>
    );
}

export default RecipeSignUp;
