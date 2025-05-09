import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function removeBlogByIdHandler(req:Request,res:Response) {
    const id = parseInt(req.params.id);
    const blog = repository.findBlogById(id.toString());
    if(!blog){
        res.status(httpStatus.NotFound)
        return
    }
    repository.removeBlogById(id.toString());
    res.status(httpStatus.NoContent).send("Removed")
}