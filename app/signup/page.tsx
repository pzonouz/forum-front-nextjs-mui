"use client";

import {
  Box,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState } from "react";
import { LoadingButton } from "@mui/lab";
import { signupAction } from "../actions/Auth";

export default function SignUp() {
  const [state, action, loading] = useActionState(signupAction, null);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "24rem",
          marginX: "auto",
          marginTop: "5rem",
        }}
        component="form"
        action={action}
      >
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold" }}
          variant="h5"
        >
          Sign Up
        </Typography>
        <TextField
          variant="standard"
          name="email"
          label="Email"
          defaultValue={state?.data?.email}
          helperText={state?.error?.fieldErrors?.email}
          error={!!state?.error?.fieldErrors?.email}
        />
        <TextField
          variant="standard"
          name="password"
          label="Password"
          defaultValue={state?.data?.password}
          helperText={state?.error?.fieldErrors?.password}
          error={!!state?.error?.fieldErrors?.password}
        />
        <TextField
          variant="standard"
          name="password_confirm"
          label="Password Confirm"
          defaultValue={state?.data?.password_confirm}
          helperText={state?.error?.fieldErrors?.password_confirm}
          error={!!state?.error?.fieldErrors?.password_confirm}
        />
        <TextField
          variant="standard"
          name="firstName"
          label="First name"
          defaultValue={state?.data?.firstName}
          helperText={state?.error?.fieldErrors?.firstName}
          error={!!state?.error?.fieldErrors?.firstName}
        />
        <TextField
          variant="standard"
          name="lastName"
          label="Last name"
          defaultValue={state?.data?.lastName}
          helperText={state?.error?.fieldErrors?.lastName}
          error={!!state?.error?.fieldErrors?.lastName}
        />
        {state?.error?.formErrors && (
          <FormHelperText error={true}>
            {state?.error?.formErrors}
          </FormHelperText>
        )}
        <LoadingButton loading={loading} type="submit" variant="contained">
          Sign Up
        </LoadingButton>
        <Link href="/signin">Already have an account?</Link>
      </Box>
    </Box>
  );
}
