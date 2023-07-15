import conf from "@/conf/conf";
import { Client, ID, Databases, Storage } from "appwrite";
import axios from "axios";

export class Service {
    client = new Client();
    axios = axios.create({
        baseURL: "/api",
    });
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getThreadPostList(queries?: string[]) {
        try {
            return await this.databases.listDocuments<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getThreadPostList() :: " + error);
            return null;
        }
    }

    async getThreadPost(id: string) {
        try {
            return await this.databases.getDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                id
            );
        } catch (error) {
            console.log("Appwrite service :: getThreadPost() :: " + error);
            return null;
        }
    }

    async getUserInfo(username: string) {
        try {
            const response = await this.axios.get<Account.User | null>("/user", {
                params: {
                    username,
                },
            });

            return response.data;
        } catch (error) {
            console.log("Appwrite service :: getUserInfo() :: " + error);
        }

        return null;
    }

    async createThreadPost(post: ThreadPost.Thread) {
        try {
            return await this.databases.createDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                ID.unique(),
                post
            );
        } catch (error) {
            console.log("Appwrite service :: createThreadPost() :: " + error);
            return null;
        }
    }

    async updateThreadPost(postId: string, post: Partial<ThreadPost.Thread>) {
        try {
            return await this.databases.updateDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
                postId,
                post
            );
        } catch (error) {
            console.log("Appwrite service :: updateThreadPost() :: " + error);
            return null;
        }
    }

    async deleteThreadPost(id: string) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectoinId, id);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteThreadPost() :: " + error);
            return false;
        }
    }

    async toggleLike(postId: string, userId: string) {
        try {
            const post = await this.getThreadPost(postId);
            if (!post) throw new Error("Invalid Post Id");

            if (post.likes.includes(userId)) {
                const index = post.likes.indexOf(userId);
                post.likes.splice(index, 1);
            } else {
                post.likes.push(userId);
            }

            const newPost: ThreadPost.Thread = {
                name: post.name,
                authorId: post.authorId,
                message: post.message,
                attachment: post.attachment,
                likes: post.likes,
                views: post.views,
                comments: post.comments,
            };
            return await service.updateThreadPost(postId, newPost);
        } catch (error) {
            console.log("Appwrite service :: toggleLike() :: " + error);
            return null;
        }
    }

    async view(postId: string, userId: string) {
        try {
            const post = await this.getThreadPost(postId);
            if (!post) throw new Error("Invalid Post Id");

            if (!post.views.includes(userId)) {
                post.views.push(userId);
            }

            const newPost: ThreadPost.Thread = {
                name: post.name,
                authorId: post.authorId,
                message: post.message,
                attachment: post.attachment,
                likes: post.likes,
                views: post.views,
                comments: post.comments,
            };
            return await service.updateThreadPost(postId, newPost);
        } catch (error) {
            console.log("Appwrite service :: views() :: " + error);
            return null;
        }
    }

    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: " + error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: " + error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    }
}

const service = new Service();

export default service;
