import { Request, Response } from 'express';
import {httpStatus} from "../../core/core-types/http-statuses";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";
import {setDefaultSortAndPaginationIfNotExist} from "../../core/helpers/BlogsSortAndPagination.helper";
import {mapToBlogsListPaginatedOutput} from "../mappers/map-blogs-list-pagination";
import {errorsHandler} from "../../core/helpers/errorsHandler.helper";

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
        errorsHandler(e,res)
    }
}