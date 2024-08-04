import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSlider from "@/components/shared/HeroSlider";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
interface ElectionType {
    _id: string;
    name: string;
    desp: string;
}
const Home: React.FC = () => {
    const { toast } = useToast();
    const { isLoading, data, error } = useQuery({
        queryKey: ["getElections"],
        queryFn: async () => {
            const res = await fetch(
                "http://localhost:5000/api/v1/election/getElection",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((res) => res.json());
            return res.data;
        },
    });
    // console.log(data);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        toast({
            title: "Error",
            description: "Error fetching elections",
            variant: "destructive",
        });
        return <p>Error loading elections</p>;
    }
    return (
        <div className="bg-dark-1">
            <HeroSlider />
            <div className="flex flex-col text-center gap-10 mt-5">
                <div>
                    <h2 className="h2-bold p-3 text-off-white">About</h2>
                    <p className="w-[80%] m-auto body-medium text-light-2">
                        e-Election is a modern voting system that leverages
                        blockchain technologies to ensure transparency,
                        security, and immutability of the voting process. By
                        utilizing blockchain, every vote is recorded on a
                        decentralized and tamper-proof ledger, making it
                        virtually impossible to manipulate or alter the results.
                        This technology eliminates the need for intermediaries
                        and provides a trustless environment for conducting
                        elections. With e-Election, voters can have confidence
                        in the integrity of the electoral process, and the
                        results can be easily audited and verified by anyone.
                        Join us in embracing the future of democracy with
                        e-Election and blockchain technologies.
                    </p>
                </div>
                <div>
                    <h2 className="h2-bold text-off-white">
                        Current Elections
                    </h2>
                    <div className="flex flex-col md:flex-row">
                        {data?.ongoingElections?.length > 0 ? (
                            data.ongoingElections.map(
                                (election: Partial<ElectionType>) => (
                                    <Link
                                        key={election._id}
                                        to={`/elections/${election._id}`}
                                        className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500 hover:text-dark-1 duration-200">
                                        <h4 className="h3-bold p-2">
                                            {election.name}
                                        </h4>
                                        <p className="base-medium px-4">
                                            {election.desp}
                                        </p>
                                    </Link>
                                )
                            )
                        ) : (
                            <p className="text-light-2 m-auto text-center body-medium py-2">
                                No ongoing elections at the moment.
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="h2-bold text-off-white">
                        Upcoming Elections
                    </h2>
                    <div className="flex flex-col md:flex-row">
                        {data?.upcomingElections?.length > 0 ? (
                            data.upcomingElections.map(
                                (election: Partial<ElectionType>) => (
                                    <Link to={`/electionVote/${election._id}`}>
                                        <div
                                            key={election._id}
                                            className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500 hover:text-dark-1 duration-200">
                                            <h4 className="h3-bold p-2">
                                                {election.name}
                                            </h4>
                                            <p className="base-medium px-4">
                                                {election.desp}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            )
                        ) : (
                            <p className="text-light-2 m-auto text-center body-medium py-2">
                                No upcoming elections at the moment.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
