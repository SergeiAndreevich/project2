import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";

export async function findAllPostsHandler(req:Request,res:Response) {
    try {
        const posts = await repository.findAllPosts();
        const postsToView = posts.map(post => mapPostToViewModel(post));
        res.status(httpStatus.Ok).send(postsToView)
    }
    catch (error) {
        res.sendStatus(httpStatus.InternalServerError)
    }

}