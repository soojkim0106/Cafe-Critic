function Recipe({recipe}){

    return (
        <div>
            <img src={recipe.image}/>
            <span>{recipe.ingredients}</span>
            <span>{recipe.description}</span>
        </div>
    )   
}

export default Recipe