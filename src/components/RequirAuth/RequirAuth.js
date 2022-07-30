import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const RequirAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  useEffect(() => {
    loading && <p>Loading...</p>;
    if (!user) {
      return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
      );
    }
  }, [user, loading]);

  return children;
};

export default RequirAuth;
