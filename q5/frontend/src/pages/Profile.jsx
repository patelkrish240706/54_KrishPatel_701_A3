import { useEffect, useState } from "react";

function Profile() {

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/employee/profile", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setEmployee(data);
            });

    }, []);

    if (!employee) {
        return <h3>Loading...</h3>;
    }

    return (
        <div>

            <h2>Employee Profile</h2>

            <p>
                <b>Employee ID:</b> {employee.empid}
            </p>

            <p>
                <b>Name:</b> {employee.name}
            </p>

            <p>
                <b>Email:</b> {employee.email}
            </p>

            <p>
                <b>Department:</b> {employee.department}
            </p>

            <p>
                <b>Basic Salary:</b> {employee.basicSalary}
            </p>

            <p>
                <b>HRA:</b> {employee.hra}
            </p>

            <p>
                <b>DA:</b> {employee.da}
            </p>

            <p>
                <b>Total Salary:</b> {employee.totalSalary}
            </p>

        </div>
    );
}

export default Profile;