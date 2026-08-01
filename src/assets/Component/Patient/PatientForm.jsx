function PatientForm(
    {
        editPatient,
        handleChange,
        submitEditedForm,
        deletePatient,
        selectedPatient
    }

){
    return(
    <>
     <form onSubmit={submitEditedForm}>
  <div className="row">

    {/* ID */}
    <div className="col-md-6 mb-3">
      <label className="form-label">ID</label>
      <input
        type="text"
        className="form-control"
        value={editPatient.id || selectedPatient.id || ""}
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
        value={editPatient.username ||selectedPatient.username || ""}
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
        value={editPatient.firstName ||selectedPatient.firstName || ""}
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
        value={editPatient.lastName ||selectedPatient.lastName || ""}
        onChange={handleChange}
      />
    </div>

    {/* Gender */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Gender</label>
      <select
        className="form-select"
        name="gender"
        value={editPatient.gender ||selectedPatient.gender || ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Date of Birth */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="dob"
        value={editPatient.dob ||selectedPatient.dob || ""}
        onChange={handleChange}
      />
    </div>

    {/* Aadhar Number */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Aadhar Number</label>
      <input
        type="text"
        className="form-control"
        name="aadharNumber"
        value={editPatient.aadharNumber ||selectedPatient.aadharNumber || ""}
        onChange={handleChange}
      />
    </div>

    {/* Blood Group */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Blood Group</label>
      <select
        className="form-select"
        name="bloodGroup"
        value={editPatient.bloodGroup ||selectedPatient.bloodGroup || ""}
        onChange={handleChange}
      >
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>

    {/* Phone */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Phone</label>
      <input
        type="text"
        className="form-control"
        name="phone"
        value={editPatient.phone ||selectedPatient.phone || ""}
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
        value={editPatient.email ||selectedPatient.email || ""}
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
        value={editPatient.address ||selectedPatient.address || ""}
        onChange={handleChange}
      ></textarea>
    </div>

    {/* Allergies */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Allergies</label>
      <input
        type="text"
        className="form-control"
        name="allergies"
        value={editPatient.allergies ||selectedPatient.allergies || ""}
        onChange={handleChange}
      />
    </div>

    {/* Chronic Disease */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Chronic Disease</label>
      <input
        type="text"
        className="form-control"
        name="chronicDisease"
        value={editPatient.chronicDisease ||selectedPatient.chronicDisease || ""}
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
    </>
    )
}
export default PatientForm;