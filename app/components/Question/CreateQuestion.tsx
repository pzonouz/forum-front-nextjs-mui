"use client";

import { Box, Fab, FormHelperText, TextField, Typography } from "@mui/material";
import { ModalComponenet } from "../Shared/ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import { useActionState, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FilesComponent } from "../File/FilesComponent";
import { CreateQuestionAction } from "@/app/actions/Question";
import { translate } from "@/app/actions/translate";
import Tiptap from "../Shared/Tiptap";

const CreateQuestion = () => {
  const [open, setOpen] = useState(false);
  const [filenames, setFilenames] = useState([]);
  const [text, setText] = useState("");
  const session = useSession();
  const router = useRouter();
  const [state, action, loading] = useActionState(
    CreateQuestionAction.bind(null, text, filenames),
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
            router.push("/Q&A/signin");
            return;
          }
          setOpen(true);
        }}
        color="primary"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: { xs: "1rem", md: "31rem" },
        }}
      >
        <AddIcon />
      </Fab>
      <ModalComponenet open={open} setOpen={setOpen}>
        <Box
          component="form"
          action={action}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
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
          <Typography
            component={"p"}
            sx={{ color: "text.secondary", marginBottom: "-1rem" }}
          >
            توضیحات
          </Typography>
          <Tiptap text={text} setText={setText} />
          {state?.error?.formErrors.length! > 0 && (
            <FormHelperText error>
              {translate(state?.error?.formErrors)}
            </FormHelperText>
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
export { CreateQuestion };
