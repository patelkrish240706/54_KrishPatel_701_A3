import { useEffect, useState } from "react";

function Products() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const getCategories = async () => {

        const response = await fetch(
            "http://localhost:5000/api/category/list"
        );

        const data = await response.json();

        setCategories(data);
    };

    const getProducts = async () => {

        const response = await fetch(
            "http://localhost:5000/api/product/list"
        );

        const data = await response.json();

        setProducts(data);
    };

    const addProduct = async () => {

        if (name === "" || price === "" || category === "") {
            alert("Enter all details");
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/product/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    price: price,
                    category: category
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        setName("");
        setPrice("");
        setCategory("");

        getProducts();
    };

    const deleteProduct = async (id) => {

        const response = await fetch(
            `http://localhost:5000/api/product/delete/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        alert(data.message);

        getProducts();
    };

    useEffect(() => {

        getCategories();
        getProducts();

    }, []);

    return (
        <div>

            <h1>Manage Products</h1>

            <div>

                <input
                    type="text"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map((item) => (

                        <option
                            key={item._id}
                            value={item._id}
                        >
                            {item.name}
                        </option>

                    ))}

                </select>

                <button onClick={addProduct}>
                    Add Product
                </button>

            </div>

            <hr />

            <h2>Product List</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr key={product._id}>

                            <td>
                                {product.name}
                            </td>

                            <td>
                                ₹{product.price}
                            </td>

                            <td>
                                {product.category
                                    ? product.category.name
                                    : "No Category"}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        deleteProduct(product._id)
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

export default Products;