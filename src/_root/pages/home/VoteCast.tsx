import React, { useState } from "react";
import CandidateCard from "./CandidateCard"; // Ensure this path is correct
import { Button } from "@/components/ui/button";
const candidates = [
    { id: 1, name: "Alice", scholarId: "2113131", branch: "Electrical" },
    { id: 2, name: "Bob", scholarId: "2113132", branch: "Mechanical" },
    {
        id: 3,
        name: "Charlie",
        scholarId: "2113133",
        branch: "Computer Science",
    },
];

const VoteCast: React.FC = () => {
    const [votedFor, setVotedFor] = useState<number | null>(null);

    const handleVote = (id: number) => {
        setVotedFor(id);
        alert(`You voted for candidate with id: ${id}`);
    };

    const handleEndElection = () => {
        alert("Election ended.");
        // Add any additional logic for ending the election here
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mt-8 mb-4 text-center">
                Gymkhana Election
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Post: VP
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                    <div key={candidate.id} className="flex justify-center">
                        <CandidateCard
                            initial={votedFor === candidate.id}
                            candidate={candidate}
                            handleVote={() => handleVote(candidate.id)}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Button
                    onClick={handleEndElection}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                    End Election
                </Button>
            </div>
        </div>
    );
};

export default VoteCast;
