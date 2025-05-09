"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
const http_statuses_1 = require("../core/core-types/http-statuses");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter
    .delete('/all-data', (req, res) => {
    data_acsess_layer_1.repository.removeAll();
    res.status(http_statuses_1.httpStatus.NoContent);
});
