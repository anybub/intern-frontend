import { Routes, Route } from "react-router-dom";

import './index.css'
import SignupForm from "./_auth/forms/SignupForm";
import SignInForm from "./_auth/forms/SignInForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import {  Explore, Home, Votes } from "./_root/pages";


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
          {/* <Route path="/candidates" element={<Candidates />} /> */}
          <Route path="/votes" element={<Votes />} />
          {/* <Route path="/createelection" element={<CreateElection />} /> */}

          </Route>
      </Routes>
      
      
    </main>
  )
}

export default App
