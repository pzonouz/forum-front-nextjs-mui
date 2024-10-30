"use server";

import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Paper, Typography } from "@mui/material";

const page = async ({ params }: { params: { id: number } }) => {
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
        <Typography>{question.title}</Typography>
      </Paper>
      {/* TODO:Create answer */}
      <Paper elevation={3} sx={{ width: "100%", padding: "1rem" }}>
        <Typography>Question {parameters.id}</Typography>
      </Paper>
    </Box>
  );
};

export default page;
