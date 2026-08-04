import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorByUsername } from "../Servises/DoctorService";
import DoctorCard from "../Doctor/DoctorCard";
import Pagination from "../HelperComponent/Pagination";
import DoctorModal from "../Doctor/DoctorModal";


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

  const uploadImage = async (doctorId) => {
    console.log(doctorId) 
    alert("doctorId-inside upload image   "+doctorId)
    const file = selectedFiles[doctorId];
     if (!file) { alert("Please select an image.");
      return; } 
      try { const formData = new FormData(); 
       formData.append("pImage", file); 
       const res = await axios.put(`http://localhost:8080/api/admin/image/upload/${doctorId}`, formData );
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

  const deleteDoctor=async(dusername)=>{
    try{
      console.log("In Delete")
      const res = await axios.put(
        `http://localhost:8080/api/executive/deActivateDoctor-ByExecutive/${dusername}`
      );

      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    
    }
    catch(err){
    
      console.log(err)
    }
        }

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
    
        let api = `http://localhost:8080/api/doctor/get-allDoctor?page=${page}&size=${size}`;
    
        if (searchData.trim() !== "") {
          api += `&search=${searchData}`;
        }
    
        if (genderFilter !== "") {
          api += `&gender=${genderFilter}`;
        }
    
        if (departmentFilter !== "") {
          api += `&department=${departmentFilter}`;
        }
    
        if (specializationFilter !== "") {
          api += `&specialization=${specializationFilter}`;
        }
    
        if (sortOption !== "") {
          api += `&sortOption=${sortOption}`;
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
  }, [page,size]);

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
      </div>

      <div className="row">
      {doctor.map((d) => (
    <DoctorCard
      key={d.id}
      doctor={d}
      onSelected={onSelected}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      uploadImage={uploadImage}
    />
  ))}
        {/* Pagination */}
        <Pagination 
  page={page}
  setPage={setPage}/>

        {/* Modal */}
        <DoctorModal
    editDoctor={editDoctor}
    handleChange={handleChange}
    submitEditedForm={submitEditedForm}
    deleteDoctor={deleteDoctor}
    selectedDoctor={selectedDoctor}
/>

        
         
        

        
{/* Toast */}
<div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 1080 }}>
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
    
      <strong className="me-auto">Notification </strong>
      <small>few mins ago</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
     Doctor: {selectedDoctor.username} is Deleted SuccessFully
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default DoctorAdmin;