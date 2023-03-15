import { Box, Button, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";

const CommonForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setEmailError("Invalid email address");
      return;
    }
    alert(`name: ${name}/ email: ${email}`);
    setName("");
    setEmail("");
    setNameError("");
    setEmailError("");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={!!nameError}
          helperText={nameError}
          sx={{ mr: "12px" }}
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <Box sx={{ mt: "12px" }}>
          <Button type="submit" variant="contained">
            Submit Form
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonForm;
