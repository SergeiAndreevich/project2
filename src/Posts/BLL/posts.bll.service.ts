import {repository} from "../../core/repository/data-acsess-layer";
import {PostInputModel} from "../dto/post-input-model";
import {Post} from "../Post";

export const postsService = {
    async createNewPost(post: PostInputModel): Promise<string> {
        const newPost:Post = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: "blog name",
            createdAt: new Date()
        };
        // тут на blogName стоит заглушка. Нужно как-то обдумать её обход, чтобы связывать с имененм блога через id
        return await repository.createNewPost(newPost);
    },
    async removePostById(id: string): Promise<void> {
        await repository.removePostById(id);
        return
    },
    async updatePostById(id: string, body:PostInputModel): Promise<void> {
        await repository.updatePost(id, body);
        return
    }
}