import {Link} from "react-router-dom";

function User(){

  return(
    <div>

      <h1>Shopping Cart</h1>

      <h2>User Site</h2>

      <Link to="/user/categories">
        View Categories
      </Link>

      <br/><br/>

      <Link to="/cart">
        Shopping Cart
      </Link>

      <br/><br/>

      <Link to="/">
        Go to Admin Site
      </Link>

    </div>
  );
}

export default User;