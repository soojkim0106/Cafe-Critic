
export async function getClothingItems() {
    const res = await fetch('/collection')
    const clothingItems = await res.json()
    return {clothingItems}
}
export async function getClosetItems() {
    const res = await fetch('/closet/3')
    const closetItems = await res.json()
    console.log(closetItems)
    return {closetItems}
}