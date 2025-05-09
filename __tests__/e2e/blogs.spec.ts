// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from "express";
import {setupApp} from "../../src/setup-app";
import {Blog} from "../../src/Blogs/Blog";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {describe} from "node:test";
import {PATH} from "../../src/core/path/path";

describe('test blogs', ()=>{
    const app = express();
    setupApp(app);

    const testBlog: Blog = {
        id: '100000',
        name: "Test Blog",
        description: "Test Blog description",
        websiteUrl: "http://localhost:3000"
    };

    beforeAll(async () => {
        await request(app).delete('/testing').expect(httpStatus.NoContent)
    });
    it('creates a new blog', async () => {
        await request(app).post(PATH.blogs).send(testBlog).expect(httpStatus.Created)
    })
})