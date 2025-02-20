require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000
const app = express()

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d3h8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollection = client.db("TasklyDB").collection("users");
    const taskCollection = client.db("TasklyDB").collection("tasks");


     // Users APIs
     app.post("/users", async (req, res) => {
        // console.log(req.body);

        const query = { email: req.body.email };
        const existingUser = await userCollection.findOne(query);
        if (!existingUser) {
            // Insert new user into the database
            const result = await userCollection.insertOne(req.body);
            res.send(result);
        }
        else {
            res.send({ message: "User already exists in the database" });
        }
    })

    // Post a new task
    app.post("/task", async (req, res) => {
        const newTask = req.body;
        const query = {email: newTask.email, name: newTask.name};
        const existingTask = await taskCollection.findOne(query);
        if(!existingTask){
            const result = await taskCollection.insertOne(newTask);
            res.send(result);
        }
        else {
            res.send({ message: "Task name already exists in the database" });
        }

    })








    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Taskly Server is running")
})

app.listen(port, () => {
    console.log(`Dev Server is running on port ${port}`);
})