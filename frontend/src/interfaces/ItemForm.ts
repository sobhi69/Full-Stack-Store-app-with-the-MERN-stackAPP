export default interface ItemForm {
    title: string,
    category?: string,
    cost: number,
    price: number,
    quantity: number,
    minPrice?: number
}