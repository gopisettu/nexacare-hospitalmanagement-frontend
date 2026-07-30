import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

function AppLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <NavBar />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;