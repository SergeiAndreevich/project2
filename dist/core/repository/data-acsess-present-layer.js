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
exports.queryRepo = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
exports.queryRepo = {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            const response = { posts: allPosts, blogs: allBlogs };
            return response;
        });
    },
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlogs = yield mongo_db_1.blogsCollection.find().toArray();
            return allBlogs;
        });
    },
    findBlogsByCriteria(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection, searchBlogNameTerm } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = {};
            if (searchBlogNameTerm) {
                filter.name = { $regex: searchBlogNameTerm, $options: 'i' };
            }
            const items = yield mongo_db_1.blogsCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.blogsCollection.countDocuments(filter);
            return { items, totalCount };
        });
    },
    findPostsForSpecificBlog(blogId, queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
            const skip = (pageNumber - 1) * pageSize;
            const filter = { blogId: blogId }; // Добавляем фильтр по blogId
            const items = yield mongo_db_1.postsCollection
                .find(filter) // Используем фильтр для выбора постов по blogId
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments(filter); // Считаем только посты с нужным blogId
            return { items, totalCount };
        });
    },
    findBlogByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const found = localDB.blogs.find(blog => blog.id == id);
            const found = yield mongo_db_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!found) {
                throw new Error('blog not found');
            }
            return found;
        });
    },
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield mongo_db_1.postsCollection.find().toArray();
            return allPosts;
        });
    },
    findPostByIdOrFail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = yield mongo_db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!found) {
                throw new Error('post not found');
            }
            return found;
        });
    }
};
