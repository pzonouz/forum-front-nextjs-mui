import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { grey } from "@mui/material/colors";
import { FileType } from "@/app/types/FileType";

const ListQuestions = async ({
  fetchUrl,
  session,
}: {
  fetchUrl: string;
  session: Session;
}) => {
  const resQuestions = await fetch(fetchUrl, {
    next: {
      tags: ["Question"],
    },
  });
  const questions: FileType[] = await resQuestions.json();
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {questions?.length == 0 ? (
        <Box sx={{ padding: "1rem" }}>هیچ سوالی وجود ندارد</Box>
      ) : (
        questions?.map((question) => {
          const created_at = new Date(question?.created_at).toLocaleString(
            "fa-IR",
          );
          return (
            <ListItem
              sx={{
                borderBottom: "1px solid " + grey[500],
              }}
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
                        href={`/Q&A/questions/${question?.id}/delete`}
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
                        href={`/Q&A/questions/${question?.id}/edit`}
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
                href={`/Q&A/questions/${question?.id}`}
                role={undefined}
                sx={{ padding: "0.5rem" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
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
                    label={`جوابها: ${question?.answers?.length}`}
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
                    {created_at}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })
      )}
    </List>
  );
};

export { ListQuestions };
