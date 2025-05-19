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
exports.repository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
exports.repository = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            return allBlogs;
        });
    },
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedOne = yield mongo_db_1.blogsCollection.insertOne(newBlog);
            return Object.assign(Object.assign({}, newBlog), { _id: insertedOne.insertedId });
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const found = localDB.blogs.find(blog => blog.id == id);
            const found = yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return found;
        });
    },
    removeBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const index = localDB.blogs.findIndex((v) => v.id === id);
            const deletedOne = yield mongo_db_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedOne.deletedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    removeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_db_1.blogsCollection.deleteMany({});
            yield mongo_db_1.postsCollection.deleteMany({});
            return;
        });
    },
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            const response = { posts: allPosts, blogs: allBlogs };
            return response;
        });
    },
    updateBlog(id, newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOne = yield mongo_db_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    name: newBlog.name,
                    description: newBlog.description,
                    websiteUrl: newBlog.websiteUrl
                }
            });
            if (updatedOne.matchedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            return allPosts;
        });
    },
    createNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield mongo_db_1.postsCollection.insertOne(post);
            return Object.assign(Object.assign({}, post), { _id: newPost.insertedId });
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            return found;
        });
    },
    updatePost(id, newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedOne = yield mongo_db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                $set: {
                    title: newPost.title,
                    shortDescription: newPost.shortDescription,
                    content: newPost.content,
                    blogId: newPost.blogId
                }
            });
            if (updatedOne.matchedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    },
    removePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedOne = yield mongo_db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedOne.deletedCount < 1) {
                throw new Error('Blog does not exist');
            }
            return;
        });
    }
};
