import { formatEnum } from "../HelperComponent/EnumUtility";

function MedicineCard({ medicine, onSelected }) {

    return (

        <div className="row">

            {medicine.content?.map((m) => (

                <div className="col-lg-3 col-md-6 mb-4" key={m.id}>

                    <div className="card shadow-sm h-100">

                        <div className="card-header bg-success text-white">

                            <h5 className="mb-0">
                                {m.name}
                            </h5>

                        </div>

                        <div className="card-body">

                            <p>
                                <strong>Category :</strong>{" "}
                                {formatEnum(m.category)}
                            </p>

                            <p>
                                <strong>Form :</strong>{" "}
                                {formatEnum(m.medicineForm)}
                            </p>

                            <p>
                                <strong>Dosage :</strong>{" "}
                                {m.dosage}
                            </p>

                            <p>
                                <strong>Manufacturer :</strong>{" "}
                                {m.manufacturer}
                            </p>

                            <p>
                                <strong>Price :</strong>{" "}
                                ₹ {m.unitPrice}
                            </p>

                            <p>
                                <strong>Batch :</strong>{" "}
                                {m.batchNo}
                            </p>

                            <p>
                                <strong>Stock :</strong>{" "}
                                {m.quantityRemaining} /
                                {m.quantityReceived}
                            </p>

                            <p>
                                <strong>Expiry :</strong>{" "}
                                {m.expiryDate}
                            </p>

                            <p>

                                <strong>Status :</strong>{" "}

                                <span
                                    className={`badge ${
                                        m.batchStatus === "ACTIVE"
                                            ? "bg-success"
                                            : m.batchStatus === "LOW_STOCK"
                                            ? "bg-warning text-dark"
                                            : m.batchStatus === "OUT_OF_STOCK"
                                            ? "bg-danger"
                                            : m.batchStatus === "EXPIRED"
                                            ? "bg-dark"
                                            : "bg-secondary"
                                    }`}
                                >
                                    {formatEnum(m.batchStatus)}
                                </span>

                            </p>

                        </div>

                        <div className="card-footer text-center">

                            <button
                                className="btn btn-primary w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#medicineModal"
                                onClick={() => onSelected(m)}
                            >
                                View Details
                            </button>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default MedicineCard;