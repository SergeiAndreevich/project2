import {Request,Response} from "express";
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";


export function createPostHandler(req:Request<{},{},PostInputModel>,res:Response){
    const posts = repository.findAllPosts();
    const newPost:Post = {
        id: posts.length ? (posts[posts.length - 1].id + 1) : "1",
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: repository.findBlogById(req.body.blogId)?.name || "blog name"
    };
    repository.createNewPost(newPost);
    res.status(httpStatus.Created).send(newPost);
}