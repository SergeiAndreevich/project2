"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../core/core-types/http-statuses");
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter
    .delete('/all-data', (req, res) => {
    data_acsess_layer_1.repository.removeAll();
    //localDB.posts = [];
    //localDB.blogs = [];
    res.status(http_statuses_1.httpStatus.NoContent).send('No content');
})
    .get('/all-data', (req, res) => {
    res.send(data_acsess_layer_1.repository.findAll()).status(http_statuses_1.httpStatus.Ok);
});
