import { useEffect, useState } from "react";
import axios from "axios";

import Pagination from "../HelperComponent/Pagination";
import MedicineCard from "../Medicine/MedicineCard";
import MedicineForm from "../Medicine/MedicineForm";

import { formatEnum } from "../HelperComponent/EnumUtility";

import {
    getMedicineCategories,
    getBatchStatus,
    getMedicineForms
} from "../Servises/EnumService";

function MedicineAdmin() {

    const [medicine, setMedicine] = useState([]);

    const [selectedMedicine, setSelectedMedicine] = useState({});
    const [editMedicine, setEditMedicine] = useState({});

    const [newMedicine, setNewMedicine] = useState(true);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8);

    const [searchData, setSearchData] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("");
    const [batchStatusFilter, setBatchStatusFilter] = useState("");
    const [sortOption, setSortOption] = useState("");

    const [categories, setCategories] = useState([]);
    const [batchStatuses, setBatchStatuses] = useState([]);
    const [medicineForms, setMedicineForms] = useState([]);

    // Toast state — single source of truth for both success and error toasts
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success"); // "success" | "error"

    // Extracts a clean, user-facing message from any axios error
    const getErrorMessage = (err) => {
        if (err.response?.data?.message) {
            return err.response.data.message;
        }
        if (err.response?.status === 500) {
            return "Internal Server Error.";
        }
        if (err.code === "ERR_NETWORK") {
            return "Cannot connect to server.";
        }
        return "Something went wrong.";
    };

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);

        const toastEl = document.getElementById("liveToast");

        const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastEl);

        toastBootstrap.show();
    };

    const loadEnums = async () => {

        try {

            const [

                categoryRes,
                batchRes,
                formRes

            ] = await Promise.all([

                getMedicineCategories(),
                getBatchStatus(),
                getMedicineForms()

            ]);

            setCategories(categoryRes.data);

            setBatchStatuses(batchRes.data);

            setMedicineForms(formRes.data);

        } catch (err) {

            console.log(err);
            showToast(getErrorMessage(err), "error");

        }

    };

    const refreshFilter = () => {

        setSearchData("");

        setCategoryFilter("");

        setBatchStatusFilter("");

        setSortOption("");

    };

    function getSearchData(e) {

        setSearchData(e.target.value);

    }

    const getCategoryFilter = (e) => {

        setCategoryFilter(e.target.value);

    };

    const getBatchStatusFilter = (e) => {

        setBatchStatusFilter(e.target.value);

    };

    const getSortOption = (e) => {

        setSortOption(e.target.value);

    };

    const onAddNewMedicine = () => {

        setSelectedMedicine({});

        setEditMedicine({});

        setNewMedicine(true);

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditMedicine((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const submitEditedForm = async (e) => {

        e.preventDefault();

        try {

            if (newMedicine) {

                await axios.post(

                    "http://localhost:8080/api/admin/addMedicine-ByAdmin",

                    editMedicine

                );

                showToast("Medicine added successfully.");

            } else {

                const res = await axios.put(

                    `http://localhost:8080/api/admin/updateMedicine/${selectedMedicine.id}`,

                    editMedicine

                );

                if (res.data) {
                    setSelectedMedicine(res.data);
                    setEditMedicine(res.data);
                }

                showToast("Medicine updated successfully.");

            }

            getAllMedicines(); // refresh list to reflect the change

        }

        catch (err) {

            console.log(err);
            showToast(getErrorMessage(err), "error");

        }

    };

    const deleteMedicine = async (id) => {

        try {

            await axios.delete(

                `http://localhost:8080/api/admin/deleteMedicine/${id}`

            );

            showToast("Medicine deleted successfully.");

            getAllMedicines();

        }

        catch (err) {

            console.log(err);
            showToast(getErrorMessage(err), "error");

        }

    };

    const onSelected = async (medicineObj) => {

        try {

            const res = await axios.get(

                `http://localhost:8080/api/admin/getMedicine/${medicineObj.id}`

            );

            setSelectedMedicine(res.data);

            setEditMedicine(res.data);

            setNewMedicine(false);

        }

        catch (err) {

            console.log(err);
            showToast(getErrorMessage(err), "error");

        }

    };

    const getAllMedicines = async () => {

        try {

            let api =
                `http://localhost:8080/api/admin/get-allMedicines?page=${page}&size=${size}`;

            if (searchData.trim() !== "") {
                api += `&search=${searchData}`;
            }

            if (categoryFilter !== "") {
                api += `&category=${categoryFilter}`;
            }

            if (batchStatusFilter !== "") {
                api += `&batchStatus=${batchStatusFilter}`;
            }

            if (sortOption !== "") {
                api += `&sortOption=${sortOption}`;
            }

            const res = await axios.get(api);

            setMedicine(res.data);

        } catch (err) {

            console.log(err);
            showToast(getErrorMessage(err), "error");

        }

    };

    useEffect(() => {

        getAllMedicines();

        loadEnums();

    }, [

        page,

        size,

        searchData,

        categoryFilter,

        batchStatusFilter,

        sortOption

    ]);

    return (
        <div className="container">

            <h2>Medicine Admin</h2>

            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3 align-items-center">
                        <div className="col-lg-3">

                            <input

                                className="form-control"

                                placeholder="🔍 Search Medicine"

                                value={searchData}

                                onChange={getSearchData}

                            />

                        </div>
                        <div className="col-lg-2">

                            <select

                                className="form-select"

                                value={categoryFilter}

                                onChange={getCategoryFilter}

                            >

                                <option value="">

                                    All Categories

                                </option>

                                {

                                    categories.map(category => (

                                        <option

                                            key={category}

                                            value={category}

                                        >

                                            {formatEnum(category)}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>
                        <div className="col-lg-2">

                            <select

                                className="form-select"

                                value={batchStatusFilter}

                                onChange={getBatchStatusFilter}

                            >

                                <option value="">

                                    Batch Status

                                </option>

                                {

                                    batchStatuses.map(status => (

                                        <option

                                            key={status}

                                            value={status}

                                        >

                                            {formatEnum(status)}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="col-lg-2">

                            <select

                                className="form-select"

                                value={sortOption}

                                onChange={getSortOption}

                            >

                                <option value="">

                                    Sort By

                                </option>

                                <option value="EXPIRY_ASC">

                                    Expiry ↑

                                </option>

                                <option value="EXPIRY_DESC">

                                    Expiry ↓

                                </option>

                                <option value="STOCK_LOW">

                                    Stock Low

                                </option>

                                <option value="STOCK_HIGH">

                                    Stock High

                                </option>

                                <option value="PRICE_LOW">

                                    Price Low

                                </option>

                                <option value="PRICE_HIGH">

                                    Price High

                                </option>

                            </select>

                        </div>
                        <hr />

                        <div className="row g-3">

                            <div className="col-lg-2">

                                <button

                                    className="btn btn-success w-100"

                                    data-bs-toggle="modal"

                                    data-bs-target="#medicineModal"

                                    onClick={onAddNewMedicine}

                                >

                                    + Add Medicine

                                </button>

                            </div>

                            <div className="col-lg-2">

                                <button

                                    className="btn btn-outline-primary w-100"

                                    onClick={() => window.location.reload()}

                                >

                                    🔄 Refresh

                                </button>

                            </div>

                            <div className="col-lg-2">

                                <button

                                    className="btn btn-outline-secondary w-100"

                                    onClick={refreshFilter}

                                >

                                    Reset Filters

                                </button>

                            </div>

                            <div className="col-lg-2">

                                <button className="btn btn-outline-dark w-100">

                                    📥 Export

                                </button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>


            <MedicineCard

                medicine={medicine}

                onSelected={onSelected}

            />
            <Pagination

                page={page}

                setPage={setPage}

            />


            <div
                className="modal fade"
                id="medicineModal"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">

                                {

                                    newMedicine ?

                                        "Add Medicine"

                                        :

                                        "Medicine Details"

                                }

                            </h5>

                            <button

                                className="btn-close"

                                data-bs-dismiss="modal"

                            />

                        </div>

                        <div className="modal-body">

                            <MedicineForm

                                editMedicine={editMedicine}

                                handleChange={handleChange}

                                submitEditedForm={submitEditedForm}

                                selectedMedicine={selectedMedicine}

                                newMedicine={newMedicine}

                                medicineForms={medicineForms}

                                categories={categories}

                            />

                        </div>

                        <div className="modal-footer">

                            <button

                                className="btn btn-danger"

                                onClick={() =>

                                    deleteMedicine(selectedMedicine.id)

                                }

                            >

                                <i className="bi bi-trash-fill"></i>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Toast — color/header switch based on toastType */}
            <div
                className="position-fixed top-0 start-0 p-3"
                style={{ zIndex: 1080 }}
            >

                <div
                    id="liveToast"
                    className="toast"
                >

                    <div
                        className={`toast-header ${
                            toastType === "error"
                                ? "bg-danger text-white"
                                : "bg-success text-white"
                        }`}
                    >

                        <strong className="me-auto">

                            {toastType === "error" ? "Error" : "Notification"}

                        </strong>

                        <button

                            className={`btn-close ${
                                toastType === "error" ? "btn-close-white" : ""
                            }`}

                            data-bs-dismiss="toast"

                        />

                    </div>

                    <div className="toast-body">

                        {toastMessage}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MedicineAdmin;
