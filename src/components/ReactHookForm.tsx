import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { StylesType } from "../types";

const styles: StylesType = {
  wrapper: {
    maxWidth: "1000px",
    flex: 1,
  },
  header: {
    fontSize: "28px",
    fontWeight: 700,
    textAlign: "center",
    lineHeight: "39.2px",
    my: "24px",
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
  },
  inputContainer: {
    mr: "48px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  input: {
    mb: "12px",
  },
  button: {
    height: "48px",
    minWidth: "221px",
    textTransform: "capitalize",
  },
};

type FormDataType = {
  email: string;
  password: "";
};

const defaultInputValues: FormDataType = {
  email: "",
  password: "",
};

const validationSchema = yup
  .object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\da-zA-Z]).{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })
  .required();

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultInputValues,
  });

  const handleLogin = (data: FormDataType) => {
    console.log(data);
    alert("login success");
    reset();
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.header}>Login</Typography>
      <Box
        component="form"
        sx={styles.form}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Box sx={styles.inputContainer}>
          <TextField
            sx={styles.input}
            placeholder="Email"
            required
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            sx={styles.input}
            placeholder="Password..."
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
        </Box>
        <Button variant="contained" sx={styles.button} type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default memo(TodoForm);
