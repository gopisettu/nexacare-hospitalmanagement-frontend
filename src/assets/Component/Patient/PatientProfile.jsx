import axios from "axios"
import { useState } from "react"

function PatientProfile(){
  
  const [patient,setPatient]=useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    aadharNumber: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    allergies: "",
    chronicDisease: ""
  })
  function handleChange(e){
    setPatient({
      ...patient,
      [e.target.name]:e.target.value,
    }
    )
  }
   async function handleSubmit(e){
    e.preventDefault()
    console.log("In Handle Submit")
    try{
      const username="pal@gmail.com"
   
      console.log("before api call")
const res=await axios.put(`http://localhost:8080/api/patient/update-patientProfile/${username}`,patient)

console.log("after api call")
    }catch(err){
      console.log(err)
    }
  }

    return(<div className="container">
        <h2>Patient Profile</h2>
        <form onSubmit={handleSubmit}>

  {/* First Name */}
  <div className="mb-3">
    <label className="form-label">First Name</label>
    <input
      type="text"
      className="form-control"
      name="firstName"
      value={patient.firstName}
      onChange={handleChange}
      placeholder="Enter First Name"
    />
  </div>

  {/* Last Name */}
  <div className="mb-3">
    <label className="form-label">Last Name</label>
    <input
      type="text"
      className="form-control"
      name="lastName"
      value={patient.lastName}
      onChange={handleChange}
      placeholder="Enter Last Name"
    />
  </div>

  {/* Gender */}
  <div className="mb-3">
    <label className="form-label">Gender</label>
    <select className="form-select" name="gender"
    value={patient.gender}
    onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="OTHER">Other</option>
    </select>
  </div>

  {/* Date of Birth */}
  <div className="mb-3">
    <label className="form-label">Date of Birth</label>
    <input
      type="date"
      className="form-control"
      name="dob"
      value={patient.dob}
      onChange={handleChange}
    />
  </div>

  {/* Aadhar Number */}
  <div className="mb-3">
    <label className="form-label">Aadhar Number</label>
    <input
      type="text"
      className="form-control"
      name="aadharNumber"
      placeholder="Enter Aadhar Number"
      maxLength="12"
      value={patient.aadharNumber}
      onChange={handleChange}
    />
  </div>

  {/* Blood Group */}
  <div className="mb-3">
    <label className="form-label">Blood Group</label>
    <select className="form-select" name="bloodGroup" 
    value={patient.bloodGroup}
    onChange={handleChange}>
      <option value="">Select Blood Group</option>
      <option value="A_POSITIVE">A+</option>
      <option value="A_NEGATIVE">A-</option>
      <option value="B_POSITIVE">B+</option>
      <option value="B_NEGATIVE">B-</option>
      <option value="AB_POSITIVE">AB+</option>
      <option value="AB_NEGATIVE">AB-</option>
      <option value="O_POSITIVE">O+</option>
      <option value="O_NEGATIVE">O-</option>
    </select>
  </div>

  {/* Phone */}
  <div className="mb-3">
    <label className="form-label">Phone Number</label>
    <input
      type="tel"
      className="form-control"
      name="phone"
      placeholder="Enter Phone Number"
      value={patient.phone}
      onChange={handleChange}
    />
  </div>

  {/* Email */}
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input
      type="email"
      className="form-control"
      name="email"
      placeholder="Enter Email"
      value={patient.email}
      onChange={handleChange}
    />
  </div>

  {/* Address */}
  <div className="mb-3">
    <label className="form-label">Address</label>
    <textarea
      className="form-control"
      name="address"
      rows="3"
      placeholder="Enter Address"
      value={patient.address}
      onChange={handleChange}
    ></textarea>
  </div>

  {/* Allergies */}
  <div className="mb-3">
    <label className="form-label">Allergies</label>
    <input
      type="text"
      className="form-control"
      name="allergies"
      placeholder="Enter Allergies"
      value={patient.allergies}
      onChange={handleChange}
    />
  </div>

  {/* Chronic Disease */}
  <div className="mb-3">
    <label className="form-label">Chronic Disease</label>
    <input
      type="text"
      className="form-control"
      name="chronicDisease"
      placeholder="Enter Chronic Disease"
      value={patient.chronicDisease}
      onChange={handleChange}
    />
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary">
    Submit
  </button>

</form>
    </div>
        
    )
}
export default PatientProfile