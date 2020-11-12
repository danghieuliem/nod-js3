const express = require("express");
const Task = require("./service/task-service");
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 3000;


/**
 * mongoose
 */

mongoose.connect(
    "mongo mongodb://localhost:27017/todo-app",
    { useNewUrlParser: true }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Connetd to MongoDB");
})
//*************** */


app.use(express.json());

app.get("/tasks/:id", (req, res) => {
    if (!req.params.id)
        return res.status(400).json({ message: "id is requestted" });
    Task.getTaskById(
        req.params.id,
        (error, task) => {
            if (error) {
                console.log(error);
                return null;
            }
            else {
                return res.json(task);
            }
        }
    );
});

app.delete("/tasks/:id", (req, res) => {
    if (!req.params.id)
        return res.status(400).json({ message: "id is requestted" });

    Task.deleteTaskById(
        req.params.id,
        (error, task) => {
            if (error) {
                console.log(error);
                return null;
            }
            else {
                return res.json(task);
            }
        }
    );
})

app.get("/tasks", (req, res) => { //req = request, res = respon
    const data = Task.getAll((error, tasks) => {
        if (error) {
            console.log(error);
            return null;
        }
        else {
            return res.json(tasks);
        }
    });
});

app.post("/tasks", (req, res) => {
    if (Array.isArray(req.body)) {
        // let createdTask = [];
        // req.body.forEach(element => {
        //     const { title, body } = element;
        //     createdTask = [...createdTask,Task.addTask({ title, body })];
        // });
        // res.json(createdTask);
    }
    else {
        const { title, body } = req.body;
        if (!title || typeof (title) !== "string")
            return res.status(400).json({ message: "title is requested and its type is string" });

        const createdTask = Task.addTask(
            { title, body },
            (error, newTask) => {
                if (error) {
                    console.log(error);
                    return null;
                }
                else {
                    return res.json(newTask);
                }
            }
        );
    }
});

app.patch("/tasks", (req, res) => {
    const { _id, title, body, completed, completedAt } = req.body;
    const id = _id;
    if (!id)
        return res.status(400).json({ message: "id is requestted" });

    if (!title && !body && !completed && !completedAt)
        return res.status(420).json({ message: "not thing to update" });

    if (completed != false
        && completed != true) {
        return res.status(420).json({ message: "completed is not boolean" });
    }

    Task.upDate(
        { id, title, body, completed, completedAt },
        (error, task) => {
            if (error) {
                console.log(error);
                return null;
            }
            else {
                return res.json(task);
            }
        }
    );
});

app.listen(port, () => {
    console.log("http://localhost:" + port);
});