import { Navigate, Outlet } from "react-router-dom";
import useUserStore  from "@/store/useUser";
import Topbar from "@/components/shared/Topbar";
const AuthLayout = () => {
  const {user}=useUserStore((state)=>({
    user:state.user
  })
  )
  return (
    <>
      {user?(
        <Navigate to="/" />
      ):(
        <div className="w-full md:flex-col">
          <Topbar />
          <section className=" bg-dark-1 flex items-center justify-center min-h-[100%]">
            <Outlet />
          </section>
        </div>
      )}
    </>
  )
}

export default AuthLayout