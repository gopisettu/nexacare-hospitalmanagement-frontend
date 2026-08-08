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
export const getDepartments=()=> axios.get(`${BASE_URL}/departments`);

 export const getSpecializations=()=>axios.get(`${BASE_URL}/specializations`);
 export const getQualifications=()=>axios.get(`${BASE_URL}/qualifications`);

    
// Medicine-related enums — used by MedicineAdmin / MedicineForm
export const getMedicineCategories = () =>
    axios.get(`${BASE_URL}/medicine-categories`);
 
export const getBatchStatus = () =>
    axios.get(`${BASE_URL}/batch-status`);
 
export const getMedicineForms = () =>
    axios.get(`${BASE_URL}/medicine-forms`);