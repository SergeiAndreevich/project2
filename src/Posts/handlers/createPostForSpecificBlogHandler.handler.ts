import {Request, Response} from "express";
import {PostInputModel} from "../dto/post-input-model";
import {postsService} from "../BLL/posts.bll.service";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {mapPostToViewModel} from "../mappers/map-post-to-view-model";
import {httpStatus} from "../../core/core-types/http-statuses";

export async function createPostForSpecificBlogHandler(req:Request<{blogId:string},{},PostInputModel>,res:Response){
    try {
        const data = req.body;
        const createdPostId = await postsService.createNewPost({...data, blogId: req.params.blogId});
        const createdPost = await queryRepo.findPostByIdOrFail(createdPostId);
        const newPostToView = mapPostToViewModel(createdPost);
        res.status(httpStatus.Created).send(newPostToView)
    }
    catch (e){
        res.sendStatus(httpStatus.InternalServerError)
    }
}