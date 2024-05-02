import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import { RedirectToSignIn, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import NumberPlateDetection from "./components/NumberPlateDetection";
import CarCounting from "./components/CarCounting";
import ParkingSpace from "./components/ParkingSpace";
import HomePage from "./components/HomePage";
import Navabar from "./components/Navabar";
import History from "./components/History";

function App() {
  return (
    <div>

        <header>
            <SignedOut>
                {/* <SignInButton className="signin-btn" /> */}
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>

                <Router>
                <header>
                    <Navabar/>
                </header>

                <div className="mt-20"></div>

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/number-plate-detection" element={<NumberPlateDetection />} />
                        <Route path="/count-vehicle" element={<CarCounting />} />
                        <Route path="/parking-space" element={<ParkingSpace />} />
                        <Route path="/history" element={<History />} />
                    </Routes>
                </Router>
            </SignedIn>
        </header>
    </div>
  );
}

export default App;
