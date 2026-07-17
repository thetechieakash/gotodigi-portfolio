import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);

    // Protected routes
    if (authentication && !authStatus) {
        return <Navigate to="/admin/login" replace />;
    }

    // Guest routes (login page)
    if (!authentication && authStatus) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}