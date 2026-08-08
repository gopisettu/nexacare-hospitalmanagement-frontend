import { useEffect, useState } from "react";
import axios from "axios";

function BookingModal({
    doctor,
    username,
    onBookingSuccess,
    onClose
}) {

    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {

        if (doctor) {
            setAppointmentDate("");
            setAppointmentTime("");
            setReason("");
            setNotes("");
        }

    }, [doctor]);

const handleSubmit = async (e) => {

    e.preventDefault();

    const bookingData = {
        doctorId: doctor.id,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        reason: reason,
        notes: notes
    };

    console.log("Booking Data:", bookingData);

    try {

        const api =
            `http://localhost:8080/api/patient/book-doctorByPatient/${username}`;

        const response = await axios.post(api, bookingData);

        console.log("Booking successful:", response.data);

        // Refresh patient's appointments
        onBookingSuccess();

        // Close modal
        onClose();

    } catch (error) {

        console.log("Booking failed:", error);

        if (error.response) {
            console.log("Backend message:", error.response.data);
        }

    }

};

    if (!doctor) {
        return null;
    }


    return (

        <>

            {/* Backdrop */}

            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            ></div>


            {/* Modal */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content">


                        {/* HEADER */}

                        <div className="modal-header">

                            <div>

                                <h5 className="modal-title">

                                    Book Appointment

                                </h5>

                                <small className="text-muted">

                                    Book an appointment with your selected doctor

                                </small>

                            </div>


                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>

                        </div>


                        {/* BODY */}

                        <div className="modal-body">

                            {/* Doctor Information */}

                            <div className="alert alert-primary">

                                <div className="d-flex align-items-center">

                                    <i className="bi bi-person-circle fs-2 me-3"></i>

                                    <div>

                                        <h5 className="mb-1">

                                            Dr. {doctor.firstName} {doctor.lastName}

                                        </h5>

                                        <small>

                                            {doctor.specialization ||
                                                "Medical Specialist"}

                                        </small>

                                    </div>

                                </div>

                            </div>


                            {/* FORM */}

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">


                                    {/* DATE */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Appointment Date

                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            value={appointmentDate}
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            onChange={(e) =>
                                                setAppointmentDate(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* TIME */}

                                    <div className="col-md-6">

                                        <label className="form-label">

                                            Appointment Time

                                        </label>

                                        <input
                                            type="time"
                                            className="form-control"
                                            value={appointmentTime}
                                            onChange={(e) =>
                                                setAppointmentTime(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* REASON */}

                                    <div className="col-md-12">

                                        <label className="form-label">

                                            Reason for Appointment

                                        </label>

                                        <select
                                            className="form-select"
                                            value={reason}
                                            onChange={(e) =>
                                                setReason(e.target.value)
                                            }
                                            required
                                        >

                                            <option value="">
                                                Select reason
                                            </option>

                                            <option value="HEADACHE">
                                                Headache
                                            </option>

                                            <option value="FEVER">
                                                Fever
                                            </option>

                                            <option value="COLD">
                                                Cold / Cough
                                            </option>

                                            <option value="GENERAL_CHECKUP">
                                                General Checkup
                                            </option>

                                            <option value="FOLLOW_UP">
                                                Follow-up
                                            </option>

                                            <option value="PAIN">
                                                Pain
                                            </option>

                                            <option value="OTHER">
                                                Other
                                            </option>

                                        </select>

                                    </div>


                                    {/* NOTES */}

                                    <div className="col-md-12">

                                        <label className="form-label">

                                            Additional Notes

                                            <span className="text-muted">
                                                {" "}
                                                (Optional)
                                            </span>

                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Enter any additional information..."
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                        ></textarea>

                                    </div>

                                </div>


                                {/* FOOTER */}

                                <div className="d-flex justify-content-end gap-2 mt-4">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >

                                        <i className="bi bi-calendar-check me-2"></i>

                                        Book Appointment

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default BookingModal;