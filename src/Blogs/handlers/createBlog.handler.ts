import {BlogInputModel} from "../dto/blog-input-model";
import {Request,Response} from "express";
import {Blog} from "../Blog";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";


export async function createBlogHandler(req:Request<{},{},BlogInputModel>,res:Response){
    try{
        const newBlog:Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        };
        await repository.createNewBlog(newBlog);
        res.status(httpStatus.Created).send(newBlog)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}