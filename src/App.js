import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Domain from "./Domain";
import DDOSAttack from "./DDOSAttack";
import Homepage from "./Homepage";
import TrafficChange from "./TrafficChange";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/domain" element={<Domain />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/ddosAttack" element={<DDOSAttack />} />
                <Route path="/trafficChange" element={<TrafficChange />} />
            </Routes>
        </Router>
    );
}

export default App;
