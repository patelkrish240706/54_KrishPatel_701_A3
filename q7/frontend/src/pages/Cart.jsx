import {useEffect,useState} from "react";

function Cart(){

  const [cart,setCart]=useState([]);

  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem("cart"))||[];
    setCart(data);
  },[]);

  const removeFromCart=(index)=>{
    const newCart=cart.filter((_,i)=>i!==index);

    setCart(newCart);
    localStorage.setItem("cart",JSON.stringify(newCart));
  };

  const clearCart=()=>{
    setCart([]);
    localStorage.removeItem("cart");
  };

  const total=cart.reduce((sum,item)=>sum+Number(item.price),0);

  return(
    <div>

      <h1>Shopping Cart</h1>

      {cart.length===0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>

          {cart.map((product,index)=>(
            <div key={index}>

              <h3>{product.name}</h3>

              <p>
                Price: ₹{product.price}
              </p>

              <button onClick={()=>removeFromCart(index)}>
                Remove
              </button>

              <hr/>

            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <button onClick={clearCart}>
            Clear Cart
          </button>

        </div>
      )}

    </div>
  );
}

export default Cart;