import {BrowserRouter,Routes,Route} from "react-router-dom";

import Admin from "./pages/Admin";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import User from "./pages/User";
import UserCategories from "./pages/UserCategories";
import UserProducts from "./pages/UserProducts";

function App(){

  return(
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Admin/>}/>

        <Route path="/categories" element={<Categories/>}/>

        <Route path="/products" element={<Products/>}/>

        <Route path="/cart" element={<Cart/>}/>

        <Route path="/user" element={<User/>}/>

        <Route path="/user/categories" element={<UserCategories/>}/>

        <Route path="/user/products/:id" element={<UserProducts/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;