"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogHandler = createBlogHandler;
const data_acsess_layer_1 = require("../core/repository/data-acsess-layer");
function createBlogHandler(req, res) {
    const blogs = data_acsess_layer_1.repository.findAllBlogs();
    const newBlog = {
        id: blogs.length ? (blogs[blogs.length - 1].id + 1).toString() : "1",
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    data_acsess_layer_1.repository.createNewBlog(newBlog);
}
