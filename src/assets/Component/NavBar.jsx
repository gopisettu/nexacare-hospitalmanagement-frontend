function NavBar() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NexaCare
          </a>
  
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  About
                </a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Achievements
                </a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link disabled">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default NavBar;