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
        // await client.connect();

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

        // Create a new task
        // app.post("/tasks", async (req, res) => {
        //     const newTask = req.body;
        //     const query = { email: newTask.email, name: newTask.name };
        //     const existingTask = await taskCollection.findOne(query);
        //     if (!existingTask) {
        //         const result = await taskCollection.insertOne(newTask);
        //         res.send(result);
        //     }
        //     else {
        //         res.send({ message: "Task name already exists in the database" });
        //     }

        // })


        // app.put("/drag-update/tasks/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const { status } = req.body;
        //     const query = { _id: new ObjectId(id) };
        //     const updatedDoc = {
        //         $set: {
        //             status,
        //         }
        //     }
        //     const result = await taskCollection.updateOne(query, updatedDoc);
        //     res.send(result);
        // })

        // Create a new task
        app.post("/tasks", async (req, res) => {
            const newTask = req.body;
            const query = { email: newTask.email, name: newTask.name };
            const existingTask = await taskCollection.findOne(query);
            if (!existingTask) {
                newTask.order = 0; // Default order
                const result = await taskCollection.insertOne(newTask);
                res.send(result);
            } else {
                res.send({ message: "Task name already exists in the database" });
            }
        });




        // Update task status and order
        app.put("/drag-update/tasks/:id", async (req, res) => {
            const id = req.params.id;
            const { status, order } = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status,
                    ...(order !== undefined && { order }), // Update order if provided
                },
            };
            const result = await taskCollection.updateOne(query, updatedDoc);
            res.send(result);
        });

        // Bulk reorder tasks
        app.put("/reorder-tasks", async (req, res) => {
            const { tasks } = req.body; // [{ id, order }]
            const bulkOps = tasks.map((task) => ({
                updateOne: {
                    filter: { _id: new ObjectId(task.id) },
                    update: { $set: { order: task.order } },
                },
            }));

            try {
                const result = await taskCollection.bulkWrite(bulkOps);
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to reorder tasks", error });
            }
        });




        // get all tasks of a specific user
        app.get("/tasks/:email", async (req, res) => {
            const email = req.params.email;
            const query = { createdBy: email };
            try {
                const result = await taskCollection.find(query).sort({ order: 1 }).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to fetch tasks", error });
            }
        });

        // get all todo-tasks of a specific user
        app.get("/todo-tasks/:email", async (req, res) => {
            const email = req.params.email;
            const query = { createdBy: email, status: "todo" };
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })
        // get all in-progress-tasks of a specific user
        app.get("/in-progress-tasks/:email", async (req, res) => {
            const email = req.params.email;
            const query = { createdBy: email, status: "inprogress" };
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })
        // get all done-tasks of a specific user
        app.get("/done-tasks/:email", async (req, res) => {
            const email = req.params.email;
            const query = { createdBy: email, status: "done" };
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        })

        // update a task of an specific user
        app.put("/tasks/:id", async (req, res) => {
            const id = req.params.id;
            const { name, description } = req.body;
            const query = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    name,
                    description,
                }
            }
            const result = await taskCollection.updateOne(query, updatedDoc);
            res.send(result);
        })


        // delete a task of an specific user
        app.delete("/tasks/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await taskCollection.deleteOne(query);
            res.send(result);
        })







        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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