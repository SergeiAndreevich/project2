"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogByIdHandler = updateBlogByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function updateBlogByIdHandler(req, res) {
    const blog = data_acsess_layer_1.repository.findBlogById(req.params.id);
    if (!blog) {
        throw new Error('Blog does not exist');
    }
    data_acsess_layer_1.repository.updateBlog(blog, req.body);
    res.status(http_statuses_1.httpStatus.NoContent).send("Updated");
}
