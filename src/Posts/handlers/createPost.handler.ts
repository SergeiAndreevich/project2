import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";


export async function createPostHandler(req:Request<{},{},PostInputModel>,res:Response){
    try {
        const newPost:Post = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: "blog name"
        };
        // тут на blogName стоит заглушка. Нужно как-то обдумать её обход, чтобы связывать с имененм блога через id
        await repository.createNewPost(newPost);
        res.status(httpStatus.Created).send(newPost);
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}