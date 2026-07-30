import { useEffect, useState } from "react"
import axios  from "axios";
import { getPatientByUsername } from "../Servises/PatientService";

function PatientAdmin(){
    const [patient,setPatient]=useState([]);
    const [selectedPatient,setSelectedPatient]=useState({});

     async function onSelected(p){
      const username=p.username;
      console.log("patient userName: "+username);
      const patient = await getPatientByUsername(username);

        console.log(patient);

        setSelectedPatient(patient);
    }
    useEffect(()=>{
async function getAllPatients(){
try{
  console.log("in side getAllPatient")
    let api=`http://localhost:8080/api/patient/get-allPatient`;
const res=await axios.get(api)
console.log(res.data)
setPatient(res.data)

}
catch(err){
    console.log(err)
}
}
getAllPatients()
    },[])
    return(
      
        <div className="container">
              <h2>Patient Admin</h2>
              <div className="row">
  {patient.map((p) => (
    <div className="col-md-4 mb-3" key={p.id}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            Patient Name: {p.firstName}
          </h5>

          <p className="card-text">
            Email: {p.email}
          </p>

          <p className="card-text">
            Address: {p.address}
          </p>

          <p className="card-text">
            Date of Birth: {p.dob}
          </p>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
          onClick={()=>onSelected(p)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  ))}

{/* 
// <!-- Button trigger modal --> */}
{/* // <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button> */}

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Patient Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {/* Card */}
      <div className="card" style={{ width: "18rem" }}>
  <div className="card-header">
    Featured
  </div>
  <ul className="list-group list-group-flush">
    

  <p><strong>ID:</strong> {selectedPatient.id}</p>

<p><strong>Username:</strong> {selectedPatient.username}</p>

<p><strong>First Name:</strong> {selectedPatient.firstName}</p>

<p><strong>Last Name:</strong> {selectedPatient.lastName}</p>

<p><strong>Gender:</strong> {selectedPatient.gender}</p>

<p><strong>Date of Birth:</strong> {selectedPatient.dob}</p>

<p><strong>Aadhar Number:</strong> {selectedPatient.aadharNumber || "Not Available"}</p>

<p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>

<p><strong>Phone:</strong> {selectedPatient.phone}</p>

<p><strong>Email:</strong> {selectedPatient.email}</p>

<p><strong>Address:</strong> {selectedPatient.address}</p>

<p><strong>Allergies:</strong> {selectedPatient.allergies || "None"}</p>

<p><strong>Chronic Disease:</strong> {selectedPatient.chronicDisease || "None"}</p>
  </ul>
</div>



      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" >Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
  
 



        </div>
    )
}
export default PatientAdmin
