"use client";

import { Box, CircularProgress, IconButton } from "@mui/material";
import { Session } from "next-auth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useActionState } from "react";
import { AnswerType } from "@/app/types/AnswerTypes";
import { SolvedAnswerAction } from "@/app/actions/Answer";

const SolveQuestion = ({
  answer,
  session,
}: {
  answer: AnswerType;
  session: Session;
}) => {
  const [_state, action, loading] = useActionState(
    SolvedAnswerAction.bind(null, answer?.id, answer?.question?.id),
    null,
  );
  return (
    <>
      {answer?.question?.user?.email === session?.user?.email && (
        <Box component="form" action={action}>
          <IconButton
            sx={[answer.solving && { backgroundColor: "white" }]}
            type="submit"
          >
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : !answer?.solving ? (
              <CheckIcon sx={[{ color: "success.main" }]} />
            ) : (
              <CloseIcon sx={{ color: "error.main" }} />
            )}
          </IconButton>
        </Box>
      )}
    </>
  );
};
export { SolveQuestion };
