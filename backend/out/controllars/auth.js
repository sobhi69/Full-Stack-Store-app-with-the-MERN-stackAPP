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
exports.logout = exports.refreshToken = exports.signIn = exports.register = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phone, password, role } = req.body;
    if (!username ||
        !email ||
        !password ||
        !role) {
        res.status(400).json({ message: "please fill out the entire form" });
        return;
    }
    const conflictEmail = yield user_1.default.findOne({ email: email });
    const conflictUsername = yield user_1.default.findOne({ email: email });
    if (conflictEmail) {
        res.status(409).json({ message: "Please enter diffrent email, this email already exists!" });
        return;
    }
    if (conflictUsername) {
        res.status(409).json({ message: "Please enter diffrent username!" });
        return;
    }
    const hashedPwd = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield user_1.default.create({
        username,
        email,
        phone,
        password: hashedPwd,
        role
    });
    try {
        const userToSend = yield user_1.default.findById(newUser._id).select('-password');
        res.status(201).json(userToSend);
    }
    catch (error) {
        console.error(`error in register ${error}`);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "unkown error in register" });
    }
});
exports.register = register;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "please fill out the entire form" });
        return;
    }
    const foundUser = yield user_1.default.findOne({ email: email });
    if (!foundUser) {
        res.status(400).json({ message: "Wrong eamil!" });
        return;
    }
    const pwdMatch = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!pwdMatch) {
        res.status(400).json({ message: "Wrong password!" });
        return;
    }
    // jwts
    const refreshToken = jsonwebtoken_1.default.sign({ userId: foundUser._id }, process.env.REFRESH_TOKEN_SECRET || "", {
        expiresIn: "7d"
        // you can store the JWT_REFRESH_TIME in .env
    });
    const accessToken = jsonwebtoken_1.default.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: "60s"
    });
    res.cookie('jwt', refreshToken, {
        secure: process.env.NODE_ENV != 'development',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });
    try {
        const userToSend = yield user_1.default.findByIdAndUpdate(foundUser._id, { accessToken: accessToken }, { new: true }).select('-password');
        res.json(userToSend);
    }
    catch (error) {
        console.error(`error signIn ${error}`);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "unkown error occured in sign-in" });
    }
});
exports.signIn = signIn;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        res.status(401).json({ message: "please sign-in to get a refresh token" });
        return;
    }
    const refreshToken = cookies.jwt;
    try {
        const encoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '');
        const accessToken = jsonwebtoken_1.default.sign({ userId: encoded.userId }, process.env.ACCESS_TOKEN_SECRET || '', {
            expiresIn: "100s"
        });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', '', {
        "httpOnly": true,
        "sameSite": "strict"
    });
    res.json({ message: "logged out seccessfully!" });
});
exports.logout = logout;
