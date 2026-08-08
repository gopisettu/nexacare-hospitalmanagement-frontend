import { useEffect, useState } from "react";
import axios from "axios";

import AppointmentMiniCard from "../Appointment/AppointmentMiniCard";
import DoctorCard from "../Appointment/DoctorCard";
import BookingModal from "../Appointment/BookingModal";
import Pagination from "../HelperComponent/Pagination";


function Appointment() {

    // Temporary username
    // Later replace this with JWT / Redux / session username
    const username = "ap@gmail.com";

    const [appointments, setAppointments] = useState([]);

    const [doctors, setDoctors] = useState([]);



    const [searchDoctor, setSearchDoctor] = useState("");

    const [page, setPage] = useState(0);

    const [size] = useState(6);

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [toastMessage, setToastMessage] = useState("");


const showToast = (msg) => {
    setToastMessage(msg);
    const toastEl = document.getElementById('liveToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
    toastBootstrap.show();
};
    // --------------------------------------------------
    // LOAD APPOINTMENTS
    // --------------------------------------------------

    const getAppointments = async () => {

        try {

            const api =
                `http://localhost:8080/api/patient/getAppointment-ByPatient/${username}?page=${page}&size=${size}`;

            const res = await axios.get(api);

            console.log("Appointments:", res.data);

            setAppointments(res.data);

        } catch (err) {

            console.log("Appointment loading failed:", err);

        }

    };


    // --------------------------------------------------
    // LOAD DOCTORS
    // --------------------------------------------------

    const getDoctors = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/api/doctor/get-allDoctor?page=0&size=50"
            );

            console.log("Doctors:", res.data);

            setDoctors(res.data);

        } catch (err) {
          showToast("Doctor loading failed")

            console.log("Doctor loading failed:", err);

        }

    };


    useEffect(() => {

        getAppointments();

    }, [page]);


    useEffect(() => {

        getDoctors();

    }, []);


    // --------------------------------------------------
    // TODAY APPOINTMENTS
    // --------------------------------------------------

    const today = new Date()
        .toISOString()
        .split("T")[0];


    const todayAppointments = appointments.filter(
        (appointment) =>
            appointment.appointmentDate === today
    );


    // --------------------------------------------------
    // PAST APPOINTMENTS
    // --------------------------------------------------

    const pastAppointments = appointments.filter(
        (appointment) =>
            appointment.appointmentDate < today ||
            appointment.appointmentStatus === "COMPLETED"
    );


    // --------------------------------------------------
    // DOCTOR SEARCH
    // --------------------------------------------------

    const filteredDoctors = doctors.filter((doctor) => {

        const search = searchDoctor.toLowerCase();

        return (
            doctor.firstName?.toLowerCase().includes(search) ||
            doctor.lastName?.toLowerCase().includes(search) ||
            doctor.department?.toLowerCase().includes(search) ||
            doctor.specialization?.toLowerCase().includes(search) ||
            doctor.username?.toLowerCase().includes(search)
        );

    });


    // --------------------------------------------------
    // BOOK DOCTOR
    // --------------------------------------------------

   const handleBookDoctor = (doctor) => {

    console.log("Selected Doctor:", doctor);

    setSelectedDoctor(doctor);

    setShowBookingModal(true);

};


    // --------------------------------------------------
    // AFTER SUCCESSFUL BOOKING
    // --------------------------------------------------

    const refreshAppointments = () => {

        setShowBookingModal(false);

        getAppointments();

    };


    return (

        <div className="container-fluid py-4">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">

                        <i className="bi bi-calendar-check text-primary me-2"></i>

                        My Appointments

                    </h2>

                    <p className="text-muted mb-0">

                        Manage your appointments and book your next visit.

                    </p>

                </div>


                <div className="badge bg-primary fs-6 px-3 py-2">

                    {appointments.length} Appointments

                </div>

            </div>

{/* ================================================= */}
{/* TODAY + PAST APPOINTMENTS */}
{/* ================================================= */}

<div className="row g-4 align-items-stretch">

    {/* ============================================= */}
    {/* TODAY'S APPOINTMENTS */}
    {/* ============================================= */}

    <div className="col-lg-6 d-flex">

        <div className="card border-0 shadow-sm rounded-4 w-100 h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">

                <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold mb-0">

                        <i className="bi bi-calendar-event text-primary me-2"></i>

                        Today's Appointments

                    </h4>

                    <span className="badge bg-primary">

                        {todayAppointments.length}

                    </span>

                </div>

            </div>


            <div className="card-body px-4">

                {todayAppointments.length === 0 ? (

                    <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">

                        <i
                            className="bi bi-calendar-x text-secondary"
                            style={{ fontSize: "3rem" }}
                        ></i>

                        <h5 className="mt-3 fw-semibold">
                            No appointments today
                        </h5>

                        <p className="text-muted mb-0">
                            You don't have any appointments scheduled for today.
                        </p>

                    </div>

                ) : (

                    <div className="row g-3">

                        {todayAppointments.map((appointment) => (

                            <div
                                className="col-12"
                                key={
                                    appointment.id ||
                                    appointment.appointmentId
                                }
                            >

                                <AppointmentMiniCard
                                    appointment={appointment}
                                    role="PATIENT"
                                />

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    </div>

               
    {/* ============================================= */}
    {/* PAST APPOINTMENTS */}
    {/* ============================================= */}

    <div className="col-lg-6 d-flex">

        <div className="card border-0 shadow-sm rounded-4 w-100 h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">

                <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold mb-0">

                        <i className="bi bi-clock-history text-secondary me-2"></i>

                        Past Appointments

                    </h4>

                    <span className="badge bg-secondary">

                        {pastAppointments.length}

                    </span>

                </div>

            </div>


            <div className="card-body px-4">

                {pastAppointments.length === 0 ? (

                    <div className="d-flex flex-column justify-content-center align-items-center text-center py-5">

                        <i
                            className="bi bi-calendar2 text-muted"
                            style={{ fontSize: "3rem" }}
                        ></i>

                        <h5 className="mt-3 fw-semibold">
                            No past appointments
                        </h5>

                        <p className="text-muted mb-0">
                            Your previous appointments will appear here.
                        </p>

                    </div>

                ) : (

                    /*
                     * IMPORTANT:
                     * col-6 = TWO appointment cards per row
                     */

                    <div className="row g-3">

                        {pastAppointments
                            .slice(0, 2)
                            .map((appointment) => (

                                <div
                                    className="col-6"
                                    key={
                                        appointment.id ||
                                        appointment.appointmentId
                                    }
                                >

                                    <AppointmentMiniCard
                                        appointment={appointment}
                                        role="PATIENT"
                                    />

                                </div>

                            ))}

                    </div>

                )}

            </div>


            {/* ========================================= */}
            {/* PAST APPOINTMENT PAGINATION */}
            {/* ========================================= */}

            {pastAppointments.length > 0 && (

                <div className="px-4 pb-3">

                    <Pagination
                        page={page}
                        setPage={setPage}
                    />

                </div>

            )}

        </div>

    </div>

</div>


            {/* ================================================= */}
            {/* FIND DOCTOR */}
            {/* ================================================= */}

            <div className="mt-5">

                <div className="mb-4">

                    <h3 className="fw-bold">

                        <i className="bi bi-person-plus-fill text-success me-2"></i>

                        Find a Doctor

                    </h3>

                    <p className="text-muted">

                        Choose a doctor and book your appointment.

                    </p>

                </div>


                {/* SEARCH */}

                <div className="card border-0 shadow-sm rounded-4 mb-4">

                    <div className="card-body">

                        <div className="input-group">

                            <span className="input-group-text bg-white">

                                <i className="bi bi-search"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search doctor by name, department or specialization..."
                                value={searchDoctor}
                                onChange={(e) =>
                                    setSearchDoctor(e.target.value)
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* DOCTOR CARDS */}

                <div className="row g-4">

                    {filteredDoctors.length === 0 ? (

                        <div className="col-12">

                            <div className="text-center py-5">

                                <i
                                    className="bi bi-person-x text-muted"
                                    style={{ fontSize: "3rem" }}
                                ></i>

                                <h5 className="mt-3">
                                    No doctors found
                                </h5>

                                <p className="text-muted">
                                    Try searching with another name or specialization.
                                </p>

                            </div>

                        </div>

                    ) : (

                        filteredDoctors.map((doctor) => (

                            <div
                                className="col-xl-3 col-lg-4 col-md-6"
                                key={doctor.id}
                            >

                                <DoctorCard
                                    doctor={doctor}
                                    onBook={handleBookDoctor}
                                />

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* BOOKING MODAL */}
            {/* ================================================= */}

            {showBookingModal && selectedDoctor && (

    <BookingModal
        doctor={selectedDoctor}
        username={username}
        onBookingSuccess={refreshAppointments}
        onClose={() => {
            setShowBookingModal(false);
            setSelectedDoctor(null);
        }}
    />

)}

{/* Toast */}
<div className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1080 }}>
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <strong className="me-auto">Notification</strong>
      <small>just now</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      {toastMessage}
    </div>
  </div>
</div>
{/* {toast end} */}
        </div>

    );

}

export default Appointment;