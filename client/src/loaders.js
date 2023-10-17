
export async function getClothingItems() {
    const res = await fetch('http://localhost:5555/collection')
    const clothingitems = await res.json()
    return {clothingitems}
}
export async function getClosetItems() {
    const res = await fetch('http://localhost:5555/closet')
    const closetItems = await res.json()
    console.log(closetItems)
    return {closetItems}
}