function DoctorCard({
    doctor,
    onSelected,
    selectedFiles,
    setSelectedFiles,
    uploadImage,
  }) {
    return (
      <div className="col-md-4 mb-3">
        <div className="card h-100" style={{ width: "18rem" }}>
          <div className="card-body">
  
            <h5 className="card-title">
              Dr. {doctor.firstName} {doctor.lastName}
            </h5>
  
            <p className="card-text">
              <strong>Department:</strong> {doctor.department}
            </p>
  
            <p className="card-text">
              <strong>Qualification:</strong> {doctor.qualification}
            </p>
  
            <p className="card-text">
              <strong>Experience:</strong> {doctor.totalExperienceYear} Years
            </p>
  
            {/* Image Upload */}
            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) =>
                setSelectedFiles({
                  ...selectedFiles,
                  [doctor.id]: e.target.files[0],
                })
              }
            />
  
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => uploadImage(doctor.id)}
            >
              Upload Image
            </button>
  
            <button
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#doctorModal"
              onClick={() => onSelected(doctor)}
            >
              View Details
            </button>
  
          </div>
        </div>
      </div>
    );
  }
  
  export default DoctorCard;