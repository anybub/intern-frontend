import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateElection from "@/_root/pages/admin/CreateElection";
import { AddCandidate, AddVoters } from "@/_root/pages";
import { useParams } from "react-router-dom";
const CreateElectionDashboard = () => {
    const { id } = useParams();
    const [show, setShow] = useState(id === undefined ? 0 : 1);
    const [electionId, setElectionId] = useState<string | undefined>(id);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-[100vh] w-full">
            <div className="bg-gray-800 text-white p-6 flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">Election Creation</h2>
                <Button
                    disabled={show === 0}
                    onClick={() => setShow(0)}
                    className="text-lg hover:bg-gray-700 p-2 rounded">
                    Intialise Election
                </Button>
                <Button
                    disabled={show === 1}
                    onClick={() => setShow(1)}
                    className="text-lg hover:bg-gray-700 p-2 rounded">
                    Add Candidates
                </Button>
                <Button
                    disabled={show === 2}
                    onClick={() => setShow(2)}
                    className="text-lg hover:bg-gray-700 p-2 rounded">
                    Add Voters
                </Button>
            </div>
            <div className="col-span-2">
                {show === 0 && electionId === undefined && (
                    <CreateElection setElectionId={setElectionId} />
                )}
                {show === 1 && electionId !== undefined && (
                    <AddCandidate electionId={electionId} />
                )}
                {show === 2 && electionId !== undefined && <AddVoters />}
            </div>
        </div>
    );
};

export default CreateElectionDashboard;
