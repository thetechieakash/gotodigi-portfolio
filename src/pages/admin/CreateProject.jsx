import { useState, useEffect } from "react";
import { Save, ImageIcon, Globe, Star, Plus, Trash2, FolderKanban } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import projectService from "../../appwrite/projectService.js";
import storageService from "../../appwrite/storageService.js";
import slug from "../../helper/slug.js";
import Editor from "../../components/editor/Editor.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function CreateProject({ project }) {
    const navigate = useNavigate();
    const [slugEdited, setSlugEdited] = useState(false);
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [removeThumbnail, setRemoveThumbnail] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            project_name: project?.project_name || "",
            project_slug: project?.project_slug || "",
            project_short_description: project?.project_short_description || "",
            project_description: project?.project_description || "",
            project_thumbnail: project?.project_thumbnail || null,
            project_categories: project?.project_categories?.length
                ? project.project_categories
                : ["Web App"],
            tech_stack: project?.tech_stack?.length
                ? project.tech_stack
                : ["React"],
            live_link: project?.live_link || "",
            github_link: project?.github_link || "",
            featured: project?.featured ?? false,
            status: project?.status ?? true,
        },
    });

    const projectName = watch("project_name");

    // Auto-slug generation
    useEffect(() => {
        if (!slugEdited) {
            setValue("project_slug", slug(projectName || ""));
        }
    }, [projectName, slugEdited, setValue]);

    // Handle initial edit mode thumbnail preview
    useEffect(() => {
        if (project?.project_thumbnail) {
            const preview = storageService.getFileView(project.project_thumbnail);
            setThumbnailPreview(preview);
        }
    }, [project]);

    // Clean up temporary blob URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    const { fields: categoryFields, append: addCategory, remove: removeCategory } = useFieldArray({
        control,
        name: "project_categories",
    });

    const { fields: techFields, append: addTech, remove: removeTech } = useFieldArray({
        control,
        name: "tech_stack",
    });

    const onSubmit = async (data) => {

        try {
            setIsSubmitting(true);
            let thumbnailId = project?.project_thumbnail || null;

            // 1. Handle Thumbnail Updates
            if (data.project_thumbnail && data.project_thumbnail.length > 0 && typeof data.project_thumbnail !== "string") {
                const file = await storageService.uploadFile(data.project_thumbnail[0]);

                if (project?.project_thumbnail) {
                    await storageService.deleteFile(project.project_thumbnail);
                }
                thumbnailId = file.$id;
            } else if (removeThumbnail && project?.project_thumbnail) {
                await storageService.deleteFile(project.project_thumbnail);
                thumbnailId = null;
            }

            // 2. Prepare payload for Appwrite
            const projectData = {
                ...data,
                project_thumbnail: thumbnailId,
                live_link: data.live_link?.trim() === "" ? null : data.live_link,
                github_link: data.github_link?.trim() === "" ? null : data.github_link,
            };

            // 3. Save to Database (Update vs Create)
            if (project?.$id) {
                const updatedProject = await projectService.updateProject(project.$id, projectData);
                toast.success("Project updated successfully!");
                setTimeout(() => {
                    navigate("/admin/projects");
                }, 1200);
            } else {
                const newProject = await projectService.createProject(projectData);
                toast.success("Project created successfully!");
                setTimeout(() => {
                    navigate("/admin/projects");
                }, 1200);
            }
        } catch (error) {
            console.error("Failed to save project:", error);
            toast.error("Failed to save project.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="mx-auto max-w-7xl space-y-8">
            {/* Standardized React Hook Form submission flow */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <h1 className="text-4xl font-bold">Project</h1>
                        <p className="mt-2 text-black/60 dark:text-white/60">
                            Create or update your portfolio project.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-white transition cursor-pointer hover:scale-[1.02] dark:bg-white dark:text-black active:scale-[1] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />
                        {isSubmitting ? "Saving..." : "Save Project"}
                    </button>
                </div>

                <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Basic Details */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <div className="mb-8 flex items-center gap-3">
                                <FolderKanban />
                                <h2 className="text-xl font-semibold">Project Details</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm">Project Name</label>
                                    <input
                                        {...register("project_name", {
                                            required: "Name is required",
                                            maxLength: { value: 200, message: "Maximum 200 characters" },
                                        })}
                                        className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none dark:bg-transparent dark:border-white/10"
                                    />
                                    {errors.project_name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.project_name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm">Slug</label>
                                    <input
                                        {...register("project_slug", {
                                            required: "Slug is required",
                                            maxLength: { value: 200, message: "Maximum 200 characters" },
                                            onChange: () => setSlugEdited(true),
                                        })}
                                        className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none dark:bg-transparent dark:border-white/10"
                                    />
                                    {errors.project_slug && (
                                        <p className="mt-1 text-sm text-red-500">{errors.project_slug.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm">Short Description</label>
                                    <textarea
                                        rows={3}
                                        {...register("project_short_description", {
                                            required: "Short description is required",
                                            maxLength: { value: 500, message: "Maximum 500 characters" },
                                        })}
                                        className="w-full rounded-2xl border border-black/10 p-4 outline-none dark:bg-transparent dark:border-white/10"
                                    />
                                    {errors.project_short_description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.project_short_description.message}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Rich Text Editor Description */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <h2 className="mb-6 text-xl font-semibold">Project Description</h2>
                            <Controller
                                name="project_description"
                                control={control}
                                rules={{ required: "Project description is required" }}
                                render={({ field }) => (
                                    <Editor value={field.value} onChange={field.onChange} />
                                )}
                            />
                            {errors.project_description && (
                                <p className="mt-1 text-sm text-red-500">{errors.project_description.message}</p>
                            )}
                        </section>

                        {/* Categories */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Categories</h2>
                                <button
                                    type="button"
                                    onClick={() => addCategory("")}
                                    className="flex items-center gap-2 rounded-xl border px-4 py-2 dark:border-white/10"
                                >
                                    <Plus size={16} /> Add
                                </button>
                            </div>

                            <div className="space-y-4">
                                {categoryFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-3">
                                        <input
                                            {...register(`project_categories.${index}`)}
                                            className="flex-1 rounded-xl border border-black/10 px-4 py-3 dark:bg-transparent dark:border-white/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeCategory(index)}
                                            className="rounded-xl bg-red-50 px-4 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tech Stack */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Tech Stack</h2>
                                <button
                                    type="button"
                                    onClick={() => addTech("")}
                                    className="flex items-center gap-2 rounded-xl border px-4 py-2 dark:border-white/10"
                                >
                                    <Plus size={16} /> Add
                                </button>
                            </div>

                            <div className="space-y-4">
                                {techFields.map((field, index) => (
                                    <div key={field.id} className="flex gap-3">
                                        <input
                                            {...register(`tech_stack.${index}`)}
                                            className="flex-1 rounded-xl border border-black/10 px-4 py-3 dark:bg-transparent dark:border-white/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTech(index)}
                                            className="rounded-xl bg-red-50 px-4 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column / Sidebar */}
                    <aside className="space-y-8">
                        {/* Thumbnail Upload */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <h2 className="mb-6 text-xl font-semibold">Thumbnail</h2>
                            <div className="space-y-4">
                                <label className="relative flex h-64 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-black/10 transition hover:border-black hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5">
                                    {thumbnailPreview ? (
                                        <img src={thumbnailPreview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon size={42} className="mx-auto mb-3 text-black/40 dark:text-white/40" />
                                            <p className="font-medium">Upload Thumbnail</p>
                                            <p className="mt-1 text-xs text-black/50 dark:text-white/50">PNG, JPG, WEBP</p>
                                        </div>
                                    )}
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        {...register("project_thumbnail", {
                                            required: !project ? "Thumbnail is required" : false,
                                            onChange: (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;
                                                setRemoveThumbnail(false);
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
                                            setValue("project_thumbnail", null);
                                            setRemoveThumbnail(true);
                                        }}
                                        className="w-full rounded-2xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                    >
                                        Remove Thumbnail
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* External Links */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <h2 className="mb-6 text-xl font-semibold">Project Links</h2>
                            <div className="space-y-5">
                                <div className="relative">
                                    <Globe size={18} className="absolute left-4 top-5 text-black/40 dark:text-white/40" />
                                    <input
                                        {...register("live_link")}
                                        placeholder="Live Website"
                                        className="w-full rounded-2xl border border-black/10 py-4 pl-11 pr-4 outline-none dark:bg-transparent dark:border-white/10"
                                    />
                                </div>
                                <div className="relative">
                                    <FaGithub size={18} className="absolute left-4 top-5 text-black/40 dark:text-white/40" />
                                    <input
                                        {...register("github_link")}
                                        placeholder="Github Repository"
                                        className="w-full rounded-2xl border border-black/10 py-4 pl-11 pr-4 outline-none dark:bg-transparent dark:border-white/10"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Visibility Settings */}
                        <section className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">
                            <h2 className="mb-6 text-xl font-semibold">Settings</h2>
                            <div className="space-y-5">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span>Published</span>
                                    <input type="checkbox" {...register("status")} className="w-4 h-4 accent-black dark:accent-white" />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="flex items-center gap-2">
                                        <Star size={16} /> Featured
                                    </span>
                                    <input type="checkbox" {...register("featured")} className="w-4 h-4 accent-black dark:accent-white" />
                                </label>
                            </div>
                        </section>
                    </aside>
                </div>
            </form>
        </main>
    );
}