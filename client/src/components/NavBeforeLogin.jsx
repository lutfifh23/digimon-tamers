import { Link, useLocation } from "react-router-dom";

export default function NavBeforeLogin() {
    const location = useLocation()
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                    </div>
                    <Link to={'/home'} className="btn btn-ghost text-xl">daisyUI</Link>
                </div>
                {!localStorage.access_token ? (
                    <div className="navbar-end">
                        <Link to={'/login'} className="btn btn-ghost">Login</Link >
                        <Link to={'/register'} className="btn btn-outline">Register</Link>
                    </div>
                ) : (

                    <div className="navbar bg-base-100 justify-end">
                        <div className="flex-none gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link to={'/profile'} className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><Link to={'/'} onClick={() => localStorage.clear()}>
                                        Logout
                                    </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}