function DoctorModal({
    editDoctor,
    handleChange,
    submitEditedForm,
    deleteDoctor,
    selectedDoctor,
  }) {
    return (
      <div
        className="modal fade"
        id="doctorModal"
        aria-labelledby="doctorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
  
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="doctorModalLabel">
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
                    />
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
                    <label className="form-label">
                      Experience (Years)
                    </label>
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
                    <label className="form-label">
                      Consultation Fee (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="consultationFee"
                      value={editDoctor.consultationFee ?? ""}
                      onChange={handleChange}
                    />
                  </div>
  
                  <div className="d-flex justify-content-between mt-3">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Save Changes"
                    />
  
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
  
                </div>
              </form>
            </div>
  
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  deleteDoctor(selectedDoctor?.username)
                }
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default DoctorModal;