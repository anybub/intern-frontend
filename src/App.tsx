import { Routes, Route } from "react-router-dom";

import "./index.css";
import SignupForm from "./_auth/forms/SignupForm";
import SignInForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Explore, Home, Votes } from "./_root/pages";
import Sidebar from "./components/shared/Sidebar";
import ElectionResultsPage from "./_root/pages/ElectionResultsPage";

function App() {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SignInForm />} />
                    <Route path="/sign-up" element={<SignupForm />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/votes" element={<Votes />} />
                    <Route path="/createElection" element={<Sidebar />} />
                    <Route path="/result" element={<ElectionResultsPage />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App;
