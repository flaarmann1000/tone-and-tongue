import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import SynthController from "./synthcontroller";

function Tune({ foods, flavor }) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [audioStep, setAudioStep] = useState(0);
  const audioName = ["pitch", "agressive", "richness", "vibration"];

  return (
    <div>
      <div className="fixed w-full grid grid-cols-9 ">
        <div className="col-start-2 col-span-4 text-2xl text-black text-left mt-32">
          <button
            className="tracking-widest text-xl text-black ease-out duration-300 font-['Didact_Gothic'] group flex items-center "
            onClick={() => navigate("/")}
          >
            <span>←</span>
            <span className=" transition-all ease-out duration-300 ml-2 group-hover:ml-3">
              START
            </span>
          </button>
        </div>
        <div className="col-start-8 col-span-1 text-l text-black text-right mt-16">
          <a>mute</a>
          <br />
          <a>info</a>
        </div>

        <div className="col-start-3 col-span-2 text-white text-left mt-32">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">
            {foods[flavor].flavor}
          </p>
        </div>
        <div className="col-start-3 col-span-2 text-white text-left">
          <p className="text-l">{audioName[audioStep]}</p>
          <br />
          {/* <input type="range" id="volume" name="volume" min="0" max="11" /> */}
          {/* <WaveAnimation></WaveAnimation> */}
        </div>
        <div className="col-start-5 col-span-4 text-white text-left mt-32">
          <SynthController></SynthController>
        </div>
        <div className="col-start-3 col-span-2 text-2xl text-black text-left ">
          <button
            className="tracking-widest text-xl text-black  ease-out duration-300 font-['Didact_Gothic'] group flex items-center mt-4 "
            onClick={() => navigate("/shopping")}
          >
            <span>NEXT </span>
            <span className=" transition-all ease-out duration-300 ml-2 group-hover:ml-3">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tune;
