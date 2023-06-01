import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import dateRoutes from './routes/date.js';

dotenv.config()


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/date", dateRoutes);

app.get('/', (req, res) => {
  res.end('<h1>Welcome to the Node.js backend chat</h1>')
})

const CONNECTION_URL =
  `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.jzanhjz.mongodb.net/`;
const PORT = process.env.PORT || 80;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
