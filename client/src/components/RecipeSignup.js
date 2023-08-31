import React, { useState, useEffect } from 'react';

function YourComponent({user}) {

    const [form, setform] = useState({
        name: "",
        image: "",
        ingredients: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

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

    return (
        !user.books ? 
        <div>
            <h2>No books to add recipes to</h2>
        </div>:
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
                         <label htmlsFor="image">Image</label>
                    <input 
                        id="image"
                        type="button"
                        name="image" required
                        onClick={uploadImage}
                        />
                    <textarea 
                        id="ingredients" 
                        name="ingredients" 
                        rows="4" required 
                        onChange={handleChange}></textarea>
                         <label htmlFor="Directions">Directions:</label>
                         <textarea 
                        id="Directions" 
                        name="description" 
                        rows="6" required 
                        onChange={handleChange}></textarea>
                         <button type="submit">Write your own recipe!</button>
                </form>
            </div>
        </div>
    );
}    export default YourComponent
