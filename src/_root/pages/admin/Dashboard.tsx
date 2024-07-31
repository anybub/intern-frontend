import useUserStore from "@/store/useUser";

const Dashboard = () => {
    const {user}=useUserStore((state)=>{
        return {user:state.user}
    });
    return (
        <div className="w-full flex flex-col gap-3 bg-dark-2">
            <h1 className="text-white text-2xl">Dashboard</h1>
            <h2 className="text-white text-xl">
                User Info:
            </h2>
            <div className="text-white flex flex-col gap-2">
                <p>Name: {user?.username}</p>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
            </div>
            {
                user?.role==="admin" &&(
                    
                )
            }
        </div>
    )
};

export default Dashboard;