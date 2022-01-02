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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const { user } = new client_1.PrismaClient();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user.findMany({
        select: {
            username: true,
            posts: true,
        },
    });
    return res.json(users);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    // check if user exist
    const userExist = yield user.findUnique({
        where: {
            username,
        },
        select: {
            username: true,
        },
    });
    if (userExist) {
        return res.status(400).json({
            msg: 'user already exists',
        });
    }
    const newUser = yield user.create({
        data: {
            username,
        },
    });
    return res.json(newUser);
}));
exports.default = router;
//# sourceMappingURL=users.js.map