import { useBlockChain } from "@/store/useBlockChain";
import { AddressLike } from "ethers";
import { useEffect, useState } from "react";

interface Candidate {
  name: string;
  scholarId: string;
  address: string;
  branch: string;
  imageUrl: string;
  voteCount: number;
}

interface ResultProps {
  post: string;
  candidates: Candidate[];
  electionId: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  isWinner: boolean;
}

const CandidateCard = ({ candidate, isWinner }: CandidateCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 bg-primary-700">
      <img className="w-full" src={candidate.imageUrl} alt={candidate.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{candidate.name}</div>
        <p className="text-base text-white font-bold">
          ScholarId: {candidate.scholarId}
        </p>
        <p className="text-base text-white font-bold">
          Branch: {candidate.branch}
        </p>
        {isWinner && (
          <p className="text-base text-yellow-400 font-bold">
            Votes: {candidate.voteCount}
          </p>
        )}
      </div>
    </div>
  );
};

const Result = ({ post, candidates, electionId }: ResultProps) => {
  const [winner, setWinner] = useState<Candidate | null>(null);
  const contract = useBlockChain((state) => state.contract);
  useEffect(() => {
    const fetchWinner = async () => {
      const winner = await contract?.getWinner(electionId);
      const winnerVoteCount = await contract?.getVotes(
        electionId,
        winner as AddressLike
      );
      const winnerData = candidates.find(
        (candidate) => candidate.address === winner
      );
      if (winnerData) {
        winnerData.voteCount = Number(winnerVoteCount);
        setWinner(winnerData);
      }
    };
    const setVotes = async () => {
      candidates.forEach(async (candidate) => {
        const voteCount = await contract?.getVotes(
          electionId,
          candidate.address as AddressLike
        );
        candidate.voteCount = Number(voteCount);
      });
    };
    fetchWinner();
    setVotes();
  }, [electionId, contract, candidates]);

  if (candidates.length === 0) return <p>No candidates available</p>;
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Election Result for {post}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.scholarId}
            candidate={candidate}
            isWinner={candidate.address === winner?.address}
          />
        ))}
      </div>
      <div className="mt-8 p-4 bg-green-500 rounded-lg text-white text-center">
        <h3 className="text-2xl font-bold">Winner: {winner?.name}</h3>
        <p>Vote Count: {winner?.voteCount}</p>
      </div>
    </div>
  );
};

export default Result;
