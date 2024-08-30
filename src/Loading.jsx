import React from "react";
import ReactLoading from "react-loading";

export const Loading = ({ type, color }) => (
  <div className="loading-container">
    <ReactLoading type={type} color={color} height={"15%"} width={"15%"} />
  </div>
);
