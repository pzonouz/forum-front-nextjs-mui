"use client";

import {
  Box,
  FormHelperText,
  Link as MUILink,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useActionState } from "react";
import { LoadingButton } from "@mui/lab";
import { signupAction } from "@/app/actions/Auth";

export default function SignUp() {
  const [state, action, loading] = useActionState(signupAction, null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: "2rem",
        marginX: "auto",
        marginTop: "5rem",
        gap: 2,
      }}
      component="form"
      action={action}
    >
      <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="h5">
        ثبت نام
      </Typography>
      <TextField
        dir="rtl"
        variant="standard"
        name="email"
        label="ایمیل"
        defaultValue={state?.data?.email}
        helperText={state?.error?.fieldErrors?.email}
        error={!!state?.error?.fieldErrors?.email}
      />
      <TextField
        variant="standard"
        name="password"
        type="password"
        label="پسورد"
        defaultValue={state?.data?.password}
        helperText={state?.error?.fieldErrors?.password}
        error={!!state?.error?.fieldErrors?.password}
      />
      <TextField
        variant="standard"
        name="password_confirm"
        label="تایید پسورد"
        type="password"
        defaultValue={state?.data?.password_confirm}
        helperText={state?.error?.fieldErrors?.password_confirm}
        error={!!state?.error?.fieldErrors?.password_confirm}
      />
      <TextField
        variant="standard"
        name="firstname"
        label="نام"
        defaultValue={state?.data?.firstname}
        helperText={state?.error?.fieldErrors?.firstname}
        error={!!state?.error?.fieldErrors?.firstname}
      />
      <TextField
        variant="standard"
        name="lastname"
        label="نام خانوادگی"
        defaultValue={state?.data?.lastname}
        helperText={state?.error?.fieldErrors?.lastname}
        error={!!state?.error?.fieldErrors?.lastname}
      />
      {state?.error?.formErrors && (
        <FormHelperText error={true}>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained">
        ثبت نام
      </LoadingButton>
      <MUILink component={Link} sx={{ textDecoration: "none" }} href="/signin">
        قبلا ثبت نام کرده اید؟
      </MUILink>
    </Box>
  );
}
