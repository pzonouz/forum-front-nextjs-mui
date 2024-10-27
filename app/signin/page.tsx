"use client";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { useActionState, useEffect } from "react";
import { signinAction } from "../actions/SigninAction";

const page = () => {
  const [state, action, loading] = useActionState(signinAction, null);

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "20rem",
        marginX: "auto",
        marginTop: "3rem",
        gap: "1rem",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
      >
        Sign In
      </Typography>
      <TextField
        variant="standard"
        label="Email"
        name="email"
        defaultValue={state?.data?.email}
        helperText={state?.error?.fieldErrors?.email}
        error={!!state?.error?.fieldErrors?.email}
      ></TextField>
      <TextField
        variant="standard"
        label="Password"
        name="password"
        type="password"
        defaultValue={state?.data?.password}
        helperText={state?.error?.fieldErrors?.password}
        error={!!state?.error?.fieldErrors?.password}
      ></TextField>
      {state?.error.formErrors && (
        <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained">
        Sign In
      </LoadingButton>
    </Box>
  );
};
export default page;
