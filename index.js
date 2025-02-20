require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000
const app = express()

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


app.get("/", (req, res) => {
    res.send("Taskly Server is running")
})

app.listen(port, () => {
    console.log(`Dev Server is running on port ${port}`);
})