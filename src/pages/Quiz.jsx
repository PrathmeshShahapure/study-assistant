import {
  ArrowLeft,
  ArrowRight,
  CircleDashedCheck,
  CircleDotDashed,
} from "lucide-react";
import { useState} from 'react'
import { useLocation } from 'react-router-dom'
const Quiz = () => {
  const location = useLocation();
  const [currentQ, setCurrentQ] = useState(0);
 
  const [answers, setAnswers] = useState({});
  const topicContent = location.state?.topicContent;
  
  const handleQuestion = (opre) => {
    switch (opre) {
      case "-":
        if (currentQ > 0) {
          setCurrentQ((prev) => prev - 1);
          
        }
        break;
      case "+":
        if (currentQ < mockQuiz.length - 1) {
          setCurrentQ((prev) => prev + 1);
         
        }
        break;

      default:
        break;
    }
  };
  
  const mockQuiz = [
    {
      id: 1,
      question: "What is the main purpose of mitosis?",
      options: [
        "Produce identical daughter cells",
        "Produce sperm cells",
        "Create genetic variation",
        "Reduce chromosome number",
      ],
      correctAnswer: "Produce identical daughter cells",
    },
    {
      id: 2,
      question: "How many daughter cells are produced after mitosis?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
    {
      id: 3,
      question:
        "During which phase do chromosomes align at the cell's equator?",
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      correctAnswer: "Metaphase",
    },
    {
      id: 4,
      question: "How many daughter cells are produced after mitosissss?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
    {
      id: 5,
      question: "How many daughter cells are produced aàter mitosisaaaa?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
  ];

  const handleSelectedAns = (e) => {
    const id = currentQ + 1;
    setAnswers((prev) => ({ ...prev,  [id] : e.target.value}) )
  }

  return (
    <div className="mx-auto max-w-7xl w-full mt-3">
      <div>
        {" "}
        <h2 className="text-3xl text-center"> Mitosis</h2>
      </div>
      <div className="flex mt-4 gap-6">
        <div className="w-[25%] self-start p-3 border border-gray-200 bg-amber-50  shadow-lg rounded-2xl">
          <p className="p-2 font-normal">Question Matrix</p>
          <div className="grid grid-cols-3 gap-2">
            {mockQuiz?.map((q) => (
              <button
                key={q.id}
                onClick={()=>setCurrentQ(q.id-1)}
                className=" hover:cursor-pointer px-2 py-1 shadow rounded bg-purple-100 "
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
              Question #{mockQuiz[currentQ].id}
            </p>
            <h4 className="text-2xl">{mockQuiz[currentQ].question}</h4>
            <div className="flex flex-col gap-2 text-left my-3">
              {mockQuiz[currentQ]?.options?.map((ops) => (
                <button
                  key={ops}
                  value={ops}
                  onClick={handleSelectedAns}
                  className="px-2 py-1 flex gap-2  rounded border border-gray-200 hover:cursor-pointer shadow-2xl text-left "
                >
                  {answers[currentQ+1] === ops ? (
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
              disabled={currentQ == mockQuiz.length - 1}
              className=" disabled:cursor-not-allowed flex gap-1 hover:font-comic hover:cursor-pointer"
              onClick={() => handleQuestion("+")}
            >
              Next
              <ArrowRight />
            </button>
          </div>
          <p>{topicContent}</p>
        </div>
      </div>
    </div>
  );
}

export default Quiz