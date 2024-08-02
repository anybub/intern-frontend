import { Routes, Route } from "react-router-dom";

import "./index.css";
import SignupForm from "./_auth/forms/SignupForm";
import SignInForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home, ElectionResultsPage } from "./_root/pages";
import Dashboard from "./_root/pages/admin/Dashboard";
import { Toaster } from "./components/ui/toaster";
import CreateElectionDashboard from "./_root/pages/admin/CreateElectionDashboard";
//import VoteCast from "./_root/pages/home/VoteCast";
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
                    {/* <Route
                        path="/createElection"
                        element={<CreateElectionDashboard />}
                    /> */}
                    <Route
                        path="/createElection/:id"
                        element={<CreateElectionDashboard />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/result/:id"
                        element={<ElectionResultsPage />}
                    />
                    {/* <Route path="/votecast" element={<VoteCast />} /> */}
                </Route>
            </Routes>
            <Toaster />
        </main>
    );
}

export default App;
