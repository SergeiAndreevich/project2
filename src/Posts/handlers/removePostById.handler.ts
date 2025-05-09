import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function removePostByIdHandler(req:Request,res:Response) {
    const id = parseInt(req.params.id);
    const post = repository.findBlogById(id.toString());
    if(!post){
        res.status(httpStatus.NotFound)
        return
    }
    repository.removePostById(id.toString());
    res.status(httpStatus.NoContent).send("Removed")
}