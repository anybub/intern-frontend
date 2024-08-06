import React from "react";
import CandidateVoteCard from "./CandidateVoteCard";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/useUser";
import { UserType } from "@/store/useUser";
import { format } from "date-fns";
import { useBlockChain } from "@/store/useBlockChain";
import { AddressLike, isError } from "ethers";
const ElectionVote: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const contract = useBlockChain((state) => state.contract);
    const { electionId } = useParams();
    const { toast } = useToast();
    const { isLoading: isEligiblePending, data: isEligible } = useQuery({
        queryKey: ["isEligibleToVote"],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/eligible?electionId=${electionId}`,
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
                    description: "Something went wrong",
                    variant: "destructive",
                });
            }
            const result = await res.json();
            return result.data;
        },
    });
    const { isLoading, data } = useQuery({
        queryKey: ["getElectionInfo"],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/getElectionInfo?electionId=${electionId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!res.ok) {
                toast({
                    title: "Error",
                    description: "Error fetching ElectionInfo",
                    variant: "destructive",
                });
            }
            const result = await res.json();
            console.log(result);
            return result.data;
        },
    });
    const hasVoted = useMutation({
        mutationFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/voted?electionId=${electionId}`,
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
                    description: "Error voting",
                    variant: "destructive",
                });
            }
            const result = await res.json();
            return result.data;
        },
    });
    const endElection = useMutation({
        mutationFn: async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/election/endElection`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({ electionId }),
                }
            );
            if (!res.ok) {
                toast({
                    title: "Error",
                    description: "Error ending election",
                    variant: "destructive",
                });
            }
            const result = await res.json();
            return result.data;
        },
    });
    const handleVote = async (candidateAddress: AddressLike) => {
        try {
            const tx = await contract?.vote(data?.electionId, candidateAddress);
            await tx?.wait();
            await hasVoted.mutateAsync();
            toast({
                title: "Success",
                description: "You have successfully voted",
            });
        } catch (error) {
            if (isError(error, "INSUFFICIENT_FUNDS")) {
                toast({
                    title: "Error",
                    description: `Error voting ${error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: `Error voting`,
                    variant: "destructive",
                });
            }
        }
    };

    const handleEndElection = async () => {
        try {
            const tx = await contract?.endElection(data?.electionId);
            await tx?.wait();
            await endElection.mutateAsync();
            toast({
                title: "Success",
                description: "You have successfully ended election",
            });
        } catch (error) {
            if (isError(error, "INSUFFICIENT_FUNDS")) {
                toast({
                    title: "Error",
                    description: `Error ending election ${error.message}`,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: `Error ending election`,
                    variant: "destructive",
                });
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto w-full px-4">
            {user === null && (
                <h1 className="text-3xl font-bold mt-8 mb-4 text-center text-red">
                    Please sign in to vote
                </h1>
            )}
            <h1 className="text-3xl font-bold mt-8 mb-4 text-center">
                {data?.name}
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Post: {data?.post}
            </h2>
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Start Time: {format(data?.startTime, "dd/MM/yyyy HH:mm")}
            </h2>
            {new Date() < new Date(data?.startTime) && (
                <h2 className="text-xl font-semibold mb-6 text-center text-red">
                    Election is not started yet
                </h2>
            )}
            {!isEligiblePending &&
                !isEligible &&
                user &&
                new Date() >= new Date(data?.startTime) && (
                    <h2 className="text-xl font-semibold mb-6 text-center text-red">
                        You are not eligible to vote ,or you alredy voted
                    </h2>
                )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.candidates.map((candidate: Partial<UserType>) => (
                    <div key={candidate._id} className="flex justify-center">
                        <CandidateVoteCard
                            candidate={{
                                id: candidate._id as string,
                                name: candidate.username as string,
                                scholarId: candidate.scholarId as string,
                                branch: candidate.branch as string,
                            }}
                            handleVote={() => {
                                handleVote(candidate.address as AddressLike);
                            }}
                            isEligible={isEligible as boolean}
                            startTime={data.startTime as Date}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                {user?._id === data?.creator && (
                    <Button
                        onClick={handleEndElection}
                        variant={"destructive"}
                        className="bg-red h-[100%] flex items-center justify-center text-white py-2 rounded px-6  hover:bg-green-500">
                        End Election
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ElectionVote;
