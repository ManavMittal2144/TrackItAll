import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <div className="page-1">
                <Link to="/Expense_Tracker">Page 1</Link>
            </div>
          </li>
          <li>
            <div className="page-2">
                <Link to="/To_Do_List">Page 2</Link>
            </div>
          </li>
        </ul>
      </nav>

      <hr />
    </div>
  );
};

export default Home;
