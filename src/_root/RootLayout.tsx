import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex-col">
      <Topbar />
      {/* <LeftSidebar /> */}

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      {/* <Bottombar /> */}
      {/* <footer className="z-50 flex-center bg-primary-600 py-2">@anubhab</footer> */}
    </div>
  );
};

export default RootLayout;
