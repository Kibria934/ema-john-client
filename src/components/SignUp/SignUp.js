import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./SignUp.css";
import auth from "../../firebase.init";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, hookError] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate("");

  // =========== Function section =================
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordBlur = (event) => {
    setConfirmPassword(event.target.value);
  };
  const location = useLocation();
  const from = location.state?.from?.pathname || "/about";
  if (user) {
    navigate(from, { replace: true });
  }
  if (error) {
    console.log(error);
  }
  const handleCreateUser = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Your two password did not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be grater than 6 character");
      return;
    }
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <div>
      <div className="form-container">
        <div>
          <h1 className="form-title">SignUp</h1>
          <form onSubmit={handleCreateUser}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onBlur={handleEmailBlur}
                type="email"
                name="email"
                id=""
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onBlur={handlePasswordBlur}
                type="password"
                name="password"
                id=""
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                onBlur={handleConfirmPasswordBlur}
                type="password"
                name="password"
                id=""
                required
              />
            </div>
            <p style={{ color: "red", marginLeft: "20px" }}>{error}</p>
            <input className="form-submit" type="submit" value="Signup" />
          </form>
          <p className="form-line">
            Already have an account?
            <Link className="form-link" to="/login">
              Sign in
            </Link>
          </p>
          <div className="hr-container">
            <div className="left-hr">
              <h1> </h1>
            </div>
            <p className="hr-content">or</p>
            <div className="right-hr"></div>
          </div>
          <div className="signIn-btn">Continue with Google</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
