import Footer from "@/components/shared/Footer";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
            <div className="w-full md:flex-col bg-dark-2">
                <Topbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
