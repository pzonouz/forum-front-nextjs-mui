"use server";
import { AnswerType } from "@/app/types/AnswerTypes";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { auth } from "@/auth";
import { SolveQuestion } from "./SolvedAnswer";

const Answer = async ({ questionId }: { questionId: string }) => {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/answers/question/${questionId}`,
    { next: { tags: ["Answer"] } },
  );
  const answers = await res.json();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {answers?.map((answer: AnswerType) => {
        const createdAt = new Date(answer?.createdAt).toLocaleString();
        return (
          <Paper
            key={answer?.id}
            elevation={3}
            sx={[
              {
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                width: "90%",
                padding: "1rem",
                marginRight: 0,
                marginLeft: "auto",
              },
              !answer?.solving && {
                paddingLeft: 0,
              },
              answer?.solving && {
                backgroundColor: "success.main",
                color: "white",
              },
            ]}
          >
            <SolveQuestion answer={answer} session={session!} />
            <Box sx={{ flex: 1 }}>
              <Typography>{answer?.description}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={[
                    { fontSize: "0.7rem" },
                    !answer?.solving && { color: grey[700] },
                    answer?.solving && { color: "white" },
                  ]}
                  component="span"
                >
                  {answer?.user?.email}
                </Typography>
                <Typography
                  sx={[
                    { fontSize: "0.7rem" },
                    answer?.solving && { color: "white" },
                    !answer?.solving && {
                      color: grey[700],
                    },
                  ]}
                  component="span"
                >
                  {createdAt}
                </Typography>
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
export { Answer };
