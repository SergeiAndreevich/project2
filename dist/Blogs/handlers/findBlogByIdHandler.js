"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBlogByIdHandler = findBlogByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function findBlogByIdHandler(req, res) {
    const video = data_acsess_layer_1.repository.findBlogById(req.params.id);
    if (!video) {
        res.status(http_statuses_1.httpStatus.NotFound);
        return;
    }
    res.status(http_statuses_1.httpStatus.Ok).send(video);
}
