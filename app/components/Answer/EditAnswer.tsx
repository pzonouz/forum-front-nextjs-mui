"use client";
import { EditAnswerAction } from "@/app/actions/Answer";
import { EditQuestionAction } from "@/app/actions/Question";
import { AnswerType } from "@/app/types/AnswerTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState } from "react";

const EditAnswer = ({ answer }: { answer: AnswerType }) => {
  const [state, action, loading] = useActionState(EditAnswerAction, null);
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
        <input type="hidden" name="id" defaultValue={answer?.id} />
        <input
          type="hidden"
          name="questionId"
          defaultValue={answer?.question?.id}
        />
        <TextField
          label="توضیحات"
          name="description"
          multiline
          minRows={5}
          variant="filled"
          defaultValue={state?.data?.description || answer?.description}
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
          ویرایش
        </LoadingButton>
      </>
    </Box>
  );
};
export { EditAnswer };
