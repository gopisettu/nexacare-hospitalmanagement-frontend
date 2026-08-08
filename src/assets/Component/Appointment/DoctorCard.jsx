function DoctorCard({ doctor, onBook }) {

  if (!doctor) {
    return null;
  }

  return (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">

      <div className="card border-0 shadow-sm rounded-4 h-100">

        <div className="card-body p-4">

          {/* Doctor Header */}

          <div className="d-flex align-items-center mb-3">

            <div
              className="rounded-circle bg-primary bg-opacity-10
                         d-flex justify-content-center
                         align-items-center me-3"
              style={{
                width: "65px",
                height: "65px",
                minWidth: "65px"
              }}
            >
              <i className="bi bi-person-badge-fill text-primary fs-2"></i>
            </div>

            <div>

              <h5 className="fw-bold mb-1">
                Dr. {doctor.firstName} {doctor.lastName}
              </h5>

              <span className="badge bg-success">
                <i className="bi bi-circle-fill me-1 small"></i>
                Available
              </span>

            </div>

          </div>


          <hr />


          {/* Doctor Information */}

          <div className="mb-2">

            <div className="d-flex align-items-center mb-2">

              <i className="bi bi-building text-primary me-2"></i>

              <span className="text-muted me-2">
                Department:
              </span>

              <strong>
                {doctor.department || "-"}
              </strong>

            </div>


            <div className="d-flex align-items-center mb-2">

              <i className="bi bi-award text-primary me-2"></i>

              <span className="text-muted me-2">
                Qualification:
              </span>

              <strong>
                {doctor.qualification || "-"}
              </strong>

            </div>


            <div className="d-flex align-items-center mb-2">

              <i className="bi bi-heart-pulse text-primary me-2"></i>

              <span className="text-muted me-2">
                Specialization:
              </span>

              <strong>
                {doctor.specialization || "-"}
              </strong>

            </div>


            <div className="d-flex align-items-center">

              <i className="bi bi-briefcase text-primary me-2"></i>

              <span className="text-muted me-2">
                Experience:
              </span>

              <strong>
                {doctor.totalExperienceYear || 0} Years
              </strong>

            </div>

          </div>


          {/* Consultation Fee */}

          <div className="bg-light rounded-3 p-3 mt-3">

            <div className="d-flex justify-content-between align-items-center">

              <span className="text-muted">
                Consultation Fee
              </span>

              <strong className="text-success fs-5">

                ₹{doctor.consultationFee || 0}

              </strong>

            </div>

          </div>


          {/* Actions */}

          <div className="d-flex gap-2 mt-3">

            <button
              type="button"
              className="btn btn-outline-primary flex-grow-1"
            >
              <i className="bi bi-person-lines-fill me-1"></i>
              View Profile
            </button>


            <button
              type="button"
              className="btn btn-primary flex-grow-1"
              onClick={() => onBook(doctor)}
            >
              <i className="bi bi-calendar-plus me-1"></i>
              Book
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorCard;