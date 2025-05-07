import express, { Express, Request,Response } from "express";


export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(`go to`);
    });

    // app.use(PATH.videos, videosRouter);
    // app.use(PATH.testing, testingRouter);

    //setupSwagger(app);
    return app;
};
