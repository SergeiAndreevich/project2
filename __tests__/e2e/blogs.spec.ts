// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from "express";
import {setupApp} from "../../src/setup-app";
import {Blog} from "../../src/Blogs/Blog";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {describe} from "node:test";
import {PATH} from "../../src/core/path/path";
import {BlogInputModel} from "../../src/Blogs/dto/blog-input-model";

describe('test blogs', ()=>{
    const app = express();
    setupApp(app);

    const testBlog: BlogInputModel = {
        name: "Test Blog",
        description: "Test Blog description",
        websiteUrl: "http://localhost:3000"
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    it('creates a new blog', async () => {
        await request(app).post(PATH.blogs).send(testBlog).expect(httpStatus.Created)
    });
    it('find all blogs', async () => {
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        expect(blogs.body).toBeInstanceOf(Array);
        expect(blogs.body.length).toBe(1);
    });

    it('should find blog by id',  async () => {
        await request(app).post(PATH.blogs).send(testBlog).expect(httpStatus.Created);
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        const blog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        expect(blog.body).toBeInstanceOf(Object);
        expect(blogs.body[0].name === blog.body.name)
    });
    it('should change blog by id',  async () => {
        await request(app).post(PATH.blogs).send(testBlog).expect(httpStatus.Created);
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        const blog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        await request(app).put(`${PATH.blogs}/${blogs.body[0].id}`).send({...testBlog,name:"Changed name"}).expect(httpStatus.NoContent);
        const changedBlog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        expect(blog.body.name !== changedBlog.body.name)
    });
    it('should remove blog by id',  async () => {
        await request(app).post(PATH.blogs).send(testBlog).expect(httpStatus.Created);
        await request(app).post(PATH.blogs).send({...testBlog, name:'Another example'}).expect(httpStatus.Created);
        const blogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        expect(blogs.body).toBeInstanceOf(Array);
        expect(blogs.body.length === 2);
        const blog = await request(app).get(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.Ok);
        const blog2 = await request(app).get(`${PATH.blogs}/${blogs.body[1].id}`).expect(httpStatus.Ok);
        await request(app).delete(`${PATH.blogs}/${blogs.body[0].id}`).expect(httpStatus.NoContent);
        const newBlogs = await request(app).get(PATH.blogs).expect(httpStatus.Ok);
        expect(newBlogs.body.length === 1);
        expect(newBlogs.body[0].id !== blog.body.id);
        expect(newBlogs.body[0].id === blog2.body.id)
    })
})