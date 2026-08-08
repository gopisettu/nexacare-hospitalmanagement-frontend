function DoctorForm({
  editDoctor,
  handleChange,
  submitEditedForm,
  selectedDoctor,
  newDoctor,

  genders = [],
  departments = [],
  specializations = [],
  qualifications = []

  }) {
    return (
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
              onChange={handleChange}
              disabled={!newDoctor}
            />
          </div>
         
         <div className="col-md-6 mb-3">
         <label className="form-label">TemporaryPassword</label>
         <input
           type="text"
           className="form-control"
           name="password"
           value={editDoctor.password ?? ""}
           onChange={handleChange}
           disabled={!newDoctor}
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

  {genders.map((gender) => (
    <option key={gender} value={gender}>
      {gender.replaceAll("_", " ")}
    </option>
  ))}
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
            
            <select
  className="form-select"
  name="qualification"
  value={editDoctor.qualification ?? ""}
  onChange={handleChange}
>
  <option value="">Select Qualification</option>

  {qualifications.map((qualification) => (
    <option key={qualification} value={qualification}>
      {qualification.replaceAll("_", " ")}
    </option>
  ))}
</select>
          </div>
  
          {/* Department */}
          <div className="col-md-6 mb-3">
          <select
  className="form-select"
  name="department"
  value={editDoctor.department ?? ""}
  onChange={handleChange}
>
  <option value="">Select Department</option>

  {departments.map((department) => (
    <option key={department} value={department}>
      {department.replaceAll("_", " ")}
    </option>
  ))}
</select>
          </div>
  
          {/* Specialization */}
          <div className="col-md-6 mb-3">
          <select
  className="form-select"
  name="specialization"
  value={editDoctor.specialization ?? ""}
  onChange={handleChange}
>
  <option value="">Select Specialization</option>

  {specializations.map((specialization) => (
    <option key={specialization} value={specialization}>
      {specialization.replaceAll("_", " ")}
    </option>
  ))}
</select>
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
  
          <div className="d-flex justify-content-between mt-3">
            <input
              type="submit"
              className="btn btn-primary"
              value={newDoctor ? "Add Doctor" : "Save Changes"}
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
    );
  }
  
  export default DoctorForm;