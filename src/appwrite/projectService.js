import configs from "../configs/configs.js";
import {
    Client,
    Databases,
    ID,
    Query,
} from "appwrite";

export class ProjectService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.databases = new Databases(this.client);
    }
    
    // =========================
    // Create
    // =========================

    async createProject(data) {
        try {
            return await this.databases.createDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.projects,
                documentId: ID.unique(),
                data,
            });
        } catch (error) {
            console.error("Project service createProject:", error);
            throw error;
        }
    }

    // =========================
    // Update
    // =========================

    async updateProject(documentId, data) {
    try {
        return await this.databases.updateDocument({
            databaseId: configs.appwriteDatabaseId,
            collectionId: configs.appwriteTables.projects,
            documentId: documentId, 
            data: data, 
        });
    } catch (error) {
        console.error("Project service updateProject:", error);
        throw error;
    }
}

    // =========================
    // Delete
    // =========================

    async deleteProject(documentId) {
        try {
            return await this.databases.deleteDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.projects,
                documentId,
            });
        } catch (error) {
            console.error("Project service deleteProject:", error);
            throw error;
        }
    }

    // =========================
    // Single Project
    // =========================

    async getProject(identifier) {
        try {
            const result = await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.projects,
                queries: [
                    Query.equal("project_slug", identifier),
                    Query.limit(1),
                ],
            });

            return result.documents[0] || null;
        } catch (error) {
            console.error("Project service getProject:", error);
            throw error;
        }
    }

    async getProjectById(documentId) {
        try {
            return await this.databases.getDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.projects,
                documentId,
            });
        } catch (error) {
            console.error("Project service getProjectById:", error);
            throw error;
        }
    }

    // =========================
    // List Projects
    // =========================

    async getProjects({
        status = true,
        featured = null,
        search = "",
        sort = "newest",
        limit = 10,
        offset = 0,
    } = {}) {
        try {
            const queries = [
                Query.limit(limit),
                Query.offset(offset),
            ];

            if (status !== null) {
                queries.push(Query.equal("status", status));
            }

            if (featured !== null) {
                queries.push(Query.equal("featured", featured));
            }

            if (search) {
                queries.push(Query.search("project_name", search));
            }

            switch (sort) {
                case "az":
                    queries.push(Query.orderAsc("project_name"));
                    break;

                case "za":
                    queries.push(Query.orderDesc("project_name"));
                    break;

                case "oldest":
                    queries.push(Query.orderAsc("$createdAt"));
                    break;

                case "manual":
                    queries.push(Query.orderAsc("sort_order"));
                    break;

                default:
                    queries.push(Query.orderDesc("$createdAt"));
            }

            return await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteTables.projects,
                queries,
            });
        } catch (error) {
            console.error("Project service getProjects:", error);
            throw error;
        }
    }

    // =========================
    // Counts
    // =========================

    async getProjectCounts() {
        try {
            const [all, published, draft, featured] = await Promise.all([
                this.databases.listDocuments({
                    databaseId: configs.appwriteDatabaseId,
                    collectionId: configs.appwriteTables.projects,
                    queries: [Query.limit(1)],
                }),

                this.databases.listDocuments({
                    databaseId: configs.appwriteDatabaseId,
                    collectionId: configs.appwriteTables.projects,
                    queries: [
                        Query.equal("status", true),
                        Query.limit(1),
                    ],
                }),

                this.databases.listDocuments({
                    databaseId: configs.appwriteDatabaseId,
                    collectionId: configs.appwriteTables.projects,
                    queries: [
                        Query.equal("status", false),
                        Query.limit(1),
                    ],
                }),

                this.databases.listDocuments({
                    databaseId: configs.appwriteDatabaseId,
                    collectionId: configs.appwriteTables.projects,
                    queries: [
                        Query.equal("featured", true),
                        Query.limit(1),
                    ],
                }),
            ]);

            return {
                all: all.total,
                published: published.total,
                draft: draft.total,
                featured: featured.total,
            };
        } catch (error) {
            console.error("Project service getProjectCounts:", error);
            throw error;
        }
    }
}

const projectService = new ProjectService();

export default projectService;