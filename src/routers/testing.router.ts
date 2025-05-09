import {Router, Request, Response} from "express";
import {repository} from "../core/repository/data-acsess-layer";
import {httpStatus} from "../core/core-types/http-statuses";
import {localDB} from "../db/mock-db.db";

export const testingRouter = Router({});

testingRouter
    .delete('', (req:Request,res:Response)=>{
        //repository.removeAll();
        localDB.posts = [];
        localDB.blogs = [];
        res.status(httpStatus.NoContent)
    })