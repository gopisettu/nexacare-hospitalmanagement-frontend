import { BrowserRouter, Routes, Route } from "react-router-dom";


import AppLayout from "./assets/Component/AppLayout";

import AdminDashboard from "./assets/Component/Admin/AdminDashboard";
import PatientDashboard from "./assets/Component/Patient/PatientDashboard";
import DoctorDashboard from "./assets/Component/Doctor/DoctorDashboard";
import Login from "./assets/Component/Login";
import PatientAdmin from "./assets/Component/Admin/PatientAdmin";
import DoctorAdmin from "./assets/Component/Admin/DoctorAdmin";
import PatientProfile from "./assets/Component/Patient/PatientProfile";
import Appointment from "./assets/Component/Patient/Appointment";
import MedicineAdmin from "./assets/Component/Admin/MedicineAdmin";

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<PatientAdmin/>} />
          
          <Route path="/admin/doctors" element={<DoctorAdmin/>} />
          <Route path="/admin/medicine" element={<MedicineAdmin/>} />
          
          
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              {/* <Route path="/patient/appointments" element={<PatientDashboard />} /> */}
              <Route path="/patient/profile" element={<PatientProfile/>} />
              <Route path="patient/appointments" element={<Appointment/>} />
              

          </Route>
            
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;