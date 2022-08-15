import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { reAuth } from "../../auth/firebase";

const ReAuthModal = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reAuth(password);
    handleClose();
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        value={email}
        autoComplete="email"
        autoFocus
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
        Login
      </Button>
    </Box>
  );
};

export default ReAuthModal;
