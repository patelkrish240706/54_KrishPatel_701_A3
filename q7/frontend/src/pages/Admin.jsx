import {Link} from "react-router-dom";

function Admin(){

  return(
    <div>

      <h1>Shopping Cart</h1>

      <h2>Admin Site</h2>

      <Link to="/categories">
        Manage Categories
      </Link>

      <br/><br/>

      <Link to="/products">
        Manage Products
      </Link>

      <br/><br/>

      <Link to="/user">
        Go to User Site
      </Link>

    </div>
  );
}

export default Admin;