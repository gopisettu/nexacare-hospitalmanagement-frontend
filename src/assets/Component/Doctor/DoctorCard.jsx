function DoctorCard({
  doctor,
  onSelected,
  selectedFiles,
  setSelectedFiles,
  uploadImage,
}) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">

        {doctor.profileImage && (
          <img
            src={`/DoctorImages/${doctor.profileImage.split("\\").pop()}`}
            alt={`Dr. ${doctor.firstName}`}
            className="card-img-top"
            style={{
              height: "220px",
              objectFit: "cover",
            }}
          />
        )}

        <div className="card-body d-flex flex-column">
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

          <div className="mt-auto">
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
    </div>
  );
}

export default DoctorCard;