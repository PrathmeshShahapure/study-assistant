
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios.js";
import { BookText, BookOpenText, FileQuestionMark } from "lucide-react";

const Home = () => {
  const [topicContent, setTopicContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
  const genrateStudyMaterail = async (type) => { 
    return api.post("api/generate", { title_or_content: topicContent ,type});
  }
  const handleInput = async(str) => { 
      try {
         if (!topicContent.trim()) {
           setError("Please enter a topic or study material.");
           return;
         }
        setError("");
        setLoading(true);
        const type = str.slice(1);
       
        let result = await genrateStudyMaterail(type);
        const data = result?.data;
         navigate(str, { state: { data } });
      } catch (error) {
        console.log(error)
       setError(error.response?.data?.message ||
         "Something went wrong. Please try again.");
      }
       
    }
  
   return (
     <div className=" mx-auto max-w-7xl  ">
       <div className="flex flex-col items-center">
         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold my-4">
           <span className="w-2 h-2 rounded-full bg-purple-600"></span>
           AI-Powered Learning Workspace
         </span>

         <h1 className="text-4xl mb-3">
           Learn Anything.
           <span className="text-[#8B5CF6]">Test Yourself.</span>
         </h1>
         <p className=" text-center text-lg max-w-2xl mx-auto mb-10 font-normal">
           Paste your notes or any topic. Learn it with interactive flashcards,
           then test your understanding with an AI-generated quiz.
         </p>

         <section className="w-[90%] bg-purple-50 border-none rounded-2xl shadow-2xl p-4">
           <div className="flex flex-col gap-4">
             <div className="flex justify-start gap-2">
               <BookText className="text-[#8B5CF6]" />
               <p>What do you want to study?</p>
             </div>
             <textarea
               value={topicContent}
               onChange={(e) => setTopicContent(e.target.value)}
               rows={8}
               maxLength={1000}
               className={`w-full bg-white p-4 rounded-xl resize-none outline-none font-normal`}
               placeholder="Paste your topic, chapter, or study notes here..."
             />
             <div className="flex justify-between text-xs mt-2">
               {error && <p className="text-red-500"> {error}</p>}
               {topicContent.length}/1000 chars
             </div>
           </div>
         </section>
       </div>

       <section className="mt-20 font-normal">
         <h2 className="text-4xl mb-1">What would you like to do?</h2>
         <p className="pl-2">
           Choose your mode to begin generating your custom session.
         </p>

         <div className="grid md:grid-cols-2 gap-6 my-4 mb-50">
           <div className="p-8 relative bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between">
               <div className="bg-indigo-100 p-1 px-2 text-xs text-indigo-500 font-semibold rounded-full">
                 Learning Mode
               </div>
               <div className="absolute top-0 right-0 flex justify-center pt-6 rounded-bl-full bg-indigo-100 p-1 w-30 h-25 text-sm text-indigo-700">
                 <BookOpenText className="text-purple h-10 w-10 p-1.5 bg-indigo-400/40 rounded-xl " />
               </div>
             </div>
             <h3 className="text-2xl font-bold  flex items-center gap-2 mb-3 mt-6">
               📚 Start Learning
             </h3>
             <p className="text-slate-500 text-sm leading-relaxed mb-8">
               Learn the topic step by step with interactive flashcards. Reveal
               each answer, review the key idea, and build your understanding
               before taking the test.
             </p>
             <button
               onClick={() => handleInput("/flashcards")}
               className="relative  w-full py-3 px-6 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
             >
               {loading ? "Generating..." : "Start Learning"}
             </button>
           </div>
           <div className="p-8 relative bg-white rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex justify-between">
               <div className="bg-emerald-100/80  p-1 px-2 text-xs text-emerald-500 font-semibold rounded-full">
                 Test Mode
               </div>
               <div className="absolute top-0 right-0 flex justify-center pt-6 rounded-bl-full bg-emerald-100 p-1 w-30 h-25 text-sm text-emerald-700">
                 <FileQuestionMark className="text-purple h-10 w-10 p-1.5 bg-emerald-400/40 rounded-xl " />
               </div>
             </div>
             <h3 className="text-2xl font-bold flex items-center  mb-3 mt-6">
               🧠 Take a Test
             </h3>
             <p className="text-slate-500 text-sm leading-relaxed mb-8">
               Test what you actually remember with AI-generated multiple-choice
               questions. See your score, review mistakes, and retest the
               questions you got wrong.
             </p>
             <button
               onClick={() => handleInput("/quiz")}
               className="relative  w-full py-3 px-6 bg-emerald-800 hover:cursor-pointer hover:bg-emerald-900 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
             >
               {loading ? "Generating..." : "Take a Test"}
             </button>
           </div>
         </div>
       </section>
     </div>
   );
}

export default Home