import { Link, useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div>

            <h1>Employee Home Page</h1>

            <br />

            <Link to="/profile">
                Page 1 - Employee Profile
            </Link>

            <br />
            <br />

            <Link to="/leave">
                Page 2 - Application for Leave
            </Link>

            <br />
            <br />

            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
}

export default Home;