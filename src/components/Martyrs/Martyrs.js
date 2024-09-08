import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Martyrs = () => {
  const [martyrs, setMartyrs] = useState([]);
  const rooturl = process.env.REACT_APP_ROOTURL;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    fetch(rooturl+'martyrs')
      .then(response => response.json())
      .then(data => setMartyrs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [rooturl]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h1 className="mb-0">Martyrs</h1>
        <span className="badge bg-secondary fs-5 ms-2">{martyrs.length} Total</span>
      </div>
      <table className="table table-striped table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Place</th>
            <th>Date</th>
            <th>Action</th> {/* Add Action column */}
          </tr>
        </thead>
        <tbody>
          {martyrs.map(martyr => (
            <tr key={martyr.id}>
              <td>{martyr.id}</td>
              <td>{martyr.martyr_name}</td>
              <td>{martyr.martyr_place}</td>
              <td>{martyr.martyr_date}</td>
              <td>
                <button
                  className='btn btn-primary btn-sm'
                  onClick={() => navigate(`/?martyr_id=${martyr.id}`)}
                >
                  View Scl
                </button>
              </td> {/* Delete button */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Martyrs;
