import "./App.css"

import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence} from 'framer-motion'; // For animations


import Landing from "./components/landing";
import Background from "./components/background";
import About from "./components/about";
import Start from "./components/start";
import Shopping from "./components/shopping";
import Experiment from "./components/experiment";
import PageTransitionWrapper from "./components/PageTransitionWrapper";

function App() {
  const location = useLocation(); // Get the current location for transitions
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch("/food.json") // Make sure to provide the correct path to your food.json
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  return (
    <div className="App">
      <Background />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            
        <Route
            path="/"
            element={
              <PageTransitionWrapper>
                <Landing />
              </PageTransitionWrapper>
            }
          />
            <Route path="/about" element={<PageTransitionWrapper><About /></PageTransitionWrapper>} />
            <Route path="/start" element={<PageTransitionWrapper><Start /></PageTransitionWrapper>} />
            <Route path="/shopping" element={<PageTransitionWrapper><Shopping foods={foods} /></PageTransitionWrapper>} />
            <Route path="/experiment" element={<PageTransitionWrapper><Experiment foods={foods} /></PageTransitionWrapper>} />            
          </Routes>
          </AnimatePresence>

    </div>
  );
}

export default App;
