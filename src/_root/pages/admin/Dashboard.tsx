import PreviousElectionCard from "@/components/shared/previousElectionCard";
import useUserStore from "@/store/useUser";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [cnt] = useState([1, 2, 3, 4, 5]);

    const { user } = useUserStore((state) => {
        return { user: state.user };
    });
    return (
        <div className="w-full h-[100vh] flex flex-col gap-3 bg-dark-2 p-8">
            <h1 className="text-white  text-center text-4xl">Dashboard</h1>
            <h2 className="text-white text-xl">User Info:</h2>
            <div className="text-white flex justify-between gap-2 my-8">
                <p>Name: {user?.username}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
            </div>
            {
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-4">
                    {cnt.map((value, index) => (
                        <PreviousElectionCard
                            key={index}
                            heading="ECE"
                            date="2021-2022"
                        />
                    ))}
                </div>
            }

            <Link
                to="/createElection"
                className="flex  justify-center items-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-[200px] text-center">
                    Create Election
                </button>
            </Link>
        </div>
    );
};

export default Dashboard;
