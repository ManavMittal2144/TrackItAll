const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/", todoController.addTodo);
router.get("/", todoController.getTodos);
router.put("/:id", todoController.updateTodo);

module.exports = router;
