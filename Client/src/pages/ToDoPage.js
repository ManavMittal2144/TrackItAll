import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("low");
  const [filterType, setFilterType] = useState("today");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8080/api/v1/To_Do_List/",
          {
            params: {
              userid: user._id,
            },
          }
        );
        setLoading(false);
        setTodos(res.data);
        setFilteredTodos(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTodos();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filterType, filterDate, filterStatus, filterPriority, todos]);

  const handleFilter = () => {
    let filteredData = [...todos];

    switch (filterType) {
      case "today":
        const today = getFormattedDate(new Date());
        filteredData = filterByDate(filteredData, today);
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        filteredData = filterByDate(filteredData, getFormattedDate(yesterday));
        break;
      case "tomorrow":
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        filteredData = filterByDate(filteredData, getFormattedDate(tomorrow));
        break;
      case "custom":
        if (filterDate) {
          filteredData = filterByDate(filteredData, filterDate);
        }
        break;
      default:
      // No additional filtering for "all" filterType
    }

    // Apply filter by status
    filteredData = filterByStatus(filteredData, filterStatus);

    // Apply filter by priority
    if (filterPriority !== "all") {
      filteredData = filterByPriority(filteredData, filterPriority);
    }

    setFilteredTodos(filteredData);
  };

  const filterByDate = (data, date) => {
    return data.filter((item) => item.deadline && item.deadline.includes(date));
  };

  const filterByStatus = (data, status) => {
    switch (status) {
      case "all":
        return data;
      case "completed":
        return data.filter((item) => item.completed);
      case "not-completed":
        return data.filter((item) => !item.completed);
      default:
        return data;
    }
  };

  const filterByPriority = (data, priority) => {
    if (priority === "all") {
      return data;
    } else {
      return data.filter((item) => item.priority === priority);
    }
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addTodo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("http://localhost:8080/api/v1/To_Do_List", {
        userid: user._id,
        task,
        deadline,
        priority,
        deadlineTime,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setFilteredTodos([...filteredTodos, response.data]);
      })
      .catch((error) => console.error("Error adding task: ", error));

    setTask("");
    setDeadline("");
    setPriority("low");
    setDeadlineTime("");
    setShowAddForm(false);
  };

  const toggleCompletion = (id, completed) => {
    axios
      .put(`http://localhost:8080/api/v1/To_Do_List/${id}`, {
        completed: !completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id
            ? { ...todo, completed: response.data.completed }
            : todo
        );
        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos);
      })
      .catch((error) =>
        console.error("Error updating completion status: ", error)
      );
  };

  const redirectToHome = () => {
    navigate("../Home");
  };

  const renderTodos = () => {
    const completedTodos = filteredTodos.filter((todo) => todo.completed);
    const notCompletedTodos = filteredTodos.filter((todo) => !todo.completed);

    return (
      <>
        {/* Not Completed Todos */}
        {notCompletedTodos.length > 0 && (
          <>
            <tr>
              <th colSpan="5" className="text-center">
                Not Completed Tasks
              </th>
            </tr>
            {notCompletedTodos.map((todo) => (
              <tr key={todo._id} style={{ backgroundColor: "#ffcdd2" }}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo._id, todo.completed)}
                  />
                </td>
                <td>{todo.task}</td>
                <td>
                  {todo.deadline
                    ? new Date(todo.deadline).toLocaleDateString()
                    : "No deadline"}
                </td>
                <td>{todo.deadlineTime || "No deadline time"}</td>
                <td>{todo.priority}</td>
              </tr>
            ))}
            {/* Separator Line */}
            <tr>
              <td colSpan="5" className="text-center">
                ---------------
              </td>
            </tr>
          </>
        )}
        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <>
            <tr>
              <th colSpan="5" className="text-center">
                Completed Tasks
              </th>
            </tr>
            {completedTodos.map((todo) => (
              <tr
                key={todo._id}
                style={{
                  backgroundColor: "#c8e6c9",
                  textDecoration: "line-through",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo._id, todo.completed)}
                  />
                </td>
                <td>{todo.task}</td>
                <td>
                  {todo.deadline
                    ? new Date(todo.deadline).toLocaleDateString()
                    : "No deadline"}
                </td>
                <td>{todo.deadlineTime || "No deadline time"}</td>
                <td>{todo.priority}</td>
              </tr>
            ))}
          </>
        )}
      </>
    );
  };

  const renderAnalysis = () => {
    const totalTodos = filteredTodos.length;
    const completedTodos = filteredTodos.filter(
      (todo) => todo.completed
    ).length;
    const remainingTodos = totalTodos - completedTodos;
    const completionPercentage =
      totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

    // Feedback based on completion percentage
    let feedback = "";
    if (completionPercentage === 100) {
      feedback = "Excellent! All tasks completed!";
    } else if (completionPercentage >= 80) {
      feedback = "Wonderful! Great progress!";
    } else if (completionPercentage >= 50) {
      feedback = "Good job! Keep it up!";
    } else if (completionPercentage > 25) {
      feedback = "Average progress. You can do better!";
    } else if (completionPercentage > 0) {
      feedback = "Bad progress. Improve it!";
    } else {
      feedback = "No tasks yet. Add some tasks to get started!";
    }

    return (
      <div className="mt-4">
        <h2>Analysis</h2>
        <p>Total Todos: {totalTodos}</p>
        <p>Completed: {completedTodos}</p>
        <p>Remaining: {remainingTodos}</p>
        <p>Completion Percentage: {completionPercentage.toFixed(2)}%</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${completionPercentage}%` }}
            aria-valuenow={completionPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {completionPercentage.toFixed(2)}%
          </div>
        </div>
        <h2 className="mt-4">Feedback</h2>
        <p>{feedback}</p>
      </div>
    );
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">ToDo List</h1>
      <div className="input-group mb-3">
        <select
          className="form-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="custom">Custom</option>
        </select>
        {filterType === "custom" && (
          <input
            type="date"
            className="form-control"
            placeholder="Custom Date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        )}
        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
        <select
          className="form-select"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Hide Form" : "Add Task"}
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={redirectToHome}
        >
          Go to Home
        </button>
      </div>
      {showAddForm && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <input
            type="time"
            className="form-control"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
          />
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button className="btn btn-primary" type="button" onClick={addTodo}>
            Add Task
          </button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Completed</th>
            <th scope="col">Task</th>
            <th scope="col">Deadline</th>
            <th scope="col">Deadline Time</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>{renderTodos()}</tbody>
      </table>
      {renderAnalysis()}
    </div>
  );
};

export default Todo;
