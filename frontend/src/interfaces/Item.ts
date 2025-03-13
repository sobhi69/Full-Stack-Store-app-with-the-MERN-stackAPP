export default interface Item {
    _id:string,
    title: string,
    category?: string,
    cost: number,
    price: number,
    quantity: number,
    minPrice?: number,
    createdAt?:string,
    updatedAt?:string,
}