import { NextFunction, Request, Response } from "express";
import Item from "../interfaces/Item";
import ItemModel from '../model/item'
import Sale from "../interfaces/Sale";

export const getItems = async (req: Request, res: Response) => {
    try {
        const allItems = await ItemModel.find()
        res.json(allItems)
    } catch (error: any) {
        console.error(`error in getItems ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const deleteAllItems = async (req: Request, res: Response) => {
    try {
        await ItemModel.deleteMany()
        res.sendStatus(200)
    } catch (error: any) {
        console.error(`error deleteAllItems ${error}`)
        res.json({ message: error.message })
    }
}


export const createOneItem = async (req: Request, res: Response) => {
    const {
        title,
        cost,
        price,
        minPrice,
        quantity,
        category
    }: Item = req.body

    if (!title || !cost || !price || !quantity) {
        res.status(400).json({ message: "please provide the required data to create new item" })
        return
    }

    const conflic = await ItemModel.findOne({ title: title })

    if (conflic) {
        res.status(409).json({ message: "item title already used, conflic error" })
        return
    }
    // status 409 > conflic, attmpting to create item name that already exists


    const newItem = await ItemModel.create({
        title,
        cost,
        price,
        minPrice,
        quantity,
        category
    })

    try {
        res.status(201).json(newItem)
    } catch (error: any) {
        console.error(`error in createOneItem ${error}`)
        res.status(500).json({ "message": error.message })
    }
}

interface RequestItem extends Request {
    item?: any
}

export const getOneItemMidll = async (req: RequestItem, res: Response, next: NextFunction) => {
    let item
    const id = req.params.id
    try {
        item = await ItemModel.findById(id)
        if (!item) {
            res.status(404).json({ message: `item with ${id} doesn't exist in DB` })
            return
        }
    } catch (error: any) {
        console.error(`error in getOneItemMidll`)
        res.status(500).json({ message: error.message })
    }
    req.item = item
    next()
}

export const retrieveOneItem = async (req: RequestItem, res: Response) => {
    res.json(req.item)
}

export const deleteOneItem = async (req: RequestItem, res: Response) => {
    const id = req.item._id

    try {
        await ItemModel.findByIdAndDelete(id)
        res.json({ message: "item has been deleted seccessfuly" })
    } catch (error: any) {
        console.error(`error in deleteOneItem ${error}`)
        res.status(500).json({ message: error.message })
    }
}

export const patchOneItem = async (req: RequestItem, res: Response) => {
    const item = req.item
    const {
        title,
        cost,
        price,
        minPrice,
        category,
        quantity
    }: Item = req.body

    if (title) {
        item.title = title
    }
    if (cost) {
        item.cost = cost
    }
    if (price) {
        item.price = price
    }
    if (minPrice) {
        item.minPrice = minPrice
    }
    if (category) {
        item.category = category
    }
    if (quantity) {
        item.quantity = quantity
    }

    try {
        await item.save()
        res.json(item)
    } catch (error: any) {
        console.error(`error in patchOneItem ${error}`)
        res.status(500).json({ message: error.message })
    }
}
