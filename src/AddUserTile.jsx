import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const LightBlueCard = styled(Card)({
  backgroundColor: '#e0f7fa', // light blue background
});

const AddUserTile = ({ onAdd }) => {
  return (
    <LightBlueCard>
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          Add User
        </Typography>
        <IconButton onClick={onAdd} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <AddIcon fontSize="large" />
        </IconButton>
      </CardContent>
    </LightBlueCard>
  );
};

export default AddUserTile;
