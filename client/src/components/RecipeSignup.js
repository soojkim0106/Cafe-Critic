import React from 'react';

function RecipeSignUp() {
    return (
        <div>
            <header>
                <h1>New Recipes</h1>
            </header>
            <div className="container">
                <h2>Add a New Recipe</h2>
                <form className="recipe-form">
                    <label htmlFor="recipe-name">Recipe Name:</label>
                    <input id="recipe-name" name="recipe-name" required />
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea id="ingredients" name="ingredients" rows="6" required></textarea>
                    <label htmlFor="Directions">Directions:</label>
                    <textarea id="Directions" name="Directions" rows="10" required></textarea>
                    <button type="submit">Write your own recipe!</button>
                </form>
            </div>
        </div>
    );
}

export default RecipeSignUp;
