import { useState } from "react";
import CandidateCard from "@/components/ui/candidateCard";
const App = () => {
    const [email, setEmail] = useState("");

    const [data, setdata] = useState<number[]>([1, 2, 3, 4, 5, 4, 5, 6, 7]);

    const handleSubmit = () => {
        // setdata("hue");
    };

    return (
        <div className="container mx-auto p-4 bg-slate-500 ">
            <h1 className="text-2xl font-bold mb-4">Add Candidate</h1>
            <form
                className="flex w-[100%]  items-center justify-center gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-[90%]"
                    placeholder="Enter candidate email"
                    required
                />
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="bg-blue-500 flex items-center justify-center  w-[10%] text-white p-2 rounded">
                    Search
                </button>
            </form>
            <CandidateCard initial={false} />

            <div className="flex flex-col mt-8">
                <h1>Already Added Candidates</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
                    {data.map(() => (
                        <CandidateCard initial={true} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
