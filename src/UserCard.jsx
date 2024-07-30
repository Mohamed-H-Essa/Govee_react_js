import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';


const LightBlueCard = styled(Card)({
  backgroundColor: '#e0f7fa', // light blue background
});

const UserCard =  ({ user, onEdit }) => {
  return (
    <LightBlueCard>
      <CardContent>
        <Typography variant="h6" component="div">
          {user.username}
        </Typography>
        <Typography color="textSecondary">
          Role: {user.role}
        </Typography>
        <IconButton onClick={() => onEdit(user.id)}>
          <EditIcon />
        </IconButton>
      </CardContent>
    </LightBlueCard>
  );
};

export default UserCard;
