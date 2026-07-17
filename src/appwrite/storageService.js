import configs from "../configs/configs.js";
import { Client, Storage, ID } from "appwrite";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            // Web SDK: storage.createFile(bucketId, fileId, file)
            return await this.storage.createFile(
                configs.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Storage upload:", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {            
            // Web SDK: storage.deleteFile(bucketId, fileId)
            return await this.storage.deleteFile(
                configs.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Storage delete:", error);
            throw error;
        }
    }

    getFileView(fileId) {
        // Web SDK: storage.getFileView(bucketId, fileId)
        return this.storage.getFileView(
            configs.appwriteBucketId,
            fileId
        );
    }

    getFilePreview(fileId) {
        // Web SDK: storage.getFilePreview(bucketId, fileId)
        return this.storage.getFilePreview(
            configs.appwriteBucketId,
            fileId
        );
    }

    getFileDownload(fileId) {
        // Web SDK: storage.getFileDownload(bucketId, fileId)
        return this.storage.getFileDownload(
            configs.appwriteBucketId,
            fileId
        );
    }
}

const storageService = new StorageService();

export default storageService;