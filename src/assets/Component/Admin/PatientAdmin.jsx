import { useEffect, useState } from "react"
import axios  from "axios";
import { getPatientByUsername } from "../Servises/PatientService";
import PatientForm from "../Patient/PatientForm";
import PatientCard from "../Patient/PatientCard";
import Pagination from "../HelperComponent/Pagination";
function PatientAdmin(){

  const [message,setMessage]=useState('')
  const [show, setShow] = useState(false);
    const [patient,setPatient]=useState([]);
    const [selectedPatient,setSelectedPatient]=useState({});
 const [newUser,setNewUser]=useState(true)
    const [page,setPage]=useState(0)
    const[size,setSize]=useState(8)
    const [editPatient, setEditPatient] = useState({});

    const onAddNewPatient=()=>{
      setSelectedPatient({});
      setEditPatient({});
      setNewUser(true);

    }

    const submitEditedForm = async (e) => {
      e.preventDefault();
  
      try {
  
          let res;
  
          if (newUser) {
  console.log("In New User")
  console.log(editPatient)
              res = await axios.post(
                  "http://localhost:8080/api/admin/addPatient-ByAdmin",
                  editPatient
              );
              alert("Patient added successfully.");
  
          } else {
  
              res = await axios.put(
                  `http://localhost:8080/api/patient/update-patientProfile/${selectedPatient.username}`,
                  editPatient
              );
  
          }
  
          console.log(res.data);
          setSelectedPatient(res.data);
  
      } catch (err) {
          console.log(err);
          
          setMessage(err.response?.data?.message || "Something went wrong.");
          console.log(message)
          setShow(true)
      }
  };
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
        setEditPatient(patient);
        setNewUser(false) // Initialize editPatient with the selected patient's data
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
              <div className="card shadow-sm mb-4">
    <div className="card-body">

      <div className="row g-3">

        {/* Search */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Patient..."
          />
        </div>

        {/* Filter */}
        <div className="col-md-2">
          <select className="form-select">
            <option>All Patients</option>
            <option>Male</option>
            <option>Female</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Sort */}
        <div className="col-md-2">
          <select className="form-select">
            <option>Sort By</option>
            <option>Name</option>
            <option>DOB</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Add */}
        <div className="col-md-2">
          <button className="btn btn-success w-100"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {onAddNewPatient}}
          >
            + Add Patient
          </button>
        </div>

        {/* Refresh */}
        <div className="col-md-1">
          <button className="btn btn-outline-primary w-100">
            ↻
          </button>
        </div>

        {/* Export */}
        <div className="col-md-2">
          <button className="btn btn-outline-dark w-100">
            Export
          </button>
        </div>

      </div>

    </div>
  </div>

              {/* PatientCard */}
        <PatientCard
            key={patient.id}
            patient={patient}
            onSelected={onSelected}
        />
        {/* Pagination */}
<Pagination 
  page={page}
  setPage={setPage}/>

     <div className="row">



{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel"> {newUser ? "Add Patient" : "Patient Details"}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* Patient Form is from PatientForm.jsx */}
    <PatientForm
        editPatient={editPatient}
        handleChange={handleChange}
        submitEditedForm={submitEditedForm}
        selectedPatient={selectedPatient}
        newUser={newUser}
    />
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

 {/* Form Validation Error */}
{show && (
  <div
    className="toast show position-fixed top-0 end-0 m-3"
    style={{ zIndex: 1055, minWidth: "320px" }}
  >
    <div className="toast-header bg-danger text-white">
      <strong className="me-auto">Error</strong>

      {/* Close (X) Button */}
      <button
        type="button"
        className="btn-close btn-close-white"
        onClick={() => setShow(false)}
      ></button>
    </div>

    <div className="toast-body">
      {message}
    </div>

    <div className="toast-footer p-2 text-end">
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setShow(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
 



        </div>
    )
}
export default PatientAdmin