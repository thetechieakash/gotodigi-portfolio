import {
    ArrowRight,
    Code2,
    Database,
    Server,
    Wrench,
    Briefcase,
    MapPin,
    Calendar,
    Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../components/Ui.jsx";

const STATS = [
    { value: "4+", label: "Years Experience" },
    { value: "30+", label: "Projects" },
    { value: "20+", label: "Articles" },
    { value: "100K+", label: "Lines of Code" },
];

const STACK = [
    {
        title: "Frontend",
        icon: Code2,
        items: [
            "React",
            "JavaScript",
            "Tailwind CSS",
            "Bootstrap",
            "HTML",
            "CSS",
            "React Native",
            "Blade"
        ],
    },
    {
        title: "Backend",
        icon: Server,
        items: [
            "Node.js",
            "PHP",
            "Express",
            "Laravel",
            "CodeIgniter",
        ],
    },
    {
        title: "Database",
        icon: Database,
        items: [
            "MySQL",
            "Appwrite",
        ],
    },
    {
        title: "Tools",
        icon: Wrench,
        items: [
            "Git",
            "VS Code",
            "Postman",
            "Figma",
            "WAMP"
        ],
    },
];

const EXPERIENCE = [
    {
        year: "2026",
        title: "Portfolio v2",
        description:
            "Designed and developed a modern personal portfolio using React, Tailwind CSS and Appwrite CMS.",
    },
    {
        year: "2025",
        title: "Hotel SaaS",
        description:
            "Built a multi-tenant hotel booking and management platform with role-based authentication.",
    },
    {
        year: "2024",
        title: "Casino Management",
        description:
            "Developed a casino administration dashboard using React, Express and MySQL.",
    },
    {
        year: "2023",
        title: "Full Stack Developer",
        description:
            "Worked on multiple client projects including CMS platforms, APIs and booking systems.",
    },
];

const VALUES = [
    {
        emoji: "⚡",
        title: "Clean Architecture",
        text: "Readable, scalable and maintainable code is more important than clever code.",
    },
    {
        emoji: "🚀",
        title: "Performance",
        text: "Fast loading websites with optimized user experience and SEO.",
    },
    {
        emoji: "🤝",
        title: "Collaboration",
        text: "Clear communication, documentation and teamwork throughout development.",
    },
];

export default function About() {
    return (
        <>
            <SectionHeader
                eyebrow="// about"
                title="Building software that solves real problems."
                subtitle="Full-stack software engineer focused on modern web applications, scalable backends and clean user experiences."
            />

            {/* Hero */}

            <section className="mt-16 grid gap-10 lg:grid-cols-[360px_1fr]">

                <div className="rounded-[40px] border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="aspect-square rounded-[30px] bg-linear-to-br from-neutral-300 to-neutral-100 dark:from-neutral-700 dark:to-neutral-900 flex items-center justify-center">
                        <span className="text-8xl">👨‍💻</span>
                    </div>
                </div>

                <div className="flex flex-col justify-center">

                    <h2 className="text-5xl font-bold leading-tight">
                        Hi, I'm Akash.
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg text-black/60 dark:text-white/60">
                        I'm a full-stack software engineer from India who enjoys
                        building modern websites, SaaS products, CMS platforms,
                        REST APIs and mobile applications.
                    </p>

                    <p className="mt-5 max-w-2xl text-black/60 dark:text-white/60">
                        I care about clean architecture, maintainable code,
                        performance and creating products that people genuinely
                        enjoy using.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm">

                        <div className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 dark:bg-white/5">
                            <MapPin size={16} />
                            West Bengal, India
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 dark:bg-white/5">
                            <Calendar size={16} />
                            Since 2022
                        </div>

                    </div>

                    <div className="mt-8 flex gap-4">

                        <a
                            href="/resume.pdf"
                            className="rounded-full bg-black px-6 py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                            <span className="flex items-center gap-2">
                                <Download size={18} />
                                Resume
                            </span>
                        </a>

                        <Link
                            to="/contact"
                            className="rounded-full border border-black/10 px-6 py-3 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                        >
                            <span className="flex items-center gap-2">
                                Contact
                                <ArrowRight size={18} />
                            </span>
                        </Link>

                    </div>

                </div>

            </section>

            {/* Stats */}

            <section className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {STATS.map((item) => (
                    <div
                        key={item.label}
                        className="rounded-4xl border border-black/10 bg-black/5 p-8 dark:border-white/10 dark:bg-white/5"
                    >
                        <h3 className="text-5xl font-bold">
                            {item.value}
                        </h3>

                        <p className="mt-2 text-black/60 dark:text-white/60">
                            {item.label}
                        </p>
                    </div>
                ))}

            </section>

            {/* Story */}

            <section className="mt-24 rounded-[40px] border border-black/10 bg-black/5 p-10 dark:border-white/10 dark:bg-white/5">

                <h2 className="text-3xl font-bold">
                    My Story
                </h2>

                <div className="mt-8  text-black/65 dark:text-white/60 leading-8">

                    <p>
                        I started programming because I enjoyed solving
                        problems and building things from scratch. Over time,
                        that curiosity turned into a career focused on
                        full-stack development.
                    </p>

                    <p>
                        Today I primarily work with React, Laravel,
                        CodeIgniter, Express and Appwrite, creating scalable
                        applications ranging from CMS platforms to complete
                        SaaS products.
                    </p>

                </div>

            </section>

            {/* Tech Stack */}

            <section className="mt-24">

                <h2 className="mb-10 text-3xl font-bold">
                    Tech Stack
                </h2>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">

                    {STACK.map(({ title, icon: Icon, items }) => (
                        <div
                            key={title}
                            className="rounded-4xl border border-black/10 bg-black/5 p-8 dark:border-white/10 dark:bg-white/5"
                        >
                            <Icon className="mb-6" />

                            <h3 className="mb-6 text-xl font-semibold">
                                {title}
                            </h3>

                            <div className="flex flex-wrap gap-2">

                                {items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full bg-white px-4 py-2 text-sm dark:bg-black"
                                    >
                                        {item}
                                    </span>
                                ))}

                            </div>
                        </div>
                    ))}

                </div>

            </section>

            {/* Timeline */}

            <section className="mt-24">

                <h2 className="mb-10 text-3xl font-bold">
                    Experience
                </h2>

                <div className="space-y-6">

                    {EXPERIENCE.map((item) => (
                        <div
                            key={item.year}
                            className="rounded-4xl border border-black/10 bg-black/5 p-8 dark:border-white/10 dark:bg-white/5"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-start">

                                <span className="w-24 text-accent font-semibold">
                                    {item.year}
                                </span>

                                <div>

                                    <h3 className="flex items-center gap-2 text-xl font-semibold">
                                        <Briefcase size={18} />
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-black/60 dark:text-white/60 leading-7">
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </section>

            {/* Values */}

            <section className="mt-24">

                <h2 className="mb-10 text-3xl font-bold">
                    What I Value
                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    {VALUES.map((value) => (
                        <div
                            key={value.title}
                            className="rounded-[36px] border border-black/10 bg-black/5 p-8 dark:border-white/10 dark:bg-white/5"
                        >
                            <div className="text-5xl">
                                {value.emoji}
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold">
                                {value.title}
                            </h3>

                            <p className="mt-4 leading-7 text-black/60 dark:text-white/60">
                                {value.text}
                            </p>
                        </div>
                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="mt-24 rounded-[48px] bg-black px-10 py-16 text-center text-white dark:bg-white dark:text-black">

                <h2 className="text-4xl font-bold">
                    Let's build something amazing.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-white/70 dark:text-black/70">
                    Whether it's a web application, SaaS platform or backend
                    architecture, I'd love to help bring your ideas to life.
                </p>

                <Link
                    to="/contact"
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:scale-105 dark:bg-black dark:text-white"
                >
                    Get In Touch
                    <ArrowRight size={18} />
                </Link>

            </section>

        </>
    );
}