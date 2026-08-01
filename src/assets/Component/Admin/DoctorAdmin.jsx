import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorByUsername } from "../Servises/DoctorService";

function DoctorAdmin() {
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [editDoctor, setEditDoctor] = useState({});

  const [page,setPage]=useState(0)
  const[size,setSize]=useState(8)

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
          <div className="col col -4 -md-4 mb-3" key={d.id}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">
                  Dr. {d.firstName} {d.lastName}
                </h5>

                <p className="card-text">
                  Department: {d.department}
                </p>

                <p className="card-text">
                  Qualification: {d.qualification}
                </p>

                <p className="card-text">
                  Experience: {d.totalExperienceYear} Years
                </p>

                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#doctorModal"
                  onClick={() => onSelected(d)}
                >
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

        {/* Modal */}
        <div
          className="modal fade"
          id="doctorModal"
         
          aria-labelledby="doctorModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="doctorModalLabel"
                >
                  Doctor Details
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={submitEditedForm}>
                  <div className="row">

                    {/* ID */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editDoctor.id ?? ""}
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
                        value={editDoctor.username ?? ""}
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
                        value={editDoctor.firstName ?? ""}
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
                        value={editDoctor.lastName ?? ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Gender */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={editDoctor.gender ?? ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={editDoctor.phone ?? ""}
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
                        value={editDoctor.email ?? ""}
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
                        value={editDoctor.address ?? ""}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Qualification */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Qualification</label>
                      <input
                        type="text"
                        className="form-control"
                        name="qualification"
                        value={editDoctor.qualification ?? ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Department */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={editDoctor.department ?? ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Specialization */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Specialization</label>
                      <input
                        type="text"
                        className="form-control"
                        name="specialization"
                        value={editDoctor.specialization ?? ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Experience */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Experience (Years)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalExperienceYear"
                        value={editDoctor.totalExperienceYear ?? ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Consultation Fee */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="consultationFee"
                        value={editDoctor.consultationFee ?? ""}
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
  onClick={() => deleteDoctor(selectedDoctor.username)}
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
     Doctor: {selectedDoctor.username} is Deleted SuccessFully
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default DoctorAdmin;