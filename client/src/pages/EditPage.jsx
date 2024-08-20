import { useEffect, useState } from "react"
import serverApi from "../helper/serverApi"
import { Link, useNavigate } from "react-router-dom"

export default function EditPage() {
    const [digimons, setDigimons] = useState([])
    const [selectDigimon, setSelectDigimon] = useState(0)
    const navigate = useNavigate()
    const readDigimon = async () => {
        try {
            let { data } = await serverApi({
                url: `/digimons`,
                method: 'GET'
            })
            setDigimons(data)
            console.log(data, "<<<TESTT")
        } catch (error) {
            console.log(error)
        }
    }
    const postDigimon = async (e) => {
        e.preventDefault()
        try {
            let { data } = await serverApi({
                url: `/profile`,
                method: 'PUT',
                data: { DigimonId: selectDigimon },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
            })
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }
    console.log(digimons, "<<<CEKKK");
    useEffect(() => {
        readDigimon()
    }, [])
    return (
        <>
            <div className="card bg-neutral text-neutral-content w-96">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Choose Digimon</h2>
                    <form onSubmit={postDigimon}>
                        <select onChange={(e) => {
                            setSelectDigimon(e.target.value)
                        }} value={selectDigimon} className="select select-bordered w-full max-w-xs">
                            <option value={0} disabled>Choose your Digimon</option>
                            {digimons.map(el => {
                                return (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                )
                            })}
                        </select>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">Accept</button>
                            <Link to={'/profile'} className="btn btn-error">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}