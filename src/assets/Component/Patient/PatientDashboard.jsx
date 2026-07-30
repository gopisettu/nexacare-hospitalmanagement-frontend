import { useEffect, useState } from "react"
import axios from 'axios'
import { getPatientByUsername } from "../Servises/PatientService";
function PatientDashboard() {

    const [patient, setPatient] = useState(null);
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        let username= "ap@gmail.com";
        let username1="pal@gmail.com";
        async function loadPatient() {
            const data = await getPatientByUsername("ap@gmail.com");
            setPatient(data);
        }
    
        loadPatient();
        async function getAllAppointment() {
            try {
                console.log("in get appointment ")
                const api = `http://localhost:8080/api/patient/getAppointment-ByPatient/${username}`
                const res = await axios.get(api)
                setAppointment(res.data)

            } catch (err) {
                console.log(err)
            }
        }
getAllAppointment()
       
    }, []);

    if (!patient) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="container-fluid py-4 bg-light">
    <div className="row">

        {/* Left Side */}
        <div className="col-lg-4 col-md-12 mb-4">

            {/* Profile Card */}
            <div className="card shadow rounded-4 h-100">
                <div className="card-body text-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        className="rounded-circle mb-3"
                        width="120"
                        alt=""
                    />

                    <h3>{patient.firstName}</h3>

                    <hr />

                    <p><strong>Email</strong></p>
                    <p>{patient.email}</p>

                    <p><strong>DOB</strong></p>
                    <p>{patient.dob}</p>

                    <p><strong>Address</strong></p>
                    <p>{patient.address}</p>

                </div>
            </div>

        </div>

        {/* Right Side */}
        <div className="col-lg-8 col-md-12">

            <div className="card shadow rounded-4">

                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Appointments</h4>
                </div>

                <div className="card-body">

                    <div className="row">

                        {appointment.length === 0 ? (
                            <div className="text-center">
                                No Appointments
                            </div>
                        ) : (

                            appointment.map((a) => (

                                <div
                                    className="col-md-6 mb-3"
                                    key={a.appointmentId}
                                >

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body">

                                            <h5 className="text-primary">
                                                Dr. {a.doctorName}
                                            </h5>

                                            <hr />

                                            <p>
                                                <strong>Date:</strong><br />
                                                {a.appointmentDate}
                                            </p>

                                            <p>
                                                <strong>Time:</strong><br />
                                                {a.appointmentTime}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>

    </div>
</div>

    )
}
export default PatientDashboard