import { Request, Response } from "express";
import Client from '../interfaces/Client'
import ClientModel from '../model/client'

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const allClients = await ClientModel.find()
        res.json(allClients)
    } catch (error: any) {
        console.error(`error in getAllClients`)
        res.status(500).json({ message: error.message })
    }
}

export const createOneClient = async (req: Request, res: Response) => {
    const { clientName, phone, address }: Client = req.body

    if (!clientName || !phone) {
        res.status(400).json({ message: "please provide the client name and phone" })
        return
    }

    const foundClient = await ClientModel.findOne({ phone: phone })

    if (foundClient) {
        res.status(409).json({ message: "clinet phone already exists in DB" })
        return
    }

    const newClient = new ClientModel({
        clientName,
        phone,
        address
    })

    try {
        await newClient.save()
        res.status(201).json(newClient)
    } catch (error: any) {
        console.error(`error in createOneClient ${error}`)
        res.status(500).json({ message: error.message })
    }
}