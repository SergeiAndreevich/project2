import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";

export async function findAllBlogsHandler(req:Request,res:Response) {
    try{
        const blogs = await repository.findAllBlogs();
        const blogsToView = blogs.map(mapBlogToViewModel)
        res.send(blogsToView).status(httpStatus.Ok)
    }
    catch(e){
        res.sendStatus((httpStatus.InternalServerError))
    }
}