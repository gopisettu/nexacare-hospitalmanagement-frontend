function UpcomingAppointments({

    appointments,
    title="Upcoming Schedule"
    
    }) {
    
    return (
    
    <div className="card shadow border-0 rounded-4 h-100">
    
    <div className="card-header bg-white">
    <h5>{title}</h5>
    </div>
    
    <div
    className="card-body"
    style={{
    maxHeight:"430px",
    overflowY:"auto"
    }}
    >
    
    {appointments.map(a=>(
    
    <div
    key={a.appointmentId}
    className="card mb-3 border-0"
    style={{
    background:"#EEF7FF"
    }}
    >
    
    <div className="card-body">
    
    <div className="d-flex justify-content-between">
    
    <div>
    
    <h6 className="fw-bold">
    {a.patientName}
    </h6>
    
    <small className="text-muted">
    
    {a.reason.replaceAll("_"," ")}
    
    </small>
    
    </div>
    
    <div className="text-end">
    
    <strong>
    
    {a.appointmentDate}
    
    </strong>
    
    <br/>
    
    <small>
    
    {a.appointmentTime}
    
    </small>
    
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    ))}
    
    </div>
    
    </div>
    
    )
    
    }
    
    export default UpcomingAppointments