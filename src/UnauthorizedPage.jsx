import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Sorry!</div>
      <div>You are not authorized to access this page.</div>
      <button
        onClick={() => {
          navigate("/");
        }}
        style={{ backgroundColor: "navy" }}
      >
        Home
      </button>
    </>
  );
};

export default UnauthorizedPage;
