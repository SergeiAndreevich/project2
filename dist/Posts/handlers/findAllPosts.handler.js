"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPostsHandler = findAllPostsHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function findAllPostsHandler(req, res) {
    const posts = data_acsess_layer_1.repository.findAllPosts();
    res.status(http_statuses_1.httpStatus.Ok).send(posts);
}
