import {useEffect,useState} from "react";
import {Link} from "react-router-dom";

function UserCategories(){

  const [categories,setCategories]=useState([]);

  const getCategories=async()=>{

    const response=await fetch(
      "http://localhost:5000/api/category/list"
    );

    const data=await response.json();

    setCategories(data);
  };

  useEffect(()=>{
    getCategories();
  },[]);

  return(
    <div>

      <h1>Categories</h1>

      {categories.map(category=>(
        <div key={category._id}>

          <Link to={`/user/products/${category._id}`}>
            {category.name}
          </Link>

          <br/><br/>

        </div>
      ))}

    </div>
  );
}

export default UserCategories;