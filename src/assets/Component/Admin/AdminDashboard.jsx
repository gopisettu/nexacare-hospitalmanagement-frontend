function AdminDashboard(){
    return (<>
   
        <h2>Admin Dashboard</h2>
       
        <div className="container">

<div className="row g-3 mb-4">



{/* Total Patients */}

<div className="col-lg col-md-4 col-sm-6">

<div className="card border-0 shadow-sm h-100">

<div className="card-body d-flex justify-content-between align-items-center">

    <div>

        <h6 className="text-muted mb-1">Total Patients</h6>

        <h3 className="fw-bold text-primary">156</h3>

    </div>

    <div className="fs-1">👨</div>

</div>

</div>

</div>



{/* Active Patients */}

<div className="col-lg col-md-4 col-sm-6">

<div className="card border-0 shadow-sm h-100">

<div className="card-body d-flex justify-content-between align-items-center">

    <div>

        <h6 className="text-muted mb-1">Active Patients</h6>

        <h3 className="fw-bold text-success">142</h3>

    </div>

    <div className="fs-1">🟢</div>

</div>

</div>

</div>



{/* Inactive Patients */}

<div className="col-lg col-md-4 col-sm-6">

<div className="card border-0 shadow-sm h-100">

<div className="card-body d-flex justify-content-between align-items-center">

    <div>

        <h6 className="text-muted mb-1">Inactive Patients</h6>

        <h3 className="fw-bold text-danger">14</h3>

    </div>

    <div className="fs-1">🔴</div>

</div>

</div>

</div>



{/* Today's Appointments */}

<div className="col-lg col-md-6 col-sm-6">

<div className="card border-0 shadow-sm h-100">

<div className="card-body d-flex justify-content-between align-items-center">

    <div>

        <h6 className="text-muted mb-1">Today's Appointments</h6>

        <h3 className="fw-bold text-warning">28</h3>

    </div>

    <div className="fs-1">📅</div>

</div>

</div>

</div>



{/* Pending Payments */}

<div className="col-lg col-md-6 col-sm-6">

<div className="card border-0 shadow-sm h-100">

<div className="card-body d-flex justify-content-between align-items-center">

    <div>

        <h6 className="text-muted mb-1">Pending Payments</h6>

        <h3 className="fw-bold text-info">9</h3>

    </div>

    <div className="fs-1">💰</div>

</div>

</div>

</div>



</div>
</div>
        </>
    )
}
export default AdminDashboard