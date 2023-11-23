import React from "react";

const ToDoList = ({ tasks, toggleTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
          <span>{task.deadline.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;