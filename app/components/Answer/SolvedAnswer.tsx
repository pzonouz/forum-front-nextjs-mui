"use client";

import { Box, CircularProgress, IconButton } from "@mui/material";
import { Session } from "next-auth";
import CheckIcon from "@mui/icons-material/Check";
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
  const [_state, action, loading] = useActionState(SolvedAnswerAction, null);
  return (
    <>
      {answer?.question?.user?.id === session?.user?.id &&
        !answer?.question?.solved && (
          <Box component="form" action={action}>
            <input hidden name="answerId" defaultValue={answer?.id} />
            <IconButton type="submit">
              {loading ? <CircularProgress /> : <CheckIcon />}
            </IconButton>
          </Box>
        )}
    </>
  );
};
export { SolveQuestion };