import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import serverApi from "../helper/serverApi";

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleRegister = async (eve) => {
        eve.preventDefault()
        try {
            let { data } = await serverApi({
                url: '/register',
                method: 'POST',
                data: { username: username, email: email, password: password },
            })
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="username" placeholder="username" className="input input-bordered" required onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button><br />
                            </div>
                            <div>
                                <p>Have an account? <Link to={'/login'} className="link link-primary">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}