import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

const ManageReadingsPage = () => {
  const [readingId, setReadingId] = useState("");
  const [readingValue, setReadingValue] = useState("");

  const handleReadingIdChange = (event) => {
    setReadingId(event.target.value);
  };

  const handleReadingValueChange = (event) => {
    setReadingValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle reading editing logic here
    console.log("Reading ID:", readingId);
    console.log("Reading Value:", readingValue);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Reading
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Reading ID"
              variant="outlined"
              fullWidth
              value={readingId}
              onChange={handleReadingIdChange}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Reading Value"
              variant="outlined"
              fullWidth
              value={readingValue}
              onChange={handleReadingValueChange}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ManageReadingsPage;
