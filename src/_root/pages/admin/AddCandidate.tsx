import { useState } from "react";
import CandidateCard from "@/components/shared/candidateCard";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { UserType } from "@/store/useUser";
import useUserStore from "@/store/useUser";
interface props {
    electionId: string;
}
const AddCandidate = ({ electionId }: props) => {
    const { toast } = useToast();
    const q = useQueryClient();
    const user = useUserStore((state) => state.user);
    const [scholarId, setScholarId] = useState("");
    const [candidate, setCandidate] = useState<UserType | null>(null);
    const { isPending, data } = useQuery({
        queryKey: ["candidates"],
        queryFn: async () => {
            const data = await fetch(
                `http://localhost:5000/api/v1/election/getElectionCandidates?electionId=${electionId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`, //Authorization: `Bearer ${user?.token}`,
                    },
                }
            ).then((res) => res.json());
            console.log(data.data);
            return data.data.candidates;
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data = await fetch(
                `http://localhost:5000/api/v1/user/scholarId?scholarId=${scholarId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            ).then((res) => res.json());
            data = data.data;
            console.log(data);
            const userData: UserType = {
                username: data?.username,
                email: data?.email,
                role: data?.role,
                _id: data?._id,
                token: data?.token,
                address: data?.address,
                branch: data?.branch,
                scholarId: data?.scholarId,
            };
            console.log(userData);

            setCandidate(userData);
            q.invalidateQueries({
                queryKey: ["candidates"],
                exact: true,
                refetchType: "active",
            });
            toast({
                title: "Candidate Found",
                description: "Candidate with given scholarId  found",
            });
        } catch (err) {
            toast({
                title: "Candidate Not Found",
                description: "Candidate with given scholarId not found",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto p-4 bg-dark-2 ">
            <h1 className="text-2xl font-bold mb-4">Add Candidate</h1>
            <form
                className="flex w-[100%]  items-center justify-center gap-4"
                onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="string"
                    id="scholarId"
                    name="ScholarId"
                    value={scholarId}
                    onChange={(e) => setScholarId(e.target.value)}
                    className="border p-2 rounded w-[90%] text-black"
                    placeholder="Enter candidate scholarId"
                    required
                />
                <button
                    type="submit"
                    // onSubmit={(e) => handleSubmit(e)}
                    className="bg-primary-500 flex items-center justify-center  w-[10%] text-white p-2 rounded">
                    Search
                </button>
            </form>
            {candidate && (
                <CandidateCard
                    initial={false}
                    username={candidate?.username}
                    branch={candidate?.branch}
                    scholarId={candidate?.scholarId}
                    candidateId={candidate?._id}
                    electionId={electionId}
                />
            )}

            <div className="flex flex-col mt-8">
                <h1>Already Added Candidates</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
                    {isPending && <p>Loading...</p>}
                    {data?.length > 0 &&
                        data.map((e: Partial<UserType>) => (
                            <CandidateCard
                                key={e?.scholarId}
                                initial={true}
                                username={e?.username || ""}
                                branch={e?.branch || ""}
                                scholarId={e?.scholarId || ""}
                                candidateId={candidate?._id || ""}
                                electionId={electionId}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AddCandidate;
