import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function findAllBlogsHandler(req:Request,res:Response) {
    const blogs = repository.findAllBlogs();
    res.status(httpStatus.Ok).send(blogs)
}