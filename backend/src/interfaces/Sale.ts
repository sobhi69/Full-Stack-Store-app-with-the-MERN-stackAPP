import { Schema } from "mongoose";
import Item from "./Item";

export default interface Sale {
    cardItems:Item[],
    total:number,
    discount?:number,
    addition?:number,
    client?:Schema.Types.ObjectId,
    salesPerson?:Schema.Types.ObjectId,
}