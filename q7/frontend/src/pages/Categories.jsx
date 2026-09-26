import { useEffect, useState } from "react";

function Categories() {

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {

        const response = await fetch(
            "http://localhost:5000/api/category/list"
        );

        const data = await response.json();

        setCategories(data);
    };

    const addCategory = async () => {

        if (name === "") {
            alert("Enter category name");
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/category/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        setName("");

        getCategories();
    };

    const deleteCategory = async (id) => {

        const response = await fetch(
            `http://localhost:5000/api/category/delete/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        getCategories();
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>

            <h1>Manage Categories</h1>

            <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={addCategory}>
                Add Category
            </button>

            <hr />

            <h2>Category List</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {categories.map((category) => (

                        <tr key={category._id}>

                            <td>
                                {category.name}
                            </td>

                            <td>
                                <button
                                    onClick={() =>
                                        deleteCategory(category._id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Categories;