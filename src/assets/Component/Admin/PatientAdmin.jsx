import { useEffect, useState } from "react"
import axios  from "axios";
import { getPatientByUsername } from "../Servises/PatientService";

function PatientAdmin(){
    const [patient,setPatient]=useState([]);
    const [selectedPatient,setSelectedPatient]=useState({});

    const [page,setPage]=useState(0)
    const[size,setSize]=useState(8)

   const deletePatinet=async(pusername)=>{
try{
  console.log("In Delete")
  const res = await axios.put(
    `http://localhost:8080/api/executive/deActivatePatient-ByExecutive/${pusername}`
  );

}
catch(err){

  console.log(err)
}
    }
    

 

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
    let api=`http://localhost:8080/api/patient/get-allPatient?page=${page}&size=${size}`;
const res=await axios.get(api)
console.log(res.data)
setPatient(res.data)

}
catch(err){
    console.log(err)
}
}
getAllPatients()
    },[page,size])


    return(
      
        <div className="container">
              <h2>Patient Admin</h2>
              <div className="row">
  {patient.map((p) => (
    <div className="col col -4 -md-4 mb-3" key={p.id}>
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
{/* Pagination */}
<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" onClick={()=>page>0?setPage(page-1):setPage(0)}>Previous</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(0)}>1</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(1)}>2</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(2)}>3</a></li>
    <li className="page-item"><a className="page-link" onClick={()=>setPage(page+1) }>Next</a></li>
  </ul>
</nav>






{/* 
// <!-- Button trigger modal --> */}
{/* // <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button> */}

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
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

      <button
  type="button"
  className="btn btn-danger"
  onClick={() => deletePatinet(selectedPatient.username)}
>
  <i className="bi bi-trash-fill"></i>
</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" >Save changes</button>
      </div>

      <button >Show live toast</button>

<div className="position-fixed bottom-0 end-0 p-3" >
  <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
    
      <strong className="me-auto">Notification </strong>
      <small>few mins ago</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
     Patient is Deleted SuccessFully
    </div>
  </div>
</div>
    </div>
  </div>
</div>
</div>


  
 



        </div>
    )
}
export default PatientAdmin
