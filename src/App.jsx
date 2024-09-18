import React,{useEffect, useState} from 'react';
import axios from 'axios';





const App = () => {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const getData = async()=>{
    let ownerId = '';
    if (!localStorage.getItem('ownerId')) {  // Check if ownerId is already set
        ownerId = prompt('Enter Your code : ').trim();
        localStorage.setItem('ownerId', ownerId);  // Save ownerId to localStorage
    } else {
        ownerId = localStorage.getItem('ownerId');  // Retrieve from localStorage
    }
    console.log(ownerId);
    try {

      setLoading(true);
      const url = `https://digital-business-card-backend-production.up.railway.app/api/get-submissions?ownerId=${ownerId}`;
      const res = await axios.get(url)
      setData(res?.data)
      console.log(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>

     
     <h2 className='text-center'>Table</h2>
      <h1>{loading ? "Loading . . ." : ""}</h1>
     <table class="table pt-5 mt-5" style={{width:"100%"}}>
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Designation</th>
      <th scope="col">Number</th>
     
      <th scope="col">Email</th>
     
      <th scope="col">Organization</th>
    </tr>
  </thead>
  <tbody>
    {
      data.map(r =>{
        return(
          <>
            <tr>
              <td>{r.name}</td>
              <td>{r.designation}</td>
              <td>{r.number}</td>
              <td>{r.email}</td>
              <td>{r.organization}</td>
              

            </tr>
          </>
        )
      })
    }   
      
  </tbody>
</table>
    
    </>
  )
}

export default App