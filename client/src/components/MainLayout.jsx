import { Outlet } from 'react-router-dom';
import NavBeforeLogin from './NavBeforeLogin';
export default function MainLayout() {
    return (
        <>
            <NavBeforeLogin />
            <Outlet />
        </>
    )
}