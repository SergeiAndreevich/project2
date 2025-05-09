import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";

export function findBlogByIdHandler(req:Request,res:Response) {
    const video = repository.findBlogById(req.params.id);
    if(!video){
        res.status(httpStatus.NotFound)
        return
    }
    res.status(httpStatus.Ok).send(video)
}