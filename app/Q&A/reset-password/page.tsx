"use client";

import {
  Alert,
  Box,
  FormHelperText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { resetPasswordAction } from "../actions/Auth";
import { LoadingButton } from "@mui/lab";

const page = () => {
  const [open, setOpen] = useState(false);
  const [state, action, loading] = useActionState(resetPasswordAction, null);
  useEffect(() => {
    if (state?.success) {
      setOpen(true);
    }
  }, [state]);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "80%",
        marginX: "auto",
        marginTop: "5rem",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ایمیل بازیابی با موفقیت ارسال شد
        </Alert>
      </Snackbar>
      <Typography
        sx={{ textAlign: "center", marginBottom: "3rem" }}
        variant="h5"
      >
        فراموشی رمز عبور
      </Typography>
      <TextField
        defaultValue={state?.data?.email}
        variant="standard"
        name="email"
        helperText={state?.error?.fieldErrors?.email}
        error={!!state?.error?.fieldErrors?.email}
      />
      {state?.error?.formErrors?.length > 0 && (
        <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton type="submit" loading={loading} variant="contained">
        ارسال ایمیل بازیابی
      </LoadingButton>
    </Box>
  );
};

export default page;
