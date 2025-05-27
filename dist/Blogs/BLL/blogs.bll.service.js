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
exports.blogsService = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
exports.blogsService = {
    findAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data_acsess_layer_1.repository.findAllBlogs();
        });
    },
    createNewBlog(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: dto.name,
                description: dto.description,
                websiteUrl: dto.websiteUrl,
                createdAt: new Date(),
                isMembership: false
            };
            return yield data_acsess_layer_1.repository.createNewBlog(newBlog);
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const found = localDB.blogs.find(blog => blog.id == id);
            return data_acsess_layer_1.repository.findBlogByIdOrFail(id);
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
    }
};
