import {Blog} from "../Blogs/Blog";
import {Post} from "../Posts/Post";

export const localDB = {
    blogs: <Blog[]>[{
        id: "1",
        name: "Fist name",
        description: "First description",
        websiteUrl: "First URL"
    },
    {
        id: "2",
        name: "Second name",
        description: "Second description",
        websiteUrl: "Second URL"
    }
    ],
    posts: <Post[]>[{
        id: "1",
        title: "First post title",
        shortDescription: "First short description",
        content: "Some first content",
        blogId:	"1",
        blogName: "First blog name"
    }]
}