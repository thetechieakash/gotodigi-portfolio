import { useState } from "react";
import { ArrowRight, Lock, Mail, OctagonX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../../store/authSlice.js";
import authService from "../../appwrite/auth.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, seteError] = useState(null)

    const login = async (data) => {
        // console.log(data);

        seteError(null);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    toast.success("Welcome back!");
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                    }, 1200)
                }
            }
        } catch (error) {
            toast.error(error.message || "Login failed");
            console.error('auth error',error);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-5 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <p className="text-accent font-medium mb-3">Welcome Back</p>

                    <h1 className="text-5xl font-semibold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }} > Sign In </h1>

                    <p className="mt-4 text-black/60 dark:text-white/60"> Access your dashboard and manage your articles. </p>

                </div>

                <form onSubmit={handleSubmit(login)} className="rounded-[36px] bg-[#f5f5f7] dark:bg-dark-card p-8 space-y-5" >

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
                            />

                            <input
                                type="email"
                                name="email"

                                {...register("email", {
                                    required: true,
                                    pattern: {
                                        value: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
                                        message: "email address must be valid"
                                    }

                                })}
                                placeholder="john@example.com"
                                className=" w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/10 outline-none transition-all focus:border-accent "
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-black border border-black/5 dark:border-white/10 outline-none transition-all focus:border-accent "
                                {...register("password", {
                                    required: true
                                })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {error && (
                        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                            <OctagonX size={18} />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        className=" group w-full rounded-full bg-black dark:bg-white text-white dark:text-black py-4 font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer" >
                        Sign In

                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>

                </form>

                <p className="text-center mt-6 text-sm text-black/50 dark:text-white/50">
                    ← Back to{" "}
                    <Link
                        to="/"
                        className="text-accent hover:underline"
                    >
                        Homepage
                    </Link>
                </p>

            </div>

        </main>
    );
}