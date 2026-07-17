import { useState, useEffect } from "react";
import { Save, Eye, UploadCloud } from "lucide-react";
import Editor from "../../components/editor/Editor.jsx";
import { useForm, Controller } from "react-hook-form";
import blogService from "../../appwrite/blogService.js";
import storageService from "../../appwrite/storageService.js";
import slug from "../../helper/slug.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreatePost({ post }) {
    const navigate = useNavigate();
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [removeThumbnail, setRemoveThumbnail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slugEdited, setSlugEdited] = useState(false);

    const { register, control, watch, setValue, getValues, handleSubmit, formState: { errors }, } = useForm(
        {
            defaultValues: {
                article_title: post?.article_title || "",
                article_slug: post?.article_slug || "",
                artical_short_description: post?.artical_short_description || "",
                content: post?.content || "",
                status: post?.status || false,
            },
        });

    const articleTitle = watch("article_title");
    const articleSlug = watch("article_slug");
    // console.log(post);

    useEffect(() => {
        if (!slugEdited) {
            setValue("article_slug", slug(articleTitle || ""));
        }
    }, [articleTitle, post, setValue]);
    useEffect(() => {
        if (post?.article_thumbnail) {
            const preview = storageService.getFileView(post.article_thumbnail);

            setThumbnailPreview(preview);
        }
    }, [post]);
    useEffect(() => {
        return () => {
            if (thumbnailPreview.startsWith("blob:")) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);
    const onSubmit = async (data, status) => {
        setLoading(true);
        try {
            let thumbnailId = post?.article_thumbnail || null;
            if (removeThumbnail) {
                if (post?.article_thumbnail) {
                    await storageService.deleteFile(post?.article_thumbnail);
                }

                thumbnailId = null;
            }

            if (data.thumbnail?.length) {
                const file = await storageService.uploadFile(data.thumbnail[0]);

                if (!file) {
                    throw new Error("Thumbnail upload failed");
                }
                if (post?.article_thumbnail) {
                    await storageService.deleteFile(post.article_thumbnail);
                }
                thumbnailId = file.$id;
            }

            if (post) {
                await blogService.updatePost({
                    documentId: post.$id,
                    article_title: data.article_title,
                    article_slug: data.article_slug,
                    artical_short_description: data.artical_short_description,
                    content: data.content,
                    article_thumbnail: thumbnailId,
                    status,
                });
                toast.success("Article updated successfully!");

                setTimeout(() => {
                    navigate("/admin/posts");
                }, 1200);
            } else {
                const createdPost = await blogService.createPost({
                    article_title: data.article_title,
                    article_slug: data.article_slug,
                    artical_short_description: data.artical_short_description,
                    content: data.content,
                    article_thumbnail: thumbnailId,
                    status,
                });

                toast.success("Article created successfully!");
                setTimeout(() => {
                    navigate(`/admin/posts/update/${createdPost.$id}`);
                }, 1200);
            }

        } catch (error) {
            setLoading(false);
            console.error(error);
            toast.error("Something went wrong. try again later!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto max-w-5xl space-y-8">

            {/* Header */}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        Create Article
                    </h1>

                    <p className="mt-2 text-black/60 dark:text-white/60">
                        Write and publish a new blog article.
                    </p>
                </div>

                {/* <div className="flex gap-3">

                    <button className="flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                        <Eye size={18} />
                        Preview
                    </button>

                    <button className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
                        <Save size={18} />
                        Publish
                    </button>

                </div> */}
            </div>

            {/* Form */}

            <form>
                <div className="space-y-6 rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                    {/* Title */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Article Title
                        </label>

                        <input
                            type="text"
                            placeholder="Building a SaaS with React..."
                            className="w-full rounded-2xl border border-black/10 bg-transparent px-5 py-4 outline-none transition focus:border-black dark:border-white/10 dark:focus:border-white"
                            {...register('article_title', {
                                required: "Title is required",
                                maxLength: {
                                    value: 200,
                                    message: "Maximum 200 characters",
                                },
                            })}
                        />
                    </div>
                    {errors.article_title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.article_title.message}
                        </p>
                    )}
                    {/* Slug */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Slug
                        </label>

                        <input
                            type="text"
                            placeholder="building-a-saas-with-react"
                            className="w-full rounded-2xl border border-black/10 bg-transparent px-5 py-4 outline-none transition focus:border-black dark:border-white/10 dark:focus:border-white"
                            {...register('article_slug', {
                                required: "Slug is required",
                                maxLength: {
                                    value: 200,
                                    message: "Maximum 200 characters",
                                },
                                onChange: () => setSlugEdited(true),
                            })}
                        />
                    </div>
                    {errors.article_slug && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.article_slug.message}
                        </p>
                    )}

                    {/* Thumbnail */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Short Description
                        </label>

                        <textarea
                            rows={10}
                            placeholder="Write your article..."
                            className="w-full rounded-3xl border border-black/10 bg-transparent p-5 outline-none transition focus:border-black dark:border-white/10 dark:focus:border-white"
                            {...register('artical_short_description', {
                                required: "Description is required",
                                maxLength: {
                                    value: 500,
                                    message: "Maximum 500 characters",
                                },
                            })}
                        />


                    </div>
                    {/* Thumbnail */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Featured Image
                        </label>
                        <div className="space-y-4">
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/10 p-12 transition hover:border-black dark:border-white/10 dark:hover:border-white">
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
                                        alt=""
                                        className="max-h-72 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <>
                                        <UploadCloud
                                            size={40}
                                            className="mb-4 text-black/40 dark:text-white/40"
                                        />

                                        <p className="font-medium">
                                            Upload Thumbnail
                                        </p>

                                        <span className="mt-1 text-sm text-black/50 dark:text-white/50">
                                            PNG, JPG or WEBP
                                        </span>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    {...register("thumbnail", {
                                        required: !post ? "Thumbnail is required" : false,
                                        onChange: (e) => {
                                            const file = e.target.files[0];

                                            if (!file) return;

                                            setThumbnailPreview(URL.createObjectURL(file));

                                        },
                                    })}
                                />

                            </label>
                            {thumbnailPreview && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setThumbnailPreview("");
                                        setValue("thumbnail", null);
                                        setRemoveThumbnail(true);
                                    }}
                                    className="w-full rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                >
                                    Remove Thumbnail
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Content */}

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Content
                        </label>

                        {/* <textarea
                        rows={18}
                        placeholder="Write your article..."
                        className="w-full rounded-3xl border border-black/10 bg-transparent p-5 outline-none transition focus:border-black dark:border-white/10 dark:focus:border-white"
                    /> */}
                        {/* <Editor
                        value={content}
                        onChange={setContent}
                    /> */}
                        <Controller
                            name="content"
                            control={control}
                            rules={{ required: "Content is required" }}
                            render={({ field }) => (
                                <Editor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    {errors.content && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.content.message}
                        </p>
                    )}
                    {/* Bottom */}

                    <div className="flex justify-end gap-3">

                        {!post?.status ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit((data) => onSubmit(data, false))()
                                    }
                                    disabled={loading}
                                    className="rounded-2xl border border-black/10 px-6 py-3 cursor-pointer"
                                >
                                    {post ? "Save Draft" : "Save Draft"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit((data) => onSubmit(data, true))()
                                    }
                                    disabled={loading}
                                    className="rounded-2xl bg-black px-6 py-3 text-white cursor-pointer"
                                >
                                    {post ? "Publish" : "Publish"}
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit((data) => onSubmit(data, false))()
                                    }
                                    disabled={loading}
                                    className="rounded-2xl border border-yellow-500 px-6 py-3 text-yellow-600 cursor-pointer"
                                >
                                    Move to Draft
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit((data) => onSubmit(data, true))()
                                    }
                                    disabled={loading}
                                    className="rounded-2xl bg-black px-6 py-3 text-white cursor-pointer"
                                >
                                    Update
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </form>

        </main>
    );
}