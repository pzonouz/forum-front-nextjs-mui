"use server";
import { AnswerType } from "@/app/types/AnswerTypes";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { auth } from "@/auth";
import { SolveQuestion } from "./SolvedAnswer";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Answer = async ({ questionId }: { questionId: string }) => {
  const session = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/answers/question/${questionId}`,
    { next: { tags: ["Answer"] } },
  );
  const answers = await res.json();
  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        marginLeft: "5%",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {answers?.map((answer: AnswerType) => {
        const created_at = new Date(answer?.created_at).toLocaleString("fa-IR");
        return (
          <Paper
            key={answer?.id}
            elevation={3}
            sx={[
              {
                display: "flex",
                padding: "1rem",
                width: "100%",
                flexDirection: "row",
                gap: "1rem",
                marginRight: 0,
                marginLeft: "auto",
              },
              answer?.solving && {
                backgroundColor: "success.main",
                color: "white",
              },
            ]}
          >
            {session?.user?.email === answer?.user?.email && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SolveQuestion answer={answer} session={session!} />
                <IconButton
                  sx={[
                    answer?.solving && { backgroundColor: "white" },
                    { color: "primary.main" },
                  ]}
                  component={Link}
                  href={`/answers/${answer?.id}/edit`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={[
                    answer?.solving && { backgroundColor: "white" },
                    { backgroundColor: "white" },
                    { color: "error.main" },
                  ]}
                  component={Link}
                  href={`/answers/${answer?.id}/delete`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
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
                  {created_at}
                </Typography>
              </Box>
              <Box
                id="files"
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                {answer?.filenames?.map((filename, index) => (
                  <Box
                    key={filename}
                    component="a"
                    href={`http://localhost/showfile/${filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      فایل-{index + 1}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};
export { Answer };
