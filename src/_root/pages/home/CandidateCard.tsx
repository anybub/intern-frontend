import React from "react";

interface CandidateCardProps {
    initial: boolean;
    candidate: {
        id: number;
        name: string;
        scholarId: string;
        branch: string;
    };
    handleVote: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
    initial,
    candidate,
    handleVote,
}) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 bg-primary-700">
            <img
                className="w-full h-40 object-cover rounded"
                src="https://via.placeholder.com/400"
                alt="Candidate"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{candidate.name}</div>
                <p className="text-base text-white font-bold">
                    ScholarId: {candidate.scholarId}
                </p>
                <p className="text-base text-white font-bold">
                    Branch: {candidate.branch}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex gap-4">
                <button
                    type="button"
                    onClick={handleVote}
                    className="bg-blue-500 h-[100%] flex items-center justify-center w-[100%] text-white p-2 rounded hover:bg-green-500">
                    {initial ? "Voted" : "Vote"}
                </button>
            </div>
        </div>
    );
};

export default CandidateCard;
