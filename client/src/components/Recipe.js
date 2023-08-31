function Recipe({recipe}){

    return (
        recipe !== null ?
        <div>
            <img src={recipe.image}/>
            <span>{recipe.ingredients}</span>
            <span>{recipe.description}</span>
        </div>:
        <div>
            No Recipe to show
        </div>
    )   
}

export default Recipe