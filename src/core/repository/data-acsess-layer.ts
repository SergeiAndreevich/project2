import {localDB} from "../../db/mock-db.db";
import {Blog} from "../../Blogs/Blog";
import {BlogInputModel} from "../../Blogs/dto/blog-input-model";
import {Post} from "../../Posts/Post";
import {PostInputModel} from "../../Posts/dto/post-input-model";

export const repository = {
    findAllBlogs: function (){
        return localDB.blogs
    },
    createNewBlog: function (blog:Blog){
        localDB.blogs.push(blog)
        return  blog
    },
    findBlogById: function(id:string){
        const found = localDB.blogs.find(blog => blog.id == id);
        return found
    },
    removeBlogById: function (id:string){
        const index = localDB.blogs.findIndex((v) => v.id === id);
        if (index === -1) {
            throw new Error('Blog does not exist');
        }

        localDB.blogs.splice(index, 1);
        return
    },
    removeAll: function (){
        localDB.posts = [];
        localDB.blogs = []
    },
    updateBlog: function (oldBlog:Blog, newBlog:BlogInputModel){
        oldBlog.name = newBlog.name;
        oldBlog.description = newBlog.description;
        oldBlog.websiteUrl = newBlog.websiteUrl;
        return
    },
    findAllPosts: function (){
        return localDB.posts
    },
    createNewPost: function (post: Post){
        localDB.posts.push(post)
        return post
    },
    findPostById: function(id:string){
        const found = localDB.posts.find(post => post.id == id);
        return found
    },
    updatePost: function (oldPost:Post, newPost:PostInputModel){
        oldPost.title = newPost.title;
        oldPost.shortDescription = newPost.shortDescription;
        oldPost.content = newPost.content;
        oldPost.blogId = newPost.blogId;
        return
    },
    removePostById: function (id:string){
        const index = localDB.posts.findIndex((v) => v.id === id);
        if (index === -1) {
            throw new Error('Blog does not exist');
        }

        localDB.posts.splice(index, 1);
        return
    }
}