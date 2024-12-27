import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function About() {
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
        <div className="col-start-4 col-span-3 text-white text-left content-center mt-32">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">
            About tone & tongue
          </p>
          <p className="text-l">
            tone & tongue is a project by Nassim & Felix Laarmann. It is an
            invitation to everyone to explore if there's a link between sound
            and taste.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
