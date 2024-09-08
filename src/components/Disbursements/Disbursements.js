import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Disbursements = () => {
  const navigate = useNavigate();
  const [disbursements, setDisbursements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [remark, setRemark] = useState('');
  const [scholarship, setScholarship] = useState([]);
  const location = useLocation();
  const rooturl = process.env.REACT_APP_ROOTURL;
  // Extract the 'scl_id' query parameter from the URL
  const params = new URLSearchParams(location.search);
  const scholarshipId = params.get('scl_id');

  useEffect(() => {
    // Fetch disbursements from the server
    fetch(rooturl+'disbursements')
      .then(response => response.json())
      .then(data => {
        // Filter the disbursements by the scholarship ID if it's present
        const filteredDisbursements = scholarshipId 
          ? data.filter(disbursement => disbursement.scholarship_id === parseInt(scholarshipId))
          : data;
        setDisbursements(filteredDisbursements);
      })
      .catch(error => console.error('Error fetching disbursements:', error));

      // Fetch scholarship from the server
    fetch(rooturl+`scholarships/${scholarshipId}`)
    .then(response => response.json())
    .then(data => {
      setScholarship(data);
    })
    .catch(error => console.error('Error fetching scholarship:', error));
  }, [location.search, rooturl, scholarshipId]);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddDisbursement = () => {
    // Create the new disbursement object
    const newDisbursement = {
      scholarship_id: parseInt(scholarshipId),
      donor_id: parseInt(scholarship.donor_id),
      student_id: parseInt(scholarship.student_id),
      amount: parseFloat(scholarship.monthly_amount),
      date,
      remark
    };

    // Send the POST request to add the new disbursement
    fetch(rooturl+'disbursements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDisbursement)
    })
      .then(response => response.json())
      .then(data => {
        setDisbursements(prevDisbursements => [...prevDisbursements, data]);
        handleCloseModal();
        setDate('');
        setRemark('');
      })
      .catch(error => {
        console.error('Error adding disbursement:', error);
        alert('Failed to add disbursement');
      });
  };

  const handleDeleteDisbursement = (id) => {
    // Send the DELETE request to remove the disbursement
    fetch(rooturl+`disbursements/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDisbursements(prevDisbursements => prevDisbursements.filter(disbursement => disbursement.id !== id));
        } else {
          alert('Failed to delete disbursement');
        }
      })
      .catch(error => {
        console.error('Error deleting disbursement:', error);
        alert('Error deleting disbursement');
      });
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <h1 className='mb-0'>Disbursements</h1>
        <span className='badge bg-secondary fs-5 ms-4'>{disbursements.length} Total</span>
        <button 
          className='btn btn-primary ms-4'
          onClick={handleAddClick}
        >
          Add New
        </button>
      </div>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <h3 className='mb-0'>Scholarship</h3>
        <button className='btn btn-primary ms-2' onClick={()=>navigate(`/?scl_id=${scholarshipId}`)}>ID: {scholarshipId}</button>
      </div>

      <table className='table table-striped table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Donor ID</th>
            <th>Student ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disbursements.map(disbursement => (
            <tr key={disbursement.id}>
              <td>{disbursement.id}</td>
              <td>
                <button className='btn btn-primary' onClick={()=>navigate(`/donors/?id=${disbursement.donor_id}`)}>{disbursement.donor_id}</button>
              </td>
              <td>
              <button className='btn btn-primary' onClick={()=>navigate(`/students/?id=${disbursement.student_id}`)}>{disbursement.student_id}</button>
              </td>
              <td>{disbursement.amount}</td>
              <td>{disbursement.date}</td>
              <td>{disbursement.remark}</td>
              <td>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => handleDeleteDisbursement(disbursement.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Disbursement</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="date" 
                  placeholder='dd-mm-yyyy'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="remark" className="form-label">Remark</label>
                <input
                  type='text'
                  className="form-control" 
                  id="remark" 
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddDisbursement}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disbursements;
