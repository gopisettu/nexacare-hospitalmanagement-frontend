import { useEffect, useState } from "react"
import axios  from "axios";
import { getPatientByUsername } from "../Servises/PatientService";
import PatientForm from "../Patient/PatientForm";
import PatientCard from "../Patient/PatientCard";
import Pagination from "../HelperComponent/Pagination";
import { formatEnum, bloodGroupLabel} from "../HelperComponent/EnumUtility";
import {
  getGenders,
  getBloodGroups,
  getAppointmentStatus
} from "../Servises/EnumService";
function PatientAdmin(){

  const [message,setMessage]=useState('')
  const [show, setShow] = useState(false);
    const [patient,setPatient]=useState([]);
    const [selectedPatient,setSelectedPatient]=useState({});
 const [newUser,setNewUser]=useState(true)
    const [page,setPage]=useState(0)
    const[size,setSize]=useState(8)
    const [editPatient, setEditPatient] = useState({});
    const[searchData,setSearchData]=useState("");

    const [genderFilter, setGenderFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [bloodGroupFilter, setBloodGroupFilter] = useState("");
    const [appointmentFilter, setAppointmentFilter] = useState("");

    const [genders, setGenders] = useState([]);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [appointmentStatus, setAppointmentStatus] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});
    
    // Upload patient image 
    const uploadImage = async (patientId) => {
       console.log(patientId) 
       alert("patientId-inside upload image   "+patientId)
       const file = selectedFiles[patientId];
        if (!file) { alert("Please select an image.");
         return; } 
         try { const formData = new FormData(); 
          formData.append("pImage", file); 
          const res = await axios.put(`http://localhost:8080/api/admin/image/upload/${patientId}`, formData );
           alert("Image uploaded successfully!"); 
           console.log(res.data);
            // Refresh product list 
            // getAllProducts();
           } catch (err) 
           { console.error("Upload failed:", err);
            alert("Failed to upload image."); } 
          };
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
    // USEEFFECT
    useEffect(() => {
     
    
      getAllPatients();
      loadEnums();
    }, [page, size, searchData, genderFilter, sortOption, bloodGroupFilter, appointmentFilter]);

    const loadEnums = async () => {

      try {
  
          const [
              genderRes,
              bloodRes,
              appointmentRes
          ] = await Promise.all([
              getGenders(),
              getBloodGroups(),
              getAppointmentStatus()
          ]);
  
          setGenders(genderRes.data);
          setBloodGroups(bloodRes.data);
          setAppointmentStatus(appointmentRes.data);
  
      } catch (err) {
  
          console.log(err);
  
      }
    }
    const refreshFilter = () => {
      setSearchData("");
      setGenderFilter("");
      setSortOption("");
      setBloodGroupFilter("");
      setAppointmentFilter("");
    }
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

    {genders.map((gender) => (
        <option
            key={gender}
            value={gender}
        >
            {formatEnum(gender)}
        </option>
    ))}

</select>
            </div>

            {/* Appointment Filter */}
            <div className="col-lg-2 col-md-6">
            <select
    className="form-select"
    value={appointmentFilter}
    onChange={(e) => setAppointmentFilter(e.target.value)}
>
    <option value="">Appointments</option>

    {appointmentStatus.map((status) => (
        <option
            key={status}
            value={status}
        >
            {formatEnum(status)}
        </option>
    ))}

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
    <option value="">Blood Group</option>

    {bloodGroups.map((group) => (
        <option
            key={group}
            value={group}
        >
            {bloodGroupLabel[group]}
        </option>
    ))}

</select>
            </div>

        </div>

        <hr />

        <div className="row g-3">



           

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
                <button className="btn btn-outline-primary w-100"
                onClick={() => window.location.reload()}
                >
                    🔄 Refresh
                </button>
            </div>

            {/* Reset */}
            <div className="col-lg-2 col-md-6">
                <button className="btn btn-outline-secondary w-100"
                onClick={refreshFilter}>
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
    patient={patient}
    onSelected={onSelected}
    selectedFiles={selectedFiles}
    setSelectedFiles={setSelectedFiles}
    uploadImage={uploadImage}
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