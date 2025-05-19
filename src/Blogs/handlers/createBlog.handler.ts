import {BlogInputModel} from "../dto/blog-input-model";
import {Request,Response} from "express";
import {Blog} from "../Blog";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapPostToViewModel} from "../../Posts/mappers/map-post-to-view-model";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";


export async function createBlogHandler(req:Request<{},{},BlogInputModel>,res:Response){
    try{
        const newBlog:Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date(),
            isMembership: false
        };
        const createdBlog = await repository.createNewBlog(newBlog);
        const blogToView = mapBlogToViewModel(createdBlog)
        res.status(httpStatus.Created).send(blogToView)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}