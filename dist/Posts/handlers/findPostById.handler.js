"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPostByIdHandler = findPostByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const ValidationErrors_1 = require("../../core/validation/ValidationErrors");
function findPostByIdHandler(req, res) {
    const post = data_acsess_layer_1.repository.findPostById(req.params.id);
    if (!post) {
        res.status(http_statuses_1.httpStatus.NotFound).send((0, ValidationErrors_1.createErrorMessage)([{ field: 'id', message: 'Post not found' }]));
        return;
    }
    res.status(http_statuses_1.httpStatus.Ok).send(post);
}
