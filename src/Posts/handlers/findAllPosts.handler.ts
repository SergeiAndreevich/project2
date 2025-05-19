import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function findAllPostsHandler(req:Request,res:Response) {
    try {
        const posts = await repository.findAllPosts();
        res.status(httpStatus.Ok).send(posts)
    }
    catch (error) {
        res.sendStatus(httpStatus.InternalServerError)
    }

}