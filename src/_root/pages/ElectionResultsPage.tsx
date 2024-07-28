import React from "react";
import Result from "./Result";

const candidates = [
    {
        name: "Candidate A",
        scholarId: "2113131",
        branch: "Electrical",
        imageUrl: "image_url_1",
        voteCount: 120,
    },
    {
        name: "Candidate B",
        scholarId: "2113132",
        branch: "Mechanical",
        imageUrl: "image_url_2",
        voteCount: 150,
    },
    {
        name: "Candidate C",
        scholarId: "2113133",
        branch: "Civil",
        imageUrl: "image_url_3",
        voteCount: 100,
    },
];

const ElectionResultsPage = () => {
    return (
        <div className="flex-center flex-col w-full ">
            <h1>GYMKHANA ELECTION 2025</h1>
            <Result post="President" candidates={candidates} />
        </div>
    );
};

export default ElectionResultsPage;
