import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Donors = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const donorId = queryParams.get('id');

  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDonor, setNewDonor] = useState({
    donor_name: '',
    donor_email: '',
    donor_phone: ''
  });

  const rooturl = process.env.REACT_APP_ROOTURL;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(rooturl+'donors')
      .then(response => response.json())
      .then(data => {
        if(donorId){
          const filtDonors = data.filter(donor => donor.id === parseInt(donorId));
          setDonors(filtDonors);
        }else{
          setDonors(data);
        }
      })
      .catch(error => console.error('Error fetching donors:', error));
  }, [rooturl, donorId]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Donor?');

    if(isConfirmed){
      fetch(rooturl+`donors/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setDonors(donors.filter(donor => donor.id !== id));
        } else {
          console.error('Failed to delete donor');
        }
      })
      .catch(error => console.error('Error deleting donor:', error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonor({ ...newDonor, [name]: value });
  };

  const handleSubmit = () => {
    fetch(rooturl+'donors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDonor)
    })
    .then(response => response.json())
    .then(data => {
      setDonors([...donors, data]);
      setShowModal(false);
      setNewDonor({ donor_name: '', donor_email: '', donor_phone: '' });
    })
    .catch(error => console.error('Error adding donor:', error));
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <h1 className='mb-0'>Donors</h1>
        <span className='badge bg-secondary fs-5 ms-4'>{donors.length} Total</span>
        <button className='btn btn-primary ms-4' onClick={() => setShowModal(true)}>
          Add New
        </button>
      </div>

      <table className='table table-striped table-bordered text-center'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map(donor => (
            <tr key={donor.id}>
              <td>{donor.id}</td>
              <td>{donor.donor_name}</td>
              <td><a href={`mailto:${donor.donor_email}`}>{donor.donor_email}</a></td>
              <td><a href={`tel:${donor.donor_phone}`}>{donor.donor_phone}</a></td>
              <td>
                <div className='d-flex justify-content-center align-items-center gap-2 mb-4'>
                  <button className='btn btn-primary btn-sm' onClick={() => navigate(`/?donor_id=${donor.id}`)}>View Scl</button>
                  <button className='btn btn-danger btn-sm' onClick={() => handleDelete(donor.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className='modal show d-block' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Donor</h5>
                <button type='button' className='btn-close' onClick={() => setShowModal(false)}></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label htmlFor='donor_name' className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='donor_name'
                    name='donor_name'
                    value={newDonor.donor_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='donor_email' className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='donor_email'
                    name='donor_email'
                    value={newDonor.donor_email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='donor_phone' className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='donor_phone'
                    name='donor_phone'
                    value={newDonor.donor_phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                  Save Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;
