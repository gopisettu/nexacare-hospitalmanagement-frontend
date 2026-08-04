import DashboardCharts from "./DashboardCharts";
import ReasonDistribution from "./ReasonDistribution";
import TodayAppointments from "./TodayAppointments";
import Medicines from "./Medicines";
import { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
function AdminDashboard(){

const [dashboard,setDashboard]=useState(null)


  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/admin-dashboardAllRequiredData")
        .then(res => setDashboard(res.data))
        .catch(console.error);
}, []);

if (!dashboard) {
  return <h3>Loading...</h3>;
}

    return (<>
   
        <h2>Admin Dashboard</h2>
       
        <div className="container">

<DashboardCharts stats={dashboard.stats}  />

<div className="row">
<div className="col-lg-4 mb-4">
          <ReasonDistribution 
           data={dashboard.reasonDistribution}/>
        </div>

        <div className="col-lg-4 mb-4">
          <TodayAppointments 
           appointments={dashboard.todayAppointments}/>
        </div>

        <div className="col-lg-4 mb-4">
          <Medicines
           medicines={dashboard.medicines} />
        </div>
</div>

</div>
        </>
    )
}
export default AdminDashboard