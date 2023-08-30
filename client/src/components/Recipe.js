import './index.css';

function Recipe({recipe}){

    return (
        <div>
            <img src={recipe.img}/>
            <span>{recipe.ingredients}</span>
            <span>{recipe.description}</span>
        </div>
    )   
}

export default Recipe