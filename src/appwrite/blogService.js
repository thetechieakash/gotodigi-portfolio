import configs from "../configs/configs.js";
import { Client, Databases, ID, Query } from "appwrite";

export class BlogService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(configs.appwriteUrl)
            .setProject(configs.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({ article_title, article_slug, artical_short_description, content, article_thumbnail, status }) {
        try {
            return await this.databases.createDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                documentId: ID.unique(),
                data: {
                    article_title,
                    article_slug,
                    artical_short_description,
                    content,
                    article_thumbnail,
                    status,
                },
            });
        } catch (error) {
            console.error("Blog service create post:", error);
            throw error;
        }
    }

    async updatePost({ documentId, article_title, article_slug, artical_short_description, content, article_thumbnail, status }) {
        try {
            return await this.databases.updateDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                documentId,
                data: {
                    article_title,
                    article_slug,
                    artical_short_description,
                    content,
                    article_thumbnail,
                    status,
                },
            });
        } catch (error) {
            console.error("Blog service update post:", error);
            throw error;
        }
    }

    async deletePost(documentId) {
        try {
            return await this.databases.deleteDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                documentId,
            });
        } catch (error) {
            console.error("Blog service delete post:", error);
            throw error;
        }
    }

    async updateStatus(documentId, status) {
        try {
            return await this.databases.updateDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                documentId,
                data: {
                    status: Boolean(status),
                },
            });
        } catch (error) {
            console.error("Blog service update status:", error);
            throw error;
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                documentId,
            });
        } catch (error) {
            console.error("Blog service get post:", error);
            throw error;
        }
    }

    async getPostBySlug(slug) {
        try {
            const response = await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                queries: [
                    Query.equal("article_slug", slug),
                    Query.equal("status", true),
                ],
            });

            return response.documents[0] || null;
        } catch (error) {
            console.error("Blog service get post by slug:", error);
            throw error;
        }
    }

    async getPosts({
        status = true,
        search = "",
        sort = "newest",
        limit = 10,
        offset = 0,
        lastDocumentId = null,
    } = {}) {
        //  Guest website → only published posts (status = true)
        // Admin dashboard → all posts (status = null)
        // Draft page → only drafts (status = false)
        try {
            const queries = [];

            // Status
            if (status !== null && status !== undefined) {
                queries.push(Query.equal("status", status));
            }

            // Search (requires Fulltext index on article_title)
            if (search.trim()) {
                queries.push(Query.search("article_title", search.trim()));
            }

            // Sorting
            switch (sort) {
                case "oldest":
                    queries.push(Query.orderAsc("$createdAt"));
                    break;

                case "az":
                    queries.push(Query.orderAsc("article_title"));
                    break;

                case "za":
                    queries.push(Query.orderDesc("article_title"));
                    break;

                default:
                    queries.push(Query.orderDesc("$createdAt"));
            }

            // Pagination
            queries.push(Query.limit(limit));

            if (lastDocumentId) {
                queries.push(Query.cursorAfter(lastDocumentId));
            } else {
                queries.push(Query.offset(offset));
            }

            return await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                queries,
            });
        } catch (error) {
            console.error("Blog service getPosts:", error);
            throw error;
        }
    }

    async getAllPosts() {
        try {
            return await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                queries: [
                    Query.orderDesc("$createdAt"),
                ],
            });
        } catch (error) {
            console.error("Blog service get all posts:", error);
            throw error;
        }
    }

    async getPostCount(status = null) {
        try {
            const queries = [];

            if (status !== null) {
                queries.push(Query.equal("status", status));
            }

            const result = await this.databases.listDocuments({
                databaseId: configs.appwriteDatabaseId,
                collectionId: configs.appwriteCollectionId,
                queries: [
                    ...queries,
                    Query.limit(1), // only need the total
                ],
            });

            return result.total;
        } catch (error) {
            console.error("Blog service getPostCount:", error);
            throw error;
        }
    }

    async getBlogCounts() {
        const [all, published, draft] = await Promise.all([
            this.getPostCount(null),
            this.getPostCount(true),
            this.getPostCount(false),
        ]);

        return {
            all,
            published,
            draft,
        };
    }
}

const blogService = new BlogService();

export default blogService;