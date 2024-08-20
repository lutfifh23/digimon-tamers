import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import serverApi from "../helper/serverApi"

export default function DetailDigimon() {
    const [digimon, setDigimon] = useState({})
    let { id } = useParams()
    const readDigimon = async () => {
        try {
            let { data } = await serverApi({
                url: `/digimons/${id}/detail`,
                method: 'POST'
            })
            setDigimon(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        readDigimon()
    }, [])
    console.log(digimon, "<<<CEK")
    return (
        <>

            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        <Link to={`/digimons/${id}`} className="btn btn-square btn-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                    </div>
                    <p>Appearance: {digimon.appearance?.description}</p><br />
                    <p>Digivolutions: {digimon.digivolutions?.stages?.join(' ')}</p>
                </div>
            </div>
        </>
    )
}