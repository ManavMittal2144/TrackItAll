import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ToDoList from "./pages/ToDoPage";
import Home from "./pages/Home";
import Landing from "./pages/Landing_page";

function App() {
  return (
    <>
      
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route
          path="/Home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/To_Do_List" element={<ToDoList />} />
        <Route path="/Expense_Tracker" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;