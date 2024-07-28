import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateElection = () => {
    const [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    // Helper function to validate times
    const validateTimes = () => {
        const now = new Date();
        if (!startTime || !endTime) {
            return "Both start time and end time must be selected.";
        }

        if (startTime <= now) {
            return "Start time must be in the future.";
        }

        if (endTime <= startTime) {
            return "End time must be after start time.";
        }

        return null;
    };
    const [err, seterr] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate times
        const validationError = validateTimes();
        if (validationError) {
            // alert(validationError);
            seterr(true);

            return;
        } else {
            seterr(false);
        }

        console.log({ name, post, startTime, endTime });
        setName("");
        setPost("");
        setStartTime(null);
        setEndTime(null);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-500 py-10 px-5 w-full">
            <form
                onSubmit={handleSubmit}
                className="bg-dark-2 p-8 rounded-xl shadow-lg max-w-md w-full m-12">
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
                <div className="mb-4 w-full">
                    <label
                        htmlFor="start-time"
                        className="block text-base-semibold text-white mb-2">
                        Start Time:
                    </label>
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3"
                    />
                    {err && (
                        <p className="text-red-500">
                            Start time must be in the future.
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="end-time"
                        className="block text-base-semibold text-white mb-2 max-w-full">
                        End Time:
                    </label>
                    <div className="w-full">
                        <DatePicker
                            selected={endTime}
                            onChange={(date) => setEndTime(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full h-12 bg-dark-4 border border-dark-4 text-light-4 placeholder:text-light-4 rounded-md px-3"
                        />
                    </div>
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
