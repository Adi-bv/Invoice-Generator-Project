import { useState } from "react";
import { login } from "../api"; 
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async () => { 
    try {
      const res = await login({email, password}); 
      if(res?.success){  

        setTimeout(() => {
          navigate("/invoice-list"); // Redirect user to login page
        },1000);
      }
      else{
        setError(res?.msg );
      } 
    } catch (error) {
      setError(error);
    }
  };
  
  return (
    <>
      <div className="signup-grid"> 
    <div className="welcome-section">
        <h1>Welcome Back !</h1>
      </div>
      <div className="signup-form-section">
      <div>
        <div className="heading">
          <h1>Login</h1>
        </div>
        <div className="heading" style={{fontSize:"20px" ,color:"red"}}>{error && <p>{ error }</p>}</div>
        <div className="outer-box shadow p-3 mb-5 bg-body-tertiary rounded">
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
              Login with email
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;