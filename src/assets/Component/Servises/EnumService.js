import axios from "axios";

const BASE_URL = "http://localhost:8080/api/enums";

export const getGenders = () =>
    axios.get(`${BASE_URL}/genders`);

export const getBloodGroups = () =>
    axios.get(`${BASE_URL}/blood-groups`);

export const getAppointmentStatus = () =>
    axios.get(`${BASE_URL}/appointment-status`);

export const getPaymentStatus = () =>
    axios.get(`${BASE_URL}/payment-status`);