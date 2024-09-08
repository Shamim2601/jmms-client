import React, { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
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

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <h1 className='mb-0'>Students</h1>
        <span className='badge bg-secondary fs-5 ms-4'>{students.length} Total</span>
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
    </div>
  );
}

export default Students;
