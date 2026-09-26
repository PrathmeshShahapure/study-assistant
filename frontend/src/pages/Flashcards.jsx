import { useState } from "react";
import { useLocation ,Link} from "react-router-dom";
import { ArrowLeft, ArrowRight, DotIcon, WalletCardsIcon } from "lucide-react";
const Flashcards = () => {
  const location = useLocation();
  const [currentQ, setCurrentQ] = useState(0);
  const [showAns, setShowAns] = useState(false);

  const flashData = location.state?.data?.flashcards;
  const title = location.state?.data.title;

  const handleQuestion = (opre) => {
    switch (opre) {
      case "-":
        if (currentQ > 0) {
          setCurrentQ((prev) => prev - 1);
        }
        break;
      case "+":
        if (currentQ < flashData.length - 1) {
          setCurrentQ((prev) => prev + 1);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-col items-center mt-4">
      <div className="flex  w-full justify-between">
        <div className="flex gap-2 items-center">
          <Link to="/" className="hover:bg-purple-100 hover:text-purple-700 hover:cursor-pointer p-1 px-2 flex gap-1  rounded">
            <ArrowLeft /> Exit
          </Link>
          <p className=" inline  rounded-full text-xs  text-purple-700 bg-purple-300/50 p-2  font-semibold">
            | AI-Powered Learning
          </p>
        </div>
        <>
          <p className="flex gap-2 text-indigo-500 ">
            <WalletCardsIcon />
            {flashData.length} Cards
          </p>
        </>
      </div>

      <div className="flex justify-between w-full mt-6 mb-4">
        <h2 className="text-3xl">{title} </h2>
        <p>
          {flashData[currentQ].id} of {flashData.length}
        </p>
      </div>
      <div className="bg-purple-100 rounded-full w-full h-2 ">
        <div
          style={{ width: `${((currentQ + 1) / flashData.length) * 100}%` }}
          className={`bg-purple-800 h-2 rounded transition-colors `}
        />
      </div>

      <div className="my-4 p-6 w-full bg-white rounded-4xl border border-gray-50 shadow-2xl font-normal">
        <p className="flex justify-end ml-auto text-indigo-700 ">
          Question #{flashData[currentQ].id}
        </p>
        <h4 className="text-2xl">{flashData[currentQ].question}</h4>
        {showAns ? (
          <p
            onClick={() => setShowAns((prev) => !prev)}
            className=" hover:cursor-pointer  bg-purple-100 min-h-30 my-4 rounded-2xl p-3"
          >
            {flashData[currentQ].answer}
          </p>
        ) : (
          <p
            onClick={() => setShowAns((prev) => !prev)}
            className="flex justify-center items-center hover:cursor-pointer  bg-purple-100 min-h-30 my-4 rounded-2xl p-3"
          >
            Tab To See Answer
          </p>
        )}
      </div>
      <div className="flex justify-between font-normal w-full">
        <button
          disabled={currentQ === 0}
          className=" disabled:cursor-not-allowed flex gap-1 hover:font-comic hover:cursor-pointer"
          onClick={() => handleQuestion("-")}
        >
          {" "}
          <ArrowLeft /> Prev
        </button>

        <button
          disabled={currentQ === flashData.length - 1}
          className=" disabled:cursor-not-allowed flex gap-1 hover:font-comic hover:cursor-pointer"
          onClick={() => handleQuestion("+")}
        >
          Next
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
