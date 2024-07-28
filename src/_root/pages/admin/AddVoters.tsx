import React, { useState } from "react";
import BranchCard from "@/components/ui/branchCard";

const AddVoters = () => {
    const [startRange, setStartRange] = useState<number | "">("");
    const [endRange, setEndRange] = useState<number | "">("");
    const [cnt, setCnt] = useState([3, 3, 54, 5, 6, 7, 7, 71, 2, 3]);
    const [error, setError] = useState<string | null>(null);
    const scholarIdRange = { start: 1000000, end: 9999999 };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            startRange.toString().length !== 7 ||
            endRange.toString().length !== 7
        ) {
            setError("Scholar ID range should be a 7-digit value.");
        } else {
            setError(null);
            console.log({ startRange, endRange });
        }
    };

    return (
        <div className="bg-slate-500 text-black">
            <div className="container mx-auto px-8 p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-center font-bold mb-4">
                    Add Voters
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="branch"
                            className="block text-lg font-medium mb-2">
                            Select Branch:
                        </label>
                        <select
                            id="branch"
                            name="branch"
                            className="border rounded p-2 w-full">
                            <option value="cse">CSE</option>
                            <option value="ece">ECE</option>
                            <option value="eie">EIE</option>
                            <option value="ee">EE</option>
                            <option value="me">ME</option>
                            <option value="ce">CE</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="year"
                            className="block text-lg font-medium mb-2">
                            Select Year:
                        </label>
                        <select
                            id="year"
                            name="year"
                            className="border rounded p-2 w-full">
                            <option value="first-year">1st Year</option>
                            <option value="second-year">2nd Year</option>
                            <option value="third-year">3rd Year</option>
                            <option value="final-year">4th Year</option>
                        </select>
                    </div>

                    <div>
                        <div>
                            <label
                                htmlFor="start-range"
                                className="block text-lg font-medium mb-2">
                                Starting ScholarID:
                            </label>
                            <input
                                type="number"
                                id="start-range"
                                name="start-range"
                                value={startRange}
                                onChange={(e) =>
                                    setStartRange(Number(e.target.value))
                                }
                                className="border rounded p-2 w-full"
                                placeholder="Enter start ID"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="end-range"
                                className="block text-lg font-medium mb-2">
                                Ending ScholarID:
                            </label>
                            <input
                                type="number"
                                id="end-range"
                                name="end-range"
                                value={endRange}
                                onChange={(e) =>
                                    setEndRange(Number(e.target.value))
                                }
                                className="border rounded p-2 w-full"
                                placeholder="Enter end ID"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
                {cnt.map((value, index) => (
                    <BranchCard
                        key={index}
                        branch="ECE"
                        year="1st"
                        scholarIdRange={scholarIdRange}
                    />
                ))}
            </div>
        </div>
    );
};

export default AddVoters;
