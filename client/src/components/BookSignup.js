function BookSignup(){
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
              name="description"
              placeholder="Description"
              value={recipe?.description}
              onChange={handleChange}
            />
            <button type="submit">Save Recipe</button>
          </form>
        </div>
    )
}

export default BookSignup