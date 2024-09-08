import React, { useEffect, useState } from 'react';

const Martyrs = () => {
  const [martyrs, setMartyrs] = useState([]);
  const rooturl = process.env.REACT_APP_ROOTURL;

  useEffect(() => {
    // Fetch data from the API
    fetch(rooturl+'martyrs')
      .then(response => response.json())
      .then(data => setMartyrs(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [rooturl]);

  const handleDelete = (id) => {
    // Optional: Make a DELETE request to the server
    fetch(rooturl+`martyrs/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Remove martyr from the local state
        setMartyrs(martyrs.filter(martyr => martyr.id !== id));
      } else {
        console.error('Failed to delete martyr');
      }
    })
    .catch(error => console.error('Error deleting martyr:', error));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h1 className="mb-0">Martyrs</h1>
        <span className="badge bg-secondary fs-5 ms-2">{martyrs.length} Total</span>
      </div>
      <table className="table table-striped table-bordered">
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
                  className='btn btn-danger btn-sm'
                  onClick={() => handleDelete(martyr.id)}
                >
                  Delete
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
