import React, { useState, useEffect } from 'react';

function YourComponent({ user }) {
    const [form, setForm] = useState({
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
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                console.log("Success");
                setForm({
                    name: "",
                    image: "",
                    ingredients: "",
                    description: "",
                });
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during submit', error);
        }
    };

    function uploadImage(files) {
        setForm((prevForm) => ({
            ...prevForm,
            image: files[0],
        }));
    }

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
                        name="name"
                        value={form.name}
                        required
                        onChange={handleChange}
                    />
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        rows="4"
                        value={form.ingredients}
                        required
                        onChange={handleChange}
                    ></textarea>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={(e) => uploadImage(e.target.files)}
                    />
                    <label htmlFor="description">Directions:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        value={form.description}
                        required
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Write your own recipe!</button>
                </form>
            </div>
        </div>
    );
}

export default YourComponent;
