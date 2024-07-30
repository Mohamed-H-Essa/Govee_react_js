import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import UserCard from './UserCard';
import AddUserTile from './AddUserTile';

const users = [
  { id: 1, username: 'john_doe', role: 'user' },
  { id: 2, username: 'jane_smith', role: 'admin' },
  { id: 3, username: 'alice_johnson', role: 'user' },
  { id: 4, username: 'bob_brown', role: 'user' },
  { id: 5, username: 'charlie_white', role: 'user' },
];

const EditUsersPage = () => {
  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleAddUser = () => {
    console.log('Add new user');
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

export default EditUsersPage;
