import React from "react";
import { Button } from "@/components/ui/button";

interface CandidateCardProps {
    isEligible: boolean;
    candidate: {
        id: string;
        name: string;
        scholarId: string;
        branch: string;
    };
    startTime: Date;
    handleVote: () => void;
}

const CandidateVoteCard: React.FC<CandidateCardProps> = ({
    isEligible,
    candidate,
    handleVote,
    startTime,
}) => {
    return (
        <div className="bg-primary-700 border rounded-lg shadow-md p-6 m-9 w-full">
            <img
                className="w-full h-48 object-cover rounded"
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
            {new Date() > startTime && isEligible && (
                <div className="px-6 pt-4 pb-2 flex gap-4">
                    <Button
                        type="button"
                        onClick={handleVote}
                        className="bg-blue-500 h-[100%] flex items-center justify-center w-[100%] text-white p-2 rounded hover:bg-green-500">
                        Vote
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CandidateVoteCard;
