import { useState } from "react";
import { register } from "../api"; 
import { useNavigate } from "react-router-dom"; 
import '../Section.css'

const Signup = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      const res = await register({ name, email, password }); 
      if(res?.success){
        setTimeout(() => {
          navigate("/login"); // Redirect user to login page
        },1000);
      }
      else{
        setError(res?.msg || "Registration failed");
      } 
    } catch (err) {
      setError(err); 
    }
  };

  return (
    <>
    <div className="signup-grid"> 
    <div className="welcome-section">
        <h1>Hello!</h1>
        <h1>Welcome to Invoice Generator</h1>
      </div>
      <div className="signup-form-section">
      <div>
        <div className="heading">
          <h1>Signup</h1>
        </div>
        <div className="heading" style={{fontSize:"20px" ,color:"red"}}>{error && <p>{ error }</p>}</div>
        <div className="outer-box shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="mb-3">
            <div>
              <label
                htmlFor="htmlFormGroupExampleInput"
                className="htmlForm-label"
              >
                <h5>Name</h5>
              </label>
            </div>
            <input
              style={{ minWidth: "20vw", marginTop: "10px" }}
              type="text"
              placeholder="Enter name here"
              value={name}
              className="htmlForm-control inputData"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <div>
              <label
                htmlFor="htmlFormGroupExampleInput2"
                className="htmlForm-label"
              >
                <h5>Email</h5>
              </label>
            </div>
            <input
              style={{ minWidth: "20vw", marginTop: "10px" }}
              type="text"
              className="htmlForm-control inputData"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <div>
              <label
                htmlFor="htmlFormGroupExampleInput2"
                className="htmlForm-label"
              >
                <h5>Password</h5>
              </label>
            </div>
            <input
              style={{ minWidth: "20vw", marginTop: "10px" }}
              type="password"
              className="htmlForm-control inputData"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary Button"
              onClick={handleOnSubmit}
            >
              Create Account
            </button>
          </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Signup;
