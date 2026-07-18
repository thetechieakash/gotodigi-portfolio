import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Provider, useDispatch } from "react-redux";
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import store from './store/store.js';

import { ThemeProvider } from './context/Themecontext.jsx'
import { PublicLayout, AdminLayout, Protected } from "./layouts";
import { Home, About, Blogs, BlogDetail, Portfolio, Testimonial, Contact, Qa, NotFound } from "./pages/index.js";
import { Login, Dashboard, Posts, CreatePost, EditPost, AboutSettings, Messages, Projects, CreateProject, EditProject } from "./pages/admin/index.js";

/* Scroll to top on route change */
function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])
    return null
}

function Layout() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const user = await authService.getCurrentUser();

                if (user) {
                    dispatch(login(user));
                } else {
                    dispatch(logout());
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        const theme = localStorage.getItem('theme')
        return (
            <div className='h-screen flex items-center justify-center'>
                <DotWave
                    size="47"
                    speed="1"
                    color={theme == 'dark' ? 'white' : 'black'}
                />
            </div>
        )
    }
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/testimonials" element={<Testimonial />} />
                    <Route path="/faq" element={<Qa />} />
                    <Route path="/404" element={<NotFound />} />
                </Route>
                <Route path="admin">
                    <Route path="login" element={
                        <Protected authentication={false}>
                            <Login />
                        </Protected>
                    }
                    />

                    <Route element={
                        <Protected authentication={true}>
                            <AdminLayout />
                        </Protected>
                    }
                    >
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="posts" element={<Posts />} />
                        <Route path="post/create" element={<CreatePost />} />
                        <Route path="post/update/:id" element={<EditPost />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="project/create" element={<CreateProject />} />
                        <Route path="project/update/:id" element={<EditProject />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}