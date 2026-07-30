import axios from "axios";

const BASE_URL = "http://localhost:8080/api/patient";

export const getPatientByUsername = async (username) => {
    const res = await axios.get(
        `${BASE_URL}/get-PatientByUsername/${username}`
    );
    return res.data;
};

export const getAllPatients = async () => {
    const res = await axios.get(
        `${BASE_URL}/get-allPatient`
    );
    return res.data;
};