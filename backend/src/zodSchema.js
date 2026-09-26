import { z} from "zod"

export const flashcardsSchema = z.object({
  flashcards: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      answer:z.string(),
    }),
  ),
});

export const quizSchema = z.object({
  quiz: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
        options: z.array(z.string()),
      correctAnswer: z.string(),
    }),
  ),
});