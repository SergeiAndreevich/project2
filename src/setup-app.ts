import express, { Express, Request,Response } from "express";
import {blogsRouter} from "./routers/blogs.router";
import {PATH} from "./core/path/path";
import {postsRouter} from "./routers/posts.router";
import {testingRouter} from "./routers/testing.router";


export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(`go to ${PATH.docs}`);
    });


    app.use(PATH.blogs,blogsRouter);
    app.use(PATH.posts,postsRouter);
    app.use(PATH.testing,testingRouter);
    //setupSwagger(app);
    return app;
};

//this version is only for memory. I want to see the process of changing. Here there is no MongoDB.