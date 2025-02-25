"use client";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { FilesComponent } from "../File/FilesComponent";
import { UpdateQuestionAction } from "@/app/actions/Question";
import { translate } from "@/app/actions/translate";
import Tiptap from "../Shared/Tiptap";

const UpdateQuestion = ({ question }: { question: QuestionType }) => {
  const [filenames, setFilenames] = useState(question?.filenames);
  const [text, setText] = useState(question?.description);
  const [state, action, loading] = useActionState(
    UpdateQuestionAction.bind(null, question?.id, text, filenames),
    null,
  );
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
        backgroundColor: "background.paper",
        maxHeight: "90vh",
        overflow: "hidden",
        overflowY: "auto",
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
        <Tiptap text={state?.data?.description || text} setText={setText} />
        {state?.error?.formErrors.length! > 0 && (
          <FormHelperText error>
            {translate(state?.error?.formErrors)}
          </FormHelperText>
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
export { UpdateQuestion };
