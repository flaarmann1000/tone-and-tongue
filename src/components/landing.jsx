import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Landing() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div>
      <div className="fixed w-full h-screen grid grid-cols-12 items-center">
        <div className="col-start-3 col-span-5 text-white text-left">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">tone & tongue </p>
          <p className="text-l">
            is there a connection between tasting and hearing?
            <br />
            Find out and join our experiment!{" "}
          </p>
        </div>
        <div className="col-start-9 col-span-3">
          <div className="h-screen items-center flex">
            <button
              className="tracking-widest text-xl text-black ease-out duration-300 font-['Didact_Gothic'] group flex items-center "
              onClick={() => navigate("/start")}
            >
              <span>START </span>
              <span className=" transition-all ease-out duration-300 ml-2 group-hover:ml-3">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed w-full h-24 grid grid-cols-12 bottom-0 ">
        <div className="col-start-1 col-span-5 text-grey hover:text-black">
          <button onClick={() => navigate("/about")}>About</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
