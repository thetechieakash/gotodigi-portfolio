import {
    Save,
    Plus,
    Trash2,
    ImageIcon,
} from "lucide-react";

import { useForm, useFieldArray } from "react-hook-form";
import Editor from "../../components/editor/Editor";

export default function AboutSettings() {
    const {
        register,
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            title: "",
            subtitle: "",
            resume: "",
            bio: "",

            frontend: ["React", "Tailwind"],
            backend: ["Node.js", "Laravel"],

            timeline: [
                {
                    year: "",
                    title: "",
                    description: "",
                },
            ],

            social: {
                github: "",
                linkedin: "",
                website: "",
                email: "",
            },
        },
    });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "timeline",
    });

    const submit = (data) => {
        console.log(data);
    };

    return (
        <main className="mx-auto max-w-6xl space-y-8">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        About Page
                    </h1>

                    <p className="text-black/60 dark:text-white/60 mt-2">
                        Update your public profile.
                    </p>
                </div>

                <button
                    onClick={handleSubmit(submit)}
                    className="flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="space-y-6 rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">

                <h2 className="text-xl font-semibold">
                    Profile
                </h2>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <label className="mb-2 block text-sm">
                            Headline
                        </label>

                        <input
                            {...register("title")}
                            className="w-full rounded-2xl border border-black/10 px-5 py-4"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm">
                            Resume URL
                        </label>

                        <input
                            {...register("resume")}
                            className="w-full rounded-2xl border border-black/10 px-5 py-4"
                        />
                    </div>

                </div>

                <div>
                    <label className="mb-2 block text-sm">
                        Subtitle
                    </label>

                    <textarea
                        rows={3}
                        {...register("subtitle")}
                        className="w-full rounded-2xl border border-black/10 p-4"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm">
                        Avatar
                    </label>

                    <label className="flex h-56 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-black/10">

                        <div className="text-center">

                            <ImageIcon
                                className="mx-auto mb-4"
                                size={36}
                            />

                            Upload Image

                        </div>

                        <input
                            type="file"
                            hidden
                        />

                    </label>
                </div>

            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">

                <h2 className="mb-6 text-xl font-semibold">
                    Biography
                </h2>

                <Editor />

            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-dark-card">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        Experience Timeline
                    </h2>

                    <button
                        type="button"
                        onClick={() =>
                            append({
                                year: "",
                                title: "",
                                description: "",
                            })
                        }
                        className="flex items-center gap-2 rounded-xl border px-4 py-2"
                    >
                        <Plus size={16} />
                        Add
                    </button>

                </div>

                <div className="space-y-5">

                    {fields.map((field, index) => (

                        <div
                            key={field.id}
                            className="rounded-2xl border border-black/10 p-5"
                        >

                            <div className="grid gap-4 md:grid-cols-3">

                                <input
                                    placeholder="Year"
                                    {...register(`timeline.${index}.year`)}
                                    className="rounded-xl border px-4 py-3"
                                />

                                <input
                                    placeholder="Job Title"
                                    {...register(`timeline.${index}.title`)}
                                    className="rounded-xl border px-4 py-3"
                                />

                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="flex items-center justify-center rounded-xl bg-red-50 text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>

                            <textarea
                                rows={3}
                                placeholder="Description"
                                {...register(`timeline.${index}.description`)}
                                className="mt-4 w-full rounded-xl border p-4"
                            />

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
}