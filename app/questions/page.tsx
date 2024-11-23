"use server";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { AddQuestion } from "../components/Question/AddQuestion";
import { QuestionType } from "../types/QuestionTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "@/auth";
import Link from "next/link";
import { grey } from "@mui/material/colors";

const page = async () => {
  const session = await auth();
  const resQuestions = await fetch(`${process.env.BACKEND_URL}/questions`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  const questions: QuestionType[] = await resQuestions.json();
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {questions.map((question) => {
          const createdAt = new Date(question?.createdAt).toLocaleString();
          return (
            <ListItem
              key={question?.id}
              secondaryAction={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    marginX: "1rem",
                  }}
                >
                  {session?.user?.email == question?.user?.email && (
                    <>
                      <IconButton
                        component={Link}
                        href={`/questions/${question?.id}/delete`}
                        edge="end"
                        sx={{
                          backgroundColor: "error.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "error.dark",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={`/questions/${question?.id}/edit`}
                        edge="end"
                        sx={{
                          color: "white",
                          backgroundColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              }
              disablePadding
            >
              <ListItemButton
                component={Link}
                href={`/questions/${question?.id}`}
                role={undefined}
                sx={{ padding: "0.5rem" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    sx={[
                      { width: "fit-content" },
                      question?.solved
                        ? { backgroundColor: "success.main", color: "white" }
                        : {},
                    ]}
                    size="small"
                    label={`Answers: ${question?.answers?.length}`}
                  />
                  <Typography>{question?.title}</Typography>
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
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <AddQuestion />
    </Box>
  );
};
export default page;
