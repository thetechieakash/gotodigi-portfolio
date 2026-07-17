import React from 'react';
import SwipingText from '../components/SwipingText';
import { Link } from 'react-router-dom';
import { MoveUpRight, MoveRight } from 'lucide-react';
import { useTheme } from '../context/Themecontext.jsx';
import { SectionHeader } from '../components/Elements.jsx'
import { services, projects, testimonials } from '../constant';
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12
        }
    }
};
const inputStyles = "w-full rounded-2xl bg-[#f5f5f7] dark:bg-[#111111] px-5 py-4 outline-none transition-all duration-300 border border-transparent focus:border-accent/30 focus:shadow-[0_0_0_4px_rgba(255,0,0,0.08)] ";

function Home() {

    return (
        <>
            {/* Hero section  */}
            <motion.main initial="hidden"
                animate="visible"
                variants={stagger}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className='mx-4 mt-16 md:mt-40'
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <div className='md:flex justify-center gap-10'>
                    <motion.div variants={fadeUp} className='mb-4'>
                        <h3 className='capitalize flex flex-col text-5xl md:text-7xl font-semibold mb-2'>
                            <span>Turn Ideas</span>
                            <span>Into Digital</span>
                            <span>Success</span>
                        </h3>
                        <SwipingText />
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                to="/contact"
                                className="inline-flex items-center rounded-full border dark:border-white pl-8 pr-1 py-1 font-medium text-black transition-all hover:scale-105"
                            >
                                <span className="mr-5 text-dark dark:text-white">Contact Us</span>

                                <motion.span
                                    whileHover={{ rotate: 12 }}
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black dark:bg-white"
                                >
                                    <MoveUpRight size={20} className="text-white dark:text-accent" />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-3xl overflow-hidden"
                    >
                        <motion.img
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-96 object-cover"
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2340&auto=format&fit=crop"
                            alt="" />
                    </motion.div>
                </div>
            </motion.main>
            {/* Services section  */}
            <main className="py-24">
                <div className="max-w-5xl mx-auto px-5">
                    <SectionHeader
                        title="Services"
                        subtitle="From idea to deployment, I help businesses build scalable digital products and modern web experiences."
                    />

                    <motion.div variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {services.map((item, index) => (
                            <motion.div
                                variants={fadeUp}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.2 }
                                }}
                                key={index} className="group rounded-4xl p-8 min-h-70 transition-all duration-500 hover:-translate-y-1 dark:bg-dark-card bg-[#f5f5f7]">
                                <span className="text-sm text-accent font-medium">
                                    0{index + 1}
                                </span>

                                <motion.h3
                                    className=" mt-4 text-3xl font-semibold tracking-tight "
                                    whileHover={{ x: 4 }}>
                                    {item.title}
                                </motion.h3>

                                <p className=" mt-4 text-base leading-7 text-black/60 dark:text-white/60">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>
            {/* Portfolio Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-5">

                    <SectionHeader
                        title="Selected Work"
                        subtitle="A collection of products, platforms, and digital experiences I've built for businesses and startups."
                    />

                    <div className="mt-12 space-y-6">

                        {projects.map((project, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                key={index}
                                className="group overflow-hidden rounded-[36px] bg-[#f5f5f7] dark:bg-dark-card">
                                <div className="grid lg:grid-cols-2 items-center">

                                    <div className="p-10 lg:p-14">
                                        <span className="text-sm text-accent font-medium">
                                            {project.category}
                                        </span>

                                        <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                                            {project.title}
                                        </h3>

                                        <p className="mt-6 text-black/60 dark:text-white/60 leading-7">
                                            {project.description}
                                        </p>

                                        <motion.button whileHover={{ x: 6 }} className="mt-8 text-sm font-medium">
                                            View Case Study →
                                        </motion.button>
                                    </div>

                                    <div className="overflow-hidden">
                                        <motion.img
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.6 }}
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-87.5 object-cover transition-transform duration-700 group-hover:scale-105 " />
                                    </div>

                                </div>
                            </motion.div>
                        ))}

                    </div>

                    <div className="flex justify-center mt-12">
                        <Link
                            to="/portfolio"
                            className="rounded-full px-8 py-4  bg-black text-white dark:bg-white dark:text-black font-medium">
                            View All Projects
                        </Link>
                    </div>

                </div>
            </section>
            {/* Testimonials */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-5xl mx-auto px-5">

                    <SectionHeader
                        title="What Clients Say"
                        subtitle="Trusted by businesses, startups, and entrepreneurs."
                    />

                    <div className="mt-12 overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{
                                x: ["0%", "-50%"]
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[...testimonials, ...testimonials].map((item, index) => (
                                <motion.div
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.2 }
                                    }}
                                    key={index}
                                    className="shrink-0 w-95 rounded-4xl bg-[#f5f5f7] dark:bg-dark-card p-8">
                                    <p className="text-lg leading-8">
                                        "{item.review}"
                                    </p>

                                    <div className="mt-8">
                                        <h4 className="font-semibold">
                                            {item.name}
                                        </h4>

                                        <p className="text-sm text-black/60 dark:text-white/60">
                                            {item.role}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-5">

                    <SectionHeader
                        title="Let's Build Something Great"
                        subtitle="Have a project in mind? Tell me about your idea and I'll get back to you as soon as possible."
                    />

                    <motion.form initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className={inputStyles} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className={inputStyles} />
                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Project Type
                                </label>

                                <select className={inputStyles} >
                                    <option>Web Application</option>
                                    <option>SaaS Platform</option>
                                    <option>Business Website</option>
                                    <option>E-Commerce</option>
                                    <option>API Development</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">
                                    Budget
                                </label>

                                <select className={inputStyles}>
                                    <option>$500 - $1,000</option>
                                    <option>$1,000 - $3,000</option>
                                    <option>$3,000 - $5,000</option>
                                    <option>$5,000+</option>
                                </select>
                            </div>

                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Project Details
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Tell me about your project..."
                                className={inputStyles} />
                        </div>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                y: -2
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                            type="submit"
                            className="rounded-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-medium transition-transform hover:scale-105">
                            Send Message
                        </motion.button>

                    </motion.form>

                </div>
            </section>
        </>
    )
}

export default Home