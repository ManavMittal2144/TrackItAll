const Todo = require("../models/todoModel");

exports.addTodo = async (req, res) => {
  const { userid, task, deadline, priority, deadlineTime } = req.body;

  try {
    const newTodo = new Todo({
      userid,
      task,
      deadline,
      priority,
      deadlineTime,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { userid } = req.query; // Use req.query to get userid from the query parameters

    if (!userid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const todos = await Todo.find({ userid }); // Pass the query object to find

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(502).json({ error: "Internal Server Error at update" });
  }
};
