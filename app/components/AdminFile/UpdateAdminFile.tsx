"use client";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import { FileType } from "@/app/types/FileType";
import { UpdateAdminFileAction } from "@/app/actions/File";
import { FileComponent } from "./FileComponent";

const UpdateAdminFile = ({ file }: { file: FileType }) => {
  const [filename, setFilename] = useState(file?.filename);
  const [state, action, loading] = useActionState(
    UpdateAdminFileAction.bind(null, file?.id, filename),
    null,
  );
  return (
    <Box
      component="form"
      action={action}
      sx={{
        position: "fixed",
        top: "6rem",
        left: "50%",
        transform: "translate(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        paddingX: "2rem",
        paddingBottom: "4rem",
        backgroundColor: "background.paper",
        width: "90%",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <>
        <TextField
          fullWidth
          label="عنوان"
          variant="standard"
          name="title"
          defaultValue={state?.data?.title || file?.title}
          helperText={state?.error?.fieldErrors?.title}
          error={!!state?.error?.fieldErrors?.title}
        />
        <FileComponent filename={filename} setFilename={setFilename} />
        <FormHelperText error sx={{ marginTop: "-1rem" }}>
          {state?.error?.fieldErrors?.filename}
        </FormHelperText>
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
export { UpdateAdminFile };
