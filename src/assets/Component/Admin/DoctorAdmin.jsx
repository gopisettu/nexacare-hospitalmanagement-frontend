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

        const api = `http://localhost:8080/api/doctor/get-allDoctor?page=${page}&size=${size}`;
        const res = await axios.get(api);

        console.log(res.data);
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getAllDoctors();
  }, [page,size]);

  return (
    <div className="container">
      <h2>Doctor Admin</h2>

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