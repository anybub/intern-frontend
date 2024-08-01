import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PreviousElectionCard from "@/components/shared/previousElectionCard";
import useUserStore from "@/store/useUser";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
interface reqType{
  _id:string;
  name:string;
  email:string;
}
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cnt] = useState([1, 2, 3, 4, 5]);
  const { user } = useUserStore((state) => {
    return { user: state.user };
  });
  const makeRequest = useMutation({
    mutationFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user/makeRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.username,
        }),
      }).then((res) => res.json());
      return res;
    },
  });
  const approveRequest = useMutation({
    mutationFn: async (email:string) => {
      const res = await fetch("http://localhost:5000/api/v1/user/makeAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      }).then((res) => res.json());
      return res;
    },
  });
  const { isPending,data:requests} = useQuery({
    queryKey: ["getRequests"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((res) => res.json());
      return res;
    },
  });
  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const handleRequest = async () => {
    try {
      await makeRequest.mutateAsync();
    } catch (error) {
      toast({
        title: "Error",
        description: "Already Requested",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  const handleApprove = async (email:string) => {
   try{
      await approveRequest.mutateAsync(email);
   }catch(error){
      console.log(error);
      toast({ 
        title: "Error",
        description: "Error in approving the request",
        variant: "destructive",
      });
   }
  }
  if (user === null) {
    return null; // or a loading indicator if preferred
  }

  return (
    <div className="w-full h-[100vh] flex flex-col gap-3 bg-dark-2 p-8">
      <h1 className="text-white  text-center text-4xl">Dashboard</h1>
      <h2 className="text-white text-xl">User Info:</h2>
      <div className="text-white flex justify-around gap-2 my-8">
        <p>Name: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
      {(user?.role === "Admin" || user?.role === "Super Admin") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-4">
          {cnt.map((_, index) => (
            <PreviousElectionCard key={index} heading="ECE" date="2021-2022" />
          ))}
        </div>
      )}
      {(user?.role === "Admin" || user?.role === "Super Admin") && (
        <Button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/createElection")}
        >
          Create Election
        </Button>
      )}
      {user?.role === "General" && (
        <Button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={handleRequest}
          disabled={makeRequest.isPending}
        >
          Request To Become A Admin
        </Button>
      )}
      {user.role === "Super Admin" && (
        <div className="w-full">
          <h2 className="h2-bold p-3 text-off-white">
            Approve pending requests to become an admin
          </h2>
          <div className="flex flex-row md:flex-col">
            {isPending && <p>Loading...</p>}
            {requests &&
              requests.map((req:reqType) => (
                <div
                  key={req._id}
                  className="block p-4 m-4 bg-primary-700 rounded-lg shadow hover:shadow-lg transition-shadow hover:bg-secondary-500 hover:text-dark-1 duration-200"
                >
                  <h4 className="h3-bold p-2">{req.name}</h4>
                  <p className="base-medium px-4">{req.email}</p>
                  <Button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    onClick={()=>handleApprove(req.email)}>
                    Approve
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
