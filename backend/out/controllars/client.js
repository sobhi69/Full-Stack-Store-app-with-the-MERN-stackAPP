"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneClient = exports.getAllClients = void 0;
const client_1 = __importDefault(require("../model/client"));
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allClients = yield client_1.default.find();
        res.json(allClients);
    }
    catch (error) {
        console.error(`error in getAllClients`);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllClients = getAllClients;
const createOneClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientName, phone, address } = req.body;
    if (!clientName || !phone) {
        res.status(400).json({ message: "please provide the client name and phone" });
        return;
    }
    const foundClient = yield client_1.default.findOne({ phone: phone });
    if (foundClient) {
        res.status(409).json({ message: "clinet phone already exists in DB" });
        return;
    }
    const newClient = new client_1.default({
        clientName,
        phone,
        address
    });
    try {
        yield newClient.save();
        res.status(201).json(newClient);
    }
    catch (error) {
        console.error(`error in createOneClient ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.createOneClient = createOneClient;
