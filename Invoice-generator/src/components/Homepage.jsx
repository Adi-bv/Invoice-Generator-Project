import {Link} from "react-router-dom"

let Homepage = () => {
  return (
    <>
      <div className="card text-center homepage-content">
        <div className="card-header">
          <h1>Invoice Generator</h1>
          </div>
        <div className="card-body">
          <h5 className="card-title">Generate, Customize, and Send Invoices with Ease</h5> 
          <div className="btn-gap">
          <Link to="/signup" className="btn btn-primary Button right align">
            Signup
          </Link>
          <Link to="/login" className="btn btn-primary Button">
            Login
          </Link>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Homepage;
