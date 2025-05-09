import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function findAllPostsHandler(req:Request,res:Response) {
    const posts = repository.findAllPosts();
    res.status(httpStatus.Ok).send(posts)
}