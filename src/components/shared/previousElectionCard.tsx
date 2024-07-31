import React from "react";

interface CardProps {
    heading: string;
    date: string;
}

const PreviousElectionCard: React.FC<CardProps> = ({ heading, date }) => {
    return (
        <div className="bg-primary-700 border rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2 text-white">{heading}</h2>
            <p className="text-lg mb-2 text-white">{date}</p>
        </div>
    );
};

export default PreviousElectionCard;
