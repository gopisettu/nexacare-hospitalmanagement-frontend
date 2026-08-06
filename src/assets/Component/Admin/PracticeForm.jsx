import { useState } from "react";
import { useEffect } from "react";

function PracticeForm() {
  const [userValue, setUserValue] = useState({
    id: "",
    name: "",
    password: "",
  });

  const [data, setData] = useState([
    {
      id: "1",
      name: "gopi",
      password: "gopi@123",
    },
    {
      id: "2",
      name: "Arjun",
      password: "arjun@123",
    },
    {
      id: "3",
      name: "Hari",
      password: "hari@123",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newUser = {
        
      ...userValue,
      id: (data.length + 1).toString(),
      
    };

    setData((prev) => [...prev, newUser]);

    // Clear form
    setUserValue({
      id: "",
      name: "",
      password: "",
    });
  };
  const sortDesc=()=>{
 setData([...data].sort((m1,m2)=>m2.id-m1.id))
  }
  useEffect(()=>{
  // arrange the table properly as per the setData
  },[setData])

  return (
    <div className="container">

      {/* Table */}
      <div className="row mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>

          <tbody>
            {data.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
            <div className="card card shadow">
                <button className="btn btn-primary" onClick={sortDesc}>SortDesc</button>
            </div>
        </div>
      </div>

      {/* Form */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5>User Details</h5>

              <form onSubmit={handleFormSubmit}>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={userValue.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="text"
                    name="password"
                    value={userValue.password}
                    onChange={handleChange}
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Submit
                </button>

              </form>


            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default PracticeForm;