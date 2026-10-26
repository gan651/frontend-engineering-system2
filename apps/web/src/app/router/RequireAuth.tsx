import { Navigate, Outlet, useLocation } from "react-router"

const isAuthenticated = true  // 是否具备权限

export function RequireAuth() {
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />
    }

    return <Outlet />
}