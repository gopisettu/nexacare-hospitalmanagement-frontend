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
    const[size,setSize]=useState(50)
    const [editPatient, setEditPatient] = useState({});
    const[searchData,setSearchData]=useState("");

    const [genderFilter, setGenderFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [bloodGroupFilter, setBloodGroupFilter] = useState("");
    const [appointmentFilter, setAppointmentFilter] = useState("");


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

    // USEEFFECT
    useEffect(() => {
      async function getAllPatients() {
        try {
          console.log("in side getAllPatient");
    
          let api = `http://localhost:8080/api/patient/get-allPatient?page=${page}&size=${size}`;
    
          if (searchData.trim() !== "") {
            api += `&search=${searchData}`;
          }
          if (genderFilter !== "") {
            api += `&gender=${genderFilter}`;
          }
          if (bloodGroupFilter !== "") {
            api += `&bloodGroup=${bloodGroupFilter}`;
          }
          if (appointmentFilter !== "") {
            api += `&appointmentFilter=${appointmentFilter}`;
          }
          if (sortOption !== "") {
            api += `&sortOption=${sortOption}`;
          }
    
          const res = await axios.get(api);
          console.log("API Response");
          console.table(res.data);
    
          setPatient(res.data);
    
        } catch (err) {
          console.log(err);
        }
      }
    
      getAllPatients();
    }, [page, size, searchData, genderFilter, sortOption, bloodGroupFilter, appointmentFilter]);

    const getGenderFilter = (e) => {
      setGenderFilter(e.target.value);
  };
  
  const getSortOption = (e) => {
      setSortOption(e.target.value);
  };
  
  const getBloodGroupFilter = (e) => {
      setBloodGroupFilter(e.target.value);
  };

    function getSearchDate(e) {
      setSearchData(e.target.value);
  }
  

  

   
    return(
      
        <div className="container">
              <h2>Patient Admin</h2>
              <div className="card shadow-sm mb-4">
    <div className="card-body">

        <div className="row g-3 align-items-center">

            {/* Search */}
            <div className="col-lg-3 col-md-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search Patient..."
                    value={searchData}
                    onChange={getSearchDate}
                />
            </div>

            {/* Filter */}
            <div className="col-lg-2 col-md-6">
            <select
    className="form-select"
    value={genderFilter}
    onChange={getGenderFilter}
>
    <option value="">All Patients</option>
    <option value="MALE">Male</option>
    <option value="FEMALE">Female</option>
</select>
            </div>

            {/* Appointment Filter */}
            <div className="col-lg-2 col-md-6">
            <select
    className="form-select"
    value={appointmentFilter}
    
    onChange={(e) => {
      console.log(e.target.value);
      setAppointmentFilter(e.target.value);
  }}
>
    <option value="">Appointments</option>

    <option value="TODAY">Today's Appointment</option>

    <option value="UPCOMING">Upcoming Appointment</option>

    <option value="PENDING">Pending</option>

    <option value="SCHEDULED">Scheduled</option>

    <option value="CONFIRMED">Confirmed</option>

    <option value="CHECKED_IN">Checked In</option>

    <option value="IN_PROGRESS">In Progress</option>

    <option value="COMPLETED">Completed</option>

    <option value="CANCELLED">Cancelled</option>

    <option value="RESCHEDULED">Rescheduled</option>

    <option value="NO_SHOW">No Show</option>
</select>
</div>

            {/* Sort */}
            <div className="col-lg-2 col-md-6">
            <select
    className="form-select"
    value={sortOption}
    onChange={getSortOption}
>
                    <option value="">Sort By Age</option>
                    <option value="YOUNG">Young</option>
                    <option value="OLD">Old</option>

                </select>
            </div>
            <div className="col-lg-2 col-md-6">
            <select
    className="form-select"
    value={bloodGroupFilter}
    onChange={getBloodGroupFilter}
>
    <option value="">Sort By Blood Group</option>

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

        </div>

        <hr />

        <div className="row g-3">



            {/* Date */}
            <div className="col-lg-2 col-md-6">
                <select className="form-select">
                    <option value="">Date</option>
                    <option value="TODAY">Today</option>
                    <option value="THIS_WEEK">This Week</option>
                    <option value="THIS_MONTH">This Month</option>
                </select>
            </div>

            {/* Add */}
            <div className="col-lg-2 col-md-6">
                <button
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={onAddNewPatient}
                >
                    + Add Patient
                </button>
            </div>

            {/* Refresh */}
            <div className="col-lg-2 col-md-6">
                <button className="btn btn-outline-primary w-100">
                    🔄 Refresh
                </button>
            </div>

            {/* Reset */}
            <div className="col-lg-2 col-md-6">
                <button className="btn btn-outline-secondary w-100">
                    Reset Filters
                </button>
            </div>

            {/* Export */}
            <div className="col-lg-2 col-md-6">
                <button className="btn btn-outline-dark w-100">
                    📥 Export
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