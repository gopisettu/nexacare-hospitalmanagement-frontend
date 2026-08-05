import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorByUsername } from "../Servises/DoctorService";
import DoctorCard from "../Doctor/DoctorCard";
import Pagination from "../HelperComponent/Pagination";
import DoctorModal from "../Doctor/DoctorModal";
import { formatEnum, bloodGroupLabel} from "../HelperComponent/EnumUtility";


import {
  getGenders,
  getBloodGroups,
  getDepartments,
  getQualifications,
  getSpecializations

} from "../Servises/EnumService";
import DoctorForm from "../Doctor/DoctorForm";

function DoctorAdmin() {
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [editDoctor, setEditDoctor] = useState({});

  const [page,setPage]=useState(0)
  const[size,setSize]=useState(8)

  


  const [searchData, setSearchData] = useState("");
const [genderFilter, setGenderFilter] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");
const [specializationFilter, setSpecializationFilter] = useState("");
const [sortOption, setSortOption] = useState("");
const [appointmentFilter, setAppointmentFilter] = useState("");
const [bloodGroupFilter, setBloodGroupFilter] = useState("");


const [genders, setGenders] = useState([]);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [appointmentStatus, setAppointmentStatus] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});


    const [qualificationFilter, setQualificationFilter] = useState("");

const [feeSort, setFeeSort] = useState("");
const [experienceSort, setExperienceSort] = useState("");

const [qualifications, setQualifications] = useState([]);
const [specializations, setSpecializations] = useState([]);
const [departments, setDepartments] = useState([]);

const [newDoctor, setNewDoctor] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [show, setShow] = useState(false);
const [message, setMessage] = useState("");

  const uploadImage = async (doctorId) => {
    console.log(doctorId) 
    alert("doctorId-inside upload image   "+doctorId)
    const file = selectedFiles[doctorId];
     if (!file) { alert("Please select an image.");
      return; } 
      try { const formData = new FormData(); 
       formData.append("pImage", file); 
       const res = await axios.put(`http://localhost:8080/api/admin/doctorimage/upload/${doctorId}`, formData );
        alert("Image uploaded successfully!"); 
        console.log(res.data);
         // Refresh product list 
         // getAllProducts();
        } catch (err) 
        { console.error("Upload failed:", err);
         alert("Failed to upload image."); } 
       };

      
      const onAddNewDoctor = () => {
        setSelectedDoctor({});
        setEditDoctor({});
        setNewDoctor(true);
      };
  const submitEditedForm=async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.put(
        `http://localhost:8080/api/doctor/update-doctorProfile/${selectedDoctor.username}`,editDoctor
      );
      console.log(res.data);
      setSelectedDoctor(res.data);
      setEditDoctor(res.data);
    }
    catch(err){
      console.log(err)
    }
  }

  const handleChange=(e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setEditDoctor((prevDoctor) =>({
      ...prevDoctor,
      [name]:value
    }))
  }

  const deleteDoctor = async (dusername) => {
    try {
      console.log("In Delete");
      const res = await axios.put(
        `http://localhost:8080/api/executive/deActivateDoctor-ByExecutive/${dusername}`
      );
  
      setToastMessage("Doctor deactivated successfully!");
      const toastLiveExample = document.getElementById('liveToast');
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    } catch (err) {
      console.log(err);
      setMessage("Failed to deactivate doctor. Please try again.");
      setShow(true);
    }
  };

  async function onSelected(d) {
    const username = d.username;
    console.log("Doctor Username:", username);

    const doctor = await getDoctorByUsername(username);
    console.log(doctor);

    setSelectedDoctor(doctor);
    setEditDoctor(doctor);
  }

  useEffect(() => {
    async function getAllDoctors() {
      try {
        console.log("Inside getAllDoctors");
        // alert("Inside getAllDoctors")
    
        let api = `http://localhost:8080/api/admin/get-allDoctor?page=${page}&size=${size}`;

        if (searchData.trim() !== "") {
            api += `&search=${searchData}`;
        }
        
        if (genderFilter !== "") {
          // alert("Inside Gender Filter")
            api += `&gender=${genderFilter}`;
        }
        
        if (departmentFilter !== "") {
            api += `&department=${departmentFilter}`;
        }
        
        if (specializationFilter !== "") {
            api += `&specialization=${specializationFilter}`;
        }
        
        if (qualificationFilter !== "") {
            api += `&qualification=${qualificationFilter}`;
        }
        
        if (feeSort !== "") {
            api += `&feeSort=${feeSort}`;
        }
        
        if (experienceSort !== "") {
            api += `&experienceSort=${experienceSort}`;
        }
    
        console.log(api);
    
        const res = await axios.get(api);
    
        console.log("API Response");
        console.table(res.data);
    
        setDoctor(res.data);
    
      } catch (err) {
        console.error(err);
      }
    }

    getAllDoctors();
    loadEnums()
  }, [page,
    size,
    searchData,
  genderFilter,
  departmentFilter,
  specializationFilter,
  qualificationFilter,
  feeSort,
  experienceSort]);

  const loadEnums = async () => {

    try {

        const [
            genderRes,
            departmentRes,
            specializationRes,
            qualificationRes
        ] = await Promise.all([
          getGenders(),
            getDepartments(),
            getSpecializations(),
            getQualifications()
        ]);

        setGenders(genderRes.data);
        setDepartments(departmentRes.data);
        setSpecializations(specializationRes.data);
        setQualifications(qualificationRes.data);

    } catch (err) {
        console.log(err);
    }
};
const refreshFilter = () => {

  setSearchData("");
  setGenderFilter("");
  setDepartmentFilter("");
  setSpecializationFilter("");
  setQualificationFilter("");

  setFeeSort("");
  setExperienceSort("");
};
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
  return (
    <div className="container">
      <h2>Doctor Admin</h2>



      <div className="row">


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
    <option value="">All Doctor</option>

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
{/* Specilization */}
            <div className="col-lg-2 col-md-6">
    <select
        className="form-select"
        value={specializationFilter}
        onChange={(e) => setSpecializationFilter(e.target.value)}
    >
        <option value="">Specialization</option>

        {specializations.map((sp) => (
            <option key={sp} value={sp}>
                {formatEnum(sp)}
            </option>
        ))}
    </select>
</div>
{/* Qualification */}
<div className="col-lg-2 col-md-6">
    <select
        className="form-select"
        value={qualificationFilter}
        onChange={(e) => setQualificationFilter(e.target.value)}
    >
        <option value="">Qualification</option>

        {qualifications.map((q) => (
            <option key={q} value={q}>
                {formatEnum(q)}
            </option>
        ))}
    </select>
</div>
{/* Consultant Fee */}
<div className="col-lg-2 col-md-6">
    <select
        className="form-select"
        value={feeSort}
        onChange={(e) => setFeeSort(e.target.value)}
    >
        <option value="">Consultant Fee</option>
        <option value="LOW">Low → High</option>
        <option value="HIGH">High → Low</option>
    </select>
</div>

{/* Experience Sort */}
<div className="col-lg-2 col-md-6">
    <select
        className="form-select"
        value={experienceSort}
        onChange={(e) => setExperienceSort(e.target.value)}
    >
        <option value="">Experience</option>
        <option value="MIN">Low → High</option>
        <option value="MAX">High → Low</option>
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
  onClick={onAddNewDoctor}
>
  + Add Doctor
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
      </div>

      <div className="container">
  <div className="row g-4">
    {doctor.map((doctor) => (
      <DoctorCard
        key={doctor.id}
        doctor={doctor}
        onSelected={onSelected}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        uploadImage={uploadImage}
      />
    ))}
  </div>

  {/* Pagination */}
  <Pagination
    page={page}
    setPage={setPage}
  />
 <div className="row">
  {/* Modal */}
  <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          {newDoctor ? "Add Doctor" : "Doctor Details"}
        </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <DoctorForm
          editDoctor={editDoctor}
          handleChange={handleChange}
          submitEditedForm={submitEditedForm}
          selectedDoctor={selectedDoctor}
          newDoctor={newDoctor}
        />
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          id="liveToastBtn"
          onClick={() => deleteDoctor(selectedDoctor.username)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  </div>
</div>
{/* end modal  */}



  {/* Toast */}
  <div className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1080 }}>
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <strong className="me-auto">Notification</strong>
      <small>just now</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      {toastMessage}
    </div>
  </div>
</div>
{/* toaster end */}



 {/* Form Validation Error */}
 {show && (
  <div
    className="toast show position-fixed top-0 end-0 m-3"
    style={{ zIndex: 1055, minWidth: "320px" }}
  >
    <div className="toast-header bg-danger text-white">
      <strong className="me-auto">Error</strong>
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
    </div>
    </div>
  );
}

export default DoctorAdmin;