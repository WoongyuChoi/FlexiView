import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const TextFieldLayout = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Input Panel
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
    </Box>
  );
};

export default TextFieldLayout;
