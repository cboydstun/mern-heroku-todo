//import dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

//initalize express
const app = express()

//initalize port
const SERVER_PORT = process.env.PORT || 5002;

//initalize middleware
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :response-time'))

//MonogoDB connect
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("Connected to MongoDB")).catch((err)=>{console.log(err)})

//import routes
const taskRouter = require("./routes/tasks")

//initalize routes
app.use('/api/tasks', taskRouter)

//basic greeting
app.get('/', (req, res) => {res.send('Hello World!')})

//app listening
app.listen(SERVER_PORT, ()=>{console.log(`Server running at ${SERVER_PORT}`)})