"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostByIdHandler = findPostByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function findPostByIdHandler(req, res) {
    const post = data_acsess_layer_1.repository.findPostById(req.params.id);
    if (!post) {
        throw new Error("Post not found");
    }
    res.status(http_statuses_1.httpStatus.Ok).send(post);
}
