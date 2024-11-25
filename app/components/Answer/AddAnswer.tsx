"use client";
import { AddAnswerAction } from "@/app/actions/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { Session } from "next-auth";
import { useActionState } from "react";

const AddAnswer = ({
  question,
  session,
}: {
  question: QuestionType;
  session: Session;
}) => {
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
        label={session ? "افزودن جواب" : "برای افزودن جواب وارد شوید"}
        variant="filled"
        multiline
        minRows={5}
        name="description"
        defaultValue={state?.data?.description}
        error={state?.error?.fieldErrors?.description}
        helperText={state?.error?.fieldErrors?.description}
      />
      {state?.error?.formErrors.length! > 0 && (
        <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
      )}
      <LoadingButton
        type="submit"
        loading={loading}
        disabled={!session}
        sx={{ width: "100%" }}
        variant="contained"
      >
        {session ? "ثبت" : "برای افزودن جواب وارد شوید"}
      </LoadingButton>
    </Box>
  );
};
export { AddAnswer };
