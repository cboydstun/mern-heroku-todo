//import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

//initalize express
const app = express()

//initalize port
const SERVER_PORT = process.env.PORT || 5002;

//initalize middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan(':method :url :response-time'))

//MonogoDB connect
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB")).catch((err)=>{console.log(err)})

//import routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

//initalize routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

//basic greeting
// app.get('/', (req, res) => {res.send('Hello World!')})

//Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}else{
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//app listening
app.listen(SERVER_PORT, ()=>{console.log(`Server running at ${SERVER_PORT}`)})