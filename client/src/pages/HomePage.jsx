import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://i.pinimg.com/564x/39/60/b9/3960b98562d63367355070aada36b859.jpg"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Digimon Tamers</h1>
                    <p className="py-6">
                        The Digimon lovers app offers complete Digimon data features, detailed character information for each Digimon, including stats, evolutions, and background stories. Users can select a favorite Digimon from various options, add it to their favorites list, and share their collections with the community.
                    </p>
                    <Link to={'/digimons'} className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
        </>
    )
}