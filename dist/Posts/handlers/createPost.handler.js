"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostHandler = createPostHandler;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const http_statuses_1 = require("../../core/core-types/http-statuses");
function createPostHandler(req, res) {
    var _a;
    const posts = data_acsess_layer_1.repository.findAllPosts();
    const newPost = {
        id: posts.length ? (posts[posts.length - 1].id + 1) : "1",
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: ((_a = data_acsess_layer_1.repository.findBlogById(req.body.blogId)) === null || _a === void 0 ? void 0 : _a.name) || "blog name"
    };
    data_acsess_layer_1.repository.createNewPost(newPost);
    res.status(http_statuses_1.httpStatus.Created).send(newPost);
}
