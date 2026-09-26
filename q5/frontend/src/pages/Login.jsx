import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [empid, setEmpid] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        empid: empid,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                navigate("/home");

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert("Server error");
        }
    };

    return (
        <div>

            <h2>Employee Login</h2>

            <div>
                <label>Employee ID</label>
                <br />

                <input
                    type="text"
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Password</label>
                <br />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <br />

            <button onClick={login}>
                Login
            </button>

        </div>
    );
}

export default Login;