import configs from "../configs/configs.js";
import { Client, Databases, ID, Query } from "appwrite";

export class ContactService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    // Create Message
    async createMessage({
        guest_name,
        guest_email,
        message_subject,
        message_content,
        contact_status = false,
    }) {
        try {
            return await this.databases.createDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.contacts,
                documentId: ID.unique(),
                data: {
                    guest_name,
                    guest_email,
                    message_subject,
                    message_content,
                    contact_status,
                },
            });
        } catch (error) {
            console.error("Contact Service - createMessage:", error);
            throw error;
        }
    }

    // Get Messages
    async getMessages({
        status = null,
        limit = 10,
        offset = 0,
    } = {}) {
        try {
            const queries = [
                Query.orderDesc("$createdAt"),
                Query.limit(limit),
                Query.offset(offset),
            ];

            if (status !== null) {
                queries.unshift(Query.equal("contact_status", status));
            }

            return await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.contacts,
                queries,
            });
        } catch (error) {
            console.error("Contact Service - getMessages:", error);
            throw error;
        }
    }

    // Get Single Message
    async getMessage(documentId) {
        try {
            return await this.databases.getDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.contacts,
                documentId,
            });
        } catch (error) {
            console.error("Contact Service - getMessage:", error);
            throw error;
        }
    }

    // Mark as Read / Unread
    async updateMessageStatus(documentId, contact_status) {
        try {
            return await this.databases.updateDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.contacts,
                documentId,
                data: {
                    contact_status,
                },
            });
        } catch (error) {
            console.error("Contact Service - updateStatus:", error);
            throw error;
        }
    }

    // Delete Message
    async deleteMessage(documentId) {
        try {
            await this.databases.deleteDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.contacts,
                documentId,
            });

            return true;
        } catch (error) {
            console.error("Contact Service - deleteMessage:", error);
            throw error;
        }
    }

    // Dashboard Counts
    async getMessageCounts() {
        try {
            const [all, unread, read] = await Promise.all([
                this.getMessages({ limit: 1 }),
                this.getMessages({ status: false, limit: 1 }),
                this.getMessages({ status: true, limit: 1 }),
            ]);

            return {
                all: all.total,
                unread: unread.total,
                read: read.total,
            };
        } catch (error) {
            console.error("Contact Service - getCounts:", error);
            throw error;
        }
    }
}

const contactService = new ContactService();

export default contactService;