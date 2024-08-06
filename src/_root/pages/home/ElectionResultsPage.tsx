import Result from "./Result";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
const ElectionResultsPage = () => {
  const { electionId } = useParams();
  const { toast } = useToast();
  const { isLoading, data } = useQuery({
    queryKey: ["getElectionInfo"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/election/getElectionInfo?electionId=${electionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        toast({
          title: "Error",
          description: "Error fetching ElectionInfo",
          variant: "destructive",
        });
      }
      const result = await res.json();
      return result.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-center flex-col w-full ">
      <h1 className="font-extrabold text-lg">{data?.name}</h1>
      <Result
        post={data?.post}
        candidates={data?.candidates}
        electionId={data?.electionId}
      />
    </div>
  );
};

export default ElectionResultsPage;
