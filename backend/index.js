import express from "express"
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors())


app.get("/health", (req,res) => { 
    res.send({message:"hi i am alive"})
})

app.post("/api/generate", (req, res) => {
  const { topic } = req.body;

  console.log("Received topic:", topic);

  res.json({
    title: topic,
    message: "Topic received successfully",
  });
});

export default app;