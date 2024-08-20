import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serverApi from "../helper/serverApi";

export default function DetailPage() {
    const [digimon, setDigimon] = useState({})
    let { id } = useParams()
    const readDigimon = async () => {
        try {
            let { data } = await serverApi({
                url: `/digimons/${id}`,
                method: 'GET'
            })
            setDigimon(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        readDigimon()
    }, [])
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <img
                    src={digimon.imgUrl}
                    alt="digimon" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{digimon.name}</h2>
                <p>{digimon.level}</p>
                <Link to={`/digimons/${digimon.id}/detail`} className="link link-primary">Detail</Link>
            </div>
        </div>
    )
}