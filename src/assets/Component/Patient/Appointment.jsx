import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Appointment() {

  const [appointment, setAppointment] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    notes: ""
  });

  function handleChange(e) {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

    //   const username = "ap@gmail.com";

      const res = await axios.post(
        `http://localhost:8080/api/patient/book-doctorByPatient/ap@gmail.com`,
        appointment
      );

      console.log(res.data);
      alert("Appointment Booked Successfully");

      setAppointment({
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        notes: ""
      });

    } catch (err) {
      console.log(err);
    }
  }
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getDoctors();
  }, []);
  
  async function getDoctors() {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/doctor/get-allDoctor?page=0&size=10"
      );
  
    
      setDoctors(res.data);
  
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">

      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>

      <div className="mb-3">
  <label className="form-label">Select Doctor</label>

  <select
    className="form-select"
    name="doctorId"
    value={appointment.doctorId}
    onChange={handleChange}
  >
    <option value="">Select Doctor</option>

    {doctors.map((doctor) => (
      <option key={doctor.id} value={doctor.id}>
        Dr. {doctor.firstName} {doctor.lastName}
      </option>
    ))}
  </select>
</div>

        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input
            type="time"
            className="form-control"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Reason</label>
          <input
            type="text"
            className="form-control"
            name="reason"
            value={appointment.reason}
            onChange={handleChange}
            placeholder="Enter Reason"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            rows="3"
            name="notes"
            value={appointment.notes}
            onChange={handleChange}
            placeholder="Enter Notes"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>

      </form>

    </div>
  );
}

export default Appointment;