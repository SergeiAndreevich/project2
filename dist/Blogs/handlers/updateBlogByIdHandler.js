"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogByIdHandler = updateBlogByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const ValidationErrors_1 = require("../../core/validation/ValidationErrors");
function updateBlogByIdHandler(req, res) {
    const blog = data_acsess_layer_1.repository.findBlogById(req.params.id);
    if (!blog) {
        res.status(http_statuses_1.httpStatus.NotFound).send((0, ValidationErrors_1.createErrorMessage)([{ field: 'id', message: 'Blog not found' }]));
        return;
    }
    data_acsess_layer_1.repository.updateBlog(blog, req.body);
    res.sendStatus(http_statuses_1.httpStatus.NoContent);
}
