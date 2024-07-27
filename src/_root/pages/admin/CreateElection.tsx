import React, { useState } from "react";
// import { set } from "react-hook-form";

const CreateElection = () => {
    const [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    // Helper function to validate times
    const validateTimes = () => {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (start <= now) {
            return "Start time must be in the future.";
        }

        if (end <= start) {
            return "End time must be after start time.";
        }

        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate times
        const validationError = validateTimes();
        if (validationError) {
            alert(validationError);
            return;
        }

        console.log({ name, post, startTime, endTime });
        setName("");
        setPost("");
        setStartTime("");
        setEndTime("");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-500 py-10 px-5 w-full">
            <form
                onSubmit={handleSubmit}
                className="bg-dark-2 p-8 rounded-xl shadow-lg max-w-md w-full m-12 ">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Create Election
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-base-semibold text-white mb-2">
                        Name of Election:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3"
                        placeholder="Enter election name"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="post"
                        className="block text-base-semibold text-white mb-2">
                        Post:
                    </label>
                    <select
                        id="post"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3">
                        <option value="">Select a post</option>
                        <option value="President">President</option>
                        <option value="Vice President">Vice President</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Treasurer">Treasurer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="start-time"
                        className="block text-base-semibold text-white mb-2">
                        Start Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="end-time"
                        className="block text-base-semibold text-white mb-2">
                        End Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="end-time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full h-12 bg-primary-500 text-light-1 rounded-md hover:bg-primary-600 transition">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateElection;
