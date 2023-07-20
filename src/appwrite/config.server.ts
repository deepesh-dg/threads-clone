import conf from "@/conf/conf";
import { Client, Databases, Users } from "node-appwrite";

export class Service {
    client = new Client();
    users;
    databases;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId).setKey(conf.appwriteKey);
        this.users = new Users(this.client);
        this.databases = new Databases(this.client);
    }

    async getUser(id: string) {
        try {
            return await this.users.get(id);
        } catch (error) {
            console.log("Appwrite service :: getUser() :: " + error);
        }

        return null;
    }

    async getThreadPost(id: string): Promise<ThreadPost.ThreadWithCommentDocument | null> {
        try {
            const post = await this.databases.getDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinPostId,
                id
            );

            const promises: Promise<ThreadPost.CommentDocument>[] = [];

            post.comments.forEach((commentId) =>
                promises.push(
                    this.databases.getDocument<ThreadPost.CommentDocument>(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectoinCommentId,
                        commentId
                    )
                )
            );

            const comments = await Promise.all(promises);

            const newPost: ThreadPost.ThreadWithCommentDocument = {
                ...post,
                comments: comments,
            };

            return newPost;
        } catch (error) {
            console.log("Appwrite service :: getThreadPost() :: " + error);
            return null;
        }
    }

    async updateThreadPost(id: string, thread: ThreadPost.ThreadWithoutComment) {
        try {
            return await this.databases.updateDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinPostId,
                id,
                thread
            );
        } catch (error) {
            console.log("Appwrite service :: updateThreadPost() :: " + error);
            return null;
        }
    }
}

export default Service;
