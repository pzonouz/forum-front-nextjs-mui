"use client";
import { EditQuestionAction } from "@/app/actions/Question";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { FilesComponent } from "../File/FilesComponent";

const EditQuestion = ({ question }: { question: QuestionType }) => {
  const [filenames, setFilenames] = useState(question?.filenames);
  const [state, action, loading] = useActionState(
    EditQuestionAction.bind(null, question?.id, filenames),
    null,
  );
  return (
    <Box
      component="form"
      action={action}
      sx={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
        backgroundColor: "background.paper",
        width: "100%",
      }}
    >
      <>
        <TextField
          label="عنوان"
          variant="standard"
          name="title"
          defaultValue={state?.data?.title || question?.title}
          helperText={state?.error?.fieldErrors?.title}
          error={!!state?.error?.fieldErrors?.title}
        />
        <TextField
          label="توضیحات"
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
        <FilesComponent
          question={question}
          filenames={filenames}
          setFilenames={setFilenames}
        />
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
export { EditQuestion };
