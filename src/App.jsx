import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  // Import custom CSS file

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let ownerId = '';
    if (!localStorage.getItem('ownerId')) {
      ownerId = prompt('Enter Your code : ').trim();
      localStorage.setItem('ownerId', ownerId);
    } else {
      ownerId = localStorage.getItem('ownerId');
    }
    console.log(ownerId);
    try {
      setLoading(true);
      const url = `https://digital-business-card-backend-production.up.railway.app/api/get-submissions?ownerId=${ownerId}`;
      const res = await axios.get(url);
      setData(res?.data);
      console.log(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2 className="text-center my-5">User Data</h2>

      <div className="container">
        <div className="table-responsive">
          <table className="table table-striped table-bordered mx-auto custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Number</th>
                <th scope="col">Email</th>
                <th scope="col">Organization</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, index) => (
                <tr key={index}>
                  <td>{r.name}</td>
                  <td>{r.designation}</td>
                  <td>{r.number}</td>
                  <td>{r.email}</td>
                  <td>{r.organization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
