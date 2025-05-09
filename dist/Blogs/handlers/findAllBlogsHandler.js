"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBlogsHandler = findAllBlogsHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function findAllBlogsHandler(req, res) {
    const blogs = data_acsess_layer_1.repository.findAllBlogs();
    res.status(http_statuses_1.httpStatus.Ok).send(blogs);
}
