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
const { post, user } = new client_1.PrismaClient();
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const posts = yield post.findMany({
        where: {
            userId: parseInt(userId),
        },
        select: {
            title: true,
            created_at: true,
            post: true,
            user: true,
        },
    });
    return res.send(posts);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, userId } = req.body;
    const userExist = yield user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!userExist) {
        return res.status(400).json({
            message: 'user not found',
        });
    }
    const newPost = yield post.create({
        data: {
            title,
            userId,
            post: content,
        },
    });
    return res.json(newPost);
}));
exports.default = router;
//# sourceMappingURL=posts.js.map