import { useEffect, useState } from "react"
import serverApi from "../helper/serverApi"
import { Link, useNavigate } from "react-router-dom"

export default function ProfilePage() {
    const [profile, setProfile] = useState([])
    const navigate = useNavigate()
    const readProfile = async () => {
        try {
            let { data } = await serverApi({
                url: '/profile',
                method: 'GET',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
            setProfile(data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteProfile = async () => {
        try {
            let { data } = await serverApi({
                url: '/profile',
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
            localStorage.clear()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        readProfile()
    }, [])
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <img
                    src={profile.Digimon?.imgUrl}
                    alt="Digimon" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{profile.username}</h2>
                <p>{profile.Digimon?.name}</p>
                <div className="card-actions justify-end">
                    <Link to={'/profile/edit'} className="btn btn-primary">Edit</Link>
                    <Link className="btn btn-error" onClick={deleteProfile}>Delete Account</Link>
                </div>
            </div>
        </div>
    )
}