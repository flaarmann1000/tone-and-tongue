import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Start() {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
              START{" "}
            </span>
          </button>
        </div>
        <div className="col-start-3 col-span-3 text-white text-left content-center mt-32">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">
            Getting started
          </p>
          <p className="text-l">
            You will be guided through five experiments. For each basic taste,
            we will ask you to taste a characteristic food and adjust a sound
            accordingly. To make sure, you have the required food at hand, we
            compiled a shopping list.
          </p>
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

export default Start;
