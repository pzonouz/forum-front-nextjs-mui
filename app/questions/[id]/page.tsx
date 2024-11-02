"use server";

import { AddAnswer } from "@/app/components/Answer/AddAnswer";
import { Answer } from "@/app/components/Answer/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Paper, Typography } from "@mui/material";

const page = async ({ params }: { params: { id: string } }) => {
  const parameters = await params;
  const resQuestion = await fetch(
    `${process.env.BACKEND_URL}/questions/${parameters.id}`,
  );
  const question: QuestionType = await resQuestion.json();
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", padding: "1rem" }}>
        <Typography sx={{ marginBottom: "1rem" }}>{question?.title}</Typography>
        <Typography>{question?.description}</Typography>
      </Paper>
      <Answer questionId={parameters.id} />
      <AddAnswer question={question} />
    </Box>
  );
};

export default page;
