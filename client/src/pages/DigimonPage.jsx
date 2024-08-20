import { useSelector, useDispatch } from 'react-redux';
import { fetchDigimons } from '../features/digimon/digimonSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DigimonPage() {
    const digimon = useSelector(state => state.digimon)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDigimons())
    }, [])
    if (digimon.loading) {
        return <h3>Loading...</h3>
    }
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>LIST DIGIMON</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {digimon.digimons.map((digimon) => {
                    return (
                        <div className="card bg-base-100 w-96 shadow-xl m-4" key={digimon.id}>
                            <figure className="px-10 pt-10">
                                <img
                                    src={digimon.imgUrl}
                                    alt="digimon"
                                    className="rounded-xl"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{digimon.name}</h2>
                                <p>{digimon.level}</p>
                                <div className="card-actions">
                                    <Link to={`/digimons/${digimon.id}`} className="btn btn-primary">Detail</Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    )
}