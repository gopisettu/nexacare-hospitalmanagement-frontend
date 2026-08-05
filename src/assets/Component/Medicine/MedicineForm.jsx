import { formatEnum } from "../HelperComponent/EnumUtility";

function MedicineForm({
    editMedicine,
    handleChange,
    submitEditedForm,
    newMedicine,
    medicineForms,
    categories
}) {

    return (

        <form onSubmit={submitEditedForm}>

            <div className="row">

                {/* Medicine Name */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Medicine Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editMedicine.name || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Dosage */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Dosage</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dosage"
                        value={editMedicine.dosage || ""}
                        onChange={handleChange}
                        placeholder="500 mg"
                        required
                    />
                </div>

                {/* Manufacturer */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Manufacturer</label>
                    <input
                        type="text"
                        className="form-control"
                        name="manufacturer"
                        value={editMedicine.manufacturer || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Category */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>

                    <select
                        className="form-select"
                        name="category"
                        value={editMedicine.category || ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>

                        {categories.map(category => (

                            <option
                                key={category}
                                value={category}
                            >
                                {formatEnum(category)}
                            </option>

                        ))}

                    </select>
                </div>

                {/* Medicine Form */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Medicine Form</label>

                    <select
                        className="form-select"
                        name="medicineForm"
                        value={editMedicine.medicineForm || ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Form</option>

                        {medicineForms.map(form => (

                            <option
                                key={form}
                                value={form}
                            >
                                {formatEnum(form)}
                            </option>

                        ))}

                    </select>
                </div>

                {/* Unit Price */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Unit Price</label>

                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="unitPrice"
                        value={editMedicine.unitPrice || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Batch Number */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Batch Number</label>

                    <input
                        type="text"
                        className="form-control"
                        name="batchNo"
                        value={editMedicine.batchNo || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Quantity */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Quantity Received</label>

                    <input
                        type="number"
                        className="form-control"
                        name="quantityReceived"
                        value={editMedicine.quantityReceived || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Expiry Date */}
                <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>

                    <input
                        type="date"
                        className="form-control"
                        name="expiryDate"
                        value={editMedicine.expiryDate || ""}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <hr />

            <div className="text-end">

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    {newMedicine ? "Add Medicine" : "Update Medicine"}
                </button>

            </div>

        </form>

    );

}

export default MedicineForm;