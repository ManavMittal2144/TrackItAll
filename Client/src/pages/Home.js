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
              TrackItAll
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

      <div className="container text-center mt-5 ">
        <h1>Welcome To TrackItAll!</h1>

        <div className="row mt-5">
          {/* First Image and Name */}
          <div className="col-md-6">
            <Link to="/Expense_Tracker" className="btn btn-primary">
              <img
                src="https://cdn.vectorstock.com/i/1000x1000/08/43/expense-tracker-app-rgb-color-icon-vector-39050843.webp"
                alt="Expenses Tracker"
                className="img-fluid rounded"
                style={{ height: "250px", width: "250px" }}
              />
            </Link>
            <div className="mt-3">
              <Link to="/Expense_Tracker" className="btn btn-primary">
                Expenses Tracker
              </Link>
            </div>
          </div>

          {/* Second Image and Name */}
          <div className="col-md-6">
            <Link to="/To_Do_List" className="btn btn-success">
              <img
                src="https://adniasolutions.com/wp-content/webp-express/webp-images/uploads/2018/05/To-Do-List-Excel-Template-01.png.webp"
                alt="To-Do List"
                className="img-fluid rounded"
                style={{ height: "250px", width: "250px" }}
              />
            </Link>
            <div className="mt-3">
              <Link to="/To_Do_List" className="btn btn-success">
                TO-DO-LIST
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;