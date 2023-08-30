function AllRecipes({allRecipes}){

    return (
        <div>
            {allRecipes.map((recipe) => {
                <div key={recipe.id}>
                    <img src ={recipe.image} />
                </div>
            })}
        </div>
    )
}

export default AllRecipes