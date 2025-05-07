"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.get('/', (req, res) => {
        res.status(200).send(`go to`);
    });
    // app.use(PATH.videos, videosRouter);
    // app.use(PATH.testing, testingRouter);
    //setupSwagger(app);
    return app;
};
exports.setupApp = setupApp;
