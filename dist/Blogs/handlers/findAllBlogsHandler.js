"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllBlogsHandler = findAllBlogsHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
const map_blog_to_view_model_1 = require("../mappers/map-blog-to-view-model");
function findAllBlogsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogs = yield data_acsess_layer_1.repository.findAllBlogs();
            const blogsToView = blogs.map((blog) => { (0, map_blog_to_view_model_1.mapBlogToViewModel)(blog); });
            res.status(http_statuses_1.httpStatus.Ok).send(blogsToView);
        }
        catch (e) {
            res.sendStatus((http_statuses_1.httpStatus.InternalServerError));
        }
    });
}
