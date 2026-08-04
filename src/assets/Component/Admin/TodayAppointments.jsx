function TodayAppointments({
  appointments,
  title="Today's Appointments"
}) {

  if (!appointments || appointments.length === 0) {
    return (
      <div className="card shadow border-0 rounded-4 h-100">
        <div className="card-header bg-white border-0">
        <h5>{title}</h5>
        </div>

        <div className="card-body text-center text-muted">
          No appointments for today.
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow border-0 rounded-4 h-100">

      <div className="card-header bg-white border-0">
        <h5 className="fw-bold">Today's Appointments</h5>
      </div>

      <div className="card-body">

        {appointments.map((appointment) => (

          <div
            key={appointment.appointmentId}
            className="card border-0 rounded-4 mb-3"
            style={{ background: "#F5F3FF" }}
          >

            <div className="card-body py-2">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <h6 className="fw-bold mb-1">
                    {appointment.patientName}
                  </h6>

                  <small className="text-muted">
                    {appointment.doctorName || "Doctor Not Assigned"}
                  </small>
                </div>

                <div className="text-end">
                  <strong>
                    {appointment.reason.replaceAll("_", " ")}
                  </strong>

                  <br />

                  <small className="text-secondary">
                    {appointment.appointmentTime}
                  </small>
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
// git commit -m "implemented Admin Dashboard by using Chatrs by ChartJs.register Required parameter and used  MiniCard with  Boostrap Icons and get props value and set it in the cardValue, retrieved" 
export default TodayAppointments;