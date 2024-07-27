import { useState } from "react";
import { Button } from "../ui/button";
import CreateElection from "@/_auth/forms/CreateElection";
const Sidebar = () => {
    const [show, setShow] = useState(0);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 h-screen w-full">
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
            <div className="col-span-2 bg-gray-100 p-6">
                {show === 0 && <CreateElection />}
            </div>
        </div>
    );
};

export default Sidebar;
