import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CircleDashedCheck,
  CircleDotDashed,
  RotateCw,
  X,
  House,
} from "lucide-react";


const Quiz = () => {
  const location = useLocation();
  const [currentQ, setCurrentQ] = useState(0);
  const [quizData, setQuizData] = useState(location.state?.data?.quiz)
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const title = location.state?.data.title;
  const handleQuestion = (opre) => {
    switch (opre) {
      case "-":
        if (currentQ > 0) {
          setCurrentQ((prev) => prev - 1);
        }
        break;
      case "+":
        if (currentQ < quizData.length - 1) {
          setCurrentQ((prev) => prev + 1);
        }
        break;

      default:
        break;
    }
  };

  const handleSelectedAns = (e) => {
    const id = quizData[currentQ].id;
    setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleTestChecking = () => {
    let wrongOnes = quizData.filter((item) => {
      return item.correctAnswer != answers[item.id];
    });

    setWrongAnswers(wrongOnes);
    setScore(quizData.length - wrongOnes.length);
    setShowResults(true);
    
   
  }
  const handleReTest = () => { 
    setQuizData(wrongAnswers);
    setCurrentQ(0);
    setAnswers({});
    setScore(null)
    setShowResults(false);
  }
  if (!quizData || quizData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No quiz found</h2>

          <p className="text-gray-500 mt-2">
            Please generate a quiz from the home page.
          </p>

          <Link
            to="/"
            className="block mx-auto   mt-4 px-4 py-2 rounded bg-purple-600 text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className=" relative mx-auto max-w-7xl w-full mt-3">
      <h2 className="text-3xl text-center"> { title}</h2>

      <div className="flex mt-4 gap-6">
        <div className="w-[25%] self-start p-3 border border-gray-200 bg-amber-50  shadow-lg rounded-2xl">
          <p className="p-2 font-normal">Question Matrix</p>
          <div className="grid grid-cols-3 gap-2">
            {quizData?.map((q) => (
              <button
                key={q.id}
                onClick={() => { let index = quizData.findIndex((item) => item.id == q.id); setCurrentQ(index) }}
                className={` ${answers[q.id] ? "bg-green-300" : "bg-purple-100 "}  hover:cursor-pointer px-2 py-1 shadow rounded `}
              >
                {q.id}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1 p-2">
              <div className=" h-4 w-4 bg-green-300 outline-0" /> Answered
            </div>
            <div className="flex items-center gap-1 p-2">
              <div className=" h-4 w-4 bg-purple-100 outline-0" /> Pending
            </div>
          </div>
        </div>
        <div className="w-[60%] shadow-lg p-4  bg-white rounded-4xl border border-gray-50 ">
          <div className=" w-full font-normal">
            <p className="flex justify-end ml-auto text-indigo-700 ">
              Question #{quizData[currentQ].id}
            </p>
            <h4 className="text-2xl">{quizData[currentQ].question}</h4>
            <div className="flex flex-col gap-2 text-left my-3">
              {quizData[currentQ]?.options?.map((ops) => (
                <button
                  key={ops}
                  value={ops}
                  onClick={handleSelectedAns}
                  className="px-2 py-1 flex gap-2  rounded border border-gray-200 hover:cursor-pointer shadow-2xl text-left "
                >
                  {answers[quizData[currentQ].id] === ops ? (
                    <CircleDashedCheck className="font-normal text-green-700" />
                  ) : (
                    <CircleDotDashed className="font-normal text-purple-600" />
                  )}
                  {ops}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between font-normal w-full">
            <button
              disabled={currentQ == 0}
              className=" disabled:cursor-not-allowed flex gap-1 hover:font-comic hover:cursor-pointer"
              onClick={() => handleQuestion("-")}
            >
              <ArrowLeft /> Prev
            </button>

            <button
              disabled={currentQ == quizData.length - 1}
              className=" disabled:cursor-not-allowed flex gap-1 hover:font-comic hover:cursor-pointer"
              onClick={() => handleQuestion("+")}
            >
              Next
              <ArrowRight />
            </button>
          </div>
        

          <button
            onClick={handleTestChecking}
            disabled={Object.keys(answers).length < quizData.length}
            className=" hover:cursor-pointer disabled:cursor-not-allowed text-xl mx-auto block font-normal p-1 px-2 bg-green-400 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {/* show result */}
      {showResults && (
        <div className="  mx-auto absolute  top-12  w-fit left-1/2 -translate-x-1/2">
          <div className=" bg-cyan-50 rounded-2xl p-4 flex flex-col space-y-4 border border-gray-200 shadow-2xl">
            <h2 className="text-center text-3xl">Quiz Complete! </h2>
            <p className="text-center text-xl font-normal">
              Here's How you performed.
            </p>
            <p className="text-center text-3xl">
              {score} / {quizData.length}
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleReTest}
                disabled={score ===quizData.length}
                className=" disabled:cursor-not-allowed bg-[#5b4dff] px-2 p-1 flex text-white gap-2 rounded shadow cursor-pointer">
                <RotateCw /> ReTest Wrong Answers
              </button>
              <Link
                to="/"
                className=" px-2 p-1 flex bg-white gap-2 rounded shadow cursor-pointer"
              >
                <House /> Back to Home
              </Link>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className=" hover:cursor-pointer absolute right-0 top-0 px-5"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
