
export async function getClothingItems() {
    const res = await fetch('http://localhost:5555/collection')
    const clothingItems = await res.json()
    return {clothingItems}
}
export async function getClosetItems() {
    const res = await fetch('http://localhost:5555/closets')
    const closetItems = await res.json()
    console.log(closetItems)
    return {closetItems}
}