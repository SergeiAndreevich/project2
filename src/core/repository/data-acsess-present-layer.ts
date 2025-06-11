import {ObjectId, WithId} from "mongodb";
import {Blog} from "../../Blogs/Blog";
import {blogsCollection, postsCollection} from "../../db/mongo.db";
import {Post} from "../../Posts/Post";

export const queryRepo ={
    async findAll(): Promise<{}> {
        const allBlogs = await blogsCollection.find().toArray();
        const allPosts = await postsCollection.find().toArray();
        const response = {posts: allPosts, blogs: allBlogs};
        return response
    },
    async findAllBlogs(): Promise<WithId<Blog>[]>{
        const allBlogs = await blogsCollection.find().toArray();
        return allBlogs
    },
    async findBlogByIdOrFail (id:string): Promise<WithId<Blog>> {
        //const found = localDB.blogs.find(blog => blog.id == id);
        const found = await blogsCollection.findOne({ _id: new ObjectId(id) });
        if(!found){
            throw new Error('blog not found');
        }
        return found
    },
    async findAllPosts():  Promise<WithId<Post>[]> {
        const allPosts = await postsCollection.find().toArray();
        return allPosts
    },
    async findPostByIdOrFail(id:string): Promise<WithId<Post>> {
        const found = await  postsCollection.findOne({_id: new ObjectId(id)});
        if(!found){
            throw new Error('post not found');
        }
        return found
    }
}