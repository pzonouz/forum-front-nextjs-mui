"use client";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormHelperText,
  Link as MUILink,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useActionState } from "react";
import { signinAction } from "../actions/Auth";
import Link from "next/link";
import { signIn } from "next-auth/react";

const page = () => {
  const [state, action, loading] = useActionState(signinAction, null);

  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "20rem",
        marginX: "auto",
        marginTop: "5rem",
        gap: "1rem",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
      >
        ورود
      </Typography>
      <Button
        onClick={() => {
          signIn("google", { callbackUrl: "/questions" });
        }}
        variant="contained"
        color="error"
        endIcon={<GoogleIcon />}
      >
        ورود با گوگل
      </Button>
      <TextField
        variant="standard"
        label="ایمیل"
        name="email"
        defaultValue={state?.data?.email}
        helperText={state?.error?.fieldErrors?.email}
        error={!!state?.error?.fieldErrors?.email}
      ></TextField>
      <TextField
        variant="standard"
        label="پسورد"
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
        ورود
      </LoadingButton>
      <MUILink sx={{ textDecoration: "none" }} component={Link} href="/signup">
        حساب کاربری ندارید؟ثبت نام
      </MUILink>
      <MUILink
        sx={{ textDecoration: "none" }}
        component={Link}
        href="/forget_password"
      >
        فراموشی رمز عبور
      </MUILink>
    </Box>
  );
};
export default page;
