
import Home from './pages/Home.jsx';
import Quiz from "./pages/Quiz.jsx";
import Flashcards from "./pages/Flashcards.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from './components/Navbar.jsx'
import {Routes, Route} from "react-router-dom"
const App = () => {


  return (
    <div className="min-h-screen w-full font-comic font-semibold ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App