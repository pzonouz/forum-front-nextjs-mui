"use client";
import { EditQuestionAction } from "@/app/actions/Question";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState } from "react";

const EditQuestion = ({ question }: { question: QuestionType }) => {
  const [state, action, loading] = useActionState(EditQuestionAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
        backgroundColor: "background.paper",
        width: "90%",
      }}
    >
      <>
        <input type="hidden" name="id" defaultValue={question?.id} />
        <TextField
          label="Title"
          variant="standard"
          name="title"
          defaultValue={state?.data?.title || question?.title}
          helperText={state?.error?.fieldErrors?.title}
          error={!!state?.error?.fieldErrors?.title}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          minRows={5}
          variant="filled"
          defaultValue={state?.data?.description || question?.description}
          helperText={state?.error?.fieldErrors?.description}
          error={!!state?.error?.fieldErrors?.description}
        />
        {state?.error?.formErrors.length! > 0 && (
          <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
        )}
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Edit
        </LoadingButton>
      </>
    </Box>
  );
};
export { EditQuestion };
