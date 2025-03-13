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
exports.patchOneItem = exports.deleteOneItem = exports.retrieveOneItem = exports.getOneItemMidll = exports.createOneItem = exports.deleteAllItems = exports.getItems = void 0;
const item_1 = __importDefault(require("../model/item"));
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield item_1.default.find();
        res.json(allItems);
    }
    catch (error) {
        console.error(`error in getItems ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.getItems = getItems;
const deleteAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield item_1.default.deleteMany();
        res.sendStatus(200);
    }
    catch (error) {
        console.error(`error deleteAllItems ${error}`);
        res.json({ message: error.message });
    }
});
exports.deleteAllItems = deleteAllItems;
const createOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, cost, price, minPrice, quantity, category } = req.body;
    if (!title || !cost || !price || !quantity) {
        res.status(400).json({ message: "please provide the required data to create new item" });
        return;
    }
    const conflic = yield item_1.default.findOne({ title: title });
    if (conflic) {
        res.status(409).json({ message: "item title already used, conflic error" });
        return;
    }
    // status 409 > conflic, attmpting to create item name that already exists
    const newItem = yield item_1.default.create({
        title,
        cost,
        price,
        minPrice,
        quantity,
        category
    });
    try {
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(`error in createOneItem ${error}`);
        res.status(500).json({ "message": error.message });
    }
});
exports.createOneItem = createOneItem;
const getOneItemMidll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let item;
    const id = req.params.id;
    try {
        item = yield item_1.default.findById(id);
        if (!item) {
            res.status(404).json({ message: `item with ${id} doesn't exist in DB` });
            return;
        }
    }
    catch (error) {
        console.error(`error in getOneItemMidll`);
        res.status(500).json({ message: error.message });
    }
    req.item = item;
    next();
});
exports.getOneItemMidll = getOneItemMidll;
const retrieveOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.item);
});
exports.retrieveOneItem = retrieveOneItem;
const deleteOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.item._id;
    try {
        yield item_1.default.findByIdAndDelete(id);
        res.json({ message: "item has been deleted seccessfuly" });
    }
    catch (error) {
        console.error(`error in deleteOneItem ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteOneItem = deleteOneItem;
const patchOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = req.item;
    const { title, cost, price, minPrice, category, quantity } = req.body;
    if (title) {
        item.title = title;
    }
    if (cost) {
        item.cost = cost;
    }
    if (price) {
        item.price = price;
    }
    if (minPrice) {
        item.minPrice = minPrice;
    }
    if (category) {
        item.category = category;
    }
    if (quantity) {
        item.quantity = quantity;
    }
    try {
        yield item.save();
        res.json(item);
    }
    catch (error) {
        console.error(`error in patchOneItem ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.patchOneItem = patchOneItem;
