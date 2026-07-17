import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight } from 'lucide-react'
import { FaGithub,FaLinkedin  } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-32 px-5 pb-8">
            <div className="max-w-6xl mx-auto">

                {/* CTA Card */}
                <div className="rounded-[40px] bg-[#f5f5f7] dark:bg-dark-card p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                        <div>
                            <p className="text-accent font-medium mb-3">
                                Available for freelance work
                            </p>

                            <h2
                                className="text-4xl md:text-6xl font-semibold tracking-tight"
                                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                            >
                                Let's build your
                                <br />
                                next digital product.
                            </h2>

                            <p className="mt-6 max-w-xl text-black/60 dark:text-white/60">
                                I help startups and businesses create modern web
                                applications, SaaS products, and digital experiences
                                that scale.
                            </p>
                        </div>

                        <div>
                            <Link
                                to="/contact"
                                className="group inline-flex items-center gap-3 rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-medium"
                            >
                                Start a Project

                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid md:grid-cols-4 gap-10 py-16">

                    <div className="md:col-span-2">
                        <h3
                            className="text-2xl font-semibold"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            Akash
                        </h3>

                        <p className="mt-4 max-w-md text-black/60 dark:text-white/60 leading-7">
                            Full Stack Developer focused on building scalable
                            applications, modern websites, and digital products
                            that deliver real business value.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">
                            Navigation
                        </h4>

                        <div className="flex flex-col gap-3 text-black/60 dark:text-white/60">
                            <Link to="/" className="hover:text-accent transition-colors">
                                Home
                            </Link>

                            <Link to="/about" className="hover:text-accent transition-colors">
                                About
                            </Link>

                            <Link to="/portfolio" className="hover:text-accent transition-colors">
                                Portfolio
                            </Link>

                            <Link to="/contact" className="hover:text-accent transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">
                            Connect
                        </h4>

                        <div className="flex flex-col gap-3 text-black/60 dark:text-white/60">
                            <a
                                href="mailto:hello@example.com"
                                className="hover:text-accent transition-colors"
                            >
                                Email
                            </a>

                            <a
                                href="#"
                                className="hover:text-accent transition-colors"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="#"
                                className="hover:text-accent transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-black/10 dark:border-white/10 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-black/50 dark:text-white/50">
                            © {new Date().getFullYear()} Akash. All rights reserved.
                        </p>

                        <div className="flex items-center gap-4">

                            <a
                                href="https://github.com/thetechieakash"
                                className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-dark-card flex items-center justify-center hover:scale-110 transition-transform"
                                target='_blank'
                                >
                                <FaGithub size={18} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/techieakash/"
                                className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-dark-card flex items-center justify-center hover:scale-110 transition-transform"
                                target='_blank'
                                >
                                <FaLinkedin size={18} />
                            </a>

                            <a
                                href="mailto:hello@example.com"
                                className="w-10 h-10 rounded-full bg-[#f5f5f7] dark:bg-dark-card flex items-center justify-center hover:scale-110 transition-transform"
                                target='_blank'
                            >
                                <Mail size={18} />
                            </a>

                        </div>

                    </div>
                </div>

            </div>
        </footer>
    )
}