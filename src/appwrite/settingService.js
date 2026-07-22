import configs from "../configs/configs.js";
import { Client, Databases, Query } from "appwrite";

export class SettingService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // =========================
    // Get Settings
    // =========================

    async getSettings() {
        try {
            const result = await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.settings,
                queries: [
                    Query.limit(1),
                ],
            });

            return result.documents[0] || null;
        } catch (error) {
            console.error("Setting service getSettings:", error);
            throw error;
        }
    }

    // =========================
    // Get By ID
    // =========================

    async getSetting(documentId) {
        try {
            return await this.databases.getDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.settings,
                documentId,
            });
        } catch (error) {
            console.error("Setting service getSetting:", error);
            throw error;
        }
    }

    // =========================
    // Update Settings
    // =========================

    async updateSettings({
        documentId,
        ...data
    }) {
        try {
            return await this.databases.updateDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.settings,
                documentId,
                data,
            });
        } catch (error) {
            console.error("Setting service updateSettings:", error);
            throw error;
        }
    }
}

const settingService = new SettingService();

export default settingService;