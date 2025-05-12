"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBlogByIdHandler = removeBlogByIdHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const ValidationErrors_1 = require("../../core/validation/ValidationErrors");
function removeBlogByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const blog = data_acsess_layer_1.repository.findBlogById(id.toString());
    if (!blog) {
        res.status(http_statuses_1.httpStatus.NotFound).send((0, ValidationErrors_1.createErrorMessage)([{ field: 'id', message: 'Blog not found' }]));
        return;
    }
    data_acsess_layer_1.repository.removeBlogById(id.toString());
    res.sendStatus(http_statuses_1.httpStatus.NoContent);
}
