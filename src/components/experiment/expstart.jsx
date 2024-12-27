import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function ExpStart({ foods, flavor, onStart }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div>
      <div className="fixed w-full grid grid-cols-12 ">
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
        <div className="col-start-4 col-span-8 text-white text-left mt-32">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">
            {foods[flavor].flavor}
          </p>
        </div>
        <div className="col-start-4 col-span-3 text-white text-left">
          <p className="text-l">
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="col-start-8 col-span-3 text-left">
          {foods[0].food.map((food, index) => (
            <li>{food}</li>
          ))}
        </div>
        <div className="col-start-4 col-span-2 text-2xl text-black text-left ">
          <button
            className="tracking-widest text-xl text-black  ease-out duration-300 font-['Didact_Gothic'] group flex items-center mt-4 "
            onClick={onStart}
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

export default ExpStart;
