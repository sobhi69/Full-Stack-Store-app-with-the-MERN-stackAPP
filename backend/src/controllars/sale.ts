import { Request, Response } from 'express'
import Sale from '../interfaces/Sale'
import SaleModel from '../model/sale'
export const createSale = async (req: Request, res: Response) => {
    const { cardItems, total, discount, addition, client, salesPerson }: Sale = req.body

    if (!cardItems.length || !total) {
        res.status(400).json({ message: "please select at least one item to the card items" })
        return
    }

    const newSale = new SaleModel({
        cardItems,
        total,
        discount,
        addition,
        salesPerson,
        client
    })

    try {
        await newSale.save()
        res.status(201).json(newSale)
    } catch (error: any) {
        console.error(`error in createSale ${error}`)
        res.status(500).json({ message: error.message })
    }
}