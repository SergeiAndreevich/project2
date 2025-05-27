import {localDB} from "../../db/mock-db.db";
import {Blog} from "../../Blogs/Blog";
import {BlogInputModel} from "../../Blogs/dto/blog-input-model";

import {ObjectId, WithId} from "mongodb";
import {blogsCollection, postsCollection} from "../../db/mongo.db";
import {repository} from "../../core/repository/data-acsess-layer";

export const blogsService = {
    async findAllBlogs(): Promise<WithId<Blog>[]>{
        return await repository.findAllBlogs()
    },
    async createNewBlog(dto: BlogInputModel): Promise<string>{
        const newBlog:Blog = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date(),
            isMembership: false
        };
        return await repository.createNewBlog(newBlog)
    },
    async findBlogById (id:string): Promise<WithId<Blog>> {
        //const found = localDB.blogs.find(blog => blog.id == id);
        return repository.findBlogByIdOrFail(id)
    },
    async removeBlogById(id:string): Promise<void>{
        //const index = localDB.blogs.findIndex((v) => v.id === id);
        const deletedOne = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
        if (deletedOne.deletedCount < 1) {
            throw new Error('Blog does not exist');
        }
        return
    },
    async updateBlog(id: string, newBlog:BlogInputModel): Promise<void> {
        const updatedOne = await blogsCollection.updateOne({ _id: new ObjectId(id) },
            {
                $set: {
                    name: newBlog.name,
                    description: newBlog.description,
                    websiteUrl: newBlog.websiteUrl
                }
            });
        if(updatedOne.matchedCount < 1){
            throw new Error('Blog does not exist');
        }
        return
    }
}