import Footer from "../components/Footer.jsx";
import Navigation from '../components/Navigation.jsx';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
    return (
        <>
            <Navigation />
            <main className="mx-4 mt-16 md:mt-40">
                <div className="mx-auto max-w-6xl px-5">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default PublicLayout