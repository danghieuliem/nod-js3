const express = require("express");
const Task = require("./service/task-service");
const app = express();
const port = process.env.port || 3100;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        title: "1111",
        body: "aaa"
    });
});

app.get("/tasks/:id", (req, res) => {
    if (req.body.id)
        return res.status(400).json({ message: "id is requestted" });

    const task = Task.getTaskById(req.params.id);
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    if (req.body.id)
        return res.status(400).json({ message: "id is requestted" });

    const task = Task.deleteTaskById(req.params.id);
    res.json(task);
})

app.get("/tasks", (req, res) => { //req = request, res = respon
    const data = Task.getAll("task");
    res.json(data);
});

app.post("/tasks", (req, res) => {
    if (Array.isArray(req.body)) {
        let createdTask = [];
        req.body.forEach(element => {
            const { title, body } = element;
            createdTask = [...createdTask, ...Task.addTask({ title, body })];
        });
        res.json(createdTask);
    }
    else {
        const { title, body } = req.body;
        if (!title || typeof (title) !== "string")
            return res.status(400).json({ message: "title is requestted and it's type is string" });

        const createdTask = Task.addTask({ title, body });
        res.json(createdTask);
    }
});

app.patch("/tasks", (req, res) => {
    const { id, title, body, completed, completedAt } = req.query;

    if (!id)
        return res.status(400).json({ message: "id is requestted" });

    if (!title && !body && !completed && !completedAt)
        return res.status(420).json({ message: "not thing to update" });


    if (completed !== "true"
        && completed !== "True"
        && completed !== "false"
        && completed !== "False"
        && completed != 0
        && completed != 1) {

        return res.status(420).json({ message: "completed is not boolean" });
    }
    let bcompleted = completed;
    if (bcompleted === "false"
        || bcompleted === "False"
        || bcompleted === 0)
        bcompleted = false;
    else
        bcompleted = true;

    res.json(Task.upDate({ id, title, body, completed : bcompleted, completedAt }));
});

app.listen(port, () => {
    console.log("http://localhost:" + port);
});