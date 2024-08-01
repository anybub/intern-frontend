import React from "react";
import { Link } from "react-router-dom";
interface CardProps {
    title: string;
    desp: string;
    id:string;
}

const PreviousElectionCard: React.FC<CardProps> = ({ title,desp,id}) => {
    return (
        <Link to={`/election/${id}`}>
            <div className="bg-primary-700 border rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
                <p className="text-lg mb-2 text-white">{desp}</p>
            </div>
        </Link>
    );
};

export default PreviousElectionCard;
