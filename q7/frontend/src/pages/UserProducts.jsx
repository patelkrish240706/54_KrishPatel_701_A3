import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProducts() {

    const { id } = useParams();

    const [products, setProducts] = useState([]);

    const getProducts = async () => {

        const response = await fetch(
            `http://localhost:5000/api/product/category/${id}`
        );

        const data = await response.json();

        setProducts(data);
    };

    useEffect(() => {
        getProducts();
    }, [id]);

    const addToCart = (product) => {

        let cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product added to cart");
    };

    return (
        <div>

            <h1>Products</h1>

            {products.map((product) => (

                <div key={product._id}>

                    <h3>{product.name}</h3>

                    <p>Price: ₹{product.price}</p>

                    <button
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default UserProducts;