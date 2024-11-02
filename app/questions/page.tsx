"use server";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AddQuestion } from "../components/Question/AddQuestion";
import { QUeastionType } from "../types/QuestionTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();
  const resQuestions = await fetch(`${process.env.BACKEND_URL}/questions`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
    },
  });
  const questions: QUeastionType[] = await resQuestions.json();
  return (
    <Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {questions.map((question) => (
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
              sx={{ padding: "1rem" }}
            >
              <ListItemText primary={question?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <AddQuestion />
    </Box>
  );
};
export default page;
