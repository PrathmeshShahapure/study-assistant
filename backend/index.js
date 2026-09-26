import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send({ message: "hi i am alive" });
});
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
    question: "During which phase do chromosomes align at the cell's equator?",
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
    correctAnswer: "3",
  },
];
const mockFlashcards = [
  {
    id: 1,
    question: "What is a closure?",
    answer: "A function that remembers its lexical environment.",
  },
  {
    id: 2,
    question: "What is your name?",
    answer: "My Name is Prathmesh and yours? ",
  },
  {
    id: 3,
    question: "What is aa?",
    answer: "A function that remembers its lexical environment.",
  },
  {
    id: 4,
    question: "What is a b?",
    answer: "A function that remembers its lexical environment.",
  },
  {
    id: 5,
    question: "What is ac?",
    answer: "A function that remembers its lexical environment.",
  },
];

app.post("/api/generate", (req, res) => {
  const { title_or_content, type } = req.body;
    try {
      
    console.log("Received topic:", title_or_content);
      console.log(type);
      
    if (type === "flashcards")
      return res.json({
        title: title_or_content,
        flashcards: mockFlashcards,
        message: "Topic received successfully",
      });
        
     if (type === "quiz") {
      return res.json({
        title: title_or_content,
        quiz: mockQuiz,
        message: "Topic received successfully",
      });
        
    } else {
      return res.status(400).json({
        message: "Invalid type. Type must be 'quiz' or 'flashcards'.",
      });
        
    }
    } catch (error) {

    console.error("Generate error:", error);
    return req.status(500).json("Something went wrong");
  }
});

export default app;
