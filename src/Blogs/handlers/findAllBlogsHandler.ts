import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function findAllBlogsHandler(req:Request,res:Response) {
    try{
        const blogs = await repository.findAllBlogs();
        res.status(httpStatus.Ok).send(blogs)
    }
    catch(e){
        res.sendStatus((httpStatus.InternalServerError))
    }
}