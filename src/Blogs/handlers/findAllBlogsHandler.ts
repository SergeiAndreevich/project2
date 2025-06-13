import { Request, Response } from 'express';
import {repository} from "../../core/repository/data-acsess-layer";
import {httpStatus} from "../../core/core-types/http-statuses";
import {mapBlogToViewModel} from "../mappers/map-blog-to-view-model";

export async function findAllBlogsHandler(req:Request,res:Response) {
    try{
        //const blogs = await queryRepo.findAllBlogs();
        const queryInput = setDefaultSortAndPaginationIfNotExist(req.query);

        const { items, totalCount } = await queryRepo.findBlogsByCriteria(queryInput);
        const blogsToView = mapToBlogsListPaginatedOutput(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount
        });

        //const blogsToView = blogs.map(blog=>mapBlogToViewModel(blog))
        res.send(blogsToView).status(httpStatus.Ok)  // mb change the order
    }
    catch(e){
        res.sendStatus((httpStatus.InternalServerError))
    }
}