import {Router} from "express";
import {createPostHandler} from "../Posts/handlers/createPost.handler";
import {findAllPostsHandler} from "../Posts/handlers/findAllPosts.handler";
import {findPostByIdHandler} from "../Posts/handlers/findPostById.handler";
import {updatePostByIdHandler} from "../Posts/handlers/updatePostById.handler";
import {removePostByIdHandler} from "../Posts/handlers/removePostById.handler";
export const postsRouter = Router({});

postsRouter
    .get('', findAllPostsHandler)
    .post('', createPostHandler)
    .get('/:id', findPostByIdHandler)
    .put('/:id', updatePostByIdHandler)
    .delete('/:id',removePostByIdHandler)
