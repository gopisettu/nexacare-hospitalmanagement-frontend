function PatientCard({ patient, onSelected }) {

    return (
        <div className="container">
        <div className="row g-4">
    
            {patient.map((p) => (
    
                <div
                    key={p.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
    
                    <div className="card h-100 shadow-sm">
    
                        <div className="card-body">
    
                            <h5 className="card-title">
                                {p.firstName}
                            </h5>
    
                            <p>Email: {p.email}</p>
    
                            <p>Address: {p.address}</p>
    
                            <p>DOB: {p.dob}</p>
    
                            <button
                                className="btn btn-primary w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => onSelected(p)}
                            >
                                View Details
                            </button>
    
                        </div>
    
                    </div>
    
                </div>
    
            ))}
    
        </div>
    </div>
    )
}

export default PatientCard;