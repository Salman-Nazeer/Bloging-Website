import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Database {
    Client = new Client();
    database;
    bucket;
    constructor() {
        this.Client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID);
        this.database = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.database.createDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug) {
        try {
            await this.database.getDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            throw error
            return false
        }
    }


    //UPLOAD FILE

    async uploadFile(file) {
        try {
            return await this.bucket.updateFile(
                config.appwriteBucketID,
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }


    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileID
        )
    }



    // async listPost() {
    //     try {
    //         return await this.database.listDocuments(
    //             config.appwriteDataBaseID,
    //             config.appwriteCollectionID
    //         )
    //     } catch(error) {
    //         throw error
    //     }
    // }


}

const database = new Database();

export default database