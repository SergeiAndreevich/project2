import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";


export async function createPostHandler(req:Request<{},{},PostInputModel>,res:Response){
    try {
        const newPost:Post = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: "blog name",
            createdAt: new Date()
        };
        // тут на blogName стоит заглушка. Нужно как-то обдумать её обход, чтобы связывать с имененм блога через id
        const createdPost = await repository.createNewPost(newPost);
        const newPostToView = mapPostToViewModel(createdPost);
        res.status(httpStatus.Created).send(newPostToView);
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}