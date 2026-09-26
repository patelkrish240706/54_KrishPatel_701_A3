import { useEffect, useState } from "react";

function Leave() {

    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [grant, setGrant] = useState("No");

    const [leaves, setLeaves] = useState([]);

    const token = localStorage.getItem("token");

    const addLeave = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/leave/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },

                    body: JSON.stringify({
                        date: date,
                        reason: reason,
                        grant: grant
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            setDate("");
            setReason("");
            setGrant("No");

            getLeaves();

        } catch (error) {

            alert("Server error");
        }
    };

    const getLeaves = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/leave/list",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const data = await response.json();

            setLeaves(data);

        } catch (error) {

            alert("Server error");
        }
    };

    useEffect(() => {
        getLeaves();
    }, []);

    return (
        <div>

            <h2>Application for Leave</h2>

            <div>
                <label>Date</label>
                <br />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Reason</label>
                <br />

                <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Grant</label>
                <br />

                <select
                    value={grant}
                    onChange={(e) => setGrant(e.target.value)}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <br />

            <button onClick={addLeave}>
                Add Leave
            </button>

            <hr />

            <h2>Leave List</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Grant</th>
                    </tr>
                </thead>

                <tbody>

                    {leaves.map((leave) => (
                        <tr key={leave._id}>

                            <td>{leave.date}</td>

                            <td>{leave.reason}</td>

                            <td>{leave.grant}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Leave;