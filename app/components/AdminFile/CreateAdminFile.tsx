"use client";

import { Box, Fab, TextField, Typography } from "@mui/material";
import { ModalComponenet } from "../Shared/ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import { useActionState, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FileComponent } from "./FileComponent";
import { CreateAdminFileAction } from "@/app/actions/File";

const CreateAdminFile = () => {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const session = useSession();
  const router = useRouter();
  const [state, action, loading] = useActionState(
    CreateAdminFileAction.bind(null, filename),
    null,
  );
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setFilename("");
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
            maxHeight: "90vh",
            overflow: "hidden",
            overflowY: "auto",
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
          <TextField
            label="عنوان"
            variant="standard"
            name="title"
            defaultValue={state?.data?.title}
            helperText={state?.error?.fieldErrors?.title}
            error={!!state?.error?.fieldErrors?.title}
          />
          <FileComponent filename={filename!} setFilename={setFilename} />
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
export { CreateAdminFile };
