"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBlogByIdHandler = removeBlogByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function removeBlogByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const blog = data_acsess_layer_1.repository.findBlogById(id.toString());
    if (!blog) {
        res.status(http_statuses_1.httpStatus.NotFound);
        return;
    }
    data_acsess_layer_1.repository.removeBlogById(id.toString());
    res.status(http_statuses_1.httpStatus.NoContent).send("Removed");
}
