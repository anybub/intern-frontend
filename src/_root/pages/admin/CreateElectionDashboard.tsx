import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateElection from "@/_root/pages/admin/CreateElection";
import { AddCandidate, AddVoters } from "@/_root/pages";
import { useParams } from "react-router-dom";
const CreateElectionDashboard = () => {
  const { id } = useParams();
  const [show, setShow] = useState(id === undefined ? 0 : 1);
  const [electionId, setElectionId] = useState<string | undefined>(id);
  const [blockChainElectionId, setBlockChainElectionId] = useState<
    number | undefined
  >(undefined);
  useEffect(() => {
    const setId = async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/election/getElectionInfo?electionId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.data.electionId;
    };
    if (id !== undefined) {
      setId().then((res) => setBlockChainElectionId(res));
    }
  }, [id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-[100%] w-full">
      <div className="bg-gray-800 text-white p-6 flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Election Creation</h2>
        <Button
          disabled={show === 0}
          onClick={() => setShow(0)}
          className="text-lg hover:bg-gray-700 p-2 rounded"
        >
          Intialise Election
        </Button>
        <Button
          disabled={show === 1}
          onClick={() => setShow(1)}
          className="text-lg hover:bg-gray-700 p-2 rounded"
        >
          Add Candidates
        </Button>
        <Button
          disabled={show === 2}
          onClick={() => setShow(2)}
          className="text-lg hover:bg-gray-700 p-2 rounded"
        >
          Add Voters
        </Button>
      </div>
      <div className="col-span-2">
        {show === 0 && electionId === undefined && (
          <CreateElection
            setElectionId={setElectionId}
            setBlockChainElectionId={setBlockChainElectionId}
          />
        )}
        {show === 1 && electionId !== undefined && (
          <AddCandidate
            electionId={electionId}
            blockChainElectionId={blockChainElectionId as number}
          />
        )}
        {show === 2 && electionId !== undefined && (
          <AddVoters
            electionId={electionId}
            blockChainElectionId={blockChainElectionId as number}
          />
        )}
      </div>
    </div>
  );
};

export default CreateElectionDashboard;
