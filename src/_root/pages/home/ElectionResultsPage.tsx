import Result from "./Result";

const candidates = [
    {
        name: "Candidate A",
        scholarId: "2113131",
        branch: "Electrical",
        imageUrl: "https://cdn.britannica.com/38/196738-159-62BD9150/Slaves-sugarcane-island-aquatint-Caribbean-Antigua-Ten-1832.jpg",
        voteCount: 120,
    },
    {
        name: "Candidate B",
        scholarId: "2113132",
        branch: "Mechanical",
        imageUrl: "https://cdn.britannica.com/38/196738-159-62BD9150/Slaves-sugarcane-island-aquatint-Caribbean-Antigua-Ten-1832.jpg",
        voteCount: 150,
    },
    {
        name: "Candidate C",
        scholarId: "2113133",
        branch: "Civil",
        imageUrl: "https://cdn.britannica.com/38/196738-159-62BD9150/Slaves-sugarcane-island-aquatint-Caribbean-Antigua-Ten-1832.jpg",
        voteCount: 100,
    },
];

const ElectionResultsPage = () => {
    return (
        <div className="flex-center flex-col w-full ">
            <h1 className="font-extrabold text-lg">GYMKHANA ELECTION 2025</h1>
            <Result post="President" candidates={candidates} />
        </div>
    );
};

export default ElectionResultsPage;
