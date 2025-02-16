import { useState,useEffect } from 'react'
import './App.css'


function App() {
  const [Emp, setEmp] = useState([])
  const [Pagenum,setPagenum] = useState(1);
  const Entrierperpage = 10;

  useEffect(()=>{
    let employeedata = async () => {
    try{

      let response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      let data = await response.json();
      setEmp(data);
    }catch(e){
      console.log(e);
    }
  }
  employeedata();

  },[])

  const startIndex = (Pagenum - 1) * Entrierperpage;
  const displayedEmployees = Emp.slice(startIndex, startIndex + Entrierperpage);
  
  // **Calculate total pages**
  const totalPages = Math.ceil(Emp.length / Entrierperpage);

  // **Pagination Handlers**
  const nextPage = () => {
    if (Pagenum < totalPages) setPagenum(Pagenum + 1);
  };

  const prevPage = () => {
    if (Pagenum > 1) setPagenum(Pagenum - 1);
  };

  return (
    <>
     <h1 style={{marginLeft:"25rem"}}>Employee Data Table</h1>
     <div className='table'>
      <table border="1">
      <thead>
        <tr style={{backgroundColor:"#009879", color:"white"}}>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {
        displayedEmployees.map((emp)=>(
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.role}</td>
          </tr>
        ))
      }
      </tbody>
     </table>
     <div className="pagination">
          <button onClick={prevPage} disabled={Pagenum === 1}>
            Previous
          </button>
          <span>
            Page {Pagenum} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={Pagenum === totalPages}>
            Next
          </button>
        </div>
     </div>
    </>
  )
}

export default App
