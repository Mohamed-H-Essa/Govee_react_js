import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isAdmin = false }) => {
  const token = localStorage.getItem("token");
  console.log("hello from protected route");
  console.log(token);

  if (isAdmin) {
    return Component;
  }
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || [];

      console.log("Roles: ");
      console.log(roles);

      if (
        isAdmin &&
        (roles.includes("admin") || roles.includes("super_admin"))
      ) {
        return Component;
      } else if (isAdmin) {
        return <Navigate to="/unauthorized" />;
      } else {
        return Component;
      }
    } catch (error) {
      console.error("Invalid token:", error);

      return <Navigate to="/unauthorized" />;
    }
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
