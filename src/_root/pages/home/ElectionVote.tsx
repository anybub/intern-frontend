import React, { useState } from "react";
import CandidateCard from "./CandidateCard"; // Ensure this path is correct
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/useUser";
import { UserType } from "@/store/useUser";
const ElectionVote: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const [votedFor, setVotedFor] = useState<string | null>(null);
    const { electionId } = useParams();
    const { toast } = useToast();

    const { isLoading, data } = useQuery({
        queryKey: ["getElectionCandidates", electionId],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/getElectionCandidates?electionId=${electionId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            if (!res.ok) {
                toast({
                    title: "Error",
                    description: "Error fetching candidates",
                    variant: "destructive",
                });
            }
            const result = await res.json();
            console.log(result.data);
            return result.data;
        },
    });

    const handleVote = (id: string) => {
        setVotedFor(id);
        toast({
            title: "Success",
            description: "You have successfully voted",
            // variant: "success",
        });
        // alert(`You voted for candidate with id: ${id}`);
    };

    const handleEndElection = () => {
        // todo end election

        toast({
            title: "Success",
            description: "Election ended successfully",
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto w-full px-4">
            <h1 className="text-3xl font-bold mt-8 mb-4 text-center">
                {data.name}
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Post: {data.post}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.candidates.map((candidate: Partial<UserType>) => (
                    <div key={candidate._id} className="flex justify-center">
                        <CandidateCard
                            initial={votedFor === candidate._id}
                            candidate={{
                                id: candidate._id as string,
                                name: candidate.username as string,
                                scholarId: candidate.scholarId as string,
                                branch: candidate.branch as string,
                            }}
                            handleVote={() =>
                                handleVote(candidate._id as string)
                            }
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                {user?._id === data?.creator && (
                    <Button
                        onClick={handleEndElection}
                        className="bg-blue-500 h-[100%] flex items-center justify-center text-white py-2 rounded px-6  hover:bg-green-500">
                        End Election
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ElectionVote;