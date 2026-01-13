const Task = require("../models/task");

/* ========== CREATE TASK ========== */
exports.createTask = async (req, res) => {
    try {
        const { title, description, due_date, status } = req.body;

        // ✅ VALIDATION INSIDE FUNCTION
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            due_date,
            status,
            user: req.user
        });

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to create task" });
    }
};

/* ========== GET TASKS (WITH STATUS FILTER) ========== */
exports.getTasks = async (req, res) => {
    try {
        const filter = { user: req.user };

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

/* ========== UPDATE TASK ========== */
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to update task" });
    }
};

/* ========== DELETE TASK ========== */
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete task" });
    }
};
