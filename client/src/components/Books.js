import React from "react";
import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import Carousel from "./Carousel";
import AllRecipes from './AllRecipes'
import BookSignup from "./BookSignup";
import RecipeSignup from './RecipeSignup'

function Books({user}){

    const [books, setBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [next, setNext] = useState(2)
    const [prev, setPrev] = useState(0)
    const [selBook, setBook] = useState(<div>__________</div>)
    const [selRecipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    const [rindex, setRindex] = useState(0)
    const [renderIndex, setRenderIndex] = useState(0)
    const renderArr = [<AllRecipes allRecipes={allRecipes}/>, <BookSignup />, <RecipeSignup/>]

    useEffect(()=>{
        fetch('/recipes')
        .then((r) => r.json())
        .then((data) => setAllRecipes(data))
    })

    useEffect(()=>{
        fetch('/books')
        .then((r) => r.json())
        .then(data => setBooks(data))
    }, [])

    const nextBook = () => {
        setCurrent( current+1 === books.length ? 0 : current+1)
        setPrev( prev+1 === books.length ? 0 : prev+1)
        setNext( next+1 === books.length ? 0 : next+1)
    }

    const prevBook = () => {
        setCurrent( current === 0 ? books.length-1 : current-1)
        setPrev( prev === 0 ? books.length-1 : prev-1)
        setNext( next === 0 ? books.length-1 : next-1)
    }

    const nextRecipe = () => {
        setRindex( rindex+1 === selBook.recipes.length ? 0 : rindex+1)
    }

    const prevRecipe = () => {
        setRindex( rindex === 0 ? selBook.recipes.length-1 : rindex-1)
    }

    function loadBook(currentBook){
        setBook(currentBook)
        setRecipes(currentBook.recipes)
    }

    function removeRecipe(){
        return 1
    }

    function changView(e){
        setRenderIndex(parseInt(e.target.id))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
      };
    
      return (
        <div>
          <h1>Book Form</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={recipe?.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredients"
              value={recipe?.ingredients}
              onChange={handleChange}
            />
            <input
              type="text"
              name="instructions"
              placeholder="Instructions"
              value={recipe?.instructions}
              onChange={handleChange}
            />
            <button type="submit">Save Recipe</button>
          </form>
          <Carousel>
            {recipes.map((recipe) => (
              <Carousel.Item key={recipe.id}>
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      );
    };

    return (
        user !== null ?
        <div>
            <Carousel books = {books} prev ={prev} current={current} next={next} loadBook={loadBook} prevBook={prevBook} nextBook={nextBook}/>
            {selRecipes === [] ? 
            <h2>No Recipes</h2> : 
            <div>
                <Recipe recipe = {selRecipes[rindex]}/>
                <div>
                    {rindex === 0 ? <></> : <button onClick={prevRecipe}>{'\u276c'}</button>}
                    <button onClick={removeRecipe(selRecipes[rindex])}>Remove Recipe</button>
                    {rindex === selRecipes.length-1 ? <></> : <button onClick={nextRecipe}>{'\u276d'}</button>}
                </div>
            </div>}
            <div>
                <div>
                    <button id='0'onClick={(e) => changView}>View Recipes</button>
                    <button id='1'onClick={(e) => changView}>Add Book</button>
                    <button id='2' onClick={(e) => changView}>Add Recipe</button>
                </div>
                {renderArr[renderIndex]}
            </div>
        </div> :
        <span>Error must be logged in</span>
    )
}

export default Books