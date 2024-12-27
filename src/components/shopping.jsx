import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Shopping({ foods }) {
  const navigate = useNavigate();

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
        <div className="col-start-3 col-span-5 text-white text-left  mt-32">
          <p className="text-4xl mb-2 font-['Didact_Gothic']">
            The five basic tastes
          </p>
          <p className="mb-4">
            Make sure you have at least one element per basic taste!
          </p>
        </div>
        {foods.map((category, index) => (
          <div
            key={index}
            className={`col-start-${index + 3} col-span-1 text-left`}
          >
            <p className="text-2xl mb-2 font-['Didact_Gothic']">
              {category.flavor}
            </p>
            <ul className="list-disc ml-4">
              {category.food.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-start-3 col-span-2 text-2xl text-black text-left mt-4 ">
          <button
            className="tracking-widest text-xl text-black  ease-out duration-300 font-['Didact_Gothic'] group flex items-center mt-4 "
            onClick={() => navigate("/experiment")}
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

export default Shopping;
