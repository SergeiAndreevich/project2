// @ts-ignore
import request from 'supertest';
// @ts-ignore
import express from "express";
import {setupApp} from "../../src/setup-app";
import {httpStatus} from "../../src/core/core-types/http-statuses";
import {PATH} from "../../src/core/path/path";
import {PostInputModel} from "../../src/Posts/dto/post-input-model";
import {createAuthorizationToken} from "../../src/authorization/createTokenForTests";
import {runDB} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/db.settings";

describe('test posts', ()=>{
    const app = express();
    setupApp(app);

    const testPost: PostInputModel = {
        title: "Test",
        shortDescription: "Test description",
        content: "Post content",
        blogId: "2"
    };
    const token = createAuthorizationToken();
    // beforeAll(async () => {
    //     await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    // });
    beforeEach(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    });

    it('creates a new post', async () => {
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(posts.body).toBeInstanceOf(Array);
        expect(posts.body.length).toBe(0);
        await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created)
    });
    it('find all posts', async () => {
        const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
        expect(posts.body).toBeInstanceOf(Array);
        expect(posts.body.length).toBe(0);
    });

    // it('should find post by id',  async () => {
    //     //await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created);
    //     const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
    //     const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
    //     expect(post.body).toBeInstanceOf(Object);
    //     expect(posts.body[0].title === post.body.title)
    // });
    // it('should change post by id',  async () => {
    //     await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created);
    //     const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
    //     expect(posts.body.length === 1);
    //     const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
    //     await request(app).put(`${PATH.posts}/${posts.body[0].id}`).set('Authorization', token).send({...testPost,title:"Changed title"}).expect(httpStatus.NoContent);
    //     const changedPost = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
    //     expect(post.body.title !== changedPost.body.title)
    // });
    //
    // it('should create 2 posts and remove one of them',  async () => {
    //   //  await request(app).delete('/testing/all-data').expect(httpStatus.NoContent)
    //     await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created);
    //     await request(app).post(PATH.posts).set('Authorization', token).send({...testPost, title:'Another title'}).expect(httpStatus.Created);
    //     const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
    //     expect(posts.body).toBeInstanceOf(Array);
    //     expect(posts.body.length).toBe(2);  //здесь ошибка - почему то приходит 5 штук вместо 2. То есть БД не очищается
    //     // пишет что превышено время выполнения теста и поэтому ошибка
    //
    //     // проблема описанных выше ошибок заключалась в том, чтоб describe был импортирован из next, а мы используем jest
    //     // а превышение времени работы из-за того, что я отсылал res.status вместо res.sendStatus
    //
    //     const post = await request(app).get(`${PATH.posts}/${posts.body[0].id}`).expect(httpStatus.Ok);
    //     const post2 = await request(app).get(`${PATH.posts}/${posts.body[1].id}`).expect(httpStatus.Ok);
    //     //console.log("ID для удаления:", posts.body[0].id, typeof(posts.body[0].id));
    //     await request(app).delete(`${PATH.posts}/${posts.body[0].id}`).set('Authorization', token).expect(httpStatus.NoContent);
    //     const newPosts = await request(app).get(PATH.posts).expect(httpStatus.Ok); // вот здесь дебаг прерывался. Ошибка была в сенд/сендстатус
    //     expect(newPosts.body.length === 1);
    //     expect(newPosts.body[0].id !== post.body.id);
    //     expect(newPosts.body[0].id === post2.body.id)
    // });
    // it('should remove post by id',  async () => {
    //     await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created);
    //     const posts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
    //     await request(app).delete(`${PATH.posts}/${posts.body[0].id}`).set('Authorization', token).expect(httpStatus.NoContent);
    //     const newPosts = await request(app).get(PATH.posts).expect(httpStatus.Ok);
    //     expect(newPosts.body.length === 0)
    // })
    // it('✅ should delete post and check after "NOT FOUND"', async () => {
    //     const post = await request(app).post(PATH.posts).set('Authorization', token).send(testPost).expect(httpStatus.Created);
    //     await request(app)
    //         .delete(`${PATH.posts}/${post.body.id}`)
    //         .set('Authorization', token)
    //         .expect(httpStatus.NoContent);
    //
    //     await request(app)
    //         .get(`${PATH.posts}/${post.body.id}`)
    //         .set('Authorization', token)
    //         .expect(httpStatus.NotFound);
    // });
})