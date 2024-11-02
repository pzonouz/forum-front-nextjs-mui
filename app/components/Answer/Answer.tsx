"use server";
import { Box, Paper, Typography } from "@mui/material";

const Answer = async ({ questionId }: { questionId: string }) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/answers/question/${questionId}`,
  );
  const answers = await res.json();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {answers?.map((answer: { id: string; description: string }) => (
        <Paper
          key={answer?.id}
          elevation={3}
          sx={{
            width: "90%",
            padding: "1rem",
            marginRight: 0,
            marginLeft: "auto",
          }}
        >
          <Typography>{answer?.description}</Typography>
        </Paper>
      ))}
    </Box>
  );
};
export { Answer };
