"use client";
import { CreateAnswerAction } from "@/app/actions/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { Session } from "next-auth";
import { useActionState, useState } from "react";
import { FilesComponent } from "../File/FilesComponent";

const CreateAnswer = ({
  question,
  session,
}: {
  question: QuestionType;
  session: Session;
}) => {
  const [filenames, setFilename] = useState([]);
  const [state, action, loading] = useActionState(
    CreateAnswerAction.bind(null, question?.id, filenames),
    null,
  );
  return (
    <Box
      component="form"
      action={action}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
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
      <FilesComponent filenames={filenames} setFilenames={setFilename} />
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
export { CreateAnswer };
