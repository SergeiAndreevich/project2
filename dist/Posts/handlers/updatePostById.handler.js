"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostByIdHandler = updatePostByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const ValidationErrors_1 = require("../../core/validation/ValidationErrors");
function updatePostByIdHandler(req, res) {
    const post = data_acsess_layer_1.repository.findPostById(req.params.id);
    if (!post) {
        res.status(http_statuses_1.httpStatus.NotFound).send((0, ValidationErrors_1.createErrorMessage)([{ field: 'id', message: 'Post not found' }]));
        return;
    }
    data_acsess_layer_1.repository.updatePost(post, req.body);
    res.sendStatus(http_statuses_1.httpStatus.NoContent);
}
