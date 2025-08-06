const express = require("express")
const app = express()
const PORT = 3000

const charRouter = require("./routes/character")

app.use(express.json());
app.use("/character", charRouter)



app.get("/", ((req, res) => {
    res.send("Hello Express!")
}))

app.listen(PORT, () => {
    console.log("Server is running")
})