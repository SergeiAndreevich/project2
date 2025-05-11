"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = void 0;
const mock_db_db_1 = require("../../db/mock-db.db");
exports.repository = {
    findAllBlogs: function () {
        return mock_db_db_1.localDB.blogs;
    },
    createNewBlog: function (blog) {
        mock_db_db_1.localDB.blogs.push(blog);
        return blog;
    },
    findBlogById: function (id) {
        const found = mock_db_db_1.localDB.blogs.find(blog => blog.id == id);
        return found;
    },
    removeBlogById: function (id) {
        const index = mock_db_db_1.localDB.blogs.findIndex((v) => v.id === id);
        if (index === -1) {
            throw new Error('Blog does not exist');
        }
        mock_db_db_1.localDB.blogs.splice(index, 1);
        return;
    },
    removeAll: function () {
        mock_db_db_1.localDB.posts = [];
        mock_db_db_1.localDB.blogs = [];
    },
    findAll: function () {
        const response = { posts: mock_db_db_1.localDB.posts, blogs: mock_db_db_1.localDB.blogs };
        return response;
    },
    updateBlog: function (oldBlog, newBlog) {
        oldBlog.name = newBlog.name;
        oldBlog.description = newBlog.description;
        oldBlog.websiteUrl = newBlog.websiteUrl;
        return;
    },
    findAllPosts: function () {
        return mock_db_db_1.localDB.posts;
    },
    createNewPost: function (post) {
        mock_db_db_1.localDB.posts.push(post);
        return post;
    },
    findPostById: function (id) {
        const found = mock_db_db_1.localDB.posts.find(post => post.id == id);
        return found;
    },
    updatePost: function (oldPost, newPost) {
        oldPost.title = newPost.title;
        oldPost.shortDescription = newPost.shortDescription;
        oldPost.content = newPost.content;
        oldPost.blogId = newPost.blogId;
        return;
    },
    removePostById: function (id) {
        const index = mock_db_db_1.localDB.posts.findIndex((v) => v.id === id);
        if (index === -1) {
            throw new Error('Blog does not exist');
        }
        mock_db_db_1.localDB.posts.splice(index, 1);
        return;
    }
};
