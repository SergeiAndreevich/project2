import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";
import {blogsService} from "../BLL/blogs.bll.service";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";

export async function findAllBlogsHandler(req:Request,res:Response) {
    try{
        const blogs = await queryRepo.findAllBlogs();
        const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
        console.log(blogs);
        console.log('--------------------------------------');
        console.log(blogsToView);
        res.send(blogsToView).status(httpStatus.Ok)  // mb change the order
    }
    catch(e){
        res.sendStatus((httpStatus.InternalServerError))
    }
}