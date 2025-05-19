import {Router, Request, Response} from "express";
import {httpStatus} from "../core/core-types/http-statuses";
import {repository} from "../core/repository/data-acsess-layer";

export const testingRouter = Router({});

testingRouter
    .delete('/all-data',async (req:Request,res:Response)=>{
        await repository.removeAll();
        //localDB.posts = [];
        //localDB.blogs = [];
        res.sendStatus(httpStatus.NoContent);
        return
    })
    .get('/all-data', async (req:Request,res:Response)=>{
        const allData = await repository.findAll();
        res.status(httpStatus.Ok).send(allData)
    })