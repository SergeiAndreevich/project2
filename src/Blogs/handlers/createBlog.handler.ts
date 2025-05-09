import {BlogInputModel} from "../dto/blog-input-model";
import {Request,Response} from "express";
import {Blog} from "../Blog";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";


export function createBlogHandler(req:Request<{},{},BlogInputModel>,res:Response){
    const blogs = repository.findAllBlogs();
    const newBlog:Blog = {
        id: blogs.length ? (blogs[blogs.length - 1].id + 1).toString() : "1",
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    repository.createNewBlog(newBlog);
    res.status(httpStatus.Created).send()
}