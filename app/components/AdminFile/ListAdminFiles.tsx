import {
  Box,
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

const ListAdminFiles = async ({ session }: { session: Session }) => {
  const resFiles = await fetch(`${process.env.BACKEND_URL}/files`, {
    next: {
      tags: ["File"],
    },
  });
  const files: FileType[] = await resFiles.json();
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {files?.map((file) => {
        return (
          <ListItem
            sx={{
              borderBottom: "1px solid " + grey[500],
            }}
            key={file?.id}
            secondaryAction={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "2rem",
                  marginX: "1rem",
                }}
              >
                {session?.user?.is_admin && (
                  <>
                    <IconButton
                      component={Link}
                      href={`/admin/${file?.id}/delete`}
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
                      href={`/admin/${file?.id}/edit`}
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
              href={`/admin/${file?.id}`}
              role={undefined}
              sx={{ padding: "1rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                <Typography>{file?.title}</Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export { ListAdminFiles };
