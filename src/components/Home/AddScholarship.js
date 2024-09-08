import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddScholarship = () => {
  // State variables for form inputs
  const [martyrName, setMartyrName] = useState('');
  const [martyrPlace, setMartyrPlace] = useState('');
  const [martyrDate, setMartyrDate] = useState('');
  const [donorId, setDonorId] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentDistrict, setStudentDistrict] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [status, setStatus] = useState('Inactive');
  const [monthlyAmount, setMonthlyAmount] = useState(4000);

  const rooturl = process.env.REACT_APP_ROOTURL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post Martyr
      const martyrResponse = await fetch(rooturl+'martyrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          martyr_name: martyrName,
          martyr_place: martyrPlace,
          martyr_date: martyrDate
        })
      });

      const martyrData = await martyrResponse.json();
      const martyrId = martyrData.id;

      // Post Donor if needed
      let actualDonorId = donorId;
      if (!donorId) {
        const donorResponse = await fetch(rooturl+'donors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donor_name: donorName,
            donor_email: donorEmail,
            donor_phone: donorPhone
          })
        });

        const donorData = await donorResponse.json();
        actualDonorId = donorData.id;
      }

      // Post Student if needed
      let actualStudentId = studentId;
      if(!studentId){
        const studentResponse = await fetch(rooturl+'students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_name: studentName,
            student_school: studentSchool,
            student_class: studentClass,
            student_district: studentDistrict,
            student_phone: studentPhone
          })
        });

        const studentData = await studentResponse.json();
        actualStudentId = studentData.id;
      }

      // Post Scholarship
      await fetch(rooturl+'scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          martyr_id: martyrId,
          donor_id: actualDonorId,
          student_id: actualStudentId,
          status,
          monthly_amount: monthlyAmount
        })
      });

      alert('Scholarship added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add scholarship');
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h1>Add Scholarship</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="martyrName" className="form-label">Martyr Name</label>
          <input
            type="text"
            id="martyrName"
            className="form-control"
            value={martyrName}
            onChange={(e) => setMartyrName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="martyrPlace" className="form-label">Martyr Place</label>
          <input
            type="text"
            id="martyrPlace"
            className="form-control"
            value={martyrPlace}
            onChange={(e) => setMartyrPlace(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="martyrDate" className="form-label">Martyr Date</label>
          <input
            type="text"
            id="martyrDate"
            className="form-control"
            placeholder='dd-mm-yyyy'
            value={martyrDate}
            onChange={(e) => setMartyrDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="donorId" className="form-label">Existing Donor ID (Leave empty if new)</label>
          <input
            type="text"
            id="donorId"
            className="form-control"
            value={donorId}
            onChange={(e) => setDonorId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="donorName" className="form-label">Donor Name</label>
          <input
            type="text"
            id="donorName"
            className="form-control"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="donorEmail" className="form-label">Donor Email</label>
          <input
            type="email"
            id="donorEmail"
            className="form-control"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="donorPhone" className="form-label">Donor Phone</label>
          <input
            type="tel"
            id="donorPhone"
            className="form-control"
            value={donorPhone}
            onChange={(e) => setDonorPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">Existing Student ID (Leave empty if new)</label>
          <input
            type="text"
            id="studentId"
            className="form-control"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">Student Name</label>
          <input
            type="text"
            id="studentName"
            className="form-control"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentSchool" className="form-label">Student School</label>
          <input
            type="text"
            id="studentSchool"
            className="form-control"
            value={studentSchool}
            onChange={(e) => setStudentSchool(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentClass" className="form-label">Student Class</label>
          <input
            type="text"
            id="studentClass"
            className="form-control"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentDistrict" className="form-label">Student District</label>
          <input
            type="text"
            id="studentDistrict"
            className="form-control"
            value={studentDistrict}
            onChange={(e) => setStudentDistrict(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentPhone" className="form-label">Student Phone</label>
          <input
            type="tel"
            id="studentPhone"
            className="form-control"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="monthlyAmount" className="form-label">Monthly Amount</label>
          <input
            type="number"
            id="monthlyAmount"
            className="form-control"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Scholarship</button>
      </form>
    </div>
  );
}

export default AddScholarship;
