import conf from "@/conf/conf";
import { Client, Account } from "appwrite";
import service from "./config";

type CreateUserAccount = {
    name: string;
    username: string;
    email: string;
    password: string;
};

type Username = { username: string };

type Email = { email: string };

type LoginUserAccount = (Email | Username) & { password: string };

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // create a new record of user inside appwrite
    async createAccount({ email, password, name, username: id }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(id, email, password, name);
            if (userAccount) {
                // create login feature
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async isUsernameAvailable(username: string) {
        try {
            const res = await service.getUserInfo(username);

            return !res;
        } catch (error) {
            console.log("Appwrite service :: isUsernameAvailable() :: " + error);
        }

        return false;
    }

    async login(credentials: LoginUserAccount) {
        const hasUsername = (data: Email | Username): data is Username => "username" in data;

        try {
            const { password } = credentials;
            let email = "";

            if (hasUsername(credentials)) {
                const res = await service.getUserInfo(credentials.username);

                if (!res) throw new Error("Invalid Credentials");

                email = res.email;
            }

            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {}

        return false;
    }

    loginWithGoogle() {
        this.account.createOAuth2Session(
            "google",
            new URL("/login", window.location.href).href,
            new URL("/login", window.location.href).href
        );
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: " + error);
        }

        return null;
    }

    async getToken() {
        try {
            const { jwt } = await this.account.createJWT();
            return jwt;
        } catch (error) {
            console.log("Appwrite service :: getToken() :: " + error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout() :: " + error);
        }
    }
}

const authService = new AuthService();

export default authService;
