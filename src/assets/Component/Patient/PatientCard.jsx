function PatientCard({ 
    patient,
    onSelected,
    selectedFiles,
    setSelectedFiles,
    uploadImage
}) {

    return (
        <div className="container">
        <div className="row g-4">
           
    
            {patient.map((p) => (
    
                <div
                    key={p.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
    
                    <div className="card h-100 shadow-sm">
                    {p.imageUrl && (
                                    <img
                                        src={`/ProductImages/${p.imageUrl.split("\\").pop()}`}
                                        alt={p.title}
                                        className="card-img-top"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />
                                )}
    
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
                              <input
                                        type="file"
                                        className="form-control mb-2"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setSelectedFiles({
                                                ...selectedFiles,
                                                [p.id]: e.target.files[0],
                                            })
                                        }
                                    />
                            <button
                                        className="btn btn-success w-100"
                                        onClick={() => uploadImage(p.id)}
                                    >
                                        Upload Image
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