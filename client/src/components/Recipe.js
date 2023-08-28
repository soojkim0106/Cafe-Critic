

function Recipe({recipe}){

    return (
        <div>
            <img width={200} height={200} src={recipe.image}/>
            <h2><span>{recipe.ingredients}</span></h2>
            <h3><span>{recipe.description}</span></h3>
        </div>
    )   
}

export default Recipe