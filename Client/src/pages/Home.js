import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Home = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/");
  };

  // Assuming you have a useEffect somewhere in your component
  useEffect(() => {
    // Your useEffect code

    // Make sure to include all dependencies, for example:
    
  }, []); // Include all dependencies here

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <ul>
          <li>
            <Link to="/Expense_Tracker">Page 1</Link>
          </li>
          <li>
            <Link to="/To_Do_List">Page 2</Link>
          </li>
          
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Home;
