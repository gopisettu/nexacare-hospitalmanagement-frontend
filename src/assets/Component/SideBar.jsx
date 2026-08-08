import { NavLink } from "react-router-dom";


const menu = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Patients", path: "/admin/patients" },
    { label: "Doctors", path: "/admin/doctors" },
    { label: "Medicine", path: "/admin/medicine" },
    { label: "Inventory", path: "/admin/inventory" },
    { label: "Sales", path: "/admin/sales" },
  ],
  DOCTOR: [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Patients", path: "/doctor/patients" },
    { label: "Appointments", path: "/doctor/appointments" },
    { label: "Pharmacy", path: "/doctor/pharmacy" },
  ],
  PATIENT: [
    { label: "Dashboard", path: "/patient/dashboard" },
    { label: "Profile", path: "/patient/profile" },
    { label: "Appointments", path: "/patient/appointments" },
  ],
};

function Sidebar() {
  const items = menu["PATIENT"] || [];

  return (
    <aside className="bg-dark text-white p-3" style={{ width: "220px" }}>
      <h5 className="mb-4">NEXE-CARE</h5>
      <ul className="nav flex-column">
        {items.map((item) => (
          <li className="nav-item mb-2" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "bg-success rounded" : ""}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;