import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const LoginPage = () => {
  const API_URL = "http://localhost:3000";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("username:", username);
    console.log("Password:", password);
    login(username, password);
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 401) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }
      if (response.status === 201) {
        const data = await response.json();
        const token = data["access_token"];
        localStorage.setItem("token", token);

        console.log(data);
        setError("");
        setLoading(false);
        navigate("/");

        return;
      }
      setError("An error has occurred");
      setLoading(false);
      return;
    } catch (e) {
      setError(`Failed to login: ${e}`);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              style={{
                backgroundColor: "white",
              }}
              label="username"
              type="username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              style={{
                backgroundColor: "white",
              }}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          {error !== "" && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
