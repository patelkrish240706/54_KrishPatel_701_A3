import {useEffect,useState} from "react";

function App(){

  const [students,setStudents]=useState([]);

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [course,setCourse]=useState("");
  const [age,setAge]=useState("");

  const [editId,setEditId]=useState(null);


  const getStudents=async()=>{

    const response=await fetch(
      "http://localhost:5000/api/student/list"
    );

    const data=await response.json();

    setStudents(data);
  };


  useEffect(()=>{
    getStudents();
  },[]);


  const addStudent=async()=>{

    await fetch(
      "http://localhost:5000/api/student/add",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          course:course,
          age:age
        })
      }
    );

    clearForm();
    getStudents();
  };


  const deleteStudent=async(id)=>{

    await fetch(
      `http://localhost:5000/api/student/delete/${id}`,
      {
        method:"DELETE"
      }
    );

    getStudents();
  };


  const editStudent=(student)=>{

    setEditId(student.id);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
    setAge(student.age);
  };


  const updateStudent=async()=>{

    await fetch(
      `http://localhost:5000/api/student/update/${editId}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          course:course,
          age:age
        })
      }
    );

    clearForm();
    getStudents();
  };


  const clearForm=()=>{

    setName("");
    setEmail("");
    setCourse("");
    setAge("");
    setEditId(null);

  };


  return(
    <div>

      <h1>Student CRUD</h1>


      <h3>
        {editId ? "Update Student" : "Add Student"}
      </h3>


      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>


      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>


      <input
        placeholder="Course"
        value={course}
        onChange={(e)=>setCourse(e.target.value)}
      />

      <br/><br/>


      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
      />

      <br/><br/>


      {editId ? (
        <button onClick={updateStudent}>
          Update
        </button>
      ) : (
        <button onClick={addStudent}>
          Add
        </button>
      )}

      <button onClick={clearForm}>
        Clear
      </button>


      <hr/>


      <h2>Student List</h2>


      <table border="1">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

          {students.map(student=>(

            <tr key={student.id}>

              <td>{student.id}</td>

              <td>{student.name}</td>

              <td>{student.email}</td>

              <td>{student.course}</td>

              <td>{student.age}</td>

              <td>

                <button
                  onClick={()=>editStudent(student)}
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteStudent(student.id)}
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

export default App;