"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const http_statuses_1 = require("../core/core-types/http-statuses");
const mock_db_db_1 = require("../db/mock-db.db");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter
    .delete('', (req, res) => {
    //repository.removeAll();
    mock_db_db_1.localDB.posts = [];
    mock_db_db_1.localDB.blogs = [];
    res.status(http_statuses_1.httpStatus.NoContent);
});
