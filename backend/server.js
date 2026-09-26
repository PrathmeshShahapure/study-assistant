import app from "./index.js";
import "dotenv/config"
const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT, () => { 
    console.log("server is live")
})