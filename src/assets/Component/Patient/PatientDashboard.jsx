import { useEffect, useState } from "react"
import axios from 'axios'
import { getPatientByUsername } from "../Servises/PatientService";
import DashboardStats from "../Admin/DashboardCharts";
import ReasonDistribution from "../Admin/ReasonDistribution";
import TodayAppointments from "../Admin/TodayAppointments";
import Medicines from "../Admin/Medicines";
function PatientDashboard() {

    const [patient, setPatient] = useState(null);
    const [appointment, setAppointment] = useState([]);
   
const [medicines, setMedicines] = useState([]);
const [reasonDistribution, setReasonDistribution] = useState({});

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
        <div className="container-fluid py-4">
        
            {/* Profile */}
        
            <div className="row mb-4">
        
                <div className="col-lg-12">
        
                    <div className="card shadow rounded-4">
        
                        <div className="card-body d-flex align-items-center">
        
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                className="rounded-circle me-4"
                                width="100"
                                alt=""
                            />
        
                            <div>
        
                                <h2 className="fw-bold">
                                    Welcome Back,
                                    <span className="text-primary">
                                        {" "}
                                        {patient.firstName}
                                    </span>
                                </h2>
        
                                <p className="text-muted mb-0">
                                    {patient.address}
                                </p>
        
                            </div>
        
                        </div>
        
                    </div>
        
                </div>
        
            </div>
        
            {/* Dashboard Cards */}
        
            <DashboardStats
  cards={[
    {
      title: "Visits",
      value: appointment.length,
      icon: "bi-calendar-check",
      color: "#7c4dff",
      bg: "#efe8ff",
      data: [1,2,3,4,5,6,7],
    },
    {
      title: "Medications",
      value: medicines.length,
      icon: "bi-capsule",
      color: "#ff9800",
      bg: "#fff2df",
      data: [1,1,2,2,3,4,5],
    },
    {
      title: "Upcoming",
      value: appointment.filter(a => a.appointmentStatus === "SCHEDULED").length,
      icon: "bi-clock-history",
      color: "#22c55e",
      bg: "#e9fff2",
      data: [0,1,1,2,2,3,4],
    },
  ]}
/>
        
            <div className="row g-4 mt-2">
        
                <div className="col-lg-4">
        
                    <ReasonDistribution
                        title="Reason Distribution"
                        data={reasonDistribution}
                    />
        
                </div>
        
                <div className="col-lg-4">
        
                    <TodayAppointments
                        title="Appointments"
                        appointments={appointment}
                    />
        
                </div>
        
                <div className="col-lg-4">
        
                    <Medicines
                        title="Medications"
                        medicines={medicines}
                    />
        
                </div>
        
            </div>
        
        </div>
        );
}
export default PatientDashboard