import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/Expense_Tracker">Page 1</Link>
          </li>
          <li>
            <Link to="/To_Do_List">Page 2</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </div>
  );
};

export default Home;
