"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostByIdHandler = updatePostByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function updatePostByIdHandler(req, res) {
    const post = data_acsess_layer_1.repository.findPostById(req.params.id);
    if (!post) {
        throw new Error('Blog does not exist');
    }
    data_acsess_layer_1.repository.updatePost(post, req.body);
    res.status(http_statuses_1.httpStatus.NoContent).send("Updated");
}
