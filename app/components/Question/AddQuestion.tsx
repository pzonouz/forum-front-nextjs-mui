"use client";

import { Box, Fab, FormHelperText, TextField } from "@mui/material";
import { ModalComponenet } from "../Shared/ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import { useActionState, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { AddQuestionAction } from "@/app/actions/Question";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const [state, action, loading] = useActionState(AddQuestionAction, null);
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state?.success]);
  return (
    <Box>
      <Fab
        onClick={() => {
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
            label="Title"
            variant="standard"
            name="title"
            defaultValue={state?.data?.title}
            helperText={state?.error?.fieldErrors?.title}
            error={!!state?.error?.fieldErrors?.title}
          />
          <TextField
            label="Description"
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
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </LoadingButton>
        </Box>
      </ModalComponenet>
    </Box>
  );
};
export { AddQuestion };
