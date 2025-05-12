import {Router, Request, Response} from "express";
import {httpStatus} from "../core/core-types/http-statuses";
import {repository} from "../core/repository/data-acsess-layer";

export const testingRouter = Router({});

testingRouter
    .delete('/all-data', (req:Request,res:Response)=>{
        repository.removeAll();
        //localDB.posts = [];
        //localDB.blogs = [];
        res.sendStatus(httpStatus.NoContent)
        return;
    })
    .get('/all-data', (req:Request,res:Response)=>{
            res.send(repository.findAll()).status(httpStatus.Ok)
    })