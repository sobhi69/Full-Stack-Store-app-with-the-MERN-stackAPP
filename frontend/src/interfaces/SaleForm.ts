import Item from "./Item";

export default interface SaleForm {
    cardItems:Item[],
    total:number,
    discount?:number,
    addition?:number,
    client?:string,
    salesPerson?:string,
}