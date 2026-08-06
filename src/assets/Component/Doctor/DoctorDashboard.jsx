import { useEffect, useState } from "react";
import axios from "axios";

import DashboardStats from "../Admin/DashboardCharts";
import ReasonDistribution from "../Admin/ReasonDistribution";
import TodayAppointments from "../Admin/TodayAppointments";
import UpcomingAppointments from "./UpcomingAppointments";

function DoctorDashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                // const username = "doctor@gmail.com";
                const username="doctor560@gmail.com";

                const res = await axios.get(
                    `http://localhost:8080/api/doctor/dashboard/${username}`
                );

                setDashboard(res.data);

            }

            catch (err) {
                console.log(err);
            }

        }

        loadDashboard();

    }, []);

    if (!dashboard) {
        return <h3>Loading...</h3>;
    }

    return (

        <div className="container-fluid py-4">

            <div className="card shadow rounded-4 border-0 mb-4">

                <div className="card-body d-flex align-items-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                        width="95"
                        className="rounded-circle me-4"
                    />

                    <div>

                        <h2 className="fw-bold">

                            Welcome Dr.

                            <span className="text-info">

                                {" "}
                                {dashboard.doctor.firstName}

                            </span>

                        </h2>

                        <p className="text-muted mb-0">

                            {dashboard.doctor.department.replaceAll("_", " ")}

                            &nbsp; • &nbsp;

                            {dashboard.doctor.specialization.replaceAll("_", " ")}

                        </p>

                    </div>

                </div>

            </div>

            <DashboardStats

                cards={[

                    {

                        title: "Patients",

                        value: dashboard.totalPatients,

                        icon: "bi-people-fill",

                        color: "#0EA5E9",

                        bg: "#E0F2FE",

                        data: [2, 3, 5, 7, 8, 10]

                    },

                    {

                        title: "Today's Visits",

                        value: dashboard.todayAppointments,

                        icon: "bi-calendar2-check",

                        color: "#14B8A6",

                        bg: "#CCFBF1",

                        data: [1, 2, 3, 5, 4, 6]

                    },

                    {

                        title: "Completed",

                        value: dashboard.completedAppointments,

                        icon: "bi-check2-circle",

                        color: "#8B5CF6",

                        bg: "#EDE9FE",

                        data: [0, 2, 2, 4, 6, 8]

                    },

                    {

                        title: "Total Appointments",

                        value: dashboard.totalAppointments,

                        icon: "bi-clipboard2-pulse",

                        color: "#F97316",

                        bg: "#FFEDD5",

                        data: [3, 4, 6, 8, 9, 10]

                    }

                ]}

            />

            <div className="row mt-4 g-4">

                <div className="col-lg-4">

                    <ReasonDistribution

                        title="Consultation Reasons"

                        data={dashboard.reasonDistribution}

                    />

                </div>

                <div className="col-lg-4">

                    <TodayAppointments

                        title="Today's Queue"

                        appointments={dashboard.todayAppointmentList}

                    />

                </div>

                <div className="col-lg-4">

                    <UpcomingAppointments

                        appointments={dashboard.upcomingAppointments}

                    />

                </div>

            </div>

        </div>

    );

}

export default DoctorDashboard;