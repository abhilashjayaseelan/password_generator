import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/dbConnection";
import routes from "./routes/route";
import morgan from 'morgan'

const app = express();
const PORT = 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

routes(app);

