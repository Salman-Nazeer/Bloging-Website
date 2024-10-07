import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Database {
    client = new Client();
    databases;
    bucket;
        
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({Title, slug, Content, FeaturedImg, Status, UserId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    FeaturedImg,
                    Status,
                    UserId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {Title, Content, FeaturedImg, Status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug,
                {
                    Title,
                    Content,
                    FeaturedImg,
                    Status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("Status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDataBaseID,
                config.appwriteCollectionID,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }
}

const database = new Database();

export default database