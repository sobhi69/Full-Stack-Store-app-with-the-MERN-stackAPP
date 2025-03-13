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
exports.patchOneUser = exports.deleteOneUser = exports.retrieveOneUser = exports.getOneUserMidll = exports.getAllusers = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_1.default.find();
        res.json(allUsers);
    }
    catch (error) {
        console.error(`error in getAllUsers ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllusers = getAllusers;
const getOneUserMidll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const id = req.params.id;
    try {
        user = yield user_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: `user with ${id} doesn't exist in DB` });
            return;
        }
    }
    catch (error) {
        console.error(`error in getOneUserMidll ${error}`);
        res.status(500).json({ message: error.message });
    }
    req.user = user;
    next();
});
exports.getOneUserMidll = getOneUserMidll;
const retrieveOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
});
exports.retrieveOneUser = retrieveOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    try {
        yield user_1.default.findByIdAndDelete(id);
        res.json({ message: "user has been deleted seccessfuly" });
    }
    catch (error) {
        console.error(`error in deleteOneUser ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteOneUser = deleteOneUser;
const patchOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { username, oldPassword, email, phone, newPassword, confirmPassword } = req.body;
    // if (phone && phone.length == 11) {
    //     user.phone = phone
    // }
    // if (email) {
    //     user.email = email
    // }
    // if (username) {
    //     user.username = username
    // }
    let newHashedPassword;
    if (oldPassword) {
        const match = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!match) {
            res.status(400).json({ message: "wrong password!" });
            return;
        }
        if (!newPassword) {
            res.status(400).json({ message: "please provide the new password!" });
            return;
        }
        if (newPassword != confirmPassword) {
            res.status(400).json({ message: "new password and confrim password don't match" });
            return;
        }
        newHashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    }
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(user._id, {
            phone: !phone ? user.phone : phone,
            username: !username ? user.username : username,
            email: !email ? user.email : email,
            password: !newHashedPassword ? user.password : newHashedPassword,
        }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(`error in patchOneUser ${error}`);
        res.status(500).json({ message: error.message });
    }
});
exports.patchOneUser = patchOneUser;
