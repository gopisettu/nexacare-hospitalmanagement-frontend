import { useEffect, useState } from "react"
import axios  from "axios";
import { getPatientByUsername } from "../Servises/PatientService";

function PatientAdmin(){
    const [patient,setPatient]=useState([]);
    const [selectedPatient,setSelectedPatient]=useState({});

    const [page,setPage]=useState(0)
    const[size,setSize]=useState(8)
    const [editPatient, setEditPatient] = useState({});
    const submitEditedForm=async(e)=>{
      e.preventDefault();
      try{
        const res = await axios.put(
          `http://localhost:8080/api/patient/update-patientProfile/${selectedPatient.username}`,
          editPatient
        );
        console.log(res.data);
        setSelectedPatient(res.data);
      }
      catch(err){
        console.log(err)
      }
    }
    const handleChange=(e)=>{
      e.preventDefault();
      const { name, value } = e.target;
      setEditPatient((prevPatient) =>({
        ...prevPatient,
        [name]:value
      }))
    }

   const deletePatinet=async(pusername)=>{
try{
  console.log("In Delete")
  const res = await axios.put(
    `http://localhost:8080/api/executive/deActivatePatient-ByExecutive/${pusername}`
  );

  const toastLiveExample = document.getElementById('liveToast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()

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
        setEditPatient(patient); // Initialize editPatient with the selected patient's data
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
              {/* PatientCard */}
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
      <form onSubmit={submitEditedForm}>
  <div className="row">

    {/* ID */}
    <div className="col-md-6 mb-3">
      <label className="form-label">ID</label>
      <input
        type="text"
        className="form-control"
        value={editPatient.id || selectedPatient.id || ""}
        disabled
      />
    </div>

    {/* Username */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Username</label>
      <input
        type="text"
        className="form-control"
        name="username"
        value={editPatient.username ||selectedPatient.username || ""}
        disabled
      />
    </div>

    {/* First Name */}
    <div className="col-md-6 mb-3">
      <label className="form-label">First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstName"
        value={editPatient.firstName ||selectedPatient.firstName || ""}
        onChange={handleChange}
      />
    </div>

    {/* Last Name */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Last Name</label>
      <input
        type="text"
        className="form-control"
        name="lastName"
        value={editPatient.lastName ||selectedPatient.lastName || ""}
        onChange={handleChange}
      />
    </div>

    {/* Gender */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Gender</label>
      <select
        className="form-select"
        name="gender"
        value={editPatient.gender ||selectedPatient.gender || ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Date of Birth */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="dob"
        value={editPatient.dob ||selectedPatient.dob || ""}
        onChange={handleChange}
      />
    </div>

    {/* Aadhar Number */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Aadhar Number</label>
      <input
        type="text"
        className="form-control"
        name="aadharNumber"
        value={editPatient.aadharNumber ||selectedPatient.aadharNumber || ""}
        onChange={handleChange}
      />
    </div>

    {/* Blood Group */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Blood Group</label>
      <select
        className="form-select"
        name="bloodGroup"
        value={editPatient.bloodGroup ||selectedPatient.bloodGroup || ""}
        onChange={handleChange}
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>

    {/* Phone */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Phone</label>
      <input
        type="text"
        className="form-control"
        name="phone"
        value={editPatient.phone ||selectedPatient.phone || ""}
        onChange={handleChange}
      />
    </div>

    {/* Email */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        name="email"
        value={editPatient.email ||selectedPatient.email || ""}
        onChange={handleChange}
      />
    </div>

    {/* Address */}
    <div className="col-12 mb-3">
      <label className="form-label">Address</label>
      <textarea
        className="form-control"
        rows="3"
        name="address"
        value={editPatient.address ||selectedPatient.address || ""}
        onChange={handleChange}
      ></textarea>
    </div>

    {/* Allergies */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Allergies</label>
      <input
        type="text"
        className="form-control"
        name="allergies"
        value={editPatient.allergies ||selectedPatient.allergies || ""}
        onChange={handleChange}
      />
    </div>

    {/* Chronic Disease */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Chronic Disease</label>
      <input
        type="text"
        className="form-control"
        name="chronicDisease"
        value={editPatient.chronicDisease ||selectedPatient.chronicDisease || ""}
        onChange={handleChange}
      />
    </div>
    <input
  type="submit"
  className="btn btn-primary"
  value="Save Changes"
/>
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div>
</form>




      </div>
      <div className="modal-footer">

      <button
  type="button"
  className="btn btn-danger"
  id="liveToastBtn"
  onClick={() => deletePatinet(selectedPatient.username)}
>
  <i className="bi bi-trash-fill"></i>
</button>
        
       
      </div>

    </div>
  </div>
</div>

{/* Toast */}
<div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 1080 }}>
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
    
      <strong className="me-auto">Notification </strong>
      <small>few mins ago</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
     Patient: {selectedPatient.username} is Deleted SuccessFully
    </div>
  </div>
</div>

</div>


  
 



        </div>
    )
}
export default PatientAdmin