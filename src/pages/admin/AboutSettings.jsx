import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../context/Themecontext.jsx';
import { updateProfile } from '../../store/authSlice.js';
import { Save, User, Mail, MapPinPlusInside, Briefcase, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import storageService from '../../appwrite/storageService.js';

// --- Reusable Input Component ---
const FormInput = ({ label, icon: Icon, type = "text", placeholder, name, register, rules, error, dark, containerClass = "" }) => (
    <div className={`space-y-2 ${containerClass}`}>
        <label className={`text-xs font-semibold tracking-wide uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {label}
        </label>
        <div className="relative">
            <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
                type={type}
                {...register(name, rules)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none ${
                    dark
                        ? 'bg-neutral-900/50 border-neutral-800 focus:border-neutral-700 text-white'
                        : 'bg-neutral-50 border-neutral-200 focus:border-neutral-400 text-neutral-900'
                }`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error.message}</p>}
    </div>
);

// --- Reusable Textarea Component ---
const FormTextarea = ({ label, icon: Icon, placeholder, name, register, rules, error, dark, containerClass = "" }) => (
    <div className={`space-y-2 ${containerClass}`}>
        <label className={`text-xs font-semibold tracking-wide uppercase ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {label}
        </label>
        <div className="relative">
            <Icon size={16} className="absolute left-4 top-4 text-neutral-500" />
            <textarea
                rows={4}
                {...register(name, rules)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all outline-none resize-none ${
                    dark
                        ? 'bg-neutral-900/50 border-neutral-800 focus:border-neutral-700 text-white'
                        : 'bg-neutral-50 border-neutral-200 focus:border-neutral-400 text-neutral-900'
                }`}
                placeholder={placeholder}
            />
        </div>
        {error && <p className="text-xs font-medium text-red-500">{error.message}</p>}
    </div>
);

export default function AboutSettings() {
    const { dark } = useTheme();
    const dispatch = useDispatch();
    const [resumeName, setResumeName] = useState("");
    const [removeResume, setRemoveResume] = useState(false);
    const adminData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: adminData?.name || '',
            email: adminData?.email || '',
            address: adminData?.address || '',
            github: adminData?.github || '',
            linkedin: adminData?.linkedin || '',
            role: adminData?.role || '',
            bio: adminData?.bio || '',
            resume: adminData?.resume || null,
        }
    });

    const resume = watch("resume");

    useEffect(() => {
        if (adminData?.resume) {
            setResumeName("Current Resume.pdf");
        }
    }, [adminData]);

    useEffect(() => {
        if (resume?.length) {
            setResumeName(resume[0].name);
            setRemoveResume(false);
        }
    }, [resume]);

    const onSubmit = async (data) => {
        try {
            let resumeId = adminData?.resume || null;

            // 1. If explicit removal requested OR a brand new file is replacing the old one:
            if ((removeResume || data.resume?.length) && adminData?.resume) {
                await storageService.deleteFile(adminData.resume);
                resumeId = null;
            }

            // 2. If a new file is uploaded:
            if (data.resume?.length) {
                const file = await storageService.uploadFile(data.resume[0]);
                resumeId = file.$id;
            }

            // 3. CRITICAL FIXED: Mutate the copy data payload before sending to state/database
            const updatedProfileData = {
                ...data,
                resume: resumeId // replaces the FileList object with the Appwrite string ID
            };

            // await databaseService.updateAdminProfile(adminData.$id, updatedProfileData);
            dispatch(updateProfile(updatedProfileData));
            
            // Reset state flags upon successful completion
            setRemoveResume(false);
            alert('Profile layout synchronized successfully!');
        } catch (error) {
            console.error('Update baseline failed:', error);
        }
    };

    return (
        <main className='space-y-8'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">Account Settings</h1>
                    <p className="mt-2 text-black/60 dark:text-white/60">
                        Configure your public-facing persona details shared across client modules.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className={`p-8 rounded-3xl border ${dark ? 'border-neutral-800 bg-[#0c0c0e]' : 'border-neutral-200 bg-white'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <FormInput
                            label="Display Name"
                            icon={User}
                            name="name"
                            register={register}
                            rules={{ required: 'Name attribute is mandatory' }}
                            error={errors.name}
                            dark={dark}
                            placeholder="e.g. Akash Halder"
                        />

                        <FormInput
                            label="Email"
                            type="email"
                            icon={Mail}
                            name="email"
                            register={register}
                            rules={{ required: 'Email attribute is mandatory' }}
                            error={errors.email}
                            dark={dark}
                            placeholder="e.g. akash@example.com"
                        />

                        <FormInput
                            label="Address"
                            icon={MapPinPlusInside}
                            name="address"
                            register={register}
                            dark={dark}
                            placeholder="e.g. West Bengal, India"
                            containerClass="md:col-span-2"
                        />

                        <FormInput
                            label="Github"
                            icon={FaGithub}
                            name="github"
                            register={register}
                            dark={dark}
                            placeholder="e.g. https://github.com/thetechieakash"
                        />

                        <FormInput
                            label="Linkedin"
                            icon={FaLinkedin}
                            name="linkedin"
                            register={register}
                            dark={dark}
                            placeholder="e.g. https://www.linkedin.com/in/techieakash/"
                        />

                        <FormInput
                            label="Professional Role"
                            icon={Briefcase}
                            name="role"
                            register={register}
                            rules={{ required: 'Role configuration is required' }}
                            error={errors.role}
                            dark={dark}
                            placeholder="e.g. Full Stack Developer"
                        />

                        <FormTextarea
                            label="Public Biography Narrative"
                            icon={FileText}
                            name="bio"
                            register={register}
                            dark={dark}
                            placeholder="Tell clients details regarding your core stack operations, strategies, and methodologies..."
                            containerClass="md:col-span-2"
                        />

                        <div className="md:col-span-2 space-y-2">
                            <label className={`text-xs font-semibold tracking-wide uppercase ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
                                Resume (PDF)
                            </label>

                            <label className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                                dark ? "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700" : "border-neutral-300 bg-neutral-50 hover:border-neutral-500"
                            }`}>
                                <FileText size={42} className="mb-4 text-red-500" />
                                <p className="font-medium">Upload Resume</p>
                                <p className="mt-1 text-xs text-neutral-500">PDF only • Maximum 5 MB</p>

                                {resumeName && (
                                    <p className="mt-3 text-sm font-medium text-green-500">{resumeName}</p>
                                )}

                                <input
                                    hidden
                                    type="file"
                                    accept=".pdf"
                                    {...register("resume", {
                                        validate: {
                                            pdf: (files) => !files?.length || files[0].type === "application/pdf" || "Only PDF files are allowed",
                                            size: (files) => !files?.length || files[0].size <= 5 * 1024 * 1024 || "Maximum file size is 5MB",
                                        },
                                    })}
                                />
                            </label>

                            {errors.resume && (
                                <p className="text-xs text-red-500">{errors.resume.message}</p>
                            )}

                            {resumeName && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setResumeName("");
                                        setValue("resume", null);
                                        setRemoveResume(true);
                                    }}
                                    className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                                >
                                    Remove Resume
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                {/* Action Panel Dock */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full transition-all tracking-wide shadow-md border ${
                            dark
                                ? 'bg-white text-black border-white hover:bg-neutral-200 disabled:bg-neutral-700'
                                : 'bg-black text-white border-black hover:bg-neutral-800 disabled:bg-neutral-400'
                        }`}
                    >
                        <Save size={16} />
                        <span>{isSubmitting ? 'Syncing...' : 'Save Changes'}</span>
                    </button>
                </div>
            </form>
        </main>
    );
}