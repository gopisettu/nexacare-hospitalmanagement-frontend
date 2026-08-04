import { formatEnum, bloodGroupLabel } from "../HelperComponent/EnumUtility";
function PatientForm(
    {
        editPatient,
        handleChange,
        submitEditedForm,
        deletePatient,
        selectedPatient,
        newUser
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
        name="id"
        onChange={handleChange}
        value={editPatient.id ?? ""}
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
        value={editPatient.username ?? ""}
        onChange={handleChange}
        disabled={!newUser}
      />
    </div>
{newUser &&
         <div className="col-md-6 mb-3">
         <label className="form-label">TemporaryPassword</label>
         <input
           type="text"
           className="form-control"
           name="password"
           value={editPatient.password ?? ""}
           onChange={handleChange}
           disabled={!newUser}
         />
       </div>
    }

    {/* First Name */}
    <div className="col-md-6 mb-3">
      <label className="form-label">First Name</label>
      <input
        type="text"
        className="form-control"
        name="firstName"
        value={editPatient.firstName ?? ""}
        
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
        value={editPatient.lastName ?? ""}
        onChange={handleChange}
      />
    </div>

    {/* Gender */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Gender</label>
      <select
        className="form-select"
        name="gender"
        value={editPatient.gender ?? ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
    </div>

    {/* Date of Birth */}
    <div className="col-md-6 mb-3">
      <label className="form-label">Date of Birth</label>
      <input
        type="date"
        className="form-control"
        name="dob"
        value={editPatient.dob ?? ""}
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
        value={editPatient.aadharNumber ?? ""}
        onChange={handleChange}
      />
    </div>

    {/* Blood Group */}
    {/* Blood Group */}
<div className="col-md-6 mb-3">
  <label className="form-label">Blood Group</label>
  <select
    className="form-select"
    name="bloodGroup"
    value={editPatient.bloodGroup ?? ""}
    onChange={handleChange}
  >
    <option value="">Select Blood Group</option>
    {Object.keys(bloodGroupLabel).map((group) => (
      <option key={group} value={group}>
        {bloodGroupLabel[group]}
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
        value={editPatient.phone ?? ""}
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
        value={editPatient.email ?? ""}
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
        value={editPatient.address ?? ""}
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
        value={editPatient.allergies ?? ""}
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
        value={editPatient.chronicDisease ?? ""}
        onChange={handleChange}
      />
    </div>
    <input
  type="submit"
  className="btn btn-primary"
 value={newUser?"Add Patient":"Update Patient"}
/>
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  </div>
</form>
    </>
    )
}
export default PatientForm;