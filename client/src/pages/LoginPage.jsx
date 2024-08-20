import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import serverApi from "../helper/serverApi";
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (eve) => {
        eve.preventDefault()
        try {
            let { data } = await serverApi({
                url: '/login',
                method: "POST",
                data: { email: email, password: password }
            })
            let token = data.access_token
            localStorage.setItem('access_token', token)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const googleToken = response.credential;
        try {

            const { data } = await axios.post('http://localhost:3000/login/google', {
                googleToken: googleToken
            })
            localStorage.setItem('access_token', data.access_token)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "923413476972-9kp68mp4s33scru9p0cqanf18vqd4o14.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        // window.google.accounts.id.prompt();
    })
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
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
                            <button type="submit" className="btn btn-primary">Login</button><br />
                            <div className="flex justify-center" id="buttonDiv"></div>
                        </div>
                        <div>
                            <p>Dont have an account? <Link to={'/register'} className="link link-primary">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}