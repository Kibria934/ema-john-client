import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../loading/Loading";
import "./LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  loading && <Loading />;
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  if (user) {
    console.log(user);
    navigate(from, { replace: true });
  }
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  if (error) {
    setErrors(error);
    return;
  }
  const handleUserSignIn = (event) => {
    event.preventDefault();
    console.log(email, password);

    if ((email, password)) {
      signInWithEmailAndPassword(email, password);
    }
    return console.log("create account first");
  };

  return (
    <div>
      <div className="form-container">
        <div>
          <h1 className="form-title">Login</h1>
          <form onSubmit={handleUserSignIn}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleEmailBlur}
                type="email"
                name="email"
                id=""
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={handlePasswordBlur}
                type="password"
                name="password"
                id=""
                required
              />
            </div>
            <p>{errors}</p>
            <input className="form-submit" type="submit" value="Login" />
          </form>
          <p className="form-line">
            New to Ema john?
            <Link className="form-link" to="/signup">
              Create an account
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

export default LogIn;
