import axios from "axios";

export async function getDoctorByUsername(username) {
  const api = `http://localhost:8080/api/doctor/get-DoctorByUsername/${username}`;

  const res = await axios.get(api);

  return res.data;
}