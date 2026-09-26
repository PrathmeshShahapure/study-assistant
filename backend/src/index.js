import express from "express";
import cors from "cors";
import groq from "./groq.js";
import { flashcardsSchema, quizSchema } from "./zodSchema.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send({ message: "hi i am alive" });
});

app.post("/api/generate", async (req, res) => {
  const { title_or_content, type } = req.body;
  try {

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
      const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: `Generate 5 multiple-choice quiz questions based on the following study material:

${title_or_content}

Return ONLY valid JSON.

Use exactly this structure:

{
  "quiz": [
    {
      "id": 1,
      "question": "Question here",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": "Option A"
    }
  ]
}

Rules:
- Generate exactly 5 questions.
- Each question must have exactly 4 options.
- There must be exactly one correct answer.
- correctAnswer must exactly match one of the options.
- Make the questions relevant to the provided study material.
- Do not include markdown.
- Do not include any text outside the JSON.`,
          },
        ],
      });
       const parsedResponse=JSON.parse(response.choices[0].message.content)
       const validateResponse = quizSchema.parse(parsedResponse);
      return res.json({
        title: title_or_content,
        quiz: validateResponse.quiz,
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
      message: "Failed to generate study material. Please try again.",
    });
  }
});


export default app;
