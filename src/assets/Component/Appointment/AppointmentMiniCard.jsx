function AppointmentMiniCard({
  appointment,
  role,

  onView,
  onPrescription,
  onPayBill,

  onConfirm,
  onReschedule,
  onComplete,
}) {

  if (!appointment) {
    return null;
  }


  // --------------------------------
  // Appointment values
  // --------------------------------

  const appointmentId = appointment.id ?? appointment.appointmentId;

  const doctorName =
    appointment.doctorName ||
    appointment.doctor?.firstName
      ? `Dr. ${appointment.doctor?.firstName ?? ""} ${
          appointment.doctor?.lastName ?? ""
        }`
      : "Doctor";


  const patientName =
    appointment.patientName ||
    appointment.patient?.firstName
      ? `${appointment.patient?.firstName ?? ""} ${
          appointment.patient?.lastName ?? ""
        }`
      : "Patient";


  const status =
    appointment.appointmentStatus ||
    appointment.status ||
    "PENDING";


  const date = appointment.appointmentDate ?? "-";

  const time = appointment.appointmentTime ?? "-";

  const reason = appointment.reason ?? "-";

  const notes = appointment.notes ?? "";


  // --------------------------------
  // Status badge
  // --------------------------------

  const getStatusClass = () => {

    switch (status) {

      case "CONFIRMED":
        return "bg-success";

      case "COMPLETED":
        return "bg-primary";

      case "CANCELLED":
        return "bg-danger";

      case "PENDING":
        return "bg-warning text-dark";

      case "RESCHEDULED":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };


  // --------------------------------
  // Payment status
  // --------------------------------

  const paymentStatus =
    appointment.paymentStatus ||
    appointment.billStatus ||
    "UNPAID";


  return (

    <div className="col-lg-6 col-xl-4 mb-4">

      <div className="card border-0 shadow-sm rounded-4 h-100">

        <div className="card-body p-4">


          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="d-flex justify-content-between align-items-start">


            <div className="d-flex align-items-center">


              <div
                className="rounded-circle bg-primary bg-opacity-10
                           d-flex justify-content-center
                           align-items-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                  minWidth: "50px"
                }}
              >

                <i
                  className={
                    role === "doctor"
                      ? "bi bi-person-fill text-primary fs-4"
                      : "bi bi-person-badge-fill text-primary fs-4"
                  }
                ></i>

              </div>


              <div>

                <h6 className="fw-bold mb-1">

                  {role === "doctor"
                    ? patientName
                    : doctorName}

                </h6>


                <small className="text-muted">

                  {role === "doctor"
                    ? "Patient"
                    : "Doctor"}

                </small>

              </div>

            </div>


            {/* STATUS */}

            <span
              className={`badge ${getStatusClass()} rounded-pill`}
            >
              {status}
            </span>

          </div>


          <hr />


          {/* ========================= */}
          {/* DATE & TIME */}
          {/* ========================= */}

          <div className="row g-2 mb-3">


            <div className="col-6">

              <div className="bg-light rounded-3 p-2">

                <small className="text-muted d-block">
                  Date
                </small>

                <span className="fw-semibold">

                  <i className="bi bi-calendar3 me-1 text-primary"></i>

                  {date}

                </span>

              </div>

            </div>


            <div className="col-6">

              <div className="bg-light rounded-3 p-2">

                <small className="text-muted d-block">
                  Time
                </small>

                <span className="fw-semibold">

                  <i className="bi bi-clock me-1 text-primary"></i>

                  {time}

                </span>

              </div>

            </div>


          </div>


          {/* ========================= */}
          {/* REASON */}
          {/* ========================= */}

          <div className="mb-2">

            <small className="text-muted">
              Appointment Reason
            </small>

            <div className="fw-semibold">

              <i className="bi bi-clipboard2-pulse me-1"></i>

              {reason}

            </div>

          </div>


          {/* ========================= */}
          {/* NOTES */}
          {/* ========================= */}

          {notes && (

            <div className="mb-3">

              <small className="text-muted">
                Notes
              </small>

              <p className="small mb-0 text-secondary">
                {notes}
              </p>

            </div>

          )}


          {/* ========================= */}
          {/* PAYMENT */}
          {/* ========================= */}

          {role === "patient" && (

            <div className="mb-3">

              <div className="d-flex justify-content-between align-items-center">

                <small className="text-muted">
                  Payment
                </small>


                {paymentStatus === "PAID" ? (

                  <span className="badge bg-success">

                    <i className="bi bi-check-circle me-1"></i>

                    Paid

                  </span>

                ) : (

                  <span className="badge bg-warning text-dark">

                    <i className="bi bi-exclamation-circle me-1"></i>

                    Payment Pending

                  </span>

                )}

              </div>

            </div>

          )}


          {/* ========================= */}
          {/* ACTION BUTTONS */}
          {/* ========================= */}

          <div className="d-flex flex-wrap gap-2 mt-3">


            {/* -------------------------------- */}
            {/* COMMON VIEW */}
            {/* -------------------------------- */}

            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onView && onView(appointment)}
            >

              <i className="bi bi-eye me-1"></i>

              View

            </button>


            {/* ================================= */}
            {/* PATIENT ACTIONS */}
            {/* ================================= */}

            {role === "patient" && (

              <>


                {/* Prescription */}

                {status === "COMPLETED" && (

                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      onPrescription &&
                      onPrescription(appointment)
                    }
                  >

                    <i className="bi bi-prescription2 me-1"></i>

                    Prescription

                  </button>

                )}


                {/* Payment */}

                {paymentStatus !== "PAID" && (

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      onPayBill &&
                      onPayBill(appointment)
                    }
                  >

                    <i className="bi bi-credit-card me-1"></i>

                    Pay Bill

                  </button>

                )}

              </>

            )}


            {/* ================================= */}
            {/* DOCTOR ACTIONS */}
            {/* ================================= */}

            {role === "doctor" && (

              <>


                {/* Confirm */}

                {status === "PENDING" && (

                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      onConfirm &&
                      onConfirm(appointment)
                    }
                  >

                    <i className="bi bi-check-circle me-1"></i>

                    Confirm

                  </button>

                )}


                {/* Reschedule */}

                {(status === "PENDING" ||
                  status === "CONFIRMED") && (

                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      onReschedule &&
                      onReschedule(appointment)
                    }
                  >

                    <i className="bi bi-calendar-event me-1"></i>

                    Reschedule

                  </button>

                )}


                {/* Complete */}

                {status === "CONFIRMED" && (

                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      onComplete &&
                      onComplete(appointment)
                    }
                  >

                    <i className="bi bi-check2-circle me-1"></i>

                    Complete

                  </button>

                )}


                {/* Prescription */}

                {status === "COMPLETED" && (

                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      onPrescription &&
                      onPrescription(appointment)
                    }
                  >

                    <i className="bi bi-prescription2 me-1"></i>

                    Prescription

                  </button>

                )}

              </>

            )}

          </div>

        </div>

      </div>

    </div>

  );
} 


export default AppointmentMiniCard;