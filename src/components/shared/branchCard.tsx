import React from "react";

interface CardProps {
  branch: string;
  year: string;
  scholarIdRange: { start: number | ""; end: number | "" };
}

const BranchCard: React.FC<CardProps> = ({ branch, year, scholarIdRange }) => {
  return (
    <div className=" border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-white">Branch: {branch}</h2>
      <p className="text-lg mb-2 text-white">Year: {year}</p>
      <p className="text-lg text-white">
        Scholar ID Range: {scholarIdRange.start} - {scholarIdRange.end}
      </p>
    </div>
  );
};

export default BranchCard;
