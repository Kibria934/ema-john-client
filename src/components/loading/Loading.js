import React from "react";
import "./Loading.css";
import PacmanLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="loading">
      <div>
        <PacmanLoader width={"400px"} />
      </div>
    </div>
  );
};

export default Loading;
