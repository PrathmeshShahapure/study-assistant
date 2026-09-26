import express from "express";
import cors from "cors";
import groq from "./groq.js";
import { flashcardsSchema } from "./zodSchema.js";
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
    question: "What is your name?",
    options: ["pratik", "shouraya", "Prathmesh", "deeplip"],
    correctAnswer: "Prathmesh",
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


app.post("/api/generate", async (req, res) => {
  const { title_or_content, type } = req.body;
  try {
    console.log("Received topic:", title_or_content);
    console.log(type);

    if (type === "flashcards") {
      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: `Generate 5 flashcards about the following study material:${title_or_content}
          Return ONLY valid JSON.
          Use exactly this structure:
          {
            "flashcards": [
              {
                "id": 1,
                "question": "Question here",
                "answer": "Answer here"
              },
              {
                "id": 2,
                "question": "Question here",
                "answer": "Answer here"
              }
            ]
          }
          `,
          },
        ],
      });

      const aiResponse = response.choices[0].message.content;
      const parseResponse = JSON.parse(aiResponse);
      const validateResponse = flashcardsSchema.parse(parseResponse);
      return res.json({
        title: title_or_content,
        flashcards: validateResponse.flashcards,
        message: "Topic received successfully",
      });
    }

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
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/test-groq", async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: "Say hello in one sentence.",
        },
      ],
    });

    res.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Groq request failed",
    });
  }
});

export default app;
