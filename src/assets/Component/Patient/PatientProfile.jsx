import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function PatientProfile() {

    const username = "ap@gmail.com";

    const [patient, setPatient] = useState({
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        bloodGroup: "",
        phone: "",
        email: "",
        address: "",
        allergies: "",
        chronicDisease: ""
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        loadPatient();
    }, []);

    async function loadPatient() {
        try {

            const res = await axios.get(
                `http://localhost:8080/api/patient/get-PatientByUsername/${username}`
            );

            setPatient(res.data);

        } catch (error) {
            setMessage("Unable to load patient details.");
            setMessageType("danger");
        }
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setPatient(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const updateProfile = async (e) => {
      e.preventDefault();
  
      const result = await Swal.fire({
          title: "Update Patient Profile?",
          text: "This will save the latest changes to your profile.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, Update",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#0d6efd",
          cancelButtonColor: "#6c757d",
          reverseButtons: true
      });
  
      if (!result.isConfirmed) return;
  
      try {
          await axios.put(
              `http://localhost:8080/api/patient/update-patientProfile/${patient.username}`,
              patient
          );
  
          Toast.fire({
              icon: "success",
              title: "Patient profile updated successfully."
          });
  
      } catch (error) {

        console.log("Status :", error.response?.status);
        console.log("Data :", error.response?.data);
    
        const status = error.response?.status;
        const message =
            error.response?.data?.message ||
            error.response?.data ||
            "Something went wrong.";
    
        if (status === 400) {
    
            Toast.fire({
                icon: "warning",
                title: "Validation Failed",
                text: message
            });
    
        } else if (status === 404) {
    
            Toast.fire({
                icon: "error",
                title: "Not Found",
                text: message
            });
    
        } else if (status === 409) {
    
            Toast.fire({
                icon: "warning",
                title: "Conflict",
                text: message
            });
    
        } else if (status >= 500) {
    
            Toast.fire({
                icon: "error",
                title: "Server Error",
                text: message
            });
    
        } else {
    
            Toast.fire({
                icon: "error",
                title: "Error",
                text: message
            });
        }
    }
  };
    

    
  
    return (

      <div className="container py-5">

      <div className="row justify-content-center">

          <div className="col-lg-10">

              <div className="card shadow-lg border-0 rounded-4">

                  <div className="card-header bg-primary text-white rounded-top-4 py-3">

                      <h4 className="mb-0 fw-semibold">
                          <i className="bi bi-person-lines-fill me-2"></i>
                          Edit Patient Profile
                      </h4>

                  </div>

                  <div className="card-body p-4">

                      <form onSubmit={updateProfile}>

                          <div className="row">

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      First Name
                                  </label>

                                  <input
                                      type="text"
                                      className="form-control"
                                      name="firstName"
                                      value={patient.firstName}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Last Name
                                  </label>

                                  <input
                                      type="text"
                                      className="form-control"
                                      name="lastName"
                                      value={patient.lastName}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Email
                                  </label>

                                  <input
                                      type="email"
                                      className="form-control"
                                      name="email"
                                      value={patient.email}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Phone
                                  </label>

                                  <input
                                      type="text"
                                      className="form-control"
                                      name="phone"
                                      value={patient.phone}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Date of Birth
                                  </label>

                                  <input
                                      type="date"
                                      className="form-control"
                                      name="dob"
                                      value={patient.dob}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Gender
                                  </label>

                                  <select
                                      className="form-select"
                                      name="gender"
                                      value={patient.gender}
                                      onChange={handleChange}
                                  >
                                      <option value="MALE">Male</option>
                                      <option value="FEMALE">Female</option>
                                      <option value="OTHER">Other</option>
                                  </select>

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Blood Group
                                  </label>

                                  <input
                                      type="text"
                                      className="form-control"
                                      name="bloodGroup"
                                      value={patient.bloodGroup}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-6 mb-3">

                                  <label className="form-label fw-semibold">
                                      Allergies
                                  </label>

                                  <input
                                      type="text"
                                      className="form-control"
                                      name="allergies"
                                      value={patient.allergies}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-12 mb-3">

                                  <label className="form-label fw-semibold">
                                      Address
                                  </label>

                                  <textarea
                                      rows="3"
                                      className="form-control"
                                      name="address"
                                      value={patient.address}
                                      onChange={handleChange}
                                  />

                              </div>

                              <div className="col-md-12 mb-3">

                                  <label className="form-label fw-semibold">
                                      Chronic Disease
                                  </label>

                                  <textarea
                                      rows="3"
                                      className="form-control"
                                      name="chronicDisease"
                                      value={patient.chronicDisease}
                                      onChange={handleChange}
                                  />

                              </div>

                          </div>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-end gap-3">

                              <button
                                  type="button"
                                  className="btn btn-outline-secondary px-4"
                                  onClick={() => window.history.back()}
                              >
                                  <i className="bi bi-arrow-left me-2"></i>
                                  Cancel
                              </button>

                              <button
                                  type="submit"
                                  className="btn btn-primary px-5 shadow"
                              >
                                  <i className="bi bi-check-circle me-2"></i>
                                  Update Profile
                              </button>

                          </div>

                      </form>

                  </div>

              </div>

          </div>

      </div>

  </div>

    );
}

export default PatientProfile;