import { useState } from "react";
import BranchCard from "@/components/ui/branchCard";
// import { log } from "console";

// Define types for the branch and year keys
type Branch = "cse" | "ece" | "eie" | "ee" | "me" | "ce";
type Year = "first-year" | "second-year" | "third-year" | "final-year";

const AddVoters = () => {
  const [error, setError] = useState<string | null>(null);
  const [cnt, setCnt] = useState([1, 2, 3, 4, 5]);
  const [scholarIdRange, setScholarIdRange] = useState({
    start: 1000000,
    end: 9999999,
  });

  const ranges: Record<Branch, Record<Year, { start: number; end: number }>> = {
    cse: {
      "first-year": { start: 2412001, end: 2412170 },
      "second-year": { start: 2312001, end: 2312170 },
      "third-year": { start: 2212001, end: 2212170 },
      "final-year": { start: 2112001, end: 2112170 },
    },
    ece: {
      "first-year": { start: 2414001, end: 2414170 },
      "second-year": { start: 2314001, end: 2314170 },
      "third-year": { start: 2214001, end: 2214170 },
      "final-year": { start: 2114001, end: 2114170 },
    },
    eie: {
      "first-year": { start: 211, end: 1999999 },
      "second-year": { start: 2000000, end: 2999999 },
      "third-year": { start: 3000000, end: 3999999 },
      "final-year": { start: 4000000, end: 4999999 },
    },
    ee: {
      "first-year": { start: 2413001, end: 2413170 },
      "second-year": { start: 2313001, end: 2313170 },
      "third-year": { start: 2213001, end: 2213170 },
      "final-year": { start: 2113001, end: 2113170 },
    },
    me: {
      "first-year": { start: 211, end: 1999999 },
      "second-year": { start: 2000000, end: 2999999 },
      "third-year": { start: 3000000, end: 3999999 },
      "final-year": { start: 2116001, end: 4999999 },
    },
    ce: {
      "first-year": { start: 2411001, end: 2411170 },
      "second-year": { start: 2311001, end: 2311170 },
      "third-year": { start: 2211001, end: 2211170 },
      "final-year": { start: 2111001, end: 2111170 },
    },
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const branch = form.branch.value as Branch;
    const year = form.year.value as Year;

    if (ranges[branch] && ranges[branch][year]) {
      console.log(ranges[branch][year]);
      setScholarIdRange(ranges[branch][year]);

      setError(null);
    } else {
      setError("Invalid branch or year selected.");
    }
  };

  return (
    <div className="bg-slate-500 text-black">
      <div className="container mx-auto px-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-4">Add Voters</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="branch" className="block text-lg font-medium mb-2">
              Select Branch:
            </label>
            <select
              id="branch"
              name="branch"
              className="border rounded p-2 w-full"
            >
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eie">EIE</option>
              <option value="ee">EE</option>
              <option value="me">ME</option>
              <option value="ce">CE</option>
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-lg font-medium mb-2">
              Select Year:
            </label>
            <select id="year" name="year" className="border rounded p-2 w-full">
              <option value="first-year">1st Year</option>
              <option value="second-year">2nd Year</option>
              <option value="third-year">3rd Year</option>
              <option value="final-year">4th Year</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
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
