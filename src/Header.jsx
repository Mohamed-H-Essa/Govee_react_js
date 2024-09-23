import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GradientAppBar = styled(AppBar)({
  background: "linear-gradient(45deg, #3a3a3a 30%, #1a1a1a 90%)",
});

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Sign Out");
    localStorage.removeItem("token"); // Remove the token or any other sign-out logic
    navigate("/login");
  };

  return (
    <GradientAppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="device">
          <MedicalServicesIcon />
        </IconButton> */}
        <Button style={{ color: "red" }} onClick={handleSignOut}>
          Sign Out
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Govee
        </Typography>

        <Button
          style={{ color: "blue" }}
          onClick={() => {
            navigate("/manage_users");
          }}
        >
          Manage Users
        </Button>
      </Toolbar>
    </GradientAppBar>
  );
};

export default Header;
