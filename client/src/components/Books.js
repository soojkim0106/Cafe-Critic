import React from "react";
import { useEffect, useState } from "react";

function Books(){

    const [books, setBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [next, setNext] = useState(2)
    const [prev, setPrev] = useState(0)
    const [selBook, setBook] = useState(<div>__________</div>)
    const [selRecipes, setRecipes] = useState([])
    const [rindex, setRindex] = useState(0)

    useEffect(()=>{
        fetch('/recipes')
        .then((r) => r.json())
        .then((data) => setRecipes(data))
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

    return (
        <div>
            <div>
                <div>
                    <div>
                        {books[prev] === undefined ? <div></div> : <div><h2>{books[prev].category}</h2></div>}
                        {books[current] === undefined ? <div></div> : <div onClick={loadBook(books[current])}><h2>{books[current].category}</h2></div>}
                        {books[prev] === undefined ? <div></div> : <div><h2>{books[next].category}</h2></div>}
                    </div>
                    <div>
                        <button onClick={prevBook}>{'\u276c'}</button><button onClick={nextBook}>{'\u276d'}</button>
                    </div>
                    <div>
                        <div>
                            {selRecipes === [] ? 
                            <div>
                                <h2>No Recipes</h2>
                            </div> : 
                            <div>
                                <img src = {setRecipes[rindex].image}/>
                                <span>{setRecipes[rindex].ingredients}</span>
                                <span>{setRecipes[rindex].description}</span>
                            </div>
                            }
                            <div>
                                <div>
                                    {rindex === 0 ?<></> : <button onClick={prevRecipe}>{'\u276c'}</button>}{rindex === selRecipes.length-1 ? <></> : <button onClick={nextRecipe}>{'\u276d'}</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Books