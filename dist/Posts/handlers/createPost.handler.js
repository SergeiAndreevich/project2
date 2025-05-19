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
exports.createPostHandler = createPostHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const map_post_to_view_model_1 = require("../mappers/map-post-to-view-model");
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPost = {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: "blog name",
                createdAt: new Date()
            };
            // тут на blogName стоит заглушка. Нужно как-то обдумать её обход, чтобы связывать с имененм блога через id
            const createdPost = yield data_acsess_layer_1.repository.createNewPost(newPost);
            const newPostToView = (0, map_post_to_view_model_1.mapPostToViewModel)(createdPost);
            res.status(http_statuses_1.httpStatus.Created).send(newPostToView);
        }
        catch (e) {
            res.sendStatus(http_statuses_1.httpStatus.InternalServerError);
        }
    });
}
