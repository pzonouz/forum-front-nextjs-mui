"use client";
import { AddAnswerAction } from "@/app/actions/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState } from "react";

const AddAnswer = ({ question }: { question: QuestionType }) => {
  const [state, action, loading] = useActionState(AddAnswerAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <input hidden name="questionId" defaultValue={question?.id} />
      <TextField
        sx={{
          width: "100%",
        }}
        label="Add Answer"
        variant="filled"
        multiline
        minRows={5}
        name="description"
        defaultValue={state?.data?.description}
        error={state?.error?.fieldErrors?.description}
        helperText={state?.error?.fieldErrors?.description}
      />
      {state?.error?.formErrors.length > 0 && (
        <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton
        type="submit"
        loading={loading}
        sx={{ width: "100%" }}
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};
export { AddAnswer };
