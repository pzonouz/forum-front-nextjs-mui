import { FileType } from "@/app/types/FileType";
import { Box, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const ListFiles = ({ files }: { files: FileType[] }) => {
  return (
    <Box sx={{ width: "100%", bgcolor: "#F3F4F6", padding: "1rem" }}>
      <Box
        sx={{
          border: "1px solid #D1D5DB",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
