import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    Account;

    constructor() {
        this.Client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.Account = new Account(this.Client);
    }

    async CreateAccount({ email, password, name }) {
        try {
            const userAccount = await this.Account.create(ID.unique, emil, password, name)
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.Account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.Account.get();
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            await this.Account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default AuthService;
