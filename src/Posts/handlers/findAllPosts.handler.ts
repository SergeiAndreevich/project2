import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

export async function findAllPostsHandler(req:Request,res:Response) {
    try {
        const posts = await queryRepo.findAllPosts();
        const postsToView = posts.map(post => mapPostToViewModel(post));
        res.status(httpStatus.Ok).send(postsToView)
    }
    catch (error) {
        errorsHandler(error,res)
    }

}