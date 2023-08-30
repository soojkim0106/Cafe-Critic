import React, { useState, useEffect, useRef} from 'react';


function YourComponent({user}) {

    const [formData, setForm] = useState({
        user_id: user.id,
        book: "",
        name: "",
        image: "",
        ingredients: "",
        description: "",
    })

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({...formData, [name]: value})
    }

    function openWidget () {
        widgetRef.current.open();
    }

    useEffect(() => {
        console.log(window.cloudinary)
        widgetRef.current = window.cloudinary.createUploadWidget({
            cloudName: 'dcejyrcsu',
            uploadPreset: 'gz5dnomm'
        } , (error, result) => {
            if (result.event === 'success'){
                setForm({...formData, image: result.info.url})
            }
        })
    }, [])

    const handleSubmit = async(event) =>{
        event.preventDefault()
        try{
            const response = await fetch('http://localhost:5555/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                console.log(response)
                setForm({
                    name: "",
                    image: "",
                    ingredients: "",
                    description: "",
                })
            }

        }catch(error){
            console.error('Error during submit', error)
        }
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
                    <label>Select book this recipe belongs to:</label>
                    <select 
                        name="book"
                        onChange={handleChange}>
                        {user.books.map(book => <option key={book.id} value={book.category}>{book.category}</option>)}
                    </select>
                    <label htmlFor="recipe-name">Recipe Name:</label> 
                    <input 
                        id="recipe-name" 
                        name="name" required 
                        onChange={handleChange}/>
                    <label htmlsFor="image">Image</label>
                    <input 
                        id="image"
                        type="button"
                        name="image" required
                        onClick={openWidget}
                        />
                    <label htmlFor="ingredients">Ingredients:</label>
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
}

export default YourComponent
