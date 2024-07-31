interface candidateCard {
  initial: boolean;
}
const CandidateCard = ({ initial }: candidateCard) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 bg-primary-700">
      <img
        className="w-full h-40 object-cover rounded"
        src="https://cdn.britannica.com/38/196738-159-62BD9150/Slaves-sugarcane-island-aquatint-Caribbean-Antigua-Ten-1832.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">I am Gandu Deepak</div>
        <p className="text-base text-white font-bold">ScholarId:2113133</p>
        <p className="text-base text-white font-bold">Branch:Electrical</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 h-[100%] flex items-center justify-center w-[100%] text-white p-2 rounded hover:bg-green-500"
        >
          Add
        </button>
        {initial && (
          <button
            type="submit"
            className="bg-blue-500 h-[100%] flex items-center justify-center w-[100%] text-white p-2 rounded hover:bg-red"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
