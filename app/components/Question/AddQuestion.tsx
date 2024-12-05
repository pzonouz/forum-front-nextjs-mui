"use client";

import { Box, Fab, FormHelperText, TextField } from "@mui/material";
import { ModalComponenet } from "../Shared/ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import { useActionState, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { AddQuestionAction } from "@/app/actions/Question";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FilesComponent } from "../File/FilesComponent";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const session = useSession();
  const router = useRouter();
  const [state, action, loading] = useActionState(
    AddQuestionAction.bind(null, filenames),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setFilenames([]);
    }
  }, [state]);
  return (
    <Box>
      <Fab
        onClick={() => {
          if (!(session?.status === "authenticated")) {
            router.push("/signin");
            return;
          }
          setOpen(true);
        }}
        color="primary"
        sx={{ position: "fixed", bottom: "1rem", right: "1rem" }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet open={open} setOpen={setOpen}>
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
            width: "80%",
          }}
        >
          <TextField
            label="عنوان"
            variant="standard"
            name="title"
            defaultValue={state?.data?.title}
            helperText={state?.error?.fieldErrors?.title}
            error={!!state?.error?.fieldErrors?.title}
          />
          <TextField
            label="توضیحات"
            name="description"
            multiline
            minRows={5}
            variant="filled"
            defaultValue={state?.data?.description}
            helperText={state?.error?.fieldErrors?.description}
            error={!!state?.error?.fieldErrors?.description}
          />
          {state?.error?.formErrors.length! > 0 && (
            <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
          )}
          <FilesComponent filenames={filenames!} setFilenames={setFilenames} />
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            افزودن
          </LoadingButton>
        </Box>
      </ModalComponenet>
    </Box>
  );
};
export { AddQuestion };
