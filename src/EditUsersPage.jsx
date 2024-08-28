import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import UserCard from "./UserCard";
import AddUserTile from "./AddUserTile";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "./constants";

// const users = [
//   { id: 1, username: "john_doe", role: "user" },
//   { id: 2, username: "jane_smith", role: "admin" },
//   { id: 3, username: "alice_johnson", role: "user" },
//   { id: 4, username: "bob_brown", role: "user" },
//   { id: 5, username: "charlie_white", role: "user" },
// ];

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(API_URL + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          console.log("Unauthorized access, Please Sign In and try again");
          return;
        }
        if (response.status === 403) {
          console.log("Forbidden access, Admin access only!");
          return;
        }
        if (response.status === 200) {
          console.log("Success");

          const data = await response.json();
          setUsers(data);

          console.log(data);
          return;
        }
      })
      .catch((error) => {
        console.error(`An Error has occured! Unkown error: !${error}`);
        return;
      });
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleAddUser = () => {
    console.log("Add new user");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Users
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <UserCard user={user} onEdit={handleEdit} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AddUserTile onAdd={handleAddUser} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManageUsersPage;
