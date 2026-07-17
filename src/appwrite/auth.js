import configs from "../configs/configs.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async register({ name, email, password }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (user) {
                await this.login({ email, password });
            }

            return user;
        } catch (error) {
            console.error("Auth register:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.error("Auth login:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    async logOut() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Auth logout:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;