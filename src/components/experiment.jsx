import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ExpStart from "./experiment/expstart";
import Tune from "./experiment/tune";
import PageTransitionWrapper from "./PageTransitionWrapper";
import { AnimatePresence } from "framer-motion"; // For animations

function Experiment({ foods }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [flavor, setFlavor] = useState(0);
  const [step, setStep] = useState(0);

  const onInc = () => {
    setStep(step + 1);
  };

  const renderComponent = () => {
    switch (step) {
      case 0:
        return (
          <ExpStart foods={foods} flavor={flavor} onStart={onInc}></ExpStart>
        );
      case 1:
        return <Tune foods={foods} flavor={flavor}></Tune>;
    }
  };

  return (
    <div>
      <div className="fixed w-full grid grid-cols-9 ">
        <AnimatePresence mode="wait">
          <PageTransitionWrapper key={step}>
            {renderComponent()}
          </PageTransitionWrapper>
        </AnimatePresence>
        {/* {renderComponent()} */}
      </div>
    </div>
  );
}

export default Experiment;
