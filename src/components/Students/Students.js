import React, { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    student_name: '',
    student_school: '',
    student_class: '',
    student_district: '',
    student_phone: ''
  });

  const rooturl = process.env.REACT_APP_ROOTURL;

  useEffect(() => {
    fetch(rooturl+'students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, [rooturl]);

  const handleDelete = (id) => {
    // Optional: Make a DELETE request to the server
    fetch(rooturl+`students/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Remove student from the local state
        setStudents(students.filter(student => student.id !== id));
      } else {
        console.error('Failed to delete student');
      }
    })
    .catch(error => console.error('Error deleting student:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = () => {
    fetch(rooturl+'students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
    .then(response => response.json())
    .then(data => {
      setStudents([...students, data]);
      setShowModal(false);
      setNewStudent({ 
        student_name: '',
        student_school: '',
        student_class: '',
        student_district: '',
        student_phone: ''
      });
    })
    .catch(error => console.error('Error adding student:', error));
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <h1 className='mb-0'>Students</h1>
        <span className='badge bg-secondary fs-5 ms-4'>{students.length} Total</span>
        <button className='btn btn-primary ms-4' onClick={() => setShowModal(true)}>
          Add New
        </button>
      </div>

      <table className='table table-striped table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Institution</th>
            <th>Class</th>
            <th>District</th>
            <th>Phone</th>
            <th>Action</th> {/* Add Action column */}
          </tr>
        </thead>
        <tbody>
          {
            students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.student_name}</td>
                <td>{student.student_school}</td>
                <td>{student.student_class}</td>
                <td>{student.student_district}</td>
                <td><a href={`tel:${student.student_phone}`}>{student.student_phone}</a></td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td> {/* Delete button */}
              </tr>
            ))
          }
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className='modal show d-block' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add New Student</h5>
                <button type='button' className='btn-close' onClick={() => setShowModal(false)}></button>
              </div>
              <div className='modal-body'>
                <div className='mb-3'>
                  <label htmlFor='student_name' className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='student_name'
                    name='student_name'
                    value={newStudent.student_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='student_name' className='form-label'>School</label>
                  <input
                    type='text'
                    className='form-control'
                    id='student_school'
                    name='student_school'
                    value={newStudent.student_school}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='student_name' className='form-label'>Class</label>
                  <input
                    type='text'
                    className='form-control'
                    id='student_class'
                    name='student_class'
                    value={newStudent.student_class}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='student_district' className='form-label'>District</label>
                  <input
                    type='text'
                    className='form-control'
                    id='student_district'
                    name='student_district'
                    value={newStudent.student_district}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='student_phone' className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='student_phone'
                    name='student_phone'
                    value={newStudent.student_phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                  Save Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
