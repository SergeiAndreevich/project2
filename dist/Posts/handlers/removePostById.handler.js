"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePostByIdHandler = removePostByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function removePostByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const post = data_acsess_layer_1.repository.findBlogById(id.toString());
    if (!post) {
        res.status(http_statuses_1.httpStatus.NotFound);
        return;
    }
    data_acsess_layer_1.repository.removePostById(id.toString());
    res.status(http_statuses_1.httpStatus.NoContent).send("Removed");
}
