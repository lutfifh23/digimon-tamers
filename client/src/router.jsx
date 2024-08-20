import {
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import LandingPage from './pages/LandingPage'
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DigimonPage from "./pages/DigimonPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage";
import DetailDigimon from "./pages/DetailDigimon";
import EditPage from "./pages/EditPage";
const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/digimons',
                element: <DigimonPage />
            },
            {
                path: '/digimons/:id',
                element: <DetailPage />
            },
            {
                path: '/digimons/:id/detail',
                element: <DetailDigimon />
            },
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/profile/edit',
                element: <EditPage />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/home')
            }
            return null
        }
    },
    {
        path: '/register',
        element: <RegisterPage />,
    }
]);

export default router