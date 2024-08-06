import useUserStore from "@/store/useUser";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useBlockChain } from "@/store/useBlockChain";
import { isError } from "ethers";
interface candidateCard {
  initial: boolean;
  username: string;
  scholarId: string;
  branch: string;
  address: string;
  electionId: string;
  candidateId: string;
  blockChainElectionId: number;
}
const CandidateCard = ({
  initial,
  username,
  scholarId,
  branch,
  address,
  electionId,
  candidateId,
  blockChainElectionId,
}: candidateCard) => {
  const user = useUserStore((state) => state.user);
  const contract = useBlockChain((state) => state.contract);
  const { toast } = useToast();
  const q = useQueryClient();
  const addCandidate = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/election/addCandidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            electionId: electionId,
            candidateId: candidateId,
          }),
        }
      ).then((res) => res.json());
      return res;
    },
  });
  const handleSubmit = async () => {
    try {
      const tx = await contract?.addCandidate(blockChainElectionId, address);
      await tx?.wait();
      await addCandidate.mutateAsync();
      q.invalidateQueries({
        queryKey: ["candidates"],
        exact: true,
        refetchType: "active",
      });
      toast({
        title: "Candidate Added",
        description: "Candidate Added Successfully",
      });
    } catch (error) {
      if (isError(error, "INSUFFICIENT_FUNDS")) {
        toast({
          title: "Candidate NOT Added",
          description: `${error.message}`,
          variant: "destructive",
        });
      }
      toast({
        title: "Candidate NOT Added",
        description: "Candidate Can't Be Added",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 bg-primary-500">
      <img
        className="w-full h-40 object-cover rounded"
        src="https://cdn.britannica.com/38/196738-159-62BD9150/Slaves-sugarcane-island-aquatint-Caribbean-Antigua-Ten-1832.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{username}</div>
        <p className="text-base text-white font-bold">{scholarId}</p>
        <p className="text-base text-white font-bold">{branch}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex gap-4">
        {!initial && (
          <button
            type="submit"
            className="bg-blue-500 h-[100%] flex items-center justify-center w-[100%] text-white p-2 rounded hover:bg-green-500"
            onClick={handleSubmit}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
