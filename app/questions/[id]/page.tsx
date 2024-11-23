"use server";

import { AddAnswer } from "@/app/components/Answer/AddAnswer";
import { Answer } from "@/app/components/Answer/Answer";
import { QuestionType } from "@/app/types/QuestionTypes";
import { Box, Icon, IconButton, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import { Edit } from "@mui/icons-material";
import Link from "next/link";

const page = async ({ params }: { params: any }) => {
  const parameters = await params;
  const resQuestion = await fetch(
    `${process.env.BACKEND_URL}/questions/${parameters.id}`,
  );
  const question: QuestionType = await resQuestion.json();
  const createdAt = new Date(question.createdAt).toLocaleString();
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Paper elevation={3} sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            right: "-0.5rem",
            top: "-1rem",
          }}
        >
          <IconButton
            sx={{ color: "primary.main" }}
            component={Link}
            href={`/questions/${parameters?.id}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "error.main" }}
            component={Link}
            href={`/questions/${parameters?.id}/delete`}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
              padding: "1rem",
              width: "100%",
            },
          ]}
        >
          <Box
            sx={{
              width: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon
              sx={[
                {
                  fontSize: "2rem",
                },
                question?.solved
                  ? {
                      color: "success.main",
                    }
                  : {
                      color: grey[500],
                    },
              ]}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ marginBottom: "1rem" }}>
              {question?.title}
            </Typography>
            <Typography>{question?.description}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: "0.7rem", color: grey[700] }}
                component="span"
              >
                {question?.user?.email}
              </Typography>
              <Typography
                sx={{ fontSize: "0.7rem", color: grey[700] }}
                component="span"
              >
                {createdAt}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Answer questionId={parameters.id} />
      <AddAnswer question={question} />
    </Box>
  );
};

export default page;
