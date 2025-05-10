// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from "express";
import {setupApp} from "../../src/setup-app";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {describe} from "node:test";
import {PATH} from "../../src/core/path/path";
import {PostInputModel} from "../../src/Posts/dto/post-input-model";

describe('test posts', ()=>{
    const app = express();
    setupApp(app);

    const testPost: PostInputModel = {
        title: "Test Blog",
        shortDescription: "Test Post description",
        content: "Post content",
        blogId: "1"
    };

    beforeAll(async () => {
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });
    it('creates a new post', async () => {
        await request(app).post(PATH.posts).send(testPost).expect(httpStatus.Created)
    });
    it('find all posts', async () => {
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(posts.body).toBeInstanceOf(Array);
        expect(posts.body.length).toBe(1);
    });

    it('should find post by id',  async () => {
        await request(app).post(PATH.blogs).send(testPost).expect(httpStatus.Created);
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
        expect(post.body).toBeInstanceOf(Object);
        expect(posts.body[0].title === post.body.title)
    });
    it('should change post by id',  async () => {
        await request(app).post(PATH.posts).send(testPost).expect(httpStatus.Created);
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(posts.body.length === 1);
        const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
        await request(app).put(`${PATH.posts}/${posts.body[0].id}`).send({...testPost,title:"Changed title"}).expect(httpStatus.NoContent);
        const changedPost = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
        expect(post.body.title !== changedPost.body.title)
    });
    it('should remove post by id',  async () => {
        await request(app).post(PATH.posts).send(testPost).expect(httpStatus.Created);
        await request(app).post(PATH.posts).send({...testPost, title:'Another title'}).expect(httpStatus.Created);
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(posts.body).toBeInstanceOf(Array);
        expect(posts.body.length === 2);
        const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
        const post2 = await request(app).get(`${PATH.posts}/${posts.body[1].id}`).expect(httpStatus.Ok);
        await request(app).delete(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.NoContent);
        const newPosts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(newPosts.body.length === 1);
        expect(newPosts.body[0].id !== post.body.id);
        expect(newPosts.body[0].id === post2.body.id)
    })
})