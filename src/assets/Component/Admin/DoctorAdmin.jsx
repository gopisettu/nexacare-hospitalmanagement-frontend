import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorByUsername } from "../Servises/DoctorService";
import DoctorCard from "../Doctor/DoctorCard";
import Pagination from "../HelperComponent/Pagination";
import DoctorModal from "../Doctor/DoctorModal";
import { formatEnum, bloodGroupLabel} from "../HelperComponent/EnumUtility";



import DoctorForm from "../Doctor/DoctorForm";

import {
  getGenders,
  getDepartments,
  getSpecializations,
  getQualifications,
} from "../Servises/EnumService";

function DoctorAdmin() {
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [editDoctor, setEditDoctor] = useState({});

  const [page,setPage]=useState(0)
  const[size,setSize]=useState(8)
  const [genders, setGenders] = useState([]);
const [departments, setDepartments] = useState([]);
const [specializations, setSpecializations] = useState([]);
const [qualifications, setQualifications] = useState([]);

  


  const [searchData, setSearchData] = useState("");
const [genderFilter, setGenderFilter] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");
const [specializationFilter, setSpecializationFilter] = useState("");
const [sortOption, setSortOption] = useState("");
const [appointmentFilter, setAppointmentFilter] = useState("");
const [bloodGroupFilter, setBloodGroupFilter] = useState("");



    const [bloodGroups, setBloodGroups] = useState([]);
    const [appointmentStatus, setAppointmentStatus] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({});


    const [qualificationFilter, setQualificationFilter] = useState("");

const [feeSort, setFeeSort] = useState("");
const [experienceSort, setExperienceSort] = useState("");




const [newDoctor, setNewDoctor] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [show, setShow] = useState(false);
const [message, setMessage] = useState("");
const [toastType, setToastType] = useState("success"); // NEW

const getErrorMessage = (err) => {
    if (err.response?.data?.message) {
        return err.response.data.message;
    }
    if (err.response?.status === 500) {
        return "Internal Server Error.";
    }
    if (err.code === "ERR_NETWORK") {
        return "Cannot connect to server.";
    }
    return "Something went wrong.";
};

const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    const toastEl = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastBootstrap.show();
};   

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
         getAllDoctors();
        } catch (err) 
        { console.error("Upload failed:", err);
         alert("Failed to upload image."); } 
       };

      
      const onAddNewDoctor = () => {
        setSelectedDoctor({});
        setEditDoctor({});
        setNewDoctor(true);
      };
 
const submitEditedForm = async (e) => {
    e.preventDefault();
    try {
        if (newDoctor) {
            await axios.post(
                "http://localhost:8080/api/admin/addDoctor-ByAdmin",
                editDoctor
            );
            showToast("Doctor added successfully.");
        } else {
            const res = await axios.put(
                `http://localhost:8080/api/admin/updateDoctor-ByAdmin/${selectedDoctor.username}`,
                editDoctor
            );
            setSelectedDoctor(res.data);
            setEditDoctor(res.data);
            showToast("Doctor updated successfully.");
        }

        // refresh list — you don't currently have a reusable getAllDoctors()
        // outside the useEffect; see note below
    } catch (err) {
        console.log(err);
        showToast(getErrorMessage(err), "error");
    }
};
  const loadEnums = async () => {
    try {
      const [
        genderRes,
        departmentRes,
        specializationRes,
        qualificationRes,
      ] = await Promise.all([
        getGenders(),
        getDepartments(),
        getSpecializations(),
        getQualifications(),
      ]);
  
      setGenders(genderRes.data);
      setDepartments(departmentRes.data);
      setSpecializations(specializationRes.data);
      setQualifications(qualificationRes.data);
  
    } catch (err) {
      console.error(err);
    }
  };
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
    loadEnums();
  }, []);

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
    
        // Add blood group filter api
        console.log(api);
    
        const res = await axios.get(api);
    
        console.log("API Response");
        console.table(res.data);
    
        setDoctor(res.data);
    
      } catch (err) {
        console.error(err);
      }
    }

  useEffect(() => {
  

    getAllDoctors();
   
  }, [page,
    size,
    searchData,
  genderFilter,
  departmentFilter,
  specializationFilter,
  qualificationFilter,
  feeSort,
  experienceSort]);

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
    <option value="">Gender</option>

    {genders.map((gender) => (
        <option key={gender} value={gender}>
            {formatEnum(gender)}
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

           
            

        </div>

        <hr />

        <div className="row g-3">



           

            {/* Add */}
            <div className="col-lg-2 col-md-6">
            <button
  className="btn btn-success w-100"
  data-bs-toggle="modal"
  data-bs-target="#doctorModal"
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
  <div className="modal fade" id="doctorModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

    genders={genders}
    departments={departments}
    specializations={specializations}
    qualifications={qualifications}
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



 
</div>
    </div>
    </div>
  );
}

export default DoctorAdmin;