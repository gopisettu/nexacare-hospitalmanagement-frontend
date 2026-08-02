import React from "react";

function ManagementToolbar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearch,

  filters = [],

  onAdd,
  addButtonText = "Add",

  onRefresh,
  onReset,
  onExport
}) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        {/* =================== Top Row =================== */}

        <div className="row g-3 align-items-center">

          {/* Search */}

          <div className="col-lg-3 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearch}
            />
          </div>

          {/* Dynamic Filters */}

          {filters.map((filter, index) => (
            <div className="col-lg-2 col-md-6" key={index}>
              <select
                className="form-select"
                value={filter.value}
                onChange={filter.onChange}
              >
                {filter.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

        </div>

        <hr />

        {/* ================= Bottom Row ================= */}

        <div className="row g-3">

          <div className="col-lg-2 col-md-6">
            <button
              className="btn btn-success w-100"
              onClick={onAdd}
            >
              + {addButtonText}
            </button>
          </div>

          <div className="col-lg-2 col-md-6">
            <button
              className="btn btn-outline-primary w-100"
              onClick={onRefresh}
            >
              🔄 Refresh
            </button>
          </div>

          <div className="col-lg-2 col-md-6">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onReset}
            >
              Reset Filters
            </button>
          </div>

          <div className="col-lg-2 col-md-6">
            <button
              className="btn btn-outline-dark w-100"
              onClick={onExport}
            >
              📥 Export
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ManagementToolbar;