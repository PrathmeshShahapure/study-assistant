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
