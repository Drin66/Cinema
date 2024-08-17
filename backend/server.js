import express from'express';
import cors from'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>hello this is the backend</h1>");
});

app.listen(3002, () => {
    console.log("connected to backend!");
});
