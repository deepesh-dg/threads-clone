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

    async updateThreadPost(id: string, thread: ThreadPost.Thread) {
        try {
            return await this.databases.updateDocument<ThreadPost.ThreadDocument>(
                conf.appwriteDatabaseId,
                conf.appwriteCollectoinId,
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
