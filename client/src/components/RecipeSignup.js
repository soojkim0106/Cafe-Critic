import React, { useState, useEffect, useRef} from 'react';

function YourComponent({user}) {

    const [form, setform] = useState({
        name: "",
        image: "",
        ingredients: "",
        description: "",
    })

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

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

            if (response.ok){
                console.log("Success")
                setform({
                    name: "",
                    ingredients: "",
                    description: ""
                })
            }else {
                const data = await response.json()
                alert(`Error: ${data.message}`)
            }
        }catch (error){
            console.error('Error during submit', error);
        }
    }

    function handleSubmit (){
        useEffect(() => {
            console.log(window.cloudinary)
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'dcejyrcsu',
                uploadPreset: 'gz5dnomm'
            }, function (error, result) {
                // console.log(result)
                if (result.event == "success") {
                    console.log(result)
                    console.log(result.info.url)
                    // 
                    fetch('http://localhost:5555/recipes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "image": result.info.url,
                            "description": form.name,
                            "ingredients": form.ingredients,
                            "description": form.description
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            setImageList(prevImageList => [...prevImageList, data.publicId])
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
                else {
                    console.log(result)
                }
            })
    
        }, [])
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
<<<<<<< HEAD
}

export default YourComponent
=======
}    export default YourComponent
>>>>>>> b5f9b259f12bf8eb2a54b036c9ccc126cbe94836
