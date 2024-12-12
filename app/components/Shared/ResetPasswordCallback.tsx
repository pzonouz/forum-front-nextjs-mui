"use client";

import { forgetPasswordCallbackAction } from "@/app/actions/Auth";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";

const ResetPasswordCallback = ({ token }: { token: string }) => {
  const [state, action, loading] = useActionState(
    forgetPasswordCallbackAction.bind(null, token),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      redirect("/signin");
    }
  }, [state]);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        marginTop: "4rem",
        width: "80%",
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: "2rem",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4">
        بازیابی رمز
      </Typography>
      <TextField
        defaultValue={state?.data?.password}
        type="password"
        name="password"
        label="رمز جدید"
        helperText={state?.error?.fieldErrors?.password?.[0]}
        error={!!state?.error?.fieldErrors?.password?.[0]}
        fullWidth
      />
      <TextField
        defaultValue={state?.data?.password_confirm}
        type="password"
        name="password_confirm"
        label="تکرار رمز جدید"
        fullWidth
        helperText={state?.error?.fieldErrors?.password_confirm?.[0]}
        error={!!state?.error?.fieldErrors?.password_confirm?.[0]}
      />
      {state?.error?.formErrors?.length > 0 && (
        <FormHelperText error={!!state?.error?.formErrors}>
          {JSON.stringify(state?.error?.formErrors)}
        </FormHelperText>
      )}
      <LoadingButton
        loading={loading}
        type="submit"
        variant="contained"
        fullWidth
      >
        بازیابی
      </LoadingButton>
    </Box>
  );
};
export { ResetPasswordCallback };
