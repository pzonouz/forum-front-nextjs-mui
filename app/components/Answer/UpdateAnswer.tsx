"use client";
import { UpdateAnswerAction } from "@/app/actions/Answer";
import { AnswerType } from "@/app/types/AnswerTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { FilesComponent } from "../File/FilesComponent";

const UpdateAnswer = ({ answer }: { answer: AnswerType }) => {
  const [filenames, setFilenames] = useState(answer?.filenames);
  const [state, action, loading] = useActionState(
    UpdateAnswerAction.bind(null, answer?.id, answer?.question?.id, filenames),
    null,
  );
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
        <FilesComponent filenames={filenames} setFilenames={setFilenames} />
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
export { UpdateAnswer };
