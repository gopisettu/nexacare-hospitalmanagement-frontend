function Medicines({
  medicines,
  title="Medicines"
}) {

    return (
      <div className="card shadow border-0 rounded-4 h-100">
  
        <div className="card-header bg-white border-0">
        <h5>{title}</h5>
        </div>
  
        <div className="card-body">
  
          {medicines.map((medicine, index) => (
  
            <div
              key={index}
              className="card border-0 rounded-4 mb-3"
              style={{ background: "#FFF5E9" }}
            >
  
              <div className="card-body py-2">
  
                <div className="d-flex justify-content-between">
  
                  <div>
  
                    <h6 className="fw-bold mb-1">
                      {medicine.name}
                    </h6>
  
                    <small className="text-muted">
                      {medicine.manufacturer}
                    </small>
  
                  </div>
  
                  <div className="text-end">
  
                    <strong>{medicine.dose}</strong>
  
                    <br />
  
                    {/* <small className="text-secondary">
                      Stock: {medicine.stock}
                    </small> */}
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default Medicines;