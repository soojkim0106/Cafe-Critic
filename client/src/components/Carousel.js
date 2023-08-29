function Carousel(books, prev, current, next, loadBook, prevBook, nextBook){

    return (
        <div>
            <div>
                {books[prev] === undefined ? <div></div> : <div><h2>{books[prev].category}</h2></div>}
                {books[current] === undefined ? <div></div> : <div onClick={loadBook(books[current])}><h2>{books[current].category}</h2></div>}
                {books[prev] === undefined ? <div></div> : <div><h2>{books[next].category}</h2></div>}
            </div>
            <div>
                <button onClick={prevBook}>{'\u276c'}</button><button onClick={nextBook}>{'\u276d'}</button>
            </div>
        </div>
    )
}

export default Carousel
