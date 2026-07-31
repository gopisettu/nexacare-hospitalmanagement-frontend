import { useEffect, useState } from "react";
import axios from "axios";
import { getDoctorByUsername } from "../Servises/DoctorService";

function DoctorAdmin() {
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const [page,setPage]=useState(0)
  const[size,setSize]=useState(8)

  async function onSelected(d) {
    const username = d.username;
    console.log("Doctor Username:", username);

    const doctor = await getDoctorByUsername(username);
    console.log(doctor);

    setSelectedDoctor(doctor);
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
                <div className="card">
                  <div className="card-header">
                    Doctor Information
                  </div>

                  <div className="card-body">
                    <p><strong>ID:</strong> {selectedDoctor.id}</p>

                    <p><strong>Username:</strong> {selectedDoctor.username}</p>

                    <p>
                      <strong>Name:</strong>{" "}
                      Dr. {selectedDoctor.firstName}{" "}
                      {selectedDoctor.lastName}
                    </p>

                    <p><strong>Gender:</strong> {selectedDoctor.gender}</p>

                    <p><strong>Phone:</strong> {selectedDoctor.phone}</p>

                    <p><strong>Email:</strong> {selectedDoctor.email}</p>

                    <p><strong>Address:</strong> {selectedDoctor.address}</p>

                    <p>
                      <strong>Qualification:</strong>{" "}
                      {selectedDoctor.qualification}
                    </p>

                    <p>
                      <strong>Department:</strong>{" "}
                      {selectedDoctor.department}
                    </p>

                    <p>
                      <strong>Specialization:</strong>{" "}
                      {selectedDoctor.specialization}
                    </p>

                    <p>
                      <strong>Experience:</strong>{" "}
                      {selectedDoctor.totalExperienceYear} Years
                    </p>

                    <p>
                      <strong>Consultation Fee:</strong> ₹
                      {selectedDoctor.consultationFee}
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAdmin;