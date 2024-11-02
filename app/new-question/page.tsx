"use client";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useActionState } from "react";
import { AddQuestionAction } from "../actions/Question";

const page = () => {
  const [state, action, loading] = useActionState(AddQuestionAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginX: "auto",
        gap: "2rem",
        marginTop: "2rem",
      }}
    >
      <TextField
        variant="standard"
        label="Title"
        helperText={state?.error?.fieldErrors?.title}
        error={!!state?.error?.fieldErrors?.title}
      />
      <TextField
        variant="filled"
        label="Description"
        multiline
        minRows={5}
        helperText={state?.error?.fieldErrors?.description}
        error={!!state?.error?.fieldErrors?.description}
      />
      <LoadingButton loading={loading} type="submit" variant="contained">
        Submit
      </LoadingButton>
    </Box>
  );
};
export default page;
