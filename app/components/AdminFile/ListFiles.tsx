import { FileType } from "@/app/types/FileType";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import { SearchFile } from "../Navigation/SearchFile";

const ListFiles = async (props) => {
  const resFiles = await fetch(`${process.env.BACKEND_URL}/files`);
  const files: FileType[] = await resFiles.json();
  return (
    <Box {...props}>
      <SearchFile />
      <Box
        sx={{
          border: "1px solid #D1D5DB",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", paddingY: "1rem" }}
        >
          آخرین فایلهای اضافه شده
        </Typography>
        {files?.map((file, index) => (
          <MuiLink
            component={Link}
            key={file?.title}
            sx={[
              {
                padding: "1rem",
                width: "100%",
              },
              index % 2 == 0 && {
                backgroundColor: "#D1D5DB",
              },
              index % 2 != 0 && {
                backgroundColor: "#f7f8f9",
              },
            ]}
            href={`/files/${file.id}`}
          >
            {file?.title}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
};
export { ListFiles };
